'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSimulation } from '../context/SimulationContext';
import DynamicInputPanel from '../components/DynamicInputPanel';
import TimeSelector from '../components/TimeSelector';
import SimulationVisualization from '../components/SimulationVisualization';
import AIInsightPanel from '../components/AIInsightPanel';

export default function ModelPage() {
  const params = useParams();
  const { setSelectedModel, setResults, setHasRun, selectedModel } = useSimulation();
  
  const slug = params.modelSlug as string;

  useEffect(() => {
    if (slug && slug !== selectedModel) {
      setSelectedModel(slug);
      // Reset state when switching models to prevent old data showing up
      setResults(null);
      setHasRun(false);
    }
  }, [slug, setSelectedModel, setResults, setHasRun, selectedModel]);

  const modelLabels: Record<string, { title: string, subtitle: string }> = {
    'geometric-brownian-motion': { title: 'Geometric Brownian Motion', subtitle: 'Stochastic Price Path Simulation Environment' },
    'monte-carlo': { title: 'Monte Carlo Factory', subtitle: 'Probabilistic Forecasting & Variance Analysis' },
    'volatility-lab': { title: 'Volatility Laboratory', subtitle: 'Stochastic Regime Shift Analysis' },
    'value-at-risk': { title: 'Value at Risk (VaR)', subtitle: 'Portfolio Risk Intelligence & Tail Exposure' },
    'stress-testing': { title: 'Stress Testing', subtitle: 'Adverse Market Scenario Simulation' },
    'correlation-matrix': { title: 'Correlation Intelligence', subtitle: 'Regime-Based Dependency Analysis' },
    'discounted-cash-flow': { title: 'Discounted Cash Flow', subtitle: 'Intrinsic Valuation & Perpetuity Modeling' },
    'compound-interest': { title: 'Compound Growth', subtitle: 'Long-Term Capital Accumulation System' },
    'portfolio-optimization': { title: 'Portfolio Optimization', subtitle: 'Efficient Frontier & Variance Minimization' },
  };

  const meta = modelLabels[slug] || { title: 'Quantitative Lab', subtitle: 'Analytical Environment' };

  return (
    <div className="w-full max-w-5xl mx-auto p-12 flex flex-col gap-12 pb-32">
      
      {/* 1. HERO RESEARCH HEADER */}
      <div className="border-b border-border-soft/80 pb-10 mt-6 relative">
        <h1 className="font-libre text-[2.5rem] font-bold text-dark-charcoal tracking-tight uppercase leading-none">{meta.title}</h1>
        <h2 className="font-inter text-[10px] font-bold uppercase tracking-[0.3em] text-dark-charcoal/60 mt-4">{meta.subtitle}</h2>
        
        <div className="flex gap-10 mt-10 border-t border-border-soft/40 pt-5">
          <div>
            <span className="block text-[8px] font-inter uppercase tracking-[0.2em] font-bold text-dark-charcoal/40 mb-1.5">Edition</span>
            <span className="text-[10px] font-ibm uppercase text-dark-charcoal font-semibold">Quantitative Research</span>
          </div>
          <div>
            <span className="block text-[8px] font-inter uppercase tracking-[0.2em] font-bold text-dark-charcoal/40 mb-1.5">System State</span>
            <span className="text-[10px] font-ibm uppercase text-emerald-pulse font-semibold">Probabilistic Engine Active</span>
          </div>
          <div>
            <span className="block text-[8px] font-inter uppercase tracking-[0.2em] font-bold text-dark-charcoal/40 mb-1.5">Last Sync</span>
            <span className="text-[10px] font-ibm uppercase text-dark-charcoal font-semibold">{new Date().toLocaleTimeString('en-US', { hour12: false, timeZoneName: 'short' })}</span>
          </div>
        </div>
      </div>

      {/* 4. PARAMETER CONTROL SYSTEM */}
      <section className="w-full -mt-4">
        <TimeSelector />
        <DynamicInputPanel />
      </section>

      {/* 2 & 5. MAIN SIMULATION ENVIRONMENT & STATISTICAL OUTPUT */}
      <section className="w-full">
        <SimulationVisualization />
      </section>

      <section className="w-full">
        <AIInsightPanel />
      </section>

    </div>
  );
}
