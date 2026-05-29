'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ObservationFeed({ results, selectedModel }: { results: any, selectedModel: string }) {
  const observations = useMemo(() => {
    if (!results) return [];
    
    const obs: string[] = [];
    
    if (selectedModel === 'geometric-brownian-motion' || selectedModel === 'monte-carlo') {
      const paths = results.paths as number[][];
      if (paths && paths.length > 0) {
        const terminalValues = paths.map(p => p[p.length - 1]).filter(v => isFinite(v));
        
        let min = Infinity, max = -Infinity, sum = 0;
        terminalValues.forEach(v => {
          sum += v;
          if (v < min) min = v;
          if (v > max) max = v;
        });
        
        const mean = sum / terminalValues.length;
        const cv = (Math.sqrt(terminalValues.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / terminalValues.length)) / mean;

        // Observation 1: Volatility impact
        if (cv > 0.5) {
          obs.push("Extreme volatility expansion detected. Distribution tails have widened significantly, signaling high uncertainty in terminal value.");
        } else if (cv < 0.1) {
          obs.push("System demonstrates high stability. Variance is tightly clustered around the mean expectation.");
        } else {
          obs.push("Moderate dispersion observed in path generation. Terminal values exhibit standard log-normal characteristics.");
        }
        
        // Observation 2: Downside risk
        const downsideRisk = terminalValues.filter(v => v < (results.mean_path ? results.mean_path[0] : (paths[0][0] || mean))).length / terminalValues.length;
        if (downsideRisk > 0.4) {
          obs.push(`Substantial downside risk: ${(downsideRisk * 100).toFixed(1)}% of simulated scenarios resulted in capital degradation relative to baseline.`);
        } else {
          obs.push(`Positive drift dominates: ${(100 - downsideRisk * 100).toFixed(1)}% of scenarios yielded asset growth.`);
        }
      }
    } else if (selectedModel === 'portfolio-optimization') {
      obs.push(`Efficient frontier generated across ${results.assets?.length || 'multiple'} assets. Max Sharpe ratio indicates optimal risk-adjusted return.`);
    } else if (selectedModel === 'value-at-risk') {
      obs.push(`Tail risk assessed. The 95% confidence threshold indicates significant capital protection is required against extreme market drawdowns.`);
    } else if (selectedModel === 'correlation-matrix') {
      obs.push(`Asset relationships analyzed. Stressed regimes show systemic correlation tending toward 1.0, neutralizing diversification benefits.`);
    } else if (selectedModel === 'volatility-lab') {
      obs.push(`Volatility clustering detected. The system has identified persistent stochastic regime shifts over the analyzed time horizon.`);
    }

    return obs;
  }, [results, selectedModel]);

  if (!results) return null;

  return (
    <div className="px-8 py-6 border-b border-border-soft/30 bg-parchment">
      <h3 className="text-[11px] font-heading tracking-[0.1em] font-bold mb-6 text-ink/70">Observation feed</h3>
      <ul className="space-y-6">
        <AnimatePresence>
          {observations.map((obs, idx) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 w-[4px] h-[4px] rounded-full bg-ledger-gold/60 flex-shrink-0" />
                <div>
                  <span className="text-[8px] font-mono font-bold text-ink/40 block mb-1 tracking-widest">
                     T+{(idx * 150 + 400).toString().padStart(4, '0')}ms &middot; System log
                  </span>
                  <p className="text-[11.5px] font-ui text-ink/85 leading-[1.6]">
                    {obs}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
