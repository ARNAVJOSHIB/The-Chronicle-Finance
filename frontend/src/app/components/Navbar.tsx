"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="w-full pt-8 pb-4 px-6 max-w-7xl mx-auto bg-transparent">
      {/* Top utility row */}
      <div className="flex justify-between items-end mb-4 border-b border-ink pb-2 px-2">
        <div className="text-[10px] font-ui tracking-[0.15em]  text-ink font-bold">
          Financial models, told like news.
        </div>
        
        <div className="hidden md:flex gap-6 text-[10px] font-ui tracking-[0.1em]  font-bold text-ink">
          <Link href="/" className="hover:underline">Simulations</Link>
          <Link href="/insights" className="hover:underline">Insights</Link>
          <Link href="/archive" className="hover:underline">Archive</Link>
          <Link href="/about" className="hover:underline">About</Link>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-[10px] font-ui tracking-[0.15em]  text-ink font-bold hidden sm:block">
            Est. 2024
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-ui  tracking-[0.2em] text-ink/70">
                {user.email?.split('@')[0]}
              </span>
              <button
                onClick={signOut}
                className="text-[9px] font-ui  tracking-[0.2em] text-ink/70 hover:text-ink transition-colors font-bold"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="editorial-button px-6 py-2 text-[10px] font-bold tracking-[0.2em] uppercase shadow-sm"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>

      {/* Main Masthead Logo & Title */}
      <div className="flex flex-col justify-center items-center py-4">
        <div className="mb-4 relative">
          <div className="absolute -inset-1 bg-ink rounded-full opacity-10 blur-sm"></div>
          <Image 
            src="/LOGO.jpeg" 
            alt="Chronicle Finance Logo" 
            width={100} 
            height={100} 
            className="rounded-full border border-ink/20 shadow-xl relative z-10"
          />
        </div>
        <h1 
          className="text-6xl md:text-8xl font-display text-ink text-center"
          style={{ 
            lineHeight: 1,
            letterSpacing: '0.02em',
            textShadow: '1px 1px 0px rgba(11,19,32,0.1)'
          }}
        >
          The Chronicle Finance
        </h1>
        <div className="mt-4 flex gap-4 text-[10px] font-ui tracking-[0.2em]  text-steel font-bold">
          <span>Rigorous</span>
          <span>•</span>
          <span>Intelligent</span>
          <span>•</span>
          <span>Editorial</span>
          <span>•</span>
          <span>Cinematic</span>
          <span>•</span>
          <span>Honest</span>
        </div>
      </div>

      {/* Date and Edition Row with Double Rules */}
      <div className="mt-6 flex justify-center items-center border-y-news-double py-2 border-ink">
        <span className="text-[11px] font-ui tracking-[0.2em] font-bold text-ink" suppressHydrationWarning>
          {currentDate}
        </span>
      </div>
    </header>
  );
}
