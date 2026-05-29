"use client";

import { useSimulation } from '../context/SimulationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import StochasticPathLab from './StochasticPathLab';
import ProbabilityDistribution from './ProbabilityDistribution';
import PortfolioOptimizationViz from './PortfolioOptimizationViz';
import VaRViz from './VaRViz';
import CorrelationMatrixViz from './CorrelationMatrixViz';
import VolatilityLabViz from './VolatilityLabViz';

// ── Formatting ───────────────────────────────────────────────────────────────
function fmt(n: number): string {
  if (!isFinite(n) || isNaN(n)) return '$0';
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function pct(n: number) { return `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`; }

// ── Layout constants ─────────────────────────────────────────────────────────
const COLS = 12;
const CW = 68;   // cell width
const CH = 76;   // cell height
const PAD = 36;
const R = 16;    // node radius

// ── Compute per-month interpolated values ────────────────────────────────────
function buildMonthlyValues(results: any, totalMonths: number): number[] {
  const out = new Array<number>(totalMonths).fill(0);
  if (!results) return out;

  if (results.modelType === 'compound-interest') {
    const fy = results.future_values as Record<string, number>;
    const maxYr = Math.max(...Object.keys(fy).map(Number));
    for (let i = 0; i < totalMonths; i++) {
      const yr = (i + 1) / 12;
      const lo = Math.floor(yr), hi = Math.ceil(yr);
      const vLo = lo <= 0 ? 0 : (fy[lo] ?? fy[Math.min(lo, maxYr)] ?? 0);
      const vHi = fy[Math.min(hi, maxYr)] ?? fy[maxYr] ?? 0;
      out[i] = lo === hi ? vHi : vLo + (yr - lo) * (vHi - vLo);
    }
  } else if (results.modelType === 'discounted-cash-flow') {
    const yv = results.yearly_values as Record<string, any>;
    const keys = Object.keys(yv).map(Number).sort((a, b) => a - b);
    const cumPV: Record<number, number> = {};
    let cum = 0;
    keys.forEach(k => { cum += yv[k].present_value ?? 0; cumPV[k] = cum; });
    const maxYr = Math.max(...keys);
    for (let i = 0; i < totalMonths; i++) {
      const yr = (i + 1) / 12;
      const lo = Math.floor(yr), hi = Math.ceil(yr);
      const vLo = lo <= 0 ? 0 : (cumPV[Math.min(lo, maxYr)] ?? 0);
      const vHi = cumPV[Math.min(hi, maxYr)] ?? cumPV[maxYr] ?? 0;
      out[i] = lo === hi ? vHi : vLo + (yr - lo) * (vHi - vLo);
    }
  } else if (results.modelType === 'monte-carlo') {
    for (let i = 0; i < totalMonths; i++) {
      const p = (i + 1) / totalMonths;
      out[i] = results.mean_value * p;
    }
  }
  return out;
}

// ── Node data type ───────────────────────────────────────────────────────────
interface NodeData {
  idx: number; month: number; year: number; isYearEnd: boolean;
  value: number; growthPct: number; x: number; y: number;
}

// ── Tooltip component ────────────────────────────────────────────────────────
function NodeTooltip({ node, results, mx, my }: { node: NodeData; results: any; mx: number; my: number }) {
  const lines: { label: string; value: string; gold?: boolean }[] = [
    { label: 'Month', value: `${node.month} of ${results.timeHorizon ? results.timeHorizon * 12 : 'N/A'}` },
    { label: 'Year',  value: `${node.year}` },
  ];

  if (results.modelType === 'compound-interest') {
    lines.unshift({ label: 'Portfolio Value', value: fmt(node.value), gold: true });
    lines.push({ label: 'vs. Final', value: pct((node.value / (results.final_amount || 1)) * 100 - 100) });
    lines.push({ label: 'Growth', value: pct(node.growthPct) });
  } else if (results.modelType === 'discounted-cash-flow') {
    lines.unshift({ label: 'Cumulative PV', value: fmt(node.value), gold: true });
    lines.push({ label: 'vs. NPV', value: pct((node.value / (results.npv || 1)) * 100 - 100) });
    lines.push({ label: 'Growth', value: pct(node.growthPct) });
  } else if (results.modelType === 'monte-carlo') {
    lines.unshift({ label: 'Expected Value', value: fmt(node.value), gold: true });
    lines.push({ label: 'Best Case (95%)', value: fmt(results.percentiles?.['95%'] * ((node.idx + 1) / (results.timeHorizon * 12))) });
    lines.push({ label: 'Worst Case (5%)', value: fmt(results.percentiles?.['5%'] * ((node.idx + 1) / (results.timeHorizon * 12))) });
  }

  const left = Math.min(mx + 14, (typeof window !== 'undefined' ? window.innerWidth : 1400) - 220);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 6 }}
      transition={{ duration: 0.14 }}
      style={{ position: 'fixed', left, top: my - 10, zIndex: 9999, pointerEvents: 'none' }}
    >
      <div style={{
        background: '#1A1C20',
        border: '1px solid #D4AF37',
        padding: '12px 16px',
        minWidth: 190,
        boxShadow: '4px 4px 0px rgba(0,0,0,1)',
        fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{ color: '#D4AF37', fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', marginBottom: 10, textTransform: '' }}>
          {node.isYearEnd ? `✦ Year ${node.year} End` : `Month ${node.month}`}
        </div>
        {lines.map(l => (
          <div key={l.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 14, marginBottom: 5 }}>
            <span style={{ color: 'rgba(246,244,240,0.6)', fontSize: 10, textTransform: '', letterSpacing: '0.05em' }}>{l.label}</span>
            <span style={{ color: l.gold ? '#D4AF37' : '#F6F4F0', fontSize: 11, fontWeight: l.gold ? 700 : 500 }}>{l.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Results summary card ─────────────────────────────────────────────────────
function ResultsSummary({ results }: { results: any }) {
  const metrics: { label: string; value: string; highlight?: boolean }[] = [];
  if (results.modelType === 'compound-interest') {
    metrics.push(
      { label: 'Final Amount', value: fmt(results.final_amount), highlight: true },
      { label: 'Total Contributions', value: fmt(results.total_contributions) },
      { label: 'Interest Earned', value: fmt(results.total_interest), highlight: true },
    );
  } else if (results.modelType === 'discounted-cash-flow') {
    metrics.push(
      { label: 'Net Present Value', value: fmt(results.npv), highlight: true },
      { label: 'Present Value (CF)', value: fmt(results.present_value) },
      { label: 'Total Value', value: fmt(results.total_value), highlight: true },
    );
  } else if (results.modelType === 'monte-carlo') {
    metrics.push(
      { label: 'Mean Outcome', value: fmt(results.mean_value), highlight: true },
      { label: 'Median Outcome', value: fmt(results.median_value) },
      { label: 'Best Case (95th %)', value: fmt(results.percentiles?.['95%'] ?? 0), highlight: true },
      { label: 'Worst Case (5th %)', value: fmt(results.percentiles?.['5%'] ?? 0) },
    );
  } else if (results.modelType === 'portfolio-optimization') {
    metrics.push(
      { label: 'Max Sharpe Return', value: pct(results.max_sharpe_return * 100), highlight: true },
      { label: 'Max Sharpe Volatility', value: pct(results.max_sharpe_vol * 100) },
      { label: 'Min Variance Return', value: pct(results.min_vol_return * 100) },
      { label: 'Min Variance Volatility', value: pct(results.min_vol_vol * 100), highlight: true },
    );
  } else if (results.modelType === 'value-at-risk') {
    metrics.push(
      { label: 'Parametric VaR', value: fmt(results.parametric_var), highlight: true },
      { label: 'Monte Carlo VaR', value: fmt(results.monte_carlo_var) },
      { label: 'Historical VaR', value: fmt(results.historical_var) },
      { label: 'Avg Simulated Loss', value: fmt(results.simulated_losses.reduce((a:number,b:number)=>a+b,0)/results.simulated_losses.length) },
    );
  } else if (results.modelType === 'correlation-matrix') {
    metrics.push(
      { label: 'Assets Analyzed', value: `${results.assets.length}` },
      { label: 'Matrix Dimensions', value: `${results.assets.length}x${results.assets.length}` },
      { label: 'Status', value: 'Generated', highlight: true },
    );
  } else if (results.modelType === 'volatility-lab') {
    metrics.push(
      { label: 'Initial Volatility', value: pct(results.realized_volatility[0]) },
      { label: 'Max Volatility', value: pct(Math.max(...results.realized_volatility)), highlight: true },
      { label: 'Avg Volatility', value: pct(results.realized_volatility.reduce((a:number,b:number)=>a+b,0)/results.realized_volatility.length) },
      { label: 'Regime Shifts', value: `${results.regime_flags.reduce((a:number,b:number,i:number,arr:number[])=>a+(i>0&&b!==arr[i-1]?1:0),0)} Detected` },
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto px-4 mb-6"
    >
      <div className="border border-black p-6 bg-[#1A1C20] shadow-[6px_6px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-3 mb-5 border-b border-white/20 pb-4">
          <div className="w-2 h-6 bg-gold" />
          <h3 className="text-xl font-black font-playfair text-white tracking-widest capitalize">Simulation Results</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-x border-t border-white/20">
          {metrics.map(({ label, value, highlight }, i) => (
            <div key={label} className={`p-4 text-center border-b border-white/20 ${i !== 3 ? 'md:border-r border-white/20' : ''}`} style={{
              background: highlight ? 'rgba(212,175,55,0.1)' : 'transparent',
            }}>
              <div className="text-2xl font-black font-playfair mb-1" style={{ color: highlight ? '#D4AF37' : '#F6F4F0' }}>{value}</div>
              <div className="text-[10px] font-inter  tracking-widest" style={{ color: 'rgba(246,244,240,0.6)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SimulationVisualization() {
  const { results, timeHorizon, hasRun } = useSimulation();
  const [hovered, setHovered] = useState<{ node: NodeData; mx: number; my: number } | null>(null);

  const totalMonths = timeHorizon * 12;
  const monthlyValues = useMemo(() => buildMonthlyValues(results, totalMonths), [results, totalMonths]);

  const nodes: NodeData[] = useMemo(() => {
    const maxV = Math.max(...monthlyValues, 1);
    return Array.from({ length: totalMonths }, (_, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const xOff = row % 2 === 1 ? CW / 2 : 0;
      const month = i + 1;
      const value = monthlyValues[i] ?? 0;
      const prev = monthlyValues[i - 1] ?? 0;
      const growthPct = prev > 0 ? ((value - prev) / prev) * 100 : 0;
      return {
        idx: i, month, year: Math.ceil(month / 12),
        isYearEnd: month % 12 === 0,
        value, growthPct,
        x: PAD + col * CW + R + xOff,
        y: PAD + row * CH + R,
      };
    });
  }, [totalMonths, monthlyValues]);

  const edges = useMemo(() => {
    const list: [NodeData, NodeData][] = [];
    for (let i = 0; i < nodes.length; i++) {
      if (i + 1 < nodes.length) list.push([nodes[i], nodes[i + 1]]);
      const below = i + COLS;
      if (below < nodes.length) list.push([nodes[i], nodes[below]]);
    }
    return list;
  }, [nodes]);

  const rows = Math.ceil(totalMonths / COLS);
  const svgW = COLS * CW + PAD * 2 + CW / 2;
  const svgH = rows * CH + PAD * 2;

  const maxValue = Math.max(...monthlyValues, 1);

  function nodeColor(n: NodeData) {
    if (n.isYearEnd) return '#D4AF37';
    const p = n.value / maxValue;
    const v = Math.round(180 - p * 120); // Greyscale from 180 to 60
    return `rgb(${v},${v},${v})`;
  }

  if (!hasRun) {
    return (
      <div className="max-w-5xl mx-auto w-full px-4 mb-12">
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center border border-black bg-transparent">
          <div className="text-5xl mb-4 font-oldenglish">✧</div>
          <h3 className="text-xl font-playfair font-bold text-foreground capitalize tracking-widest mb-2">Awaiting Simulation</h3>
          <p className="text-xs font-ibm italic text-dark-charcoal/70 max-w-sm">
            Configure your parameters above and execute. The results will manifest as a temporal infographic charting your financial trajectory.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full px-4 mb-12">
      <ResultsSummary results={{ ...results, timeHorizon }} />

      {(results.modelType === 'monte-carlo' || results.modelType === 'geometric-brownian-motion') ? (
        <>
          <StochasticPathLab results={results} timeHorizon={timeHorizon} />
          <ProbabilityDistribution results={results} />
        </>
      ) : results.modelType === 'portfolio-optimization' ? (
        <PortfolioOptimizationViz results={results} />
      ) : results.modelType === 'value-at-risk' ? (
        <VaRViz results={results} />
      ) : results.modelType === 'correlation-matrix' ? (
        <CorrelationMatrixViz results={results} />
      ) : results.modelType === 'volatility-lab' ? (
        <VolatilityLabViz results={results} />
      ) : (
        <>
          {/* Network header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mb-4 px-1 flex items-center justify-between border-b-news-thick pb-2"
          >
            <div>
              <p className="text-[10px] font-bold  tracking-[0.2em] font-inter text-dark-charcoal mb-1">Temporal Network Graph</p>
              <h3 className="text-2xl font-black font-playfair text-foreground capitalize">{totalMonths}-Node Infographic</h3>
            </div>
            <div className="flex gap-5 text-[10px] font-inter tracking-widest font-bold  text-dark-charcoal">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-black block border border-black" />Monthly
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-gold block border border-black" />Year-End
              </span>
            </div>
          </motion.div>

          {/* SVG Network */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
            className="border border-black overflow-auto bg-surface-muted p-2"
            style={{ maxHeight: 520, boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)' }}
          >
            <svg
              width="100%"
              viewBox={`0 0 ${svgW} ${svgH}`}
              style={{ display: 'block', minWidth: svgW > 900 ? svgW : undefined }}
            >
              {/* Strands */}
              {edges.map(([a, b], i) => (
                <motion.line
                  key={`e${i}`}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={a.isYearEnd || b.isYearEnd ? 'rgba(212,175,55,0.8)' : 'rgba(0,0,0,0.15)'}
                  strokeWidth={a.isYearEnd || b.isYearEnd ? 1.5 : 1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.1 }}
                />
              ))}

              {/* Nodes */}
              {nodes.map((n, i) => {
                const color = nodeColor(n);
                const isHovered = hovered?.node.idx === n.idx;
                return (
                  <motion.g
                    key={`n${i}`}
                    style={{ cursor: 'pointer', transformOrigin: `${n.x}px ${n.y}px` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', bounce: 0.45, duration: 0.2 }}
                    whileHover={{ scale: 1.55 }}
                    onMouseEnter={(e) => setHovered({ node: n, mx: e.clientX, my: e.clientY })}
                    onMouseMove={(e) => setHovered(h => h ? { ...h, mx: e.clientX, my: e.clientY } : null)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Outer ring for year-end */}
                    {n.isYearEnd && (
                      <circle cx={n.x} cy={n.y} r={R + 4}
                        fill="none" stroke="#000" strokeWidth={1} strokeDasharray="2 2" />
                    )}
                    {/* Main node */}
                    <circle cx={n.x} cy={n.y} r={R}
                      fill={color}
                      stroke="#1A1C20"
                      strokeWidth={n.isYearEnd ? 2 : 1}
                    />
                    {/* Label - only on year-end nodes */}
                    {n.isYearEnd && (
                      <text x={n.x} y={n.y + 0.5}
                        textAnchor="middle" dominantBaseline="middle"
                        fill="#1A1C20" fontSize={8} fontWeight={800} fontFamily="Inter,sans-serif"
                      >
                        Y{n.year}
                      </text>
                    )}
                  </motion.g>
                );
              })}
            </svg>
          </motion.div>
        </>
      )}

      {/* Tooltip portal */}
      <AnimatePresence>
        {hovered && (
          <NodeTooltip node={hovered.node} results={{ ...results, timeHorizon }} mx={hovered.mx} my={hovered.my} />
        )}
      </AnimatePresence>
    </div>
  );
}
