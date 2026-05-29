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

  // Color mapping from -1 (Blue) to 0 (White/Gray) to 1 (Red/Gold)
  const getColor = (val: number) => {
    if (val === 1) return '#1A1C20'; // perfect correlation
    if (val > 0) {
      const alpha = val;
      return `rgba(212, 175, 55, ${alpha})`; // Gold for positive
    } else {
      const alpha = Math.abs(val);
      return `rgba(59, 130, 246, ${alpha})`; // Blue for negative
    }
  };

  return (
    <div className="w-full mb-12">
      <div className="mb-4 px-1 flex items-center justify-between border-b-news-thick pb-2">
        <div>
          <p className="text-[10px] font-bold  tracking-[0.2em] font-inter text-dark-charcoal mb-1">Asset Relationships</p>
          <h3 className="text-2xl font-black font-playfair text-foreground capitalize">Correlation Matrix</h3>
        </div>
      </div>

      <div className="border border-black bg-ivory p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] overflow-x-auto">
        <svg width={w} height={h} className="block mx-auto">
          {/* Column labels */}
          {assets.map((asset, i) => (
            <text
              key={`col-${i}`}
              x={padLeft + i * cellW + cellW / 2}
              y={padTop - 10}
              transform={`rotate(-45 ${padLeft + i * cellW + cellW / 2} ${padTop - 10})`}
              fontSize={10}
              fontFamily="Inter, sans-serif"
              fill="#1A1C20"
              fontWeight="bold"
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
              fontFamily="Inter, sans-serif"
              fill="#1A1C20"
              fontWeight="bold"
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
                  fill={val === 1 || Math.abs(val) > 0.6 ? '#fff' : '#1A1C20'}
                  fontFamily="Inter, sans-serif"
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
