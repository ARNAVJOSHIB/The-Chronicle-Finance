import type { PortfolioOptData, PortfolioOptResult } from '../types';
import { systemRandom, uniformRange, gaussian } from '../../../lib/prng';
import { linspace, quadForm } from '../../../lib/stats';

export function runPortfolioOptimization(req: PortfolioOptData): PortfolioOptResult {
  let n = req.numAssets || 5;
  let assets: string[] = [];
  let returns: number[] = [];
  let vols: number[] = [];
  let is_demo = false;

  if (req.assets && req.assets.length > 0) {
    n = req.assets.length;
    assets = req.assets.map(a => a.name);
    returns = req.assets.map(a => a.expected_return / 100.0);
    vols = req.assets.map(a => a.volatility / 100.0);
  } else {
    is_demo = true;
    for (let i = 0; i < n; i++) {
      assets.push(`Asset ${String.fromCharCode(65 + i)}`);
      returns.push(uniformRange(systemRandom, 0.03, 0.15));
      vols.push(uniformRange(systemRandom, 0.10, 0.35));
    }
  }

  // Random correlation matrix
  const A: number[][] = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => gaussian(systemRandom))
  );

  const cov: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) sum += A[i][k] * A[j][k];
      cov[i][j] = sum;
    }
  }

  const d = cov.map((row, i) => row[i]);
  const corr: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      corr[i][j] = cov[i][j] / Math.sqrt(d[i] * d[j]);
    }
  }

  const cov_matrix: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      cov_matrix[i][j] = vols[i] * vols[j] * corr[i][j];
    }
  }

  const num_ports = req.simulations || 3000;
  const ret_arr: number[] = new Array(num_ports);
  const vol_arr: number[] = new Array(num_ports);
  const sharpe_arr: number[] = new Array(num_ports);
  const all_weights: number[][] = [];

  const rf = (req.riskFreeRate ?? 2.0) / 100.0;

  for (let i = 0; i < num_ports; i++) {
    const w = Array.from({ length: n }, () => Math.random());
    const sumW = w.reduce((a, b) => a + b, 0);
    const weights = w.map(v => v / sumW);
    all_weights.push(weights);

    const port_ret = returns.reduce((sum, r, idx) => sum + r * weights[idx], 0);
    const port_vol = Math.sqrt(quadForm(cov_matrix, weights));

    ret_arr[i] = port_ret;
    vol_arr[i] = port_vol;
    sharpe_arr[i] = (port_ret - rf) / port_vol;
  }

  let max_sr_idx = 0;
  let min_vol_idx = 0;
  for (let i = 1; i < num_ports; i++) {
    if (sharpe_arr[i] > sharpe_arr[max_sr_idx]) max_sr_idx = i;
    if (vol_arr[i] < vol_arr[min_vol_idx]) min_vol_idx = i;
  }

  const max_sr_ret = ret_arr[max_sr_idx];
  const max_sr_vol = vol_arr[max_sr_idx];
  const max_sr_w = all_weights[max_sr_idx];

  const min_vol_ret = ret_arr[min_vol_idx];
  const min_vol_vol = vol_arr[min_vol_idx];
  const min_vol_w = all_weights[min_vol_idx];

  const frontier_returns: number[] = [];
  const frontier_volatilities: number[] = [];

  const sortedPorts = ret_arr.map((ret, idx) => ({ ret, vol: vol_arr[idx] }))
    .sort((a, b) => a.ret - b.ret);

  const target_returns = linspace(min_vol_ret, Math.max(...returns), 30);
  
  for (const tr of target_returns) {
    let best_vol = Infinity;
    for (const p of sortedPorts) {
      if (p.ret >= tr - 0.01 && p.ret <= tr + 0.01) {
        if (p.vol < best_vol) {
          best_vol = p.vol;
        }
      }
    }
    if (best_vol !== Infinity) {
      frontier_returns.push(tr);
      frontier_volatilities.push(best_vol);
    }
  }

  if (frontier_returns.length < 5) {
     frontier_returns.length = 0;
     frontier_volatilities.length = 0;
     let current_min_vol = min_vol_vol;
     for (const tr of target_returns) {
        frontier_returns.push(tr);
        const frac = (tr - min_vol_ret) / (Math.max(...returns) - min_vol_ret);
        const max_ret_port = sortedPorts[sortedPorts.length - 1];
        frontier_volatilities.push(current_min_vol + frac * (max_ret_port.vol - current_min_vol));
     }
  }

  return {
    assets,
    expected_returns: returns,
    volatilities: vols,
    correlation_matrix: corr,
    frontier_returns,
    frontier_volatilities,
    scatter_returns: ret_arr,
    scatter_volatilities: vol_arr,
    scatter_sharpes: sharpe_arr,
    max_sharpe_weights: max_sr_w,
    max_sharpe_return: max_sr_ret,
    max_sharpe_vol: max_sr_vol,
    min_vol_weights: min_vol_w,
    min_vol_return: min_vol_ret,
    min_vol_vol: min_vol_vol,
    is_demo
  };
}
