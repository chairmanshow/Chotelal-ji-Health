import React from 'react';
import { Star, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Zap, Heart } from 'lucide-react';
import { ChotelalFace } from './ChotelalFace';

interface ExpertPlusCardProps {
  onStartConsultation: () => void;
  className?: string;
  variant?: 'card' | 'banner' | 'compact';
}

export const ExpertPlusCard: React.FC<ExpertPlusCardProps> = ({
  onStartConsultation,
  className = '',
  variant = 'card',
}) => {
  if (variant === 'compact') {
    return (
      <div
        onClick={onStartConsultation}
        className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-4 text-white shadow-[0_0_30px_rgba(255,153,51,0.35)] cursor-pointer hover:scale-[1.02] transition-all duration-200 ${className}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
              <Star className="w-5 h-5 text-yellow-200 fill-yellow-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm uppercase tracking-wider text-white">
                  Expert+ Consultation
                </span>
                <span className="bg-white text-orange-600 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                  RECOMMENDED
                </span>
              </div>
              <p className="text-xs text-orange-100 font-medium">
                Detailed Analysis • 7-Day Diet Chart • Custom Yoga Plan
              </p>
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 bg-white text-slate-900 font-black text-xs px-4 py-2 rounded-xl shadow-md group-hover:bg-orange-50 transition"
          >
            Start Now →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-8 sm:p-10 text-white shadow-[0_0_35px_rgba(255,153,51,0.45)] border-2 border-yellow-200/40 ${className}`}
    >
      {/* Decorative ambient backdrop */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-5 text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide uppercase text-white shadow-xs">
            <Star className="w-4 h-4 text-yellow-200 fill-yellow-300 animate-spin" />
            <span>⭐ SPECIAL FEATURE • EXPERT+ CONSULTATION</span>
            <span className="bg-yellow-300 text-orange-900 text-[9px] font-black px-2 py-0.5 rounded-full ml-1">
              RECOMMENDED
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-serif tracking-tight text-white leading-tight">
            Chotelal Ji se 1-on-1 Personalized Ayurvedic Paramarsh
          </h2>

          <p className="text-sm sm:text-base text-orange-50 leading-relaxed max-w-2xl font-normal">
            Aam jaanch se aage — apni takleef ki gehraai samjhein, classical Charak Samhita ke nuskhe, 7-din ka anukool aahar chart aur pramanit YouTube video margdarshan payein.
          </p>

          {/* Feature Bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2.5 bg-black/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/15">
              <CheckCircle2 className="w-4 h-4 text-yellow-200 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                Detailed Dosha &amp; Root Cause Analysis
              </span>
            </div>
            <div className="flex items-center gap-2.5 bg-black/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/15">
              <CheckCircle2 className="w-4 h-4 text-yellow-200 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                Personalized 7-Day Diet &amp; Detox Chart
              </span>
            </div>
            <div className="flex items-center gap-2.5 bg-black/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/15">
              <CheckCircle2 className="w-4 h-4 text-yellow-200 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                Custom Asanas &amp; Pranayama Schedule
              </span>
            </div>
            <div className="flex items-center gap-2.5 bg-black/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/15">
              <CheckCircle2 className="w-4 h-4 text-yellow-200 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                Instant Priority AI Voice &amp; Video Embed
              </span>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onStartConsultation}
              className="inline-flex items-center gap-2.5 bg-white hover:bg-orange-50 text-slate-900 font-black text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span>Start Expert+ Consultation Now</span>
              <ArrowRight className="w-4 h-4 text-slate-700" />
            </button>

            <span className="text-xs text-orange-100 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-yellow-200" />
              100% Free • No Subscription Fees
            </span>
          </div>
        </div>

        {/* Right Column Mascot Highlight */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="relative p-3 bg-white/20 backdrop-blur-md rounded-3xl border-2 border-white/40 shadow-2xl flex flex-col items-center text-center max-w-xs w-full">
            <div className="p-2 bg-white rounded-full shadow-lg mb-3">
              <ChotelalFace size="xl" />
            </div>
            <h4 className="font-black text-lg text-white font-serif">Vaidya Chotelal Ji</h4>
            <p className="text-xs text-yellow-200 font-bold mt-0.5">
              30+ Years Classical Practice
            </p>
            <p className="text-xs text-orange-100 italic mt-2 leading-relaxed">
              &ldquo;Beta, beemari ko jad se mitana hai to sahi sawal aur sahi aahar zaroori hai.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
