'use client';

import { motion } from 'framer-motion';

export default function StochasticPathLab({ results, timeHorizon }: { results: any, timeHorizon: number }) {
  if (!results || !results.paths) return null;

  const allPaths = results.paths as number[][];
  // To maintain performance, limit rendered paths in SVG to 100
  const pathsToRender = allPaths.slice(0, 100);
  const numSteps = pathsToRender[0]?.length || 0;

  if (numSteps === 0) return null;

  const w = 1000;
  const h = 500;
  const pad = 60;

  // Compute min/max for scaling (using all paths to ensure bounds are correct)
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

  // Format Y-axis labels
  const formatY = (n: number) => {
    if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n.toFixed(0)}`;
  };

  return (
    <div className="w-full">
      <div className="mb-4 px-1 flex items-center justify-between border-b-news-thick pb-2">
        <div>
          <p className="text-[10px] font-bold  tracking-[0.2em] font-inter text-dark-charcoal mb-1">Quantitative Simulation Lab</p>
          <h3 className="text-2xl font-black font-playfair text-foreground capitalize">Stochastic Path Cloud</h3>
        </div>
        <div className="text-[10px] font-inter tracking-widest font-bold  text-dark-charcoal text-right">
          <div>{allPaths.length} Generated Paths</div>
          <div className="text-dark-charcoal/50">Displaying sample of {pathsToRender.length}</div>
        </div>
      </div>
      
      <div className="border border-black overflow-hidden bg-ivory relative">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block" preserveAspectRatio="none">
          {/* Background grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <g key={pct}>
              <line x1={pad} y1={pad + (h - pad * 2) * pct} x2={w - pad} y2={pad + (h - pad * 2) * pct} stroke="rgba(0,0,0,0.05)" strokeWidth={1} />
              <text x={pad - 10} y={pad + (h - pad * 2) * pct} textAnchor="end" dominantBaseline="middle" fontSize={10} fontFamily="Inter, sans-serif" fill="rgba(0,0,0,0.4)">
                {formatY(maxV - (maxV - minV) * pct)}
              </text>
            </g>
          ))}
          
          <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#111111" strokeWidth={2} />
          
          {/* Paths Cloud */}
          <g>
            {pathsToRender.map((p, i) => {
              const d = p.map((val, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleX(idx)} ${scaleY(val)}`).join(' ');
              return (
                <motion.path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="rgba(8, 27, 51, 0.15)" /* Deep analytical blue with opacity */
                  strokeWidth={1.5}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2.5, delay: i * 0.015, ease: 'linear' }}
                />
              );
            })}
          </g>

          {/* 95% Confidence Interval */}
          {results.upper_band && results.lower_band && (
            <motion.path
              d={results.upper_band.map((val: number, idx: number) => `${idx === 0 ? 'M' : 'L'} ${scaleX(idx)} ${scaleY(val)}`).join(' ') + ' ' +
                 results.lower_band.slice().reverse().map((val: number, idx: number) => `L ${scaleX(numSteps - 1 - idx)} ${scaleY(val)}`).join(' ') + ' Z'}
              fill="rgba(212, 175, 55, 0.1)"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: pathsToRender.length * 0.015 + 0.5, ease: 'easeOut' }}
            />
          )}

          {/* 68% Confidence Interval */}
          {results.upper_band_68 && results.lower_band_68 && (
            <motion.path
              d={results.upper_band_68.map((val: number, idx: number) => `${idx === 0 ? 'M' : 'L'} ${scaleX(idx)} ${scaleY(val)}`).join(' ') + ' ' +
                 results.lower_band_68.slice().reverse().map((val: number, idx: number) => `L ${scaleX(numSteps - 1 - idx)} ${scaleY(val)}`).join(' ') + ' Z'}
              fill="rgba(212, 175, 55, 0.25)"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: pathsToRender.length * 0.015 + 0.2, ease: 'easeOut' }}
            />
          )}

          {/* Mean Path */}
          {results.mean_path && (
            <motion.path
              d={results.mean_path.map((val: number, idx: number) => `${idx === 0 ? 'M' : 'L'} ${scaleX(idx)} ${scaleY(val)}`).join(' ')}
              fill="none"
              stroke="#D97706" /* Volatility Amber */
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
