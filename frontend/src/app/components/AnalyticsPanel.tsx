'use client';

import { useSimulation } from '../context/SimulationContext';
import ObservationFeed from './ObservationFeed';
import ResearchNotes from './ResearchNotes';

export default function AnalyticsPanel() {
  const { results, hasRun, timeHorizon, selectedModel } = useSimulation();
  
  const simId = results?.id ? `SIM-${results.id.toString().padStart(4, '0')}` : 'PENDING';

  return (
    <aside className="w-[22rem] flex-shrink-0 border-l border-ink h-full flex flex-col bg-parchment relative z-10 shadow-[-4px_0_12px_rgba(11,19,32,0.02)]">
      {/* Top Header */}
      <div className="p-8 pb-5 border-b border-ink">
        <h2 className="font-heading text-lg font-bold tracking-[0.05em] text-ink/90">Contextual analytics</h2>
        <p className="text-[9px] font-ui tracking-[0.1em] mt-2 text-ink/50">System parameters & observations</p>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
        {/* Active Framework / Simulation State */}
        <div className="px-8 py-6 border-b border-ink/20">
          <div className="flex items-center justify-between mb-5">
             <h3 className="text-[11px] font-heading tracking-[0.1em] font-bold text-ink/70">Active framework</h3>
             <div className="flex items-center gap-3">
               {hasRun && results?.id && (
                 <button 
                   onClick={() => {
                     const url = new URL(window.location.href);
                     url.searchParams.set('sim_id', results.id);
                     navigator.clipboard.writeText(url.toString());
                     alert('Research URL copied to clipboard.');
                   }}
                   className="text-[9px] font-ui  tracking-[0.2em] text-midnight hover:text-ink transition-colors font-bold"
                 >
                   Share
                 </button>
               )}
               <span className="text-[9px] font-mono bg-ink/5 px-2 py-0.5 rounded text-ink/60">{simId}</span>
             </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[11px] font-ui">
              <span className="text-ink/50">Model</span>
              <span className="font-bold text-ink tracking-wide capitalize">{selectedModel.replace(/-/g, ' ')}</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-ui">
              <span className="text-ink/50">Horizon</span>
              <span className="font-semibold text-ink">{timeHorizon} Years</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-ui">
              <span className="text-ink/50">Status</span>
              <span className={`font-bold  tracking-[0.1em] ${hasRun ? "text-data-green" : "text-ledger-gold"}`}>
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
