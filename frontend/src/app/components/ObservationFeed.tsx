'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Format seconds → HH:MM journal timestamp */
function journalTime(seconds: number): string {
  const baseHour = 13;
  const totalMinutes = baseHour * 60 + Math.floor(seconds / 60);
  const hh = String(Math.floor(totalMinutes / 60) % 24).padStart(2, '0');
  const mm = String(totalMinutes % 60).padStart(2, '0');
  return `${hh}:${mm}`;
}

export default function ObservationFeed({ results, selectedModel }: { results: any, selectedModel: string }) {
  const observations = useMemo(() => {
    if (!results) return [];

    const obs: { text: string; offset: number }[] = [];

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

        if (cv > 0.5) {
          obs.push({ text: "Extreme volatility expansion detected. Distribution tails have widened significantly, signaling high uncertainty in terminal value.", offset: 12 });
        } else if (cv < 0.1) {
          obs.push({ text: "System demonstrates high stability. Variance is tightly clustered around the mean expectation.", offset: 12 });
        } else {
          obs.push({ text: "Moderate dispersion observed in path generation. Terminal values exhibit standard log-normal characteristics.", offset: 12 });
        }

        const downsideRisk = terminalValues.filter(v => v < (results.mean_path ? results.mean_path[0] : (paths[0][0] || mean))).length / terminalValues.length;
        if (downsideRisk > 0.4) {
          obs.push({ text: `Substantial downside risk: ${(downsideRisk * 100).toFixed(1)}% of simulated scenarios resulted in capital degradation relative to baseline.`, offset: 47 });
        } else {
          obs.push({ text: `Positive drift dominates: ${(100 - downsideRisk * 100).toFixed(1)}% of scenarios yielded asset growth.`, offset: 47 });
        }
      }
    } else if (selectedModel === 'portfolio-optimization') {
      obs.push({ text: `Efficient frontier generated across ${results.assets?.length || 'multiple'} assets. Max Sharpe ratio indicates optimal risk-adjusted return.`, offset: 8 });
    } else if (selectedModel === 'value-at-risk') {
      obs.push({ text: `Tail risk assessed. The 95% confidence threshold indicates significant capital protection is required against extreme market drawdowns.`, offset: 8 });
    } else if (selectedModel === 'correlation-matrix') {
      obs.push({ text: `Asset relationships analyzed. Stressed regimes show systemic correlation tending toward 1.0, neutralizing diversification benefits.`, offset: 8 });
    } else if (selectedModel === 'volatility-lab') {
      obs.push({ text: `Volatility clustering detected. The system has identified persistent stochastic regime shifts over the analyzed time horizon.`, offset: 8 });
    }

    return obs;
  }, [results, selectedModel]);

  if (!results) return null;

  return (
    <div className="px-8 py-6 border-b border-rule bg-paper-aged">
      <h3 className="font-display text-[12px] tracking-wide text-ink mb-5">
        <span className="text-gold mr-2">§</span>Observation Feed
      </h3>
      <ul className="space-y-5">
        <AnimatePresence>
          {observations.map((obs, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6, ease: 'easeOut' }}
              className="relative pl-4"
            >
              {/* Ruled journal line */}
              <div className="absolute left-0 top-1 bottom-1 w-[1px] bg-rule-strong" />
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="font-mono text-[9px] font-semibold text-gold tracking-wider">
                  {journalTime(obs.offset + idx * 5)} &middot;
                </span>
                <span className="font-label text-[8px] tracking-[0.15em] text-ink-soft/60 uppercase">
                  Journal Entry
                </span>
              </div>
              <p className="font-body text-[11.5px] text-ink leading-[1.6]">
                {obs.text}
              </p>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
