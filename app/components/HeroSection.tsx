import React from 'react';
import {
  Sparkles,
  PhoneCall,
  ShieldCheck,
  ArrowRight,
  Flame,
  CheckCircle2,
  Video,
  Clock,
} from 'lucide-react';
import { ChotelalAvatar } from '../../src/components/ChotelalAvatar';

interface HeroSectionProps {
  onStartDiagnosis?: () => void;
  onBookCall?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartDiagnosis,
  onBookCall,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDD0]/60 via-[#FFFDF0] to-white py-16 md:py-24">
      {/* Decorative Warm Backlights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1E3A8A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#1E3A8A] text-xs sm:text-sm font-black shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#FF9933]" />
              <span>भारत का पहला 100% निःशुल्क AI आयुर्वेदिक स्वास्थ्य केंद्र</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Aapki Sehat, <br />
              <span className="text-[#FF9933]">Hamari Zimmedari</span>
            </h1>

            {/* Subheading / Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              30+ वर्षों के आयुर्वेदिक अनुभव और आधुनिक AI का बेजोड़ संगम। बवासीर, सिटिंग पेन, हेयर फॉल और मानसिक तनाव के लिए घर बैठे तुरंत मुफ्त जांच, पर्चा और आहार चार्ट पाएं।
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={onStartDiagnosis}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF9933] to-amber-600 hover:from-amber-600 hover:to-[#FF9933] text-white font-black text-base shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                <span>Start Free Diagnosis (मुफ़्त रोग जांच)</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={onBookCall}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-[#1E3A8A] font-black text-base border-2 border-[#1E3A8A]/30 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5"
              >
                <Video className="w-5 h-5 text-emerald-600" />
                <span>Book Video Call with Chotelal Ji</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <span className="text-xl sm:text-2xl font-black text-slate-900 block">10,000+</span>
                <span className="text-xs text-slate-500 font-bold">मरीजों को लाभ</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-[#FF9933] block">30+ Yrs</span>
                <span className="text-xs text-slate-500 font-bold">आयुर्वेदिक अनुभव</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-emerald-700 block">100% Free</span>
                <span className="text-xs text-slate-500 font-bold">गोपनीय व सुरक्षित</span>
              </div>
            </div>
          </div>

          {/* Right Mascot Hero Card Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9933]/30 via-amber-200/40 to-[#1E3A8A]/20 rounded-3xl blur-2xl transform rotate-3" />

              {/* Main Mascot Card */}
              <div className="relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FF9933]/40 shadow-2xl text-center space-y-4">
                <div className="relative mx-auto inline-block">
                  <ChotelalAvatar size="lg" expression="welcoming" glow={true} />
                  <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#1E3A8A] text-white text-[11px] font-black shadow-md whitespace-nowrap border-2 border-white">
                    वैदराज छोटेलाल जी (62 वर्ष)
                  </span>
                </div>

                <div className="pt-2">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    “नमस्ते बेटा! कैसी तबीयत है तुम्हारी?”
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 italic leading-relaxed">
                    “घबराने की कोई बात नहीं है। अपनी समस्या मुझे बताओ, मैं तुम्हें दादी-नानी के सिद्ध घरेलू नुस्खे और आयुर्वेद के अचूक उपाय बताऊंगा।”
                  </p>
                </div>

                {/* Instant Action Badges */}
                <div className="p-3.5 rounded-2xl bg-[#FFFDD0] border border-[#FF9933]/40 flex items-center justify-between text-xs font-bold text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>छोटेलाल जी ऑनलाइन हैं</span>
                  </div>
                  <span className="text-[#1E3A8A] font-black">24x7 सेवा</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
