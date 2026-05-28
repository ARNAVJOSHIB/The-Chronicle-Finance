'use client';

import { motion } from 'framer-motion';

export default function PortfolioOptimizationViz({ results }: { results: any }) {
  if (!results) return null;

  const w = 800;
  const h = 400;
  const pad = 60;

  // Scaling logic for scatter plot (X: Volatility, Y: Return)
  const xMin = Math.min(...results.scatter_volatilities) * 0.9;
  const xMax = Math.max(...results.scatter_volatilities) * 1.1;
  const yMin = Math.min(...results.scatter_returns) * 0.9;
  const yMax = Math.max(...results.scatter_returns) * 1.1;

  const scaleX = (v: number) => pad + ((v - xMin) / (xMax - xMin)) * (w - pad * 2);
  const scaleY = (v: number) => h - pad - ((v - yMin) / (yMax - yMin)) * (h - pad * 2);

  const formatPct = (n: number) => `${(n * 100).toFixed(1)}%`;

  return (
    <div className="w-full mb-12">
      <div className="mb-4 px-1 flex items-center justify-between border-b-news-thick pb-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] font-inter text-dark-charcoal mb-1">Quantitative Simulation Lab</p>
          <h3 className="text-2xl font-black font-playfair text-foreground capitalize">Efficient Frontier</h3>
        </div>
      </div>

      <div className="border border-black bg-[#1A1C20] relative p-4 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block">
          {/* Grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <g key={pct}>
              <line x1={pad} y1={pad + (h - pad * 2) * pct} x2={w - pad} y2={pad + (h - pad * 2) * pct} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
              <text x={pad - 10} y={pad + (h - pad * 2) * pct} textAnchor="end" dominantBaseline="middle" fontSize={10} fill="rgba(255,255,255,0.5)">
                {formatPct(yMax - (yMax - yMin) * pct)}
              </text>
              <line x1={pad + (w - pad * 2) * pct} y1={pad} x2={pad + (w - pad * 2) * pct} y2={h - pad} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
              <text x={pad + (w - pad * 2) * pct} y={h - pad + 20} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.5)">
                {formatPct(xMin + (xMax - xMin) * pct)}
              </text>
            </g>
          ))}
          
          <text x={w/2} y={h - 10} textAnchor="middle" fontSize={12} fill="rgba(212,175,55,0.8)" fontWeight="bold">Volatility (Risk)</text>
          <text x={20} y={h/2} transform={`rotate(-90 20 ${h/2})`} textAnchor="middle" fontSize={12} fill="rgba(212,175,55,0.8)" fontWeight="bold">Expected Return</text>

          {/* Scatter Portfolios */}
          <g>
            {results.scatter_returns.map((ret: number, i: number) => {
              if (i % 2 !== 0) return null; // Downsample for performance
              const vol = results.scatter_volatilities[i];
              const sharpe = results.scatter_sharpes[i];
              // Normalize sharpe for color opacity
              const opacity = Math.min(Math.max(sharpe * 0.3, 0.1), 0.8);
              return (
                <circle
                  key={i}
                  cx={scaleX(vol)}
                  cy={scaleY(ret)}
                  r={2}
                  fill={`rgba(255,255,255,${opacity})`}
                />
              );
            })}
          </g>

          {/* Efficient Frontier Curve */}
          <motion.path
            d={results.frontier_returns.map((ret: number, i: number) => `${i === 0 ? 'M' : 'L'} ${scaleX(results.frontier_volatilities[i])} ${scaleY(ret)}`).join(' ')}
            fill="none"
            stroke="#D4AF37"
            strokeWidth={3}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Max Sharpe Point */}
          <motion.circle
            cx={scaleX(results.max_sharpe_vol)}
            cy={scaleY(results.max_sharpe_return)}
            r={6}
            fill="#D97706"
            stroke="#fff"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 }}
          />
          <text x={scaleX(results.max_sharpe_vol) + 12} y={scaleY(results.max_sharpe_return) + 4} fontSize={12} fill="#D97706" fontWeight="bold">Max Sharpe</text>

          {/* Min Volatility Point */}
          <motion.circle
            cx={scaleX(results.min_vol_vol)}
            cy={scaleY(results.min_vol_return)}
            r={6}
            fill="#3B82F6"
            stroke="#fff"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 }}
          />
          <text x={scaleX(results.min_vol_vol) - 12} y={scaleY(results.min_vol_return) + 4} textAnchor="end" fontSize={12} fill="#3B82F6" fontWeight="bold">Min Risk</text>
        </svg>
      </div>
    </div>
  );
}
