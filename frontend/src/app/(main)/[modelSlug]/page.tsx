'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSimulation } from '../../context/SimulationContext';
import DynamicInputPanel from '../../components/DynamicInputPanel';
import TimeSelector from '../../components/TimeSelector';
import SimulationVisualization from '../../components/SimulationVisualization';
import AIInsightPanel from '../../components/AIInsightPanel';

export default function ModelPage() {
  const params = useParams();
  const { setSelectedModel, setResults, setHasRun, selectedModel } = useSimulation();
  
  const slug = params.modelSlug as string;

  useEffect(() => {
    if (slug && slug !== selectedModel) {
      setSelectedModel(slug);
      setResults(null);
      setHasRun(false);
    }
  }, [slug, setSelectedModel, setResults, setHasRun, selectedModel]);

  const modelLabels: Record<string, { title: string, subtitle: string }> = {
    'geometric-brownian-motion': { title: 'Geometric Brownian Motion', subtitle: 'Stochastic Price Path Simulation Environment' },
    'monte-carlo': { title: 'Monte Carlo Laboratory', subtitle: 'Probabilistic Forecasting & Variance Analysis' },
    'volatility-lab': { title: 'Volatility Laboratory', subtitle: 'Stochastic Regime Shift Analysis' },
    'value-at-risk': { title: 'Value at Risk (VaR)', subtitle: 'Portfolio Risk Intelligence & Tail Exposure' },
    'correlation-matrix': { title: 'Correlation Matrix', subtitle: 'Regime-Based Dependency Analysis' },
    'discounted-cash-flow': { title: 'Discounted Cash Flow', subtitle: 'Intrinsic Valuation & Perpetuity Modeling' },
    'compound-interest': { title: 'Compound Interest', subtitle: 'Long-Term Capital Accumulation System' },
    'portfolio-optimization': { title: 'Portfolio Optimization', subtitle: 'Efficient Frontier & Variance Minimization' },
  };

  const meta = modelLabels[slug] || { title: 'Quantitative Laboratory', subtitle: 'Analytical Environment' };

  return (
    <div className="w-full max-w-4xl mx-auto px-8 flex flex-col gap-10 pb-24">
      
      {/* Research Header */}
      <div className="pt-6">
        <p className="text-[9px] font-label tracking-[0.25em] text-ink-soft uppercase font-medium mb-2">
          Quantitative Research
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-ink leading-tight">
          {meta.title}
        </h1>
        <p className="font-body text-xs text-ink-soft mt-3">
          {meta.subtitle}
        </p>
        <div className="flex gap-8 mt-6 pt-4 border-t border-rule">
          <div>
            <span className="block text-[8px] font-label tracking-[0.2em] text-ink-soft mb-1 uppercase font-medium">Edition</span>
            <span className="text-[10px] font-body text-ink">Quantitative Research</span>
          </div>
          <div>
            <span className="block text-[8px] font-label tracking-[0.2em] text-ink-soft mb-1 uppercase font-medium">System State</span>
            <span className="text-[10px] font-body font-medium" style={{ color: 'var(--data-green)' }}>Probabilistic Engine Active</span>
          </div>
          <div>
            <span className="block text-[8px] font-label tracking-[0.2em] text-ink-soft mb-1 uppercase font-medium">Last Sync</span>
            <span className="text-[10px] font-body text-ink" suppressHydrationWarning>
              {new Date().toLocaleTimeString('en-US', { hour12: false, timeZoneName: 'short' })}
            </span>
          </div>
        </div>
      </div>

      {/* Simulation Visualization — THE HERO (60-70% of screen) */}
      <section className="w-full">
        <SimulationVisualization />
      </section>

      {/* Research Parameters — below the graph */}
      <section className="w-full">
        <TimeSelector />
        <DynamicInputPanel />
      </section>

      {/* AI Editorial Insight */}
      <section className="w-full">
        <AIInsightPanel />
      </section>
    </div>
  );
}
