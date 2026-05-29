'use client';

import { motion } from 'framer-motion';

export default function VolatilityLabViz({ results }: { results: any }) {
  if (!results || !results.realized_volatility) return null;

  const vols = results.realized_volatility as number[];
  const flags = results.regime_flags as number[];
  const steps = vols.length;
  
  const w = 800;
  const h = 300;
  const pad = 40;

  const maxV = Math.max(...vols) * 1.1;
  const minV = 0;

  const scaleX = (idx: number) => pad + (idx / (steps - 1)) * (w - pad * 2);
  const scaleY = (val: number) => h - pad - ((val - minV) / (maxV - minV)) * (h - pad * 2);

  // Group regimes for shading
  const regimes: { start: number, end: number, stressed: boolean }[] = [];
  let currentStart = 0;
  let currentStressed = flags[0] === 1;

  for (let i = 1; i < steps; i++) {
    const stressed = flags[i] === 1;
    if (stressed !== currentStressed) {
      regimes.push({ start: currentStart, end: i, stressed: currentStressed });
      currentStart = i;
      currentStressed = stressed;
    }
  }
  regimes.push({ start: currentStart, end: steps - 1, stressed: currentStressed });

  return (
    <div className="w-full mb-12">
      <div className="mb-4 px-1 flex items-center justify-between border-b-news-thick pb-2">
        <div>
          <p className="text-[10px] font-bold  tracking-[0.2em] font-inter text-dark-charcoal mb-1">Stochastic Volatility</p>
          <h3 className="text-2xl font-black font-playfair text-foreground capitalize">Realized Volatility & Regimes</h3>
        </div>
      </div>

      <div className="border border-black bg-ivory relative p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block" preserveAspectRatio="none">
          {/* Regime Shading */}
          {regimes.map((reg, i) => (
            <motion.rect
              key={`reg-${i}`}
              x={scaleX(reg.start)}
              y={pad}
              width={scaleX(reg.end) - scaleX(reg.start)}
              height={h - pad * 2}
              fill={reg.stressed ? 'rgba(217, 119, 6, 0.15)' : 'transparent'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          ))}

          {/* Grid */}
          <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#1A1C20" strokeWidth={2} />
          {[0.5, 1].map((pct) => (
            <g key={pct}>
              <line x1={pad} y1={pad + (h - pad * 2) * pct} x2={w - pad} y2={pad + (h - pad * 2) * pct} stroke="rgba(0,0,0,0.1)" strokeWidth={1} strokeDasharray="4 4" />
              <text x={pad - 10} y={pad + (h - pad * 2) * pct} textAnchor="end" dominantBaseline="middle" fontSize={10} fill="rgba(0,0,0,0.5)">
                {((maxV - (maxV - minV) * pct)).toFixed(1)}%
              </text>
            </g>
          ))}

          {/* Volatility Path */}
          <motion.path
            d={vols.map((val, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleX(idx)} ${scaleY(val)}`).join(' ')}
            fill="none"
            stroke="#1A1C20"
            strokeWidth={2}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </div>
  );
}
