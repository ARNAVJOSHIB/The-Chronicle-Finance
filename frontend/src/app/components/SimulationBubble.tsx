'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SimulationBubble = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [size, setSize] = useState(100);
  const [color, setColor] = useState('#3b82f6'); // blue-500
  const bubbleRef = useRef<HTMLDivElement>(null);

  // Simple animation for the bubble
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAnimating) {
      intervalId = setInterval(() => {
        // Pulsing effect
        setSize(prev => prev === 100 ? 110 : 100);

        // Color change effect
        setColor(prev => prev === '#3b82f6' ? '#10b981' : '#3b82f6');
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAnimating]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className="relative"
        style={{
          width: `${size}px`,
          height: `${size}px`
        }}
      >
        <motion.div
          ref={bubbleRef}
          className="rounded-full"
          animate={{
            width: size,
            height: size,
            backgroundColor: color,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <button
        onClick={toggleAnimation}
        className="mt-4 px-4 py-2 bg-financial-blue text-white rounded-md"
      >
        {isAnimating ? 'Pause' : 'Play'} Animation
      </button>
    </div>
  );
};

export default SimulationBubble;
