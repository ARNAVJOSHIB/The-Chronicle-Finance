'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Monogram from './Monogram';

interface NavItem {
  label: string;
  path: string;
}

interface Chapter {
  numeral: string;
  title: string;
  items: NavItem[];
}

const chapters: Chapter[] = [
  {
    numeral: 'I',
    title: 'Simulation Engine',
    items: [
      { label: 'Geometric Brownian Motion', path: '/geometric-brownian-motion' },
      { label: 'Monte Carlo Laboratory', path: '/monte-carlo' },
      { label: 'Compound Growth', path: '/compound-interest' },
    ],
  },
  {
    numeral: 'II',
    title: 'Risk Intelligence',
    items: [
      { label: 'Portfolio Optimization', path: '/portfolio-optimization' },
      { label: 'Value at Risk', path: '/value-at-risk' },
      { label: 'Volatility Laboratory', path: '/volatility-lab' },
      { label: 'Correlation Matrix', path: '/correlation-matrix' },
    ],
  },
  {
    numeral: 'III',
    title: 'Valuation',
    items: [
      { label: 'Discounted Cash Flow', path: '/discounted-cash-flow' },
    ],
  },
  {
    numeral: 'IV',
    title: 'Research',
    items: [
      { label: 'Research Notes', path: '/research-notes' },
      { label: 'Experiments', path: '/experiments' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-72 flex-shrink-0 h-full flex flex-col bg-paper border-r border-rule relative z-10">
      {/* ── Masthead Wordmark ─────────────────────────────────────────── */}
      <div className="pt-8 pb-6 px-6 border-b border-rule-strong">
        <Link href="/" className="block group">
          <div className="flex items-center gap-3 mb-3">
            <Monogram size={28} />
            <span className="font-masthead text-2xl text-ink leading-none tracking-wide group-hover:opacity-80 transition-opacity duration-600">
              The Chronicle Finance
            </span>
          </div>
          <div className="h-[2px] bg-gold/30 mb-2" />
          <p className="font-label text-[8px] font-semibold tracking-[0.35em] text-ink-soft uppercase">
            Quantitative Laboratory
          </p>
        </Link>
      </div>

      {/* ── Table of Contents ──────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto py-6 no-scrollbar">
        <nav className="flex flex-col space-y-8 px-5">
          {chapters.map((chapter) => (
            <div key={chapter.title}>
              {/* Chapter Header — Playfair Display with gold rule */}
              <h3 className="font-display text-[12px] font-normal text-ink tracking-wide mb-1">
                <span className="text-gold mr-2">{chapter.numeral}.</span>
                {chapter.title.toUpperCase()}
              </h3>
              <div className="h-[1px] bg-rule-strong mb-3" />

              {/* Navigation Items — IBM Plex Serif */}
              <ul className="space-y-0.5">
                {chapter.items.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className={`group flex items-center py-1.5 px-3 text-[11px] font-body transition-colors duration-600 ${
                          active
                            ? 'text-ink font-semibold bg-gold/[0.06]'
                            : 'text-ink-soft hover:text-ink hover:bg-ink/[0.02]'
                        }`}
                      >
                        {/* Active gold tick */}
                        <span
                          className={`absolute left-0 w-[2px] bg-gold transition-all duration-600 ${
                            active ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                          }`}
                          style={{
                            position: 'relative',
                            width: active ? '6px' : '6px',
                            height: active ? '6px' : '0px',
                            backgroundColor: active ? 'var(--gold)' : 'transparent',
                            borderRadius: '1px',
                            marginRight: '8px',
                            flexShrink: 0,
                          }}
                        />
                        <span className="pl-0">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* ── Edition Footer ─────────────────────────────────────────────── */}
      <div className="p-6 border-t border-rule bg-paper-aged">
        <div className="flex flex-col gap-1.5">
          <p className="font-label text-[7px] font-semibold tracking-[0.25em] text-ink-soft uppercase">
            Quantitative Research Edition
          </p>
          <p className="font-label text-[7px] font-semibold tracking-[0.25em] text-ink-soft/50 uppercase">
            Issue 06 &middot; Vol. II
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-data-green animate-pulse" />
            <p className="font-label text-[7px] font-semibold tracking-[0.25em] text-data-green uppercase">
              Probabilistic Systems Active
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
