// Audio Visualizer Component
// Reference: https://github.com/livekit-examples/agent-starter-react

import React, { useEffect, useRef, useState } from 'react';

interface AudioVisualizerProps {
  isActive: boolean;
  barCount?: number;
  className?: string;
}

export default function AudioVisualizer({ 
  isActive, 
  barCount = 20,
  className = '' 
}: AudioVisualizerProps) {
  const [heights, setHeights] = useState<number[]>(Array(barCount).fill(20));

  useEffect(() => {
    if (!isActive) {
      setHeights(Array(barCount).fill(20));
      return;
    }

    const interval = setInterval(() => {
      setHeights(prev => prev.map(() => Math.random() * 100));
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, barCount]);

  return (
    <div className={`flex items-center justify-center gap-1 h-12 ${className}`}>
      {heights.map((height, i) => (
        <div
          key={i}
          className={`w-1.5 rounded-full transition-all duration-150 ${
            isActive ? 'bg-indigo-400' : 'bg-gray-600'
          }`}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

