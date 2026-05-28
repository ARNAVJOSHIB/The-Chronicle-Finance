'use client';

import { useState, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { apiService } from '../services/apiService';

export default function ResearchNotesPanel() {
  const { results, hasRun } = useSimulation();
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  
  const simulationId = results?.id;

  useEffect(() => {
    // Reset notes when a new simulation is run or model changes
    setNotes('');
    setSaveStatus(null);
  }, [results?.modelType]);

  const handleSave = async () => {
    if (!simulationId) {
      setSaveStatus("Error: No active simulation to attach notes to.");
      return;
    }
    
    setIsSaving(true);
    setSaveStatus("Saving to database...");
    
    try {
      await apiService.saveNotes(simulationId, notes);
      setSaveStatus("Notes saved successfully.");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err: any) {
      setSaveStatus(`Failed to save: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (!hasRun) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-8 mb-32">
      <div className="editorial-panel p-6 md:p-8 bg-ivory border border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        <div className="flex items-end justify-between border-b border-black/20 pb-4 mb-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-dark-charcoal font-inter mb-1">
              Experimentation Log
            </p>
            <h2 className="text-2xl font-black font-playfair tracking-tight text-foreground capitalize">
              Research Notes
            </h2>
          </div>
          <div className="text-[10px] font-inter uppercase font-bold text-dark-charcoal/60">
            SIM ID: {simulationId || 'N/A'}
          </div>
        </div>

        <div className="relative">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Log hypotheses, parameter assumptions, and probabilistic observations here..."
            className="w-full h-48 bg-transparent border-none p-0 focus:ring-0 resize-none font-ibm text-sm leading-relaxed text-dark-charcoal placeholder:text-dark-charcoal/40"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(0,0,0,0.05) 28px)',
              lineHeight: '28px',
              paddingTop: '2px', // align with lines
            }}
          />
        </div>

        <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
          <span className="text-[10px] font-inter italic text-dark-charcoal/60">
            {saveStatus || 'Changes are saved to the persistent database.'}
          </span>
          <button
            onClick={handleSave}
            disabled={isSaving || !notes.trim() || !simulationId}
            className="px-6 py-2 border border-black text-xs font-bold font-inter tracking-widest uppercase transition-all duration-300 hover:bg-black hover:text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-black"
          >
            {isSaving ? 'Saving...' : 'Save Notes'}
          </button>
        </div>
      </div>
    </div>
  );
}
