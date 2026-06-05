"use client";

import { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { motion, AnimatePresence } from 'framer-motion';

import { API_BASE_URL } from '../services/apiService';

export default function AIInsightPanel() {
  const { results, hasRun } = useSimulation();
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = async () => {
    if (!results) return;
    setLoading(true);
    setError(null);
    setInsight(null);

    try {
      const response = await fetch(`${API_BASE_URL}/ai-insight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model_type: results.modelType ?? 'financial',
          model_results: results,
          simulation_id: results.id,
          user_notes: results.notes || undefined,
        }),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setInsight(data.insight);
    } catch (err: any) {
      setError(err.message ?? 'Failed to get AI insight.');
    } finally {
      setLoading(false);
    }
  };

  if (!hasRun) return null;

  return (
    <div className="max-w-5xl mx-auto w-full px-4 mb-16">
      <div className="border border-ink bg-parchment relative">
        <div className="px-6 py-4 flex items-center justify-between border-b-news-thick border-ink">
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] font-ui text-ink mb-1">
              Powered by Groq
            </p>
            <h3 className="text-2xl font-bold font-heading text-ink tracking-tight">
              Editorial insight
            </h3>
          </div>
          <button
            id="ai-insight-btn"
            onClick={fetchInsight}
            disabled={loading}
            className="editorial-button flex items-center gap-2 px-6 py-2 font-bold font-ui text-[11px] disabled:opacity-50 tracking-[0.1em]"
          >
            {loading ? 'Consulting…' : 'Generate analysis'}
          </button>
        </div>

        <div className="p-6 md:p-8 min-h-[120px]">
          <AnimatePresence mode="wait">
            {!insight && !loading && !error && (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-ui italic text-ink/60 text-center py-8"
              >
                Click "Generate Analysis" to receive a professional editorial analysis of your simulation results.
              </motion.p>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-8 gap-4"
              >
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-ink"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                    />
                  ))}
                </div>
                <span className="text-xs font-ui font-bold  tracking-widest text-ink">
                  Synthesizing Information...
                </span>
              </motion.div>
            )}

            {error && (
              <motion.p
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-ui italic font-bold text-red-700 bg-red-50 p-4 border border-red-900"
              >
                Correction required: {error}
              </motion.p>
            )}

            {insight && (
              <motion.div
                key="insight"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div
                  className="text-sm font-ui text-ink text-justify md:columns-2 gap-8"
                  style={{ lineHeight: '1.8' }}
                >
                  {/* Fake dropcap effect */}
                  <span className="float-left text-5xl leading-none font-display font-black mr-2 mt-1  text-ledger-gold">
                    {insight.charAt(0)}
                  </span>
                  {insight.substring(1)}
                </div>
                <div className="mt-8 pt-4 border-t border-ink/20 text-center">
                  <span className="text-[10px] font-ui font-bold  tracking-[0.2em] text-ink/50">
                    Chronicle Finance · Opinion Section
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
