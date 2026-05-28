'use client';

import Link from 'next/link';

export default function Sidebar() {
  const pillars = [
    {
      group: 'I. Simulation Engine',
      items: [
        { label: 'Geometric Brownian Motion', path: '/geometric-brownian-motion' },
        { label: 'Monte Carlo Laboratory', path: '/monte-carlo' },
        { label: 'Volatility Laboratory', path: '/volatility-lab' },
      ]
    },
    {
      group: 'II. Risk Intelligence',
      items: [
        { label: 'Portfolio Risk Dashboard', path: '/value-at-risk' },
        { label: 'Stress Testing', path: '/stress-testing' },
        { label: 'Correlation Intelligence', path: '/correlation-matrix' },
      ]
    },
    {
      group: 'III. Valuation Systems',
      items: [
        { label: 'Discounted Cash Flow', path: '/discounted-cash-flow' },
        { label: 'Compound Growth', path: '/compound-interest' },
      ]
    },
    {
      group: 'IV. Market Systems',
      items: [
        { label: 'Portfolio Optimization', path: '/portfolio-optimization' },
      ]
    }
  ];

  return (
    <aside className="w-72 flex-shrink-0 border-r border-black h-full flex flex-col bg-ivory relative z-10 shadow-[4px_0_12px_rgba(0,0,0,0.02)]">
      {/* Masthead Area */}
      <div className="pt-10 pb-8 px-8 border-b border-black">
        <Link href="/">
          <h1 className="font-oldenglish text-3xl tracking-widest text-dark-charcoal leading-none hover:opacity-80 transition-opacity cursor-pointer">The Chronicle</h1>
        </Link>
        <p className="text-[9px] font-inter uppercase tracking-[0.3em] mt-3 font-bold text-dark-charcoal/50">
          Quantitative Lab
        </p>
      </div>
      
      {/* Navigation Rail */}
      <div className="flex-1 overflow-y-auto py-8 no-scrollbar">
        <nav className="flex flex-col space-y-10 px-4">
          {pillars.map((pillar) => (
            <div key={pillar.group} className="px-4">
              {/* Pillar Header (Tiny Serif Caps, Muted Gold) */}
              <h3 className="text-[10px] font-libre font-bold uppercase tracking-[0.25em] text-gold/80 mb-4 pb-2 border-b border-black/20">
                {pillar.group}
              </h3>
              
              {/* Navigation Items (Clean Sans Serif, Spacing, Soft Hover) */}
              <ul className="space-y-1 relative">
                {pillar.items.map((item) => (
                  <li key={item.label}>
                    <Link 
                      href={item.path} 
                      className="group relative flex items-center py-2 px-3 text-[11px] font-inter text-dark-charcoal/60 transition-all duration-300 hover:text-dark-charcoal hover:bg-dark-charcoal/[0.03] rounded-sm"
                    >
                      {/* Smooth Left Glow Line */}
                      <span className="absolute left-0 top-[20%] bottom-[20%] w-[2px] bg-gold/80 scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300 ease-out" />
                      
                      {/* Label with animated underline effect */}
                      <span className="relative z-10 font-medium pl-1 tracking-wide">
                        {item.label}
                        <span className="absolute left-1 right-0 bottom-0 h-[1px] bg-dark-charcoal/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      
      {/* Bottom Metadata Area */}
      <div className="p-6 border-t border-black bg-ivory">
        <div className="flex flex-col gap-1 text-[8px] font-inter uppercase tracking-[0.2em] text-dark-charcoal/40 font-bold leading-relaxed">
          <p>Quantitative Research Edition</p>
          <p>Issue 06 &middot; Vol. II</p>
          <p className="text-gold/70 mt-1">Probabilistic Systems Active</p>
        </div>
      </div>
    </aside>
  );
}
