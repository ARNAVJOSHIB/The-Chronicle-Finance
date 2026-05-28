"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).toUpperCase();

  return (
    <header className="w-full pt-8 pb-4 px-6 max-w-7xl mx-auto bg-transparent">
      {/* Top utility row */}
      <div className="flex justify-between items-end mb-4 border-b border-black pb-2 px-2">
        <div className="text-[10px] font-inter tracking-[0.15em] uppercase text-dark-charcoal font-bold">
          VOL. CXLIV . . . No. 1
        </div>
        
        <div className="hidden md:flex gap-6 text-[10px] font-inter tracking-[0.1em] uppercase font-bold">
          <Link href="/" className="hover:underline">Simulations</Link>
          <Link href="/insights" className="hover:underline">Insights</Link>
          <Link href="/archive" className="hover:underline">Archive</Link>
          <Link href="/about" className="hover:underline">About</Link>
        </div>
        
        <div className="text-[10px] font-inter tracking-[0.15em] uppercase text-dark-charcoal font-bold">
          EST. 2024
        </div>
      </div>

      {/* Main Masthead Logo & Title */}
      <div className="flex flex-col justify-center items-center py-4">
        <div className="mb-4 relative">
          <div className="absolute -inset-1 bg-black rounded-full opacity-10 blur-sm"></div>
          <Image 
            src="/LOGO.jpeg" 
            alt="Chronicle Finance Logo" 
            width={100} 
            height={100} 
            className="rounded-full border border-black/20 shadow-xl relative z-10"
          />
        </div>
        <h1 
          className="text-6xl md:text-8xl font-oldenglish text-foreground text-center"
          style={{ 
            lineHeight: 1,
            letterSpacing: '0.02em',
            textShadow: '1px 1px 0px rgba(0,0,0,0.1)'
          }}
        >
          The Chronicle Finance
        </h1>
      </div>

      {/* Date and Edition Row with Double Rules */}
      <div className="mt-6 flex justify-center items-center border-y-news-double py-2">
        <span className="text-[11px] font-libre tracking-[0.2em] font-bold text-dark-charcoal">
          {currentDate}
        </span>
      </div>
    </header>
  );
}