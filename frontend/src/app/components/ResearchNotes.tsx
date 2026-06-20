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
    <div className="px-8 py-6 bg-paper flex-1 border-t border-rule">
      <div className="flex justify-between items-baseline mb-5">
        <h3 className="font-display text-[12px] tracking-wide text-ink">
          <span className="text-gold mr-2">§</span>Research Annotations
        </h3>
        <span className="font-label text-[8px] tracking-[0.2em] text-ink-soft/60 uppercase">Journal / Log</span>
      </div>

      {/* Input Area — ruled journal style */}
      <div className="mb-6">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Log observations, hypothesis shifts, or parametric changes..."
          className="w-full h-24 p-3 font-body text-[11px] bg-paper-aged border border-rule outline-none resize-none placeholder:text-ink-soft/50 placeholder:italic text-ink transition-all duration-600 focus:border-gold focus:bg-paper"
          style={{ lineHeight: '1.8' }}
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleSave}
            disabled={!note.trim()}
            className="font-label text-[9px] font-semibold tracking-[0.2em] text-ink-soft hover:text-gold uppercase transition-colors duration-600 disabled:opacity-30 flex items-center gap-1.5 group"
          >
            <span>Append Log</span>
            <span className="text-lg leading-none font-light group-hover:scale-110 transition-transform">+</span>
          </button>
        </div>
      </div>

      {/* Saved Notes Feed — ruled lines */}
      <div className="space-y-4 max-h-48 overflow-y-auto pr-2 no-scrollbar">
        {savedNotes.length === 0 ? (
          <p className="font-body text-[10px] italic text-ink-soft/60 text-center py-4">
            No annotations logged for this simulation instance.
          </p>
        ) : (
          savedNotes.map((sn, idx) => (
            <div key={idx} className="relative pl-4 pb-3 border-b border-rule">
              <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-gold/40" />
              <span className="font-mono text-[9px] font-semibold tracking-wider text-ink-soft block mb-1.5">{sn.date}</span>
              <p className="font-body text-[11px] text-ink leading-relaxed">{sn.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
