'use client';

import { motion } from 'framer-motion';

export default function VaRViz({ results }: { results: any }) {
  if (!results || !results.simulated_losses) return null;

  const losses = results.simulated_losses as number[];
  const sortedLosses = [...losses].sort((a, b) => a - b);
  
  const w = 800;
  const h = 300;
  const pad = 40;

  // Histogram buckets
  const minL = sortedLosses[0];
  const maxL = sortedLosses[sortedLosses.length - 1];
  const numBins = 40;
  const binWidth = (maxL - minL) / numBins;
  
  const bins = new Array(numBins).fill(0);
  for (const l of sortedLosses) {
    const idx = Math.min(Math.floor((l - minL) / binWidth), numBins - 1);
    bins[idx]++;
  }

  const maxFreq = Math.max(...bins, 1);
  const scaleX = (val: number) => pad + ((val - minL) / (maxL - minL)) * (w - pad * 2);
  const scaleY = (freq: number) => h - pad - (freq / maxFreq) * (h - pad * 2);

  // VaR threshold is the 95th percentile (or whatever confidence was passed)
  const varIndex = Math.floor(sortedLosses.length * 0.95);
  const varThreshold = sortedLosses[varIndex];

  return (
    <div className="w-full mb-12">
      <div className="mb-4 px-1 flex items-center justify-between border-b-news-thick pb-2">
        <div>
          <p className="text-[10px] font-bold  tracking-[0.2em] font-inter text-dark-charcoal mb-1">Risk System</p>
          <h3 className="text-2xl font-black font-playfair text-foreground capitalize">Loss Distribution (Tail Risk)</h3>
        </div>
      </div>

      <div className="border border-black bg-ivory relative p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block">
          {/* Baseline */}
          <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#1A1C20" strokeWidth={2} />
          
          {/* Histogram Bins */}
          {bins.map((freq, i) => {
            const binVal = minL + i * binWidth;
            const x = scaleX(binVal);
            const y = scaleY(freq);
            const bw = (w - pad * 2) / numBins - 1;
            
            // Highlight tail risk (losses > VaR)
            const isTail = binVal >= varThreshold;
            
            return (
              <motion.rect
                key={i}
                x={x}
                y={h - pad}
                width={Math.max(bw, 1)}
                height={0}
                fill={isTail ? 'rgba(220, 38, 38, 0.7)' : 'rgba(8, 27, 51, 0.3)'}
                animate={{ y: y, height: (h - pad) - y }}
                transition={{ duration: 0.8, delay: i * 0.02, ease: 'easeOut' }}
              />
            );
          })}

          {/* VaR Line */}
          <motion.line
            x1={scaleX(results.monte_carlo_var)}
            y1={pad}
            x2={scaleX(results.monte_carlo_var)}
            y2={h - pad}
            stroke="#DC2626"
            strokeWidth={2}
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
          <motion.text
            x={scaleX(results.monte_carlo_var) + 5}
            y={pad + 10}
            fill="#DC2626"
            fontSize={12}
            fontWeight="bold"
            fontFamily="Inter, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            VaR Threshold
          </motion.text>
        </svg>
      </div>
    </div>
  );
}
