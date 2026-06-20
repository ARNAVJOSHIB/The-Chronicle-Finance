/**
 * Chronicle Finance — Statistical helpers
 *
 * Pure TypeScript reimplementation of the numpy primitives the FastAPI backend
 * used. All functions operate on plain number[] / number[][] arrays.
 *
 *   percentile(arr, p)   linear interpolation (matches numpy default)
 *   mean(arr)
 *   std(arr)             population standard deviation
 *   linspace(start, end, count)
 *   Matrix: matMulVec, dot, outer, transpose
 */

// ── Scalar statistics ────────────────────────────────────────────────────────
export function mean(arr: number[]): number {
  if (arr.length === 0) return 0;
  let s = 0;
  for (let i = 0; i < arr.length; i++) s += arr[i];
  return s / arr.length;
}

export function sum(arr: number[]): number {
  let s = 0;
  for (let i = 0; i < arr.length; i++) s += arr[i];
  return s;
}

export function median(arr: number[]): number {
  return percentile(arr, 50);
}

/**
 * Percentile via linear interpolation between closest ranks — this is numpy's
 * default ("linear") interpolation method, matching np.percentile exactly.
 * `p` is on the 0–100 scale (numpy convention).
 */
export function percentile(arr: number[], p: number): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  return percentileSorted(sorted, p);
}

export function percentileSorted(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = (sorted.length - 1) * (p / 100.0);
  const lower = Math.floor(idx);
  const upper = Math.ceil(idx);
  const weight = idx - lower;
  if (upper >= sorted.length) return sorted[lower];
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

/** Percentiles for each timestep — operates on columns of a 2D array. */
export function percentileAxis1(
  matrix: number[][], // shape [timesteps][sims]
  p: number
): number[] {
  if (matrix.length === 0) return [];
  return matrix.map((row) => percentile(row, p));
}

/** Mean per timestep across all simulations. */
export function meanAxis1(matrix: number[][]): number[] {
  return matrix.map((row) => mean(row));
}

export function linspace(start: number, end: number, count: number): number[] {
  if (count <= 1) return [start];
  const step = (end - start) / (count - 1);
  const out: number[] = new Array(count);
  for (let i = 0; i < count; i++) out[i] = start + step * i;
  return out;
}

// ── Matrix operations (small fixed-size; n is always tiny) ───────────────────
export function dot(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

/** Matrix-vector product: result[i] = sum_j A[i][j] * v[j]. */
export function matVec(A: number[][], v: number[]): number[] {
  return A.map((row) => dot(row, v));
}

/** vᵀ · A · v (scalar — portfolio variance). */
export function quadForm(A: number[][], v: number[]): number {
  const Av = matVec(A, v);
  return dot(v, Av);
}

/** Outer product: result[i][j] = a[i] * b[j]. */
export function outer(a: number[], b: number[]): number[][] {
  return a.map((ai) => b.map((bj) => ai * bj));
}

export function transpose(A: number[][]): number[][] {
  if (A.length === 0) return [];
  return A[0].map((_, j) => A.map((row) => row[j]));
}

/** A · Aᵀ (used to build a positive semi-definite covariance). */
export function aat(A: number[][]): number[][] {
  const n = A.length;
  const m = A[0].length;
  const out: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let s = 0;
      for (let k = 0; k < m; k++) s += A[i][k] * A[j][k];
      out[i][j] = s;
    }
  }
  return out;
}

export function diag(A: number[][]): number[] {
  return A.map((row, i) => row[i] ?? 0);
}
