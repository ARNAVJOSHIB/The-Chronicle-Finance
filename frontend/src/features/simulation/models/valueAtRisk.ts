import type { VaRData, VaRResult } from '../types';
import { mulberry32, normal, standardT, inverseNormalCDF } from '../../../lib/prng';
import { percentile } from '../../../lib/stats';

export function runValueAtRisk(req: VaRData): VaRResult {
  const z_score = inverseNormalCDF(req.confidenceLevel / 100.0);
  const mu_daily = (req.meanReturn / 100.0) / 252;
  const sig_daily = (req.volatility / 100.0) / Math.sqrt(252);
  
  const T = req.timeHorizonDays;
  
  const parametric_var = req.portfolioValue * (z_score * sig_daily * Math.sqrt(T) - mu_daily * T);
  
  // Seeded PRNG for reproducibility
  const rngMC = mulberry32(42);
  const sims = 10000;
  
  const losses: number[] = new Array(sims);
  for (let i = 0; i < sims; i++) {
    const random_ret = normal(rngMC, mu_daily * T, sig_daily * Math.sqrt(T));
    const sim_port_val = req.portfolioValue * (1 + random_ret);
    losses[i] = req.portfolioValue - sim_port_val;
  }
  
  const mc_var = percentile(losses, req.confidenceLevel);
  
  const rngHist = mulberry32(42); // Use same seed sequence for consistency
  const hist_losses: number[] = new Array(sims);
  for (let i = 0; i < sims; i++) {
    const t_samp = standardT(rngHist, 4);
    const hist_ret = t_samp * sig_daily * Math.sqrt(T) + mu_daily * T;
    hist_losses[i] = req.portfolioValue - req.portfolioValue * (1 + hist_ret);
  }
  
  const hist_var = percentile(hist_losses, req.confidenceLevel);
  
  // Downsample for visualization
  const viz_losses: number[] = [];
  const step = Math.floor(sims / 500);
  for (let i = 0; i < sims; i += step) {
    if (viz_losses.length < 500) {
      viz_losses.push(losses[i]);
    }
  }
  
  // Shuffle viz_losses visually
  for (let i = viz_losses.length - 1; i > 0; i--) {
    const j = Math.floor(rngMC() * (i + 1));
    const temp = viz_losses[i];
    viz_losses[i] = viz_losses[j];
    viz_losses[j] = temp;
  }
  
  return {
    parametric_var,
    monte_carlo_var: mc_var,
    historical_var: hist_var,
    simulated_losses: viz_losses
  };
}
