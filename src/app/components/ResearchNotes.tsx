'use client';

import { useState, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { apiService } from '../services/apiService';

export default function ResearchNotes() {
  const [note, setNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<{ date: string; content: string }[]>([]);
  const { results, setResults } = useSimulation();
  
  useEffect(() => {
    if (results?.notes) {
      // Very basic parsing since we stored as [time] content\n
      const lines = results.notes.split('\n');
      const parsed = lines.map((line: string) => {
        const match = line.match(/^\[(.*?)\] (.*)$/);
        if (match) {
          return { date: match[1], content: match[2] };
        }
        return { date: '', content: line };
      });
      setSavedNotes(parsed);
    } else {
      setSavedNotes([]);
    }
  }, [results?.id, results?.notes]);

  const handleSave = async () => {
    if (!note.trim() || !results?.id) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newNotes = [{ date: now, content: note }, ...savedNotes];
    setSavedNotes(newNotes);
    
    // Combine all notes into one string for the backend
    const allNotesText = newNotes.map(n => `[${n.date}] ${n.content}`).join('\n');
    
    try {
      await apiService.saveNotes(results.id, allNotesText);
      setResults({ ...results, notes: allNotesText });
    } catch (err) {
      console.error("Failed to save notes to backend:", err);
    }
    
    setNote('');
  };

  return (
    <div className="px-8 py-6 bg-[#EBE7DF]/40 flex-1 border-t border-white/50">
      <div className="flex justify-between items-end mb-5">
        <h3 className="text-[10px] font-inter uppercase tracking-[0.2em] font-bold text-dark-charcoal/70">Research Annotations</h3>
        <span className="text-[8px] font-inter uppercase tracking-[0.2em] text-dark-charcoal/40">Journal / Log</span>
      </div>
      
      {/* Input Area */}
      <div className="mb-8 relative">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Log observations, hypothesis shifts, or parametric changes..."
          className="w-full h-24 p-3 text-[11px] font-ibm bg-[#E5E1D8]/60 border-none rounded-sm outline-none resize-none placeholder:text-dark-charcoal/30 text-dark-charcoal transition-all focus:ring-1 focus:ring-gold/30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]"
        />
        <div className="flex justify-end mt-3">
          <button 
            onClick={handleSave}
            disabled={!note.trim()}
            className="text-[9px] font-inter uppercase font-bold tracking-[0.2em] text-dark-charcoal/60 hover:text-gold transition-colors disabled:opacity-30 flex items-center gap-1.5 group"
          >
            <span>Append Log</span>
            <span className="text-lg leading-none font-light group-hover:scale-110 transition-transform">+</span>
          </button>
        </div>
      </div>

      {/* Saved Notes Feed */}
      <div className="space-y-6 max-h-48 overflow-y-auto pr-2 no-scrollbar">
        {savedNotes.length === 0 ? (
          <p className="text-[10px] font-ibm italic text-dark-charcoal/40 text-center py-4">
            No annotations logged for this simulation instance.
          </p>
        ) : (
          savedNotes.map((sn, idx) => (
            <div key={idx} className="relative pl-4">
              {/* Subtle line */}
              <div className="absolute left-0 top-1 bottom-1 w-[1px] bg-dark-charcoal/10" />
              <span className="text-[8px] font-mono font-bold tracking-widest text-dark-charcoal/30 block mb-1.5">{sn.date}</span>
              <p className="text-[11px] font-ibm text-dark-charcoal/80 leading-relaxed">{sn.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
