'use client';

import { motion } from 'framer-motion';

export default function StochasticPathLab({ results, timeHorizon }: { results: any, timeHorizon: number }) {
  if (!results || !results.paths) return null;

  const allPaths = results.paths as number[][];
  const pathsToRender = allPaths.slice(0, 100);
  const numSteps = pathsToRender[0]?.length || 0;

  if (numSteps === 0) return null;

  const w = 1000;
  const h = 500;
  const pad = 60;

  let minV = Infinity;
  let maxV = -Infinity;
  for (let i = 0; i < allPaths.length; i++) {
    for (let j = 0; j < allPaths[i].length; j++) {
      if (allPaths[i][j] < minV) minV = allPaths[i][j];
      if (allPaths[i][j] > maxV) maxV = allPaths[i][j];
    }
  }

  const range = maxV - minV || 1;
  minV = minV - range * 0.1;
  maxV = maxV + range * 0.1;

  const scaleX = (idx: number) => pad + (idx / (numSteps - 1)) * (w - pad * 2);
  const scaleY = (val: number) => h - pad - ((val - minV) / (maxV - minV)) * (h - pad * 2);

  const formatY = (n: number) => {
    if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n.toFixed(0)}`;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 px-1 flex items-center justify-between border-b border-rule-strong pb-2">
        <div>
          <p className="font-label text-[10px] font-semibold tracking-[0.2em] text-ink-soft uppercase mb-1">Quantitative Simulation Lab</p>
          <h3 className="font-display text-2xl text-ink">Stochastic Path Cloud</h3>
        </div>
        <div className="font-label text-[10px] tracking-[0.12em] font-semibold text-ink-soft text-right">
          <div>{allPaths.length} Generated Paths</div>
          <div className="text-ink-soft/60">Displaying sample of {pathsToRender.length}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="border border-rule overflow-hidden bg-paper-aged relative">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block" preserveAspectRatio="none">
          {/* Background grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <g key={pct}>
              <line x1={pad} y1={pad + (h - pad * 2) * pct} x2={w - pad} y2={pad + (h - pad * 2) * pct} stroke="var(--rule)" strokeWidth={1} />
              <text x={pad - 10} y={pad + (h - pad * 2) * pct} textAnchor="end" dominantBaseline="middle" fontSize={10} fontFamily="'Inter', sans-serif" fill="var(--ink-soft)">
                {formatY(maxV - (maxV - minV) * pct)}
              </text>
            </g>
          ))}

          <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="var(--ink)" strokeWidth={2} />

          {/* Paths Cloud — navy with low opacity */}
          <g>
            {pathsToRender.map((p, i) => {
              const d = p.map((val, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleX(idx)} ${scaleY(val)}`).join(' ');
              return (
                <motion.path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="rgba(24,34,48,0.18)"
                  strokeWidth={1.5}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2.5, delay: i * 0.015, ease: 'linear' }}
                />
              );
            })}
          </g>

          {/* 95% Confidence Interval — gold, very subtle */}
          {results.upper_band && results.lower_band && (
            <motion.path
              d={results.upper_band.map((val: number, idx: number) => `${idx === 0 ? 'M' : 'L'} ${scaleX(idx)} ${scaleY(val)}`).join(' ') + ' ' +
                 results.lower_band.slice().reverse().map((val: number, idx: number) => `L ${scaleX(numSteps - 1 - idx)} ${scaleY(val)}`).join(' ') + ' Z'}
              fill="rgba(182,155,87,0.08)"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: pathsToRender.length * 0.015 + 0.5, ease: 'easeOut' }}
            />
          )}

          {/* 68% Confidence Interval — gold, slightly stronger */}
          {results.upper_band_68 && results.lower_band_68 && (
            <motion.path
              d={results.upper_band_68.map((val: number, idx: number) => `${idx === 0 ? 'M' : 'L'} ${scaleX(idx)} ${scaleY(val)}`).join(' ') + ' ' +
                 results.lower_band_68.slice().reverse().map((val: number, idx: number) => `L ${scaleX(numSteps - 1 - idx)} ${scaleY(val)}`).join(' ') + ' Z'}
              fill="rgba(182,155,87,0.2)"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: pathsToRender.length * 0.015 + 0.2, ease: 'easeOut' }}
            />
          )}

          {/* Mean Path — gold accent */}
          {results.mean_path && (
            <motion.path
              d={results.mean_path.map((val: number, idx: number) => `${idx === 0 ? 'M' : 'L'} ${scaleX(idx)} ${scaleY(val)}`).join(' ')}
              fill="none"
              stroke="#B69B57"
              strokeWidth={3}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, delay: pathsToRender.length * 0.015, ease: 'easeInOut' }}
            />
          )}
        </svg>
      </div>
    </div>
  );
}
