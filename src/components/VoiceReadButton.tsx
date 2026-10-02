import React, { useState, useEffect } from 'react';
import { Mic, Volume2, Square, Sparkles } from 'lucide-react';
import {
  playChotelalVoice,
  stopChotelalVoice,
  subscribeVoiceStatus,
} from '../lib/chotelalVoice';

interface VoiceReadButtonProps {
  textToSpeak: string;
  label?: string;
  sublabel?: string;
  variant?: 'banner' | 'pill' | 'compact' | 'iconOnly';
  className?: string;
  title?: string;
}

export const VoiceReadButton: React.FC<VoiceReadButtonProps> = ({
  textToSpeak,
  label = 'Chotelal Ji Se Sunen',
  sublabel = 'Microsoft Neural Indian Male Voice explanation',
  variant = 'pill',
  className = '',
  title = 'Listen in Chotelal Ji Voice',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isThisPlaying, setIsThisPlaying] = useState(false);

  useEffect(() => {
    const unsub = subscribeVoiceStatus((speaking) => {
      setIsPlaying(speaking);
      if (!speaking) {
        setIsThisPlaying(false);
      }
    });
    return () => unsub();
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isThisPlaying) {
      stopChotelalVoice();
      setIsThisPlaying(false);
      return;
    }

    setIsThisPlaying(true);
    playChotelalVoice(
      textToSpeak,
      () => setIsThisPlaying(true),
      () => setIsThisPlaying(false),
      () => setIsThisPlaying(false)
    );
  };

  if (variant === 'iconOnly') {
    return (
      <button
        onClick={handleToggle}
        className={`p-2 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center ${
          isThisPlaying
            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.3)]'
            : 'bg-white/5 text-[#00D4FF] hover:bg-white/10 border border-white/10 hover:border-cyan-400/50'
        } ${className}`}
        title={isThisPlaying ? 'Stop Voice' : title}
        aria-label={title}
      >
        {isThisPlaying ? (
          <Square className="w-4 h-4 fill-rose-400" />
        ) : (
          <Mic className="w-4 h-4 text-[#00D4FF]" />
        )}
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={handleToggle}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
          isThisPlaying
            ? 'bg-rose-500/30 text-rose-300 border border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse'
            : 'bg-white/5 text-cyan-300 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10'
        } ${className}`}
        title={title}
      >
        {isThisPlaying ? (
          <>
            <Square className="w-3 h-3 fill-rose-300" />
            <span>Stop</span>
          </>
        ) : (
          <>
            <Mic className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span>{label}</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'banner') {
    return (
      <div
        className={`bg-[#111827]/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl ${className}`}
      >
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-[#00D4FF] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
            <Volume2 className={`w-5 h-5 ${isThisPlaying ? 'animate-bounce text-[#00D4FF]' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-serif">{label}</span>
              <span className="text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                Neural Voice
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{sublabel}</p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isThisPlaying
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-pulse'
              : 'bg-gradient-to-r from-blue-600 to-[#00D4FF] text-white shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]'
          }`}
        >
          {isThisPlaying ? (
            <>
              <Square className="w-3.5 h-3.5 fill-rose-300" />
              <span>Awaaz Rokein (Stop)</span>
            </>
          ) : (
            <>
              <Mic className="w-3.5 h-3.5 text-white" />
              <span>Sunen (Listen Now)</span>
            </>
          )}
        </button>
      </div>
    );
  }

  // Default: 'pill'
  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
        isThisPlaying
          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse'
          : 'bg-white/5 text-cyan-300 border border-cyan-500/40 hover:bg-white/10 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,212,255,0.25)]'
      } ${className}`}
      title={title}
    >
      {isThisPlaying ? (
        <>
          <Square className="w-3.5 h-3.5 fill-rose-300" />
          <span>Stop Awaaz</span>
        </>
      ) : (
        <>
          <Mic className="w-3.5 h-3.5 text-[#00D4FF]" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
