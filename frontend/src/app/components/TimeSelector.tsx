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
      <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-y border-rule">
        <span className="font-label text-[10px] font-semibold tracking-[0.25em] text-ink-soft uppercase">
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
                className={`font-label text-[10px] font-semibold tracking-[0.2em] transition-colors duration-600 ${
                  isActive
                    ? 'text-gold underline underline-offset-4 decoration-gold'
                    : 'text-ink-soft/40 hover:text-ink-soft'
                }`}
              >
                {time.label}
              </button>
            );
          })}
        </div>
        <div className="font-label text-[10px] font-semibold tracking-[0.25em] text-ink-soft border-l border-rule pl-6">
          {timeHorizon * 12} MO.
        </div>
      </div>
    </div>
  );
}
