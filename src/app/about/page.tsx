"use client";

import Navbar from '../components/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <div className="pt-4 pb-24 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b-news-thick pb-6 mb-10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] font-inter text-dark-charcoal mb-4">Our Mission</p>
          <h1 className="text-5xl md:text-7xl font-black font-playfair text-foreground tracking-tight mb-6">
            About Chronicle Finance
          </h1>
          <p className="text-sm md:text-base text-dark-charcoal/80 max-w-2xl mx-auto font-libre italic">
            Transforming complex financial concepts into interactive, understandable, and scalable analytical systems.
          </p>
        </div>

        {/* The Ecosystem Section */}
        <div className="max-w-4xl mx-auto editorial-panel p-10 md:p-16 border-y-news-double mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="md:border-r border-black md:pr-8">
              <h3 className="text-3xl font-black font-playfair text-foreground uppercase mb-6 tracking-tight">The Ecosystem</h3>
              <p className="text-sm text-dark-charcoal/80 font-ibm leading-relaxed mb-6 text-justify">
                <span className="float-left text-4xl leading-none font-playfair font-black mr-2 mt-1">T</span>
                he Chronicle Finance is a simulation-driven financial intelligence platform focused on forecasting, valuation, probabilistic analysis, and AI-powered financial insights. 
              </p>
              <p className="text-sm text-dark-charcoal/80 font-ibm leading-relaxed text-justify">
                The system currently integrates institutional-grade models such as DCF, Compound Interest, and Monte Carlo simulations, with future expansion planned across advanced valuation, transaction, and risk intelligence systems.
              </p>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="border border-gold p-8 bg-[#1A1C20] shadow-[4px_4px_0px_rgba(212,175,55,1)]">
                <h4 className="text-gold font-black font-playfair text-2xl uppercase mb-4">Evolving System</h4>
                <p className="text-[#F6F4F0]/80 text-xs font-ibm leading-relaxed mb-8 italic">
                  "Every iteration pushes The Chronicle Finance closer toward becoming a modern financial intelligence ecosystem."
                </p>
                <div className="h-px w-full bg-gold/50 mb-6" />
                <div className="flex justify-between items-center text-[9px] text-gold font-bold tracking-widest uppercase font-inter">
                  <span>Current Phase</span>
                  <span>Expansion (Vol. 1.0)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About The Builder Section */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-1">
            <h3 className="text-lg font-playfair font-black mb-4 uppercase tracking-wider border-b border-black pb-2">The Builder</h3>
            <p className="text-xs font-ibm leading-relaxed text-justify italic">
              Hi, I’m <span className="font-bold">Arnav Joshi</span>, the creator of The Chronicle Finance.
            </p>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <p className="text-sm font-libre leading-relaxed text-justify">
              I started building this platform with a simple idea: financial models should not feel static when real business environments are constantly changing.
            </p>
            
            <div className="p-6 bg-dark-charcoal/5 border-l-4 border-black">
              <p className="text-sm font-ibm leading-relaxed text-justify">
                As a BBA student deeply interested in finance, analytics, business systems, and strategic decision-making, I wanted to create a platform that transforms complex financial concepts into interactive and understandable systems.
              </p>
            </div>

            <p className="text-sm font-ibm leading-relaxed text-justify">
              Every module, workflow, and assumption within the platform is carefully documented to build a scalable and transparent analytical environment.
            </p>
          </div>
        </div>

        {/* Footer Rule */}
        <div className="max-w-4xl mx-auto mt-20 pt-8 border-t-news-double flex justify-center">
          <span className="text-[10px] font-inter font-bold uppercase tracking-[0.5em] text-dark-charcoal/40">
            Chronicle Finance . Analytical Integrity
          </span>
        </div>
      </div>
    </div>
  );
}
