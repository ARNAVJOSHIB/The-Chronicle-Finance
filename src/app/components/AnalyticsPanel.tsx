'use client';

import { useSimulation } from '../context/SimulationContext';
import ObservationFeed from './ObservationFeed';
import ResearchNotes from './ResearchNotes';

export default function AnalyticsPanel() {
  const { results, hasRun, timeHorizon, selectedModel } = useSimulation();
  
  const simId = results?.id ? `SIM-${results.id.toString().padStart(4, '0')}` : 'PENDING';

  return (
    <aside className="w-[22rem] flex-shrink-0 border-l border-black h-full flex flex-col bg-ivory relative z-10 shadow-[-4px_0_12px_rgba(0,0,0,0.02)]">
      {/* Top Header */}
      <div className="p-8 pb-5 border-b border-black">
        <h2 className="font-libre text-base font-bold uppercase tracking-[0.1em] text-dark-charcoal/90">Contextual Analytics</h2>
        <p className="text-[9px] font-inter uppercase tracking-[0.2em] mt-2 text-dark-charcoal/50">System Parameters & Observations</p>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
        {/* Active Framework / Simulation State */}
        <div className="px-8 py-6 border-b border-black/20">
          <div className="flex items-center justify-between mb-5">
             <h3 className="text-[10px] font-inter uppercase tracking-[0.2em] font-bold text-dark-charcoal/70">Active Framework</h3>
             <span className="text-[9px] font-mono bg-dark-charcoal/5 px-2 py-0.5 rounded text-dark-charcoal/60">{simId}</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[11px] font-inter">
              <span className="text-dark-charcoal/50">Model</span>
              <span className="font-bold text-dark-charcoal uppercase tracking-wide">{selectedModel.replace(/-/g, ' ')}</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-inter">
              <span className="text-dark-charcoal/50">Horizon</span>
              <span className="font-semibold text-dark-charcoal">{timeHorizon} Years</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-inter">
              <span className="text-dark-charcoal/50">Status</span>
              <span className={`font-bold uppercase tracking-[0.1em] ${hasRun ? "text-emerald-pulse" : "text-amber-volatility"}`}>
                {hasRun ? "Calculated" : "Pending"}
              </span>
            </div>
          </div>
        </div>

        {/* Quant Observations */}
        {hasRun && (
          <ObservationFeed results={results} selectedModel={selectedModel} />
        )}

        {/* Research Annotations */}
        <ResearchNotes />
      </div>
    </aside>
  );
}
