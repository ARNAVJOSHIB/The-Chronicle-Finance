'use client';

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import Monogram from './Monogram';

export default function Masthead() {
  const { user, signOut } = useAuth();
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="w-full bg-paper">
      {/* Dateline row */}
      <div className="max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between">
        <span
          className="text-[10px] font-label tracking-[0.15em] text-ink-soft font-medium uppercase"
          suppressHydrationWarning
        >
          {currentDate}
        </span>
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-label tracking-[0.15em] text-ink-soft uppercase">
                {user.email?.split('@')[0]}
              </span>
              <button
                onClick={signOut}
                className="text-[9px] font-label tracking-[0.15em] text-ink-soft hover:text-ink transition-colors uppercase"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="text-[9px] font-label tracking-[0.15em] text-ink-soft hover:text-ink transition-colors uppercase"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>

      {/* Masthead — double rule + wordmark */}
      <div className="max-w-6xl mx-auto px-6 py-6 border-y-news-double">
        <div className="flex items-center justify-center gap-5">
          <Link href="/" className="flex items-center gap-4 group">
            <Monogram size={48} />
            <div className="text-center">
              <h1 className="font-masthead text-4xl md:text-5xl text-ink leading-none tracking-wide group-hover:opacity-80 transition-opacity">
                The Chronicle Finance
              </h1>
              <p className="text-[8px] font-label tracking-[0.3em] text-ink-soft mt-2 uppercase font-medium">
                Quantitative Research &amp; Probabilistic Intelligence
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Edition / Navigation row */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between border-b border-rule">
        <span className="text-[9px] font-label tracking-[0.2em] text-ink-soft uppercase font-medium">
          Vol. II &middot; Issue 06
        </span>
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-[10px] font-label tracking-[0.15em] text-ink-soft hover:text-ink transition-colors uppercase font-medium">
            Front Page
          </Link>
          <Link href="/insights" className="text-[10px] font-label tracking-[0.15em] text-ink-soft hover:text-ink transition-colors uppercase font-medium">
            Insights
          </Link>
          <Link href="/archive" className="text-[10px] font-label tracking-[0.15em] text-ink-soft hover:text-ink transition-colors uppercase font-medium">
            Archive
          </Link>
          <Link href="/about" className="text-[10px] font-label tracking-[0.15em] text-ink-soft hover:text-ink transition-colors uppercase font-medium">
            About
          </Link>
        </nav>
        <span className="text-[9px] font-label tracking-[0.15em] text-ink-soft uppercase font-medium">
          Est. 2024
        </span>
      </div>
    </header>
  );
}
