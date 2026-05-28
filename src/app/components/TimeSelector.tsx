"use client";

import { useSimulation } from '../context/SimulationContext';

export default function TimeSelector() {
  const { timeHorizon, setTimeHorizon } = useSimulation();

  const timePeriods = [
    { value: 1, label: '1 Yr' },
    { value: 3, label: '3 Yrs' },
    { value: 5, label: '5 Yrs' },
    { value: 10, label: '10 Yrs' },
    { value: 20, label: '20 Yrs' },
  ];

  return (
    <div className="w-full mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-y border-dark-charcoal/10">
        <span className="text-[10px] font-bold font-inter uppercase tracking-[0.25em] text-dark-charcoal/60 flex items-center">
          Projection Horizon
        </span>
        <div className="flex flex-wrap gap-4">
          {timePeriods.map((time) => {
            const isActive = timeHorizon === time.value;
            return (
              <button
                key={time.value}
                id={`time-btn-${time.value}`}
                onClick={() => setTimeHorizon(time.value)}
                className={`text-[10px] font-inter font-bold tracking-[0.2em] uppercase transition-all duration-300 ${isActive ? 'text-gold underline underline-offset-4' : 'text-dark-charcoal/40 hover:text-dark-charcoal/80'}`}
              >
                {time.label}
              </button>
            );
          })}
        </div>
        <div className="text-[10px] font-bold font-inter text-dark-charcoal/60 tracking-[0.25em] uppercase border-l border-dark-charcoal/10 pl-6">
          {timeHorizon * 12} MO.
        </div>
      </div>
    </div>
  );
}