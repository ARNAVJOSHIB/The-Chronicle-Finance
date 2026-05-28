"use client";

import Navbar from '../components/Navbar';

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <div className="pt-4 pb-24 px-6 max-w-7xl mx-auto">
        <div className="border-b-news-thick pb-6 mb-10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] font-inter text-dark-charcoal mb-4">AI Intelligence</p>
          <h1 className="text-5xl md:text-7xl font-black font-playfair text-foreground tracking-tight mb-6">
            Financial Insights
          </h1>
          <p className="text-sm md:text-base text-dark-charcoal/80 max-w-2xl mx-auto font-libre italic">
            Our AI analyzes your simulation data to provide institutional-grade perspective, uncovering non-obvious patterns in your financial trajectories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="editorial-panel p-8 group">
              <div className="text-4xl font-oldenglish text-gold mb-6 border-b border-black/20 pb-4">
                NO. 0{i}
              </div>
              <h3 className="text-2xl font-black font-playfair text-foreground mb-3 uppercase">
                {i === 1 ? 'Market Volatility Analysis' : i === 2 ? 'Compounding Acceleration' : i === 3 ? 'Terminal Value Projections' : 'Risk-Adjusted Return Profile'}
              </h3>
              <p className="text-sm text-dark-charcoal/80 font-ibm leading-relaxed text-justify">
                Run a simulation to generate personalized insights. The AI model will interpret your inputs and outputs to deliver a bespoke financial brief.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
