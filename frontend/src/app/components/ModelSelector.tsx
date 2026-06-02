"use client";

import { useSimulation } from '../context/SimulationContext';

export default function ModelSelector() {
  const { selectedModel, setSelectedModel } = useSimulation();

  const models = [
    {
      id: 'compound-interest',
      name: 'Compound Interest',
      description: 'Grow wealth with regular contributions',
      icon: 'NO. 01',
    },
    {
      id: 'discounted-cash-flow',
      name: 'Discounted Cash Flow',
      description: 'Intrinsic value via future cash flows',
      icon: 'NO. 02',
    },
    {
      id: 'monte-carlo',
      name: 'Monte Carlo',
      description: 'Probabilistic risk & return scenarios',
      icon: 'NO. 03',
    },
    {
      id: 'geometric-brownian-motion',
      name: 'Brownian Motion',
      description: 'Stochastic path & volatility modeling',
      icon: 'NO. 04',
    },
    {
      id: 'portfolio-optimization',
      name: 'Portfolio Opt.',
      description: 'MPT & Efficient Frontier',
      icon: 'NO. 05',
    },
    {
      id: 'value-at-risk',
      name: 'Value at Risk',
      description: 'Tail risk & loss distribution',
      icon: 'NO. 06',
    },
    {
      id: 'correlation-matrix',
      name: 'Correlation Lab',
      description: 'Asset regimes & relationships',
      icon: 'NO. 07',
    },
    {
      id: 'volatility-lab',
      name: 'Volatility Lab',
      description: 'Realized vol. clustering',
      icon: 'NO. 08',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full px-4 mb-6 mt-2 border-b-news-thick pb-6">
      <div className="text-center mb-5 border-b border-black pb-2">
        <h2 className="text-xs font-bold  tracking-[0.25em] text-dark-charcoal font-inter">
          Select Simulation Model
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-x border-t border-black">
        {models.map((model, idx) => {
          const isActive = selectedModel === model.id;
          return (
            <button
              key={model.id}
              id={`model-btn-${model.id}`}
              onClick={() => setSelectedModel(model.id)}
              className={`text-left p-5 transition-all duration-300 group border-b border-black ${(idx + 1) % 4 !== 0 ? 'md:border-r' : ''}`}
              style={{
                background: isActive ? '#1A1C20' : 'transparent',
                color: isActive ? '#F6F4F0' : '#1A1C20',
              }}
            >
              <div 
                className="text-2xl font-inter font-bold tracking-widest mb-3 opacity-80"
                style={{ color: isActive ? '#D4AF37' : '#1A1C20' }}
              >{model.icon}</div>
              <div
                className="font-black font-playfair text-lg mb-1"
                style={{ color: isActive ? '#F6F4F0' : '#1A1C20' }}
              >
                {model.name}
              </div>
              <div
                className="text-xs font-inter italic leading-relaxed"
                style={{ color: isActive ? 'rgba(246,244,240,0.7)' : 'rgba(26,28,32,0.6)' }}
              >
                {model.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
