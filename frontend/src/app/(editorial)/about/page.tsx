'use client'

import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="pb-24 px-6 max-w-5xl mx-auto">
      <div className="border-b-news-thick pb-8 mb-12 text-center pt-8">
        <p className="text-[9px] font-label tracking-[0.25em] text-ink-soft uppercase font-medium mb-4">Our Mission</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tight mb-6">
          About Chronicle Finance
        </h1>
        <p className="font-body text-sm text-ink-soft max-w-2xl mx-auto leading-relaxed">
          Transforming complex financial concepts into interactive, understandable, and scalable analytical systems.
        </p>
      </div>

      <div className="max-w-3xl mx-auto editorial-panel p-10 md:p-14 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="md:border-r border-rule md:pr-8">
            <h3 className="font-display text-2xl font-bold text-ink mb-6">The Ecosystem</h3>
            <p className="font-body text-sm text-ink-soft leading-relaxed mb-6 text-justify">
              <span className="float-left font-display text-4xl font-bold mr-2 mt-1 text-ink leading-none">T</span>
              he Chronicle Finance is a simulation-driven financial intelligence platform focused on forecasting, valuation, probabilistic analysis, and AI-powered financial insights.
            </p>
            <p className="font-body text-sm text-ink-soft leading-relaxed text-justify">
              The system currently integrates institutional-grade models such as DCF, Compound Interest, and Monte Carlo simulations, with future expansion planned across advanced valuation, transaction, and risk intelligence systems.
            </p>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="border border-gold p-8 bg-navy">
              <h4 className="font-display text-xl font-bold text-paper mb-4">Evolving System</h4>
              <p className="font-body text-xs text-paper/80 leading-relaxed mb-8 italic">
                &ldquo;Every iteration pushes The Chronicle Finance closer toward becoming a modern financial intelligence ecosystem.&rdquo;
              </p>
              <div className="h-px w-full bg-gold/50 mb-6" />
              <div className="flex justify-between items-center text-[9px] text-gold font-label tracking-widest uppercase font-medium">
                <span>Current Phase</span>
                <span>Expansion (Vol. 1.0)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-1">
          <h3 className="font-display text-lg font-bold mb-4 border-b border-rule pb-2">The Builder</h3>
          <p className="font-body text-xs leading-relaxed text-justify italic">
            Hi, I&rsquo;m <span className="font-bold">Arnav Joshi</span>, the creator of The Chronicle Finance.
          </p>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <p className="font-body text-sm leading-relaxed text-justify">
            I started building this platform with a simple idea: financial models should not feel static when real business environments are constantly changing.
          </p>
          
          <div className="p-6 bg-paper-aged border-l-2 border-ink">
            <p className="font-body text-sm leading-relaxed text-justify">
              As a BBA student deeply interested in finance, analytics, business systems, and strategic decision-making, I wanted to create a platform that transforms complex financial concepts into interactive and understandable systems.
            </p>
          </div>

          <p className="font-body text-sm leading-relaxed text-justify">
            Every module, workflow, and assumption within the platform is carefully documented to build a scalable and transparent analytical environment.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-20 pt-8 border-t-news-double flex justify-center">
        <span className="text-[10px] font-label tracking-[0.5em] text-ink-soft uppercase font-medium">
          Chronicle Finance &middot; Analytical Integrity
        </span>
      </div>
    </div>
  );
}
