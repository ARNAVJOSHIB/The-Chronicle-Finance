'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

const formatCurrency = (n: number) => {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
};

export default function ProbabilityDistribution({ results }: { results: any }) {
  const { terminalValues, mean, stdDev, minV, maxV } = useMemo(() => {
    if (!results || !results.paths) return { terminalValues: [], mean: 0, stdDev: 0, minV: 0, maxV: 0 };

    const paths = results.paths as number[][];
    const vals = paths.map(p => p[p.length - 1]).filter(v => isFinite(v));

    if (vals.length === 0) return { terminalValues: [], mean: 0, stdDev: 0, minV: 0, maxV: 0 };

    let sum = 0;
    let min = Infinity;
    let max = -Infinity;

    for (const v of vals) {
      sum += v;
      if (v < min) min = v;
      if (v > max) max = v;
    }

    const m = sum / vals.length;
    let varianceSum = 0;
    for (const v of vals) {
      varianceSum += Math.pow(v - m, 2);
    }
    const sd = Math.sqrt(varianceSum / vals.length);

    return { terminalValues: vals, mean: m, stdDev: sd, minV: min, maxV: max };
  }, [results]);

  if (terminalValues.length === 0) return null;

  const w = 1000;
  const h = 300;
  const pad = 60;

  const numPoints = 100;
  const curveMin = mean - stdDev * 3.5;
  const curveMax = mean + stdDev * 3.5;

  const points = [];
  let maxDensity = 0;

  for (let i = 0; i <= numPoints; i++) {
    const x = curveMin + (i / numPoints) * (curveMax - curveMin);
    const density = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
    if (density > maxDensity) maxDensity = density;
    points.push({ x, density });
  }

  const scaleX = (val: number) => pad + ((val - curveMin) / (curveMax - curveMin)) * (w - pad * 2);
  const scaleY = (density: number) => h - pad - (density / maxDensity) * (h - pad * 2);

  const curvePath = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleX(p.x)} ${scaleY(p.density)}`).join(' ');

  const stdDev1Min = mean - stdDev;
  const stdDev1Max = mean + stdDev;

  const std1Points = points.filter(p => p.x >= stdDev1Min && p.x <= stdDev1Max);
  const std1Path = std1Points.length > 0 ?
    `M ${scaleX(std1Points[0].x)} ${h - pad} ` +
    std1Points.map(p => `L ${scaleX(p.x)} ${scaleY(p.density)}`).join(' ') +
    ` L ${scaleX(std1Points[std1Points.length - 1].x)} ${h - pad} Z` : '';

  return (
    <div className="w-full mt-8">
      {/* Header */}
      <div className="mb-4 px-1 flex items-center justify-between border-b border-rule-strong pb-2">
        <div>
          <p className="font-label text-[10px] font-semibold tracking-[0.2em] text-ink-soft uppercase mb-1">Statistical Analytics Layer</p>
          <h3 className="font-display text-2xl text-ink">Terminal Probability Density</h3>
        </div>
        <div className="font-label text-[10px] tracking-[0.12em] font-semibold text-ink-soft text-right">
          <div><span className="text-navy font-semibold">&mu;</span> {formatCurrency(mean)}</div>
          <div><span className="text-gold font-semibold">&sigma;</span> {formatCurrency(stdDev)}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="border border-rule overflow-hidden bg-paper-aged relative" style={{ boxShadow: 'var(--shadow-paper)' }}>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block" preserveAspectRatio="none">
          {/* Baseline */}
          <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="var(--ink)" strokeWidth={2} />

          {/* Axis Labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
            const val = curveMin + (curveMax - curveMin) * pct;
            return (
              <g key={pct}>
                <line x1={scaleX(val)} y1={h - pad} x2={scaleX(val)} y2={h - pad + 5} stroke="var(--ink)" strokeWidth={1} />
                <text x={scaleX(val)} y={h - pad + 15} textAnchor="middle" dominantBaseline="hanging" fontSize={10} fontFamily="'Inter', sans-serif" fill="var(--ink-soft)">
                  {formatCurrency(val)}
                </text>
              </g>
            );
          })}

          {/* 1 Std Dev Shading — navy, very subtle */}
          {std1Path && (
            <motion.path
              d={std1Path}
              fill="rgba(24,34,48,0.06)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            />
          )}

          {/* Mean Line — gold dashed */}
          <motion.line
            x1={scaleX(mean)} y1={h - pad}
            x2={scaleX(mean)} y2={pad}
            stroke="#B69B57"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            initial={{ opacity: 0, y2: h - pad }}
            animate={{ opacity: 1, y2: pad }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          />

          {/* The Bell Curve — navy ink */}
          <motion.path
            d={curvePath}
            fill="none"
            stroke="#182230"
            strokeWidth={2.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </div>
  );
}
