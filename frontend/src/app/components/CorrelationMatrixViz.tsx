'use client';

import { motion } from 'framer-motion';

export default function CorrelationMatrixViz({ results }: { results: any }) {
  if (!results || !results.correlation_matrix) return null;

  const matrix = results.correlation_matrix as number[][];
  const assets = results.assets as string[];
  const n = matrix.length;

  const cellW = 40;
  const cellH = 40;
  const padLeft = 80;
  const padTop = 80;
  const w = padLeft + n * cellW;
  const h = padTop + n * cellH;

  /* Color mapping: ink for 1.0, gold for positive, navy for negative */
  const getColor = (val: number) => {
    if (val === 1) return '#111111';
    if (val > 0) {
      const alpha = val;
      return `rgba(182,155,87,${alpha})`;
    } else {
      const alpha = Math.abs(val);
      return `rgba(24,34,48,${alpha})`;
    }
  };

  return (
    <div className="w-full mb-12">
      {/* Header */}
      <div className="mb-4 px-1 flex items-center justify-between border-b border-rule-strong pb-2">
        <div>
          <p className="font-label text-[10px] font-semibold tracking-[0.2em] text-ink-soft uppercase mb-1">Asset Relationships</p>
          <h3 className="font-display text-2xl text-ink">Correlation Matrix</h3>
        </div>
      </div>

      {/* Chart — paper bg, soft shadow */}
      <div className="border border-rule bg-paper p-6 overflow-x-auto" style={{ boxShadow: 'var(--shadow-paper)' }}>
        <svg width={w} height={h} className="block mx-auto">
          {/* Column labels */}
          {assets.map((asset, i) => (
            <text
              key={`col-${i}`}
              x={padLeft + i * cellW + cellW / 2}
              y={padTop - 10}
              transform={`rotate(-45 ${padLeft + i * cellW + cellW / 2} ${padTop - 10})`}
              fontSize={10}
              fontFamily="'Inter', sans-serif"
              fill="var(--ink)"
              fontWeight="600"
            >
              {asset}
            </text>
          ))}

          {/* Row labels */}
          {assets.map((asset, i) => (
            <text
              key={`row-${i}`}
              x={padLeft - 10}
              y={padTop + i * cellH + cellH / 2 + 3}
              textAnchor="end"
              fontSize={10}
              fontFamily="'Inter', sans-serif"
              fill="var(--ink)"
              fontWeight="600"
            >
              {asset}
            </text>
          ))}

          {/* Matrix cells */}
          {matrix.map((row, i) =>
            row.map((val, j) => (
              <g key={`${i}-${j}`}>
                <motion.rect
                  x={padLeft + j * cellW}
                  y={padTop + i * cellH}
                  width={cellW - 2}
                  height={cellH - 2}
                  fill={getColor(val)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (i * n + j) * 0.01, duration: 0.3 }}
                />
                <motion.text
                  x={padLeft + j * cellW + cellW / 2}
                  y={padTop + i * cellH + cellH / 2 + 3}
                  textAnchor="middle"
                  fontSize={10}
                  fill={val === 1 || Math.abs(val) > 0.6 ? '#F8F5EF' : '#111111'}
                  fontFamily="'Inter', sans-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (i * n + j) * 0.01 + 0.2 }}
                >
                  {val.toFixed(2)}
                </motion.text>
              </g>
            ))
          )}
        </svg>
      </div>
    </div>
  );
}
