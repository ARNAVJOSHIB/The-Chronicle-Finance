import type { CorrelationData, CorrelationResult } from '../types';
import { systemRandom, gaussian } from '../../../lib/prng';

export function runCorrelation(req: CorrelationData): CorrelationResult {
  const n = req.numAssets;
  const assets: string[] = [];
  for (let i = 0; i < n; i++) {
    assets.push(`Asset ${String.fromCharCode(65 + i)}`);
  }
  
  // Generate base correlation
  const A: number[][] = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => gaussian(systemRandom))
  );
  
  if (req.regime === 'stressed') {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        A[i][j] += 2.5;
      }
    }
  }
  
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
  
  return {
    assets,
    correlation_matrix: corr
  };
}
