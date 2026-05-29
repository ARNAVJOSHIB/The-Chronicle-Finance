'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  const highlightModels = [
    {
      id: 'geometric-brownian-motion',
      title: 'Geometric Brownian Motion',
      type: 'Stochastic Simulation',
      desc: 'Simulate continuous-time stochastic processes to model asset prices, featuring drift, volatility, and confidence cones.',
    },
    {
      id: 'portfolio-optimization',
      title: 'Portfolio Optimization',
      type: 'Modern Portfolio Theory',
      desc: 'Compute the efficient frontier and isolate the maximum Sharpe ratio using computational variance minimization.',
    },
    {
      id: 'value-at-risk',
      title: 'Value at Risk (VaR)',
      type: 'Risk Intelligence',
      desc: 'Analyze portfolio tail risk and downside exposure across parametric, historical, and Monte Carlo frameworks.',
    },
    {
      id: 'correlation-matrix',
      title: 'Correlation Matrix',
      type: 'Regime Analysis',
      desc: 'Visualize dynamic asset relationships across calm and stressed market regimes.',
    },
    {
      id: 'volatility-lab',
      title: 'Volatility Laboratory',
      type: 'Stochastic Volatility',
      desc: 'Model volatility clustering and stochastic regime shifts over continuous time horizons.',
    },
    {
      id: 'monte-carlo',
      title: 'Monte Carlo Factory',
      type: 'Probabilistic Forecasting',
      desc: 'Run millions of simulated pathways to establish robust probability distributions of future enterprise value.',
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-12 flex flex-col pb-32">
      {/* Editorial Header */}
      <div className="border-b border-ink/20 pb-10 mt-8 mb-12 relative">
        <h1 className="font-display text-5xl font-bold text-ink tracking-tight leading-tight">
          Quantitative Research <br />
          <span className="italic font-display text-ink/70">&</span> Probabilistic Intelligence
        </h1>
        
        {!user && (
          <div className="mt-10 mb-2">
            <Link href="/auth" className="inline-block editorial-button px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase shadow-lg hover:shadow-xl transition-all">
              Sign in to access gateway
            </Link>
          </div>
        )}

        <div className="flex gap-8 mt-10 border-t border-ink/10 pt-4">
          <div>
            <span className="block text-[8px] font-ui tracking-[0.2em] font-bold text-ink/40 mb-1">Status</span>
            <span className="text-[10px] font-ui text-data-green font-semibold">Systems Online</span>
          </div>
          <div>
            <span className="block text-[8px] font-ui tracking-[0.2em] font-bold text-ink/40 mb-1">Active Edition</span>
            <span className="text-[10px] font-ui text-ink font-semibold">Volume II. Issue 06</span>
          </div>
          <div>
            <span className="block text-[8px] font-ui tracking-[0.2em] font-bold text-ink/40 mb-1">Last Sync</span>
            <span className="text-[10px] font-ui text-ink font-semibold" suppressHydrationWarning>{new Date().toISOString().split('T')[0]}</span>
          </div>
        </div>
        
        {/* Subtle decorative element */}
        <div className="absolute right-0 bottom-10 w-32 h-32 opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M50 0 L50 100 M0 50 L100 50" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-[11px] font-heading tracking-[0.1em] font-bold text-ink/60 mb-6">Featured research environments</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlightModels.map((model, i) => (
            <Link href={`/${model.id}`} key={model.id}>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                className="group relative h-full bg-parchment border border-ink/10 p-8 transition-all duration-500 hover:bg-surface-muted hover:border-ink/20 hover:shadow-[0_10px_30px_rgba(11,19,32,0.03),_0_1px_4px_rgba(11,19,32,0.02)] cursor-pointer overflow-hidden"
              >
                {/* Hover Illuminator */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                
                <p className="text-[9px] font-ui tracking-[0.2em] font-bold text-ledger-gold/80 mb-3">{model.type}</p>
                <h4 className="text-xl font-display font-bold text-ink mb-4 group-hover:text-ink/80 transition-colors duration-300">{model.title}</h4>
                <p className="text-xs font-ui text-ink/70 leading-relaxed max-w-sm">{model.desc}</p>
                
                {/* Arrow indicator */}
                <div className="absolute bottom-8 right-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-ledger-gold">
                  &rarr;
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
