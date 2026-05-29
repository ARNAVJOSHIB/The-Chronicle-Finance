'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RunSimulationButton() {
  const [isRunning, setIsRunning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setIsRunning(true);
    // In a real implementation, this would trigger the actual simulation
    // For now, we'll just simulate a click
    setTimeout(() => setIsRunning(false), 1000);
  };

  return (
    <div className="flex justify-center my-8">
      <button
        ref={buttonRef}
        className={`px-8 py-4 text-lg font-playfair font-bold text-financial-blue
          ${isHovered ? 'text-gold' : ''}
          ${isRunning ? 'bg-fin-blue-200' : 'bg-ivory'}
          rounded-lg shadow-lg border-2 border-financial-blue
          hover:scale-105 transition-transform duration-300 ease-in-out`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        Run Simulation
      </button>
    </div>
  );
}
