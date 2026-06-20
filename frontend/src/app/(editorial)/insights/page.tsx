'use client';

import Link from 'next/link';

export default function InsightsPage() {
  return (
    <div className="pb-24 px-6 max-w-5xl mx-auto">
      <div className="border-b-news-thick pb-8 mb-12 text-center pt-8">
        <p className="text-[9px] font-label tracking-[0.25em] text-ink-soft uppercase font-medium mb-4">AI Intelligence</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tight mb-6">
          Financial Insights
        </h1>
        <p className="font-body text-sm text-ink-soft max-w-2xl mx-auto leading-relaxed">
          Our AI analyzes your simulation data to provide institutional-grade perspective, uncovering non-obvious patterns in your financial trajectories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-4xl mx-auto">
        {[
          { num: '01', title: 'Market Volatility Analysis', desc: 'Analyze how volatility clustering and regime shifts impact portfolio trajectories across stressed and calm market conditions.' },
          { num: '02', title: 'Compounding Acceleration', desc: 'Examine the exponential dynamics of consistent capital deployment through varied compounding frequencies and contribution schedules.' },
          { num: '03', title: 'Terminal Value Projections', desc: 'Project future enterprise value using probabilistic modeling that accounts for drift, diffusion, and path-dependent outcomes.' },
          { num: '04', title: 'Risk-Adjusted Return Profile', desc: 'Evaluate the Sharpe-optimal frontier to understand the trade-off between risk exposure and expected portfolio performance.' },
        ].map((item) => (
          <Link key={item.num} href="/" className="editorial-panel p-8 group block hover:bg-paper-aged transition-colors">
            <span className="font-masthead text-3xl text-gold">{item.num}</span>
            <h3 className="font-display text-xl font-bold text-ink mt-4 mb-3 group-hover:text-ink-soft transition-colors">
              {item.title}
            </h3>
            <p className="font-body text-xs text-ink-soft leading-relaxed">
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
