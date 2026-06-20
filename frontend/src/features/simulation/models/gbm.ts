import type { GBMData, GBMResult } from '../types';
import { systemRandom, gaussian } from '../../../lib/prng';
import { meanAxis1, percentileAxis1, linspace, transpose } from '../../../lib/stats';

export function runGBM(req: GBMData): GBMResult {
  const S0 = req.initialPrice;
  const mu = req.drift / 100;
  const sigma = req.volatility / 100;
  const T = req.timeHorizonYears;
  const N = Math.floor(req.stepsPerYear * T);
  const dt = 1.0 / req.stepsPerYear;
  const M = req.numSimulations;
  
  // paths shape: [N+1][M]
  const paths: number[][] = Array.from({ length: N + 1 }, () => new Array(M).fill(0));
  
  for (let m = 0; m < M; m++) {
    paths[0][m] = S0;
  }
  
  const drift_factor = (mu - 0.5 * sigma * sigma) * dt;
  const vol_factor = sigma * Math.sqrt(dt);
  
  for (let t = 1; t <= N; t++) {
    for (let m = 0; m < M; m++) {
      const Z = gaussian(systemRandom);
      paths[t][m] = paths[t - 1][m] * Math.exp(drift_factor + vol_factor * Z);
    }
  }
  
  const time_steps = linspace(0, T, N + 1);
  const mean_path = meanAxis1(paths);
  const upper_band = percentileAxis1(paths, 95);
  const lower_band = percentileAxis1(paths, 5);
  const upper_band_68 = percentileAxis1(paths, 84);
  const lower_band_68 = percentileAxis1(paths, 16);
  
  return {
    paths: transpose(paths), // Transposed to [M][N+1] for the client
    mean_path,
    upper_band,
    lower_band,
    upper_band_68,
    lower_band_68,
    time_steps
  };
}
