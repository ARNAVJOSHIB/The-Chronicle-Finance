'use client';

import { useSimulation } from '../context/SimulationContext';
import ObservationFeed from './ObservationFeed';
import ResearchNotes from './ResearchNotes';

export default function AnalyticsPanel() {
  const { results, hasRun, timeHorizon, selectedModel } = useSimulation();

  const simId = results?.id ? `SIM-${results.id.toString().padStart(4, '0')}` : 'PENDING';

  return (
    <aside className="w-[22rem] flex-shrink-0 border-l border-rule h-full flex flex-col bg-paper relative z-10">
      {/* ── Journal Header ─────────────────────────────────────────────── */}
      <div className="px-8 py-6 border-b border-rule-strong">
        <p className="font-label text-[8px] font-semibold tracking-[0.3em] text-ink-soft uppercase mb-1">Live Research Journal</p>
        <h2 className="font-display text-lg text-ink tracking-wide">Research Journal</h2>
        <p className="font-label text-[9px] tracking-[0.15em] mt-1.5 text-ink-soft/70 uppercase">System parameters &amp; observations</p>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
        {/* ── Active Framework ──────────────────────────────────────────── */}
        <div className="px-8 py-6 border-b border-rule">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-[12px] tracking-wide text-ink">
              <span className="text-gold mr-2">§</span>Active Framework
            </h3>
            <div className="flex items-center gap-3">
              {hasRun && results?.id && (
                <button
                  onClick={() => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('sim_id', results.id);
                    navigator.clipboard.writeText(url.toString());
                    alert('Research URL copied to clipboard.');
                  }}
                  className="font-label text-[8px] tracking-[0.2em] text-gold hover:text-ink uppercase transition-colors duration-600 font-semibold"
                >
                  Share
                </button>
              )}
              <span className="font-mono text-[9px] bg-gold/10 px-2 py-0.5 text-ink-soft border border-rule">{simId}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-rule pb-2">
              <span className="font-label text-[10px] tracking-[0.1em] text-ink-soft uppercase">Model</span>
              <span className="font-body text-[11px] text-ink capitalize tracking-wide">{selectedModel.replace(/-/g, ' ')}</span>
            </div>
            <div className="flex justify-between items-center border-b border-rule pb-2">
              <span className="font-label text-[10px] tracking-[0.1em] text-ink-soft uppercase">Horizon</span>
              <span className="font-body text-[11px] text-ink tracking-wide">{timeHorizon} Years</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-label text-[10px] tracking-[0.1em] text-ink-soft uppercase">Status</span>
              <span className={`font-label text-[10px] tracking-[0.15em] font-semibold uppercase flex items-center gap-1.5 ${hasRun ? "text-data-green" : "text-gold"}`}>
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${hasRun ? "bg-data-green" : "bg-gold"}`} />
                {hasRun ? "Calculated" : "Pending"}
              </span>
            </div>
          </div>
        </div>

        {/* ── Observations ─────────────────────────────────────────────── */}
        {hasRun && (
          <ObservationFeed results={results} selectedModel={selectedModel} />
        )}

        {/* ── Annotations ──────────────────────────────────────────────── */}
        <ResearchNotes />
      </div>
    </aside>
  );
}
