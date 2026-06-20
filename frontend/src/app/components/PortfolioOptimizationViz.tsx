'use client';

import { motion } from 'framer-motion';

export default function PortfolioOptimizationViz({ results }: { results: any }) {
  if (!results) return null;

  const w = 800;
  const h = 400;
  const pad = 60;

  const xMin = Math.min(...results.scatter_volatilities) * 0.9;
  const xMax = Math.max(...results.scatter_volatilities) * 1.1;
  const yMin = Math.min(...results.scatter_returns) * 0.9;
  const yMax = Math.max(...results.scatter_returns) * 1.1;

  const scaleX = (v: number) => pad + ((v - xMin) / (xMax - xMin)) * (w - pad * 2);
  const scaleY = (v: number) => h - pad - ((v - yMin) / (yMax - yMin)) * (h - pad * 2);

  const formatPct = (n: number) => `${(n * 100).toFixed(1)}%`;

  return (
    <div className="w-full mb-12">
      {/* Header */}
      <div className="mb-4 px-1 flex items-center justify-between border-b border-rule-strong pb-2">
        <div>
          <p className="font-label text-[10px] font-semibold tracking-[0.2em] text-ink-soft uppercase mb-1">Quantitative Simulation Lab</p>
          <h3 className="font-display text-2xl text-ink">Efficient Frontier</h3>
        </div>
      </div>

      {/* Chart — paper bg, soft shadow */}
      <div className="border border-rule bg-paper relative p-4" style={{ boxShadow: 'var(--shadow-paper)' }}>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block">
          {/* Grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <g key={pct}>
              <line x1={pad} y1={pad + (h - pad * 2) * pct} x2={w - pad} y2={pad + (h - pad * 2) * pct} stroke="var(--rule)" strokeWidth={1} />
              <text x={pad - 10} y={pad + (h - pad * 2) * pct} textAnchor="end" dominantBaseline="middle" fontSize={10} fill="var(--ink-soft)">
                {formatPct(yMax - (yMax - yMin) * pct)}
              </text>
              <line x1={pad + (w - pad * 2) * pct} y1={pad} x2={pad + (w - pad * 2) * pct} y2={h - pad} stroke="var(--rule)" strokeWidth={1} />
              <text x={pad + (w - pad * 2) * pct} y={h - pad + 20} textAnchor="middle" fontSize={10} fill="var(--ink-soft)">
                {formatPct(xMin + (xMax - xMin) * pct)}
              </text>
            </g>
          ))}

          <text x={w/2} y={h - 10} textAnchor="middle" fontSize={12} fill="#B69B57" fontWeight="600" fontFamily="'Inter', sans-serif">Volatility (Risk)</text>
          <text x={20} y={h/2} transform={`rotate(-90 20 ${h/2})`} textAnchor="middle" fontSize={12} fill="#B69B57" fontWeight="600" fontFamily="'Inter', sans-serif">Expected Return</text>

          {/* Scatter Portfolios — ink dots */}
          <g>
            {results.scatter_returns.map((ret: number, i: number) => {
              if (i % 2 !== 0) return null;
              const vol = results.scatter_volatilities[i];
              const sharpe = results.scatter_sharpes[i];
              const opacity = Math.min(Math.max(sharpe * 0.3, 0.1), 0.8);
              return (
                <circle
                  key={i}
                  cx={scaleX(vol)}
                  cy={scaleY(ret)}
                  r={2}
                  fill={`rgba(17,17,17,${opacity})`}
                />
              );
            })}
          </g>

          {/* Efficient Frontier Curve — gold */}
          <motion.path
            d={results.frontier_returns.map((ret: number, i: number) => `${i === 0 ? 'M' : 'L'} ${scaleX(results.frontier_volatilities[i])} ${scaleY(ret)}`).join(' ')}
            fill="none"
            stroke="#B69B57"
            strokeWidth={3}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Max Sharpe Point — gold */}
          <motion.circle
            cx={scaleX(results.max_sharpe_vol)}
            cy={scaleY(results.max_sharpe_return)}
            r={6}
            fill="#B69B57"
            stroke="var(--paper)"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 }}
          />
          <text x={scaleX(results.max_sharpe_vol) + 12} y={scaleY(results.max_sharpe_return) + 4} fontSize={12} fill="#B69B57" fontWeight="600" fontFamily="'Inter', sans-serif">Max Sharpe</text>

          {/* Min Volatility Point — navy */}
          <motion.circle
            cx={scaleX(results.min_vol_vol)}
            cy={scaleY(results.min_vol_return)}
            r={6}
            fill="#182230"
            stroke="var(--paper)"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 }}
          />
          <text x={scaleX(results.min_vol_vol) - 12} y={scaleY(results.min_vol_return) + 4} textAnchor="end" fontSize={12} fill="#182230" fontWeight="600" fontFamily="'Inter', sans-serif">Min Risk</text>
        </svg>
      </div>
    </div>
  );
}
