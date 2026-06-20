import type { VolatilityData, VolatilityResult } from '../types';
import { systemRandom, normal, uniform } from '../../../lib/prng';

export function runVolatility(req: VolatilityData): VolatilityResult {
  const steps = req.timeSteps;
  const vols: number[] = new Array(steps).fill(0);
  vols[0] = req.initialVol / 100.0;
  
  const regime_flags: number[] = new Array(steps).fill(0);
  
  const omega = 0.00001;
  const alpha = 0.08;
  const beta = 0.90;
  
  let current_regime = 0;
  const returns: number[] = new Array(steps).fill(0);
  
  for (let i = 1; i < steps; i++) {
    if (current_regime === 0 && uniform(systemRandom) < 0.01) {
      current_regime = 1;
    } else if (current_regime === 1 && uniform(systemRandom) < 0.05) {
      current_regime = 0;
    }
    
    regime_flags[i] = current_regime;
    
    let shock = normal(systemRandom, 0, vols[i-1]);
    if (current_regime === 1) {
      shock *= 2.5;
    }
    
    returns[i] = shock;
    vols[i] = Math.sqrt(omega + alpha * (returns[i-1] * returns[i-1]) + beta * (vols[i-1] * vols[i-1]));
  }
  
  return {
    realized_volatility: vols.map(v => v * 100),
    regime_flags
  };
}
