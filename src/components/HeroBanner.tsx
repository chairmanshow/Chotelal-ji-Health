import React from 'react';
import { ChotelalAvatar } from './ChotelalAvatar';
import { HealthCategory } from '../types';
import { ArrowDown, ShieldCheck, HeartHandshake, Leaf, Stethoscope, Sparkles, MessageCircle, PhoneCall } from 'lucide-react';

interface HeroBannerProps {
  onSelectCategory: (cat: HealthCategory) => void;
  onScrollToDiagnosis: () => void;
  onOpenChat?: () => void;
  onOpenLiveVoice?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  onScrollToDiagnosis,
  onOpenChat,
  onOpenLiveVoice,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50/80 via-orange-50/40 to-white py-10 sm:py-16 border-b border-amber-100">
      {/* Decorative background orbs */}
      <div className="absolute top-0 right-10 -z-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Mascot Character & Greeting Speech Bubble */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            {/* Chotelal Ji Interactive Mascot Presentation */}
            <div className="relative mb-4">
              <ChotelalAvatar size="hero" expression="welcoming" glow={true} />

              {/* Verified Vaidya Badge */}
              <div className="absolute -bottom-2 bg-gradient-to-r from-orange-600 to-amber-700 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5">
                <span>छोटेलाल जी</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                <span className="text-amber-200 font-medium">वरिष्ठ स्वास्थ्य परामर्शक</span>
              </div>
            </div>

            {/* Mascot Dialogue Box */}
            <div className="relative mt-3 max-w-md bg-white p-4 sm:p-5 rounded-2xl shadow-md border-2 border-amber-200/80 text-left">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-t-2 border-l-2 border-amber-200/80 rotate-45" />
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block p-1 bg-amber-100 rounded-md text-orange-700">
                  <HeartHandshake className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-orange-800 uppercase tracking-wide">
                  छोटेलाल जी का आत्मीय संदेश
                </span>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">
                "नमस्ते बेटा! सेहत में कोई भी उलझन हो - चाहे लंबे समय बैठने से <strong className="text-orange-700">बवासीर या दर्द</strong> हो, रात को <strong className="text-orange-700">नींद व तनाव</strong> की दिक्कत हो, <strong className="text-orange-700">बाल झड़ रहे</strong> हों या <strong className="text-orange-700">बुखार/कमजोरी</strong> हो।
                नीचे अपनी समस्या बताओ, मैं खुद जांच करके प्रामाणिक आयुर्वेदिक व आधुनिक समाधान दूंगा!"
              </p>
            </div>
          </div>

          {/* Right Column: Startup Value Proposition & Direct Category Pickers */}
          <div className="lg:col-span-7">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 text-orange-900 border border-orange-200 text-xs font-black mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>20-30 की उम्र में IT सिटिंग दर्द, तनाव व हेयर फॉल? तुरंत मुफ़्त समाधान</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              कुर्सी पर बैठने से दर्द, रात में तनाव या बाल झड़ना? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700">
                वैद्य छोटेलाल जी से सीधा समाधान पाएं
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">
              10-घंटे लैपटॉप पर बैठकर काम करने वाले युवाओं के लिए विशेष: <strong>1st लेवल:</strong> 3-दिन में दर्द शांत करने वाले क्लासिकल घरेलू नुस्खे, <strong>2nd लेवल:</strong> टेलबोन व स्पाइन एर्गोनॉमिक्स, <strong>3rd लेवल:</strong> 1-ऑन-1 मुफ़्त लाइव वॉइस कॉल।
            </p>

            {/* Quick 4 Category Buttons */}
            <div className="mt-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                त्वरित श्रेणी चुनें (Choose Your Problem Category):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onSelectCategory('piles_sitting');
                    onScrollToDiagnosis();
                  }}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-amber-200 hover:border-orange-500 hover:shadow-md transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    🪑
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 group-hover:text-orange-600">
                      बवासीर व सिटिंग समस्याएं
                    </h2>
                    <p className="text-xs text-slate-500">Piles, Fissure, Sitting Pain</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectCategory('mental_health');
                    onScrollToDiagnosis();
                  }}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-amber-200 hover:border-orange-500 hover:shadow-md transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    🧠
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 group-hover:text-orange-600">
                      मानसिक स्वास्थ्य व तनाव
                    </h2>
                    <p className="text-xs text-slate-500">Anxiety, Insomnia, Stress</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectCategory('hair_growth');
                    onScrollToDiagnosis();
                  }}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-amber-200 hover:border-orange-500 hover:shadow-md transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    🌿
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 group-hover:text-orange-600">
                      हेयर ग्रोथ व बाल झड़ना
                    </h2>
                    <p className="text-xs text-slate-500">Hair Fall, Dandruff, Regrowth</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectCategory('general');
                    onScrollToDiagnosis();
                  }}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-amber-200 hover:border-orange-500 hover:shadow-md transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    🩺
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 group-hover:text-orange-600">
                      सामान्य रोग, बुखार व गैस
                    </h2>
                    <p className="text-xs text-slate-500">Fever, Acidity, Joint Ache</p>
                  </div>
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              {onOpenLiveVoice && (
                <button
                  onClick={onOpenLiveVoice}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-500 text-white font-black text-base shadow-xl shadow-emerald-600/30 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 border-2 border-emerald-400"
                >
                  <PhoneCall className="w-5 h-5 text-emerald-100 animate-bounce" />
                  <span>CALL FOR FREE</span>
                </button>
              )}

              <button
                onClick={onScrollToDiagnosis}
                className="px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-base shadow-lg shadow-orange-600/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>निःशुल्क AI जांच</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              {onOpenChat && (
                <button
                  onClick={onOpenChat}
                  className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 font-extrabold text-sm sm:text-base shadow-sm flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="w-4 h-4 text-orange-600" />
                  <span>मैसेज चैट</span>
                </button>
              )}

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1 text-emerald-700">
                  <ShieldCheck className="w-4 h-4" /> 100% गोपनीय
                </span>
                <span className="flex items-center gap-1 text-orange-700">
                  <Leaf className="w-4 h-4" /> शुद्ध आयुर्वेदिक
                </span>
                <span className="flex items-center gap-1 text-indigo-700">
                  <Stethoscope className="w-4 h-4" /> डॉक्टर सत्यापित
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
