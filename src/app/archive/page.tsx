"use client";

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { apiService, SavedSimulation } from '../services/apiService';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ArchivePage() {
  const [simulations, setSimulations] = useState<SavedSimulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchSimulations = async () => {
      try {
        const data = await apiService.getSimulations();
        setSimulations(data);
      } catch (err) {
        console.error("Failed to fetch simulations:", err);
        setError("Unable to retrieve records. Please ensure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchSimulations();
  }, []);

  const filteredSimulations = filter === 'all' 
    ? simulations 
    : simulations.filter(sim => sim.model_type === filter);

  const categories = [
    { id: 'all', label: 'All Records' },
    { id: 'compound-interest', label: 'Compound Interest' },
    { id: 'discounted-cash-flow', label: 'DCF Models' },
    { id: 'monte-carlo', label: 'Monte Carlo' },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <div className="pt-4 pb-24 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b-news-thick pb-6 mb-10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] font-inter text-dark-charcoal mb-4">Historical Data</p>
          <h1 className="text-5xl md:text-7xl font-black font-playfair text-foreground tracking-tight mb-6">
            Simulation Archive
          </h1>
          <p className="text-sm md:text-base text-dark-charcoal/80 max-w-2xl mx-auto font-libre italic">
            Access your previously executed models, review past assumptions, and track how your financial perspectives have evolved over time.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest font-inter transition-all border ${
                filter === cat.id 
                ? 'bg-black text-white border-black' 
                : 'bg-transparent text-dark-charcoal border-black/20 hover:border-black'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-24 font-ibm italic text-dark-charcoal/60">
            Fetching archive records...
          </div>
        ) : error ? (
          <div className="max-w-xl mx-auto editorial-panel border-black p-12 text-center">
            <p className="text-sm font-ibm text-dark-charcoal mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="editorial-button px-6 py-2 text-[10px] font-bold uppercase tracking-widest font-inter"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredSimulations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSimulations.map((sim, index) => (
              <motion.div
                key={sim.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="editorial-panel p-6 border-black hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4 border-b border-black/10 pb-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gold font-inter">
                    {sim.model_type.replace(/-/g, ' ')}
                  </span>
                  <span className="text-[9px] font-ibm text-dark-charcoal/50">
                    {new Date(sim.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-xl font-black font-playfair text-foreground uppercase mb-4 leading-tight">
                  {sim.model_type === 'compound-interest' ? 'Growth Projection' : 
                   sim.model_type === 'discounted-cash-flow' ? 'Valuation Model' : 'Stochastic Analysis'}
                </h3>

                <div className="space-y-4">
                  {/* Parameter Summary */}
                  <div className="bg-dark-charcoal/5 p-3">
                    <p className="text-[9px] font-bold uppercase text-dark-charcoal/40 mb-2 font-inter">Core Parameters</p>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-ibm">
                      {sim.model_type === 'compound-interest' && (
                        <>
                          <div>Principal: ${sim.parameters.principal.toLocaleString()}</div>
                          <div>Rate: {sim.parameters.annual_rate}%</div>
                        </>
                      )}
                      {sim.model_type === 'discounted-cash-flow' && (
                        <>
                          <div>Revenue: ${sim.parameters.initial_revenue.toLocaleString()}</div>
                          <div>WACC: {sim.parameters.discount_rate}%</div>
                        </>
                      )}
                      {sim.model_type === 'monte-carlo' && (
                        <>
                          <div>Mean Growth: {sim.parameters.revenue_growth_mean}%</div>
                          <div>Trials: {sim.parameters.num_simulations}</div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Result Summary */}
                  <div>
                    <p className="text-[9px] font-bold uppercase text-dark-charcoal/40 mb-1 font-inter">Primary Outcome</p>
                    <div className="text-2xl font-black font-playfair text-foreground">
                      {sim.model_type === 'compound-interest' && `$${Math.round(sim.results.final_amount).toLocaleString()}`}
                      {sim.model_type === 'discounted-cash-flow' && `$${Math.round(sim.results.npv).toLocaleString()}`}
                      {sim.model_type === 'monte-carlo' && `$${Math.round(sim.results.mean_value).toLocaleString()}`}
                    </div>
                    <p className="text-[9px] text-dark-charcoal/60 font-ibm italic">
                      {sim.model_type === 'compound-interest' ? 'Final compounded balance' : 
                       sim.model_type === 'discounted-cash-flow' ? 'Net Present Value' : 'Mean Simulated NPV'}
                    </p>
                  </div>
                </div>

                <button className="mt-6 w-full border-t border-black pt-4 text-[10px] font-bold uppercase tracking-widest font-inter text-center hover:text-gold transition-colors">
                  View Full Report →
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto editorial-panel border-black">
            <div className="p-16 flex flex-col items-center justify-center text-center">
              <div className="mb-6">
                <Image 
                  src="/LOGO.jpeg" 
                  alt="Chronicle Finance Logo" 
                  width={80} 
                  height={80} 
                  className="rounded-full opacity-20 grayscale"
                />
              </div>
              <h3 className="text-2xl font-black font-playfair text-foreground uppercase mb-4">No Records Found</h3>
              <p className="text-sm text-dark-charcoal/80 font-ibm max-w-sm mb-8 leading-relaxed">
                We couldn't find any saved {filter === 'all' ? '' : filter.replace(/-/g, ' ')} simulations in your archive.
              </p>
              <a href="/" className="editorial-button px-8 py-3 text-[11px] font-bold uppercase tracking-[0.1em] font-inter">
                Run New Simulation
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
