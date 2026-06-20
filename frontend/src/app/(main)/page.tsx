'use client';

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import Monogram from '@/app/components/Monogram';

export default function Home() {
  const { user } = useAuth();

  const featuredModel = {
    id: 'geometric-brownian-motion',
    title: 'Volatility Expansion in Technology Equities',
    subtitle: 'Stochastic simulation reveals widening probability cones across large-cap technology portfolios under elevated drift assumptions.',
    tag: 'Featured Research',
  };

  const models = [
    {
      id: 'geometric-brownian-motion',
      title: 'Geometric Brownian Motion',
      section: 'Simulation Engine',
      desc: 'Simulate continuous-time stochastic processes to model asset prices, featuring drift, volatility, and confidence cones.',
    },
    {
      id: 'portfolio-optimization',
      title: 'Portfolio Optimization',
      section: 'Risk Intelligence',
      desc: 'Compute the efficient frontier and isolate the maximum Sharpe ratio using computational variance minimization.',
    },
    {
      id: 'value-at-risk',
      title: 'Value at Risk (VaR)',
      section: 'Risk Intelligence',
      desc: 'Analyze portfolio tail risk and downside exposure across parametric, historical, and Monte Carlo frameworks.',
    },
    {
      id: 'correlation-matrix',
      title: 'Correlation Matrix',
      section: 'Risk Intelligence',
      desc: 'Visualize dynamic asset relationships across calm and stressed market regimes.',
    },
    {
      id: 'volatility-lab',
      title: 'Volatility Laboratory',
      section: 'Simulation Engine',
      desc: 'Model volatility clustering and stochastic regime shifts over continuous time horizons.',
    },
    {
      id: 'monte-carlo',
      title: 'Monte Carlo Laboratory',
      section: 'Simulation Engine',
      desc: 'Run millions of simulated pathways to establish robust probability distributions of future enterprise value.',
    },
    {
      id: 'discounted-cash-flow',
      title: 'Discounted Cash Flow',
      section: 'Valuation',
      desc: 'Intrinsic valuation through perpetuity modeling, discount rate sensitivity, and terminal growth analysis.',
    },
    {
      id: 'compound-interest',
      title: 'Compound Interest',
      section: 'Valuation',
      desc: 'Long-term capital accumulation modeling with compounding frequency, inflation adjustment, and periodic contributions.',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-8 pb-24">

      {/* ── Dateline bar ── */}
      <div className="flex items-center justify-between py-4 border-b-news-thick mb-0">
        <span className="text-[9px] font-label tracking-[0.2em] text-ink-soft uppercase font-medium">
          The Chronicle Finance
        </span>
        <div className="flex items-center gap-6">
          <span className="text-[9px] font-label tracking-[0.2em] text-ink-soft uppercase font-medium">
            Vol. II &middot; Issue 06
          </span>
          <span className="text-[9px] font-label tracking-[0.2em] font-medium uppercase" style={{ color: 'var(--data-green)' }}>
            Systems Online
          </span>
        </div>
      </div>

      {/* ── Featured Research ── */}
      <section className="py-10 border-b border-rule">
        <Link href={`/${featuredModel.id}`} className="group block">
          <p className="text-[9px] font-label tracking-[0.25em] text-gold uppercase font-medium mb-4">
            {featuredModel.tag}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-4 group-hover:text-ink-soft transition-colors">
            {featuredModel.title}
          </h2>
          <p className="font-body text-sm text-ink-soft leading-relaxed max-w-2xl">
            {featuredModel.subtitle}
          </p>
          <p className="text-[10px] font-label tracking-[0.15em] text-gold mt-6 uppercase font-medium group-hover:tracking-[0.2em] transition-all">
            Read analysis &rarr;
          </p>
        </Link>
      </section>

      {/* ── Market Regime ── */}
      <section className="py-6 border-b border-rule">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-label tracking-[0.25em] text-ink-soft uppercase font-medium mb-1">
              Market Regime
            </p>
            <p className="font-display text-xl text-ink">Neutral</p>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ background: 'var(--data-green)', opacity: 0.4 }} />
              <span className="text-[9px] font-label tracking-[0.15em] text-ink-soft uppercase font-medium">Bullish</span>
            </div>
            <div className="text-center">
              <div className="w-2 h-2 rounded-full mx-auto mb-1 bg-gold" />
              <span className="text-[9px] font-label tracking-[0.15em] text-ink uppercase font-medium">Neutral</span>
            </div>
            <div className="text-center">
              <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ background: 'var(--data-red)', opacity: 0.4 }} />
              <span className="text-[9px] font-label tracking-[0.15em] text-ink-soft uppercase font-medium">Risk-Off</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sign-in prompt (for unauthenticated users) ── */}
      {!user && (
        <section className="py-6 border-b border-rule">
          <Link href="/auth" className="editorial-button inline-block px-8 py-3">
            Sign in to access research gateway
          </Link>
        </section>
      )}

      {/* ── Active Models ── */}
      <section className="py-10 border-b border-rule">
        <h3 className="text-[9px] font-label tracking-[0.25em] text-ink-soft uppercase font-medium mb-8">
          Active Models &amp; Laboratories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {models.map((model) => (
            <Link
              key={model.id}
              href={`/${model.id}`}
              className="group block p-6 border border-rule hover:bg-paper-aged transition-colors"
            >
              <p className="text-[8px] font-label tracking-[0.25em] text-gold uppercase font-medium mb-2">
                {model.section}
              </p>
              <h4 className="font-display text-lg font-bold text-ink mb-3 group-hover:text-ink-soft transition-colors">
                {model.title}
              </h4>
              <p className="font-body text-xs text-ink-soft leading-relaxed">
                {model.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Research Notes teaser ── */}
      <section className="py-10">
        <h3 className="text-[9px] font-label tracking-[0.25em] text-ink-soft uppercase font-medium mb-6">
          Research Journal — Latest Observations
        </h3>
        <div className="space-y-6">
          {[
            { time: '13:42', note: 'Volatility increased beyond historical average across technology sector simulations.' },
            { time: '13:45', note: 'Correlation breakdown detected between asset classes in stressed regime analysis.' },
            { time: '13:49', note: 'Simulation rerun with higher drift assumptions. Probability cone widened by 12%.' },
          ].map((entry) => (
            <div key={entry.time} className="flex gap-4 items-start">
              <span className="text-[9px] font-label tracking-[0.15em] text-ink-soft uppercase font-medium mt-0.5 shrink-0 w-10">
                {entry.time}
              </span>
              <div className="w-px h-4 bg-rule mt-1 shrink-0" />
              <p className="font-body text-xs text-ink leading-relaxed">
                {entry.note}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
