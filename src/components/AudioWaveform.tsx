import React, { useEffect, useState } from 'react';

interface AudioWaveformProps {
  state: 'speaking' | 'listening' | 'thinking' | 'idle';
  audioLevel?: number; // 0.0 to 1.0
  barCount?: number;
  className?: string;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  state = 'idle',
  audioLevel = 0.5,
  barCount = 28,
  className = '',
}) => {
  const [frequencies, setFrequencies] = useState<number[]>(() =>
    Array.from({ length: barCount }, () => 8)
  );

  useEffect(() => {
    let animFrame: number;
    let tick = 0;

    const updateFrequencies = () => {
      tick += 0.12;

      setFrequencies((prev) =>
        prev.map((_, i) => {
          const centerFactor = 1 - Math.abs(i - barCount / 2) / (barCount / 2); // Bell curve weight

          if (state === 'speaking') {
            // Harmonic multi-sine speech simulation
            const wave1 = Math.sin(tick * 2 + i * 0.4);
            const wave2 = Math.cos(tick * 1.5 - i * 0.3);
            const raw = (Math.abs(wave1 * 0.6 + wave2 * 0.4) + 0.1) * (audioLevel || 0.7);
            const height = Math.max(10, Math.min(54, raw * 52 * (0.4 + centerFactor * 0.8)));
            return height;
          }

          if (state === 'listening') {
            // User mic ambient listening fluctuation
            const wave = Math.sin(tick * 3 + i * 0.6);
            const raw = (Math.abs(wave) * 0.7 + 0.2) * (audioLevel || 0.5);
            const height = Math.max(8, Math.min(46, raw * 42 * (0.3 + centerFactor * 0.7)));
            return height;
          }

          if (state === 'thinking') {
            // Gentle wave
            const wave = Math.sin(tick * 1.8 - i * 0.35);
            return Math.max(8, Math.min(30, 10 + wave * 14));
          }

          // Idle state: subtle ambient resting baseline
          return 6 + Math.sin(tick * 0.6 + i * 0.2) * 2;
        })
      );

      animFrame = requestAnimationFrame(updateFrequencies);
    };

    animFrame = requestAnimationFrame(updateFrequencies);
    return () => cancelAnimationFrame(animFrame);
  }, [state, audioLevel, barCount]);

  // Color profiles based on state
  const getBarColorClass = (index: number) => {
    if (state === 'speaking') {
      return 'bg-gradient-to-t from-orange-600 via-amber-500 to-yellow-400 shadow-sm';
    }
    if (state === 'listening') {
      return 'bg-gradient-to-t from-emerald-600 via-green-500 to-teal-400 shadow-sm';
    }
    if (state === 'thinking') {
      return 'bg-gradient-to-t from-sky-600 via-blue-500 to-indigo-400 shadow-sm';
    }
    return 'bg-slate-300';
  };

  return (
    <div
      className={`relative flex items-center justify-center gap-1 sm:gap-1.5 h-14 w-full max-w-sm mx-auto px-4 select-none ${className}`}
      aria-label="Audio Waveform"
    >
      {/* Waveform Bars */}
      {frequencies.map((height, i) => (
        <div
          key={i}
          className={`w-1 sm:w-1.5 rounded-full transition-all duration-75 ease-out ${getBarColorClass(
            i
          )}`}
          style={{
            height: `${height}px`,
          }}
        />
      ))}
    </div>
  );
};
