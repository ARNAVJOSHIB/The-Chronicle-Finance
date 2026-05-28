"use client";

import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="w-full px-6 max-w-7xl mx-auto mt-4 mb-10">
      <div className="border-b-news-thick pb-6 mb-6 text-center">
        <div className="flex justify-center mb-6">
          <Image 
            src="/LOGO.jpeg" 
            alt="Logo" 
            width={40} 
            height={40} 
            className="rounded-full grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100"
          />
        </div>
        <h2 className="text-[10px] uppercase tracking-[0.3em] font-inter text-dark-charcoal font-bold mb-4">
          Financial Simulation Platform
        </h2>
        <h1 className="text-5xl md:text-7xl font-black font-playfair text-foreground mb-4 leading-[1.1] tracking-tight">
          Where Financial Models <br className="hidden md:block" /> Become Living Systems
        </h1>
        <p className="text-sm md:text-base font-libre text-dark-charcoal/80 max-w-3xl mx-auto italic">
          Run institutional-grade simulations with AI-powered insights. Compound growth, DCF valuation, and Monte Carlo risk analysis combined into a single editorial interface.
        </p>
      </div>

      {/* Multi-column front page layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b-news-double">
        <div className="md:col-span-1 md:pr-6 md:border-r border-black/20">
          <h3 className="text-lg font-playfair font-black mb-3 uppercase tracking-wider">The Market Evolves</h3>
          <p className="text-xs font-ibm leading-relaxed text-justify">
            <span className="float-left text-4xl leading-none font-playfair font-black mr-2 mt-1">E</span>
            very projection contains inherent risk and uncertainty. Markets evolve not through static numbers, but through dynamic assumptions. The Chronicle Finance platform offers a lens into these possible futures, allowing analysts to visualize and stress-test their fundamental convictions against time and volatility.
          </p>
        </div>
        <div className="md:col-span-1 md:pr-6 md:border-r border-black/20">
           <h3 className="text-lg font-playfair font-black mb-3 uppercase tracking-wider">Three Core Models</h3>
           <p className="text-xs font-ibm leading-relaxed text-justify mb-4">
             Explore the compounding effects of consistent capital deployment, value future cash flows with our strict DCF methodology, or simulate thousands of market realities via Monte Carlo. 
           </p>
           <div className="w-full h-px bg-black my-4"></div>
           <p className="text-[10px] uppercase font-inter tracking-widest font-bold text-center">
             Powered by AI Insights
           </p>
        </div>
        <div className="md:col-span-1">
          <h3 className="text-lg font-playfair font-black mb-3 uppercase tracking-wider">Action Unwillingly</h3>
          <p className="text-xs font-ibm leading-relaxed text-justify">
            "You should take no action unwillingly or without a purpose." - Our simulations are designed to inform, not to dictate. Models reveal possibilities, not certainty. The interface below serves as your financial command center for navigating these probabilities with absolute precision.
          </p>
        </div>
      </div>
    </div>
  );
}