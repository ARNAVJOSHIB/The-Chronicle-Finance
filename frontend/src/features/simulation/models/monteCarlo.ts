import type { MonteCarloData, MonteCarloResult } from '../types';
import { normal, systemRandom } from '../../../lib/prng';
import { percentile, mean, median } from '../../../lib/stats';

export function runMonteCarlo(req: MonteCarloData): MonteCarloResult {
  const npv_results: number[] = [];
  const all_paths: number[][] = [];
  
  const r = req.discountRate / 100;
  const g_terminal = req.terminalGrowthRate / 100;
  
  for (let trial = 0; trial < req.numSimulations; trial++) {
    const trial_pvs: number[] = [];
    const cumulative_pvs: number[] = [0];
    let current_revenue = req.initialRevenue;
    let last_cf = 0;
    
    for (let year = 1; year <= req.years; year++) {
      const growth = normal(systemRandom, req.revenueGrowthMean / 100, req.revenueGrowthStd / 100);
      const margin = normal(systemRandom, req.operatingMarginMean / 100, req.operatingMarginStd / 100);
      
      current_revenue *= (1 + growth);
      const ebit = current_revenue * margin;
      const atcf = ebit * (1 - req.taxRate / 100);
      
      const pv = atcf / Math.pow(1 + r, year);
      trial_pvs.push(pv);
      cumulative_pvs.push(trial_pvs.reduce((a, b) => a + b, 0));
      last_cf = atcf;
    }
    
    let trial_npv = trial_pvs.reduce((a, b) => a + b, 0);
    if (r > g_terminal && req.years > 0) {
      const tv = last_cf * (1 + g_terminal) / (r - g_terminal);
      const tv_pv = tv / Math.pow(1 + r, req.years);
      trial_npv += tv_pv;
    }
    
    cumulative_pvs[cumulative_pvs.length - 1] = trial_npv;
    npv_results.push(trial_npv);
    all_paths.push(cumulative_pvs);
  }
  
  let mean_value = 0;
  let median_value = 0;
  const percentiles: Record<string, number> = {};
  
  if (npv_results.length > 0) {
    mean_value = mean(npv_results);
    median_value = median(npv_results);
    percentiles["5%"] = percentile(npv_results, 5);
    percentiles["25%"] = percentile(npv_results, 25);
    percentiles["50%"] = median_value;
    percentiles["75%"] = percentile(npv_results, 75);
    percentiles["95%"] = percentile(npv_results, 95);
  }

  return {
    simulations: npv_results,
    paths: all_paths,
    mean_value,
    median_value,
    percentiles
  };
}
