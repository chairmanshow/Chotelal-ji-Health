import React, { useState } from 'react';
import { DiagnosisResultData } from '../types';
import { ChotelalAvatar } from './ChotelalAvatar';
import { DietChartSection } from './DietChartSection';
import { generatePrescription, generatePrescriptionPDF } from '../lib/pdfGenerator';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Printer,
  ShoppingBag,
  Stethoscope,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Flame,
  Droplets,
  HeartPulse,
  Leaf,
  Layers,
  ArrowRight,
  FlaskConical,
  MapPin,
  ExternalLink,
  Download,
  FileCheck,
} from 'lucide-react';

interface DiagnosisResultProps {
  result: DiagnosisResultData;
  onOpenChatWithContext?: () => void;
  onResetDiagnosis?: () => void;
  onOpenSearchGrounding?: (query: string) => void;
  onOpenMapsGrounding?: () => void;
  onOpenLiveVoice?: () => void;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  result,
  onOpenChatWithContext,
  onResetDiagnosis,
  onOpenSearchGrounding,
  onOpenMapsGrounding,
  onOpenLiveVoice,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<'tier1' | 'tier2' | 'tier3'>('tier1');

  // Text to speech playback using browser Web Speech API
  const handlePlayVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('आपके ब्राउज़र में वॉइस स्पीच उपलब्ध नहीं है।');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToSpeak = `${result.chotelalPersonalNote}. आपकी संभावित समस्या है ${result.diagnosis.primaryConditionHindi}. इसके उपचार के लिए घरेलू नुस्खे और योगासन नीचे विस्तार से दिए गए हैं।`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlayingAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const handlePrintReport = () => {
    window.print();
  };

  // Generate & Download Authentic Ayurvedic Prescription PDF using jspdf + jspdf-autotable
  const handleDownloadPrescription = () => {
    generatePrescription({
      patientName: 'Aadarneey Mareez (Patient)',
      age: '28',
      gender: 'Male / Female',
      symptoms: result.patientSummary?.reportedSymptoms || result.diagnosis_text || 'General digestive discomfort and sitting strain',
      duration: result.patientSummary?.duration || '1 to 2 weeks',
      severity: result.patientSummary?.severity || 'Moderate',
      diagnosis: result.diagnosis?.primaryConditionHindi
        ? `${result.diagnosis.primaryConditionHindi} (${result.diagnosis.primaryCondition})`
        : result.diagnosis_text || 'Ayurvedic Assessment',
      ayurvedicDosha: result.diagnosis?.ayurvedicDosha || 'Vata-Pitta Aggravation (अपान वात व पित्त असंतुलन)',
      remedies: result.tier1HerbalRemedies || result.herbal_remedies || [],
      treatment: result.ayurvedic_treatment || ['Kshar Sutra & Deepana Pachana', 'Warm compress & Sitz bath'],
      exercises: result.exercises || (result.tier2LifestyleAndYoga ? result.tier2LifestyleAndYoga.map((y) => y.title) : ['Ashwini Mudra', 'Vajrasana']),
      advice: result.chotelalPersonalNote || 'Beta, aapki sehat sabse pehle hai. Ye nuskhe regular follow karo, paani zyada piyo, aur stress kam lo. 7 din me sudhar na dikhe to kisi qualified doctor se zaroor milein. Main aapki sehat ka khayal rakhta hoon. — Chotelal Ji',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      diagnosisId: result.id || `CHL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    });
  };

  return (
    <section id="diagnosis-result" className="py-12 bg-amber-50/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Card with Chotelal Ji Mascot Voice Note */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative shrink-0">
              <ChotelalAvatar
                size="lg"
                expression={isPlayingAudio ? 'speaking' : 'advising'}
                glow={true}
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full whitespace-nowrap border border-white">
                छोटेलाल जी वैद
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>AI स्वास्थ्य विश्लेषण पूर्ण (Confidence: {result.diagnosis.confidenceScore}%)</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Download Prescription Button (Professional PDF in orange + cream theme) */}
                  <button
                    onClick={handleDownloadPrescription}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-black shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                    title="छोटेलाल जी का आधिकारिक आयुर्वेदिक पर्चा डाउनलोड करें"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Prescription (पर्चा)</span>
                  </button>

                  <button
                    onClick={handlePlayVoice}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      isPlayingAudio
                        ? 'bg-orange-600 text-white animate-pulse'
                        : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>आवाज़ रोकें (Stop)</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-orange-600" />
                        <span>छोटेलाल जी की आवाज़ में सुनें</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrintReport}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                    title="स्वास्थ्य पत्रिका प्रिंट करें"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">प्रिंट / PDF</span>
                  </button>
                </div>
              </div>

              {/* Chotelal Ji Speech */}
              <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-slate-800 leading-relaxed font-medium text-sm sm:text-base">
                <span className="text-xl mr-1">“</span>
                {result.chotelalPersonalNote}
                <span className="text-xl ml-1">”</span>
              </div>

              {/* Primary Condition Highlights */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    संभावित रोग / विकार (Probable Diagnosis):
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                    {result.diagnosis.primaryConditionHindi}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">
                    {result.diagnosis.primaryCondition}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    आयुर्वेदिक दोष विश्लेषण (Ayurvedic Dosha):
                  </span>
                  <h3 className="text-base font-bold text-orange-700 mt-0.5">
                    {result.diagnosis.ayurvedicDosha}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {result.diagnosis.rootCauseAnalysis}
                  </p>
                </div>
              </div>

              {/* Dynamic Live Prescription Callout */}
              {(result.herbal_remedies?.length || result.warning) && (
                <div className="mt-4 p-4 rounded-2xl bg-linear-to-r from-orange-50 via-amber-50 to-emerald-50 border border-orange-200 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block p-1 bg-orange-600 text-white rounded-lg text-xs font-black">
                      Live AI
                    </span>
                    <h4 className="text-sm font-black text-slate-900">
                      छोटेलाल जी का कस्टमाइज्ड आयुर्वेदिक पर्चा (Dynamic AI Diagnosis)
                    </h4>
                  </div>
                  {result.warning && (
                    <div className="mb-3 p-2.5 bg-red-50/90 border border-red-200 rounded-xl text-red-800 text-xs font-bold flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                      <span>{result.warning}</span>
                    </div>
                  )}
                  {result.herbal_remedies && result.herbal_remedies.length > 0 && (
                    <div className="mb-2">
                      <span className="text-[11px] font-black uppercase text-emerald-800 block">
                        🌿 सटीक जड़ी-बूटी व खुराक (Herbal Remedies with Dosage):
                      </span>
                      <ul className="list-disc list-inside text-xs text-slate-700 font-semibold space-y-1 mt-1">
                        {result.herbal_remedies.map((herb, idx) => (
                          <li key={idx}>{herb}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.exercises && result.exercises.length > 0 && (
                    <div>
                      <span className="text-[11px] font-black uppercase text-amber-800 block">
                        🧘‍♂️ विशेष योगासन व मुद्रा (Targeted Exercises):
                      </span>
                      <ul className="list-disc list-inside text-xs text-slate-700 font-semibold space-y-1 mt-1">
                        {result.exercises.map((ex, idx) => (
                          <li key={idx}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Layout: 3-Tier Holistic Treatment Plan */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Tier Tabs Navigation */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2">
              <button
                onClick={() => setActiveTab('tier1')}
                className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'tier1'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Leaf className="w-4 h-4" />
                <span>1st: हर्बल व घरेलू नुस्खे</span>
              </button>

              <button
                onClick={() => setActiveTab('tier2')}
                className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'tier2'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>2nd: योग व सिटिंग सुधार</span>
              </button>

              <button
                onClick={() => setActiveTab('tier3')}
                className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'tier3'
                    ? 'bg-indigo-700 text-white shadow-md shadow-indigo-700/20'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                <span>3rd: AI डॉक्टर सलाह</span>
              </button>
            </div>

            {/* TAB 1: HERBAL & AYURVEDIC REMEDIES */}
            {activeTab === 'tier1' && (
              <div className="space-y-4">
                <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                    <Leaf className="w-5 h-5 text-emerald-600" />
                    <span>प्राचीन आयुर्वेद एवं घरेलू नुस्खे (Herbal Remedies)</span>
                  </div>
                  <span className="text-xs bg-emerald-200 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full">
                    बिना साइड-इफेक्ट
                  </span>
                </div>

                {result.tier1HerbalRemedies.map((remedy, idx) => (
                  <div
                    key={remedy.id || idx}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-1">
                          नुस्खा #{idx + 1}
                        </div>
                        <h4 className="text-base sm:text-lg font-black text-slate-900">
                          {remedy.hindiName || remedy.name}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">{remedy.name}</p>
                      </div>
                      <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-700 border border-emerald-200">
                        <Leaf className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <strong className="text-slate-900 block mb-0.5">सामग्री (Ingredients):</strong>
                        <span>{remedy.ingredients}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/60">
                        <strong className="text-emerald-950 block mb-0.5">
                          सेवन/प्रयोग की विधि (How to Use):
                        </strong>
                        <span>{remedy.howToUse}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                        <div className="bg-slate-50 p-2.5 rounded-lg">
                          <span className="text-slate-400 block font-bold">समय व आवृत्ति:</span>
                          <span className="font-semibold text-slate-800">{remedy.frequency}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg">
                          <span className="text-slate-400 block font-bold">मुख्य लाभ (Benefits):</span>
                          <span className="font-semibold text-emerald-700">{remedy.benefits}</span>
                        </div>
                      </div>

                      {remedy.caution && (
                        <p className="text-[11px] text-amber-700 font-medium bg-amber-50 p-2 rounded-lg border border-amber-200">
                          ⚠️ <strong>सावधानी:</strong> {remedy.caution}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: LIFESTYLE, POSTURE & YOGA */}
            {activeTab === 'tier2' && (
              <div className="space-y-4">
                <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <Layers className="w-5 h-5 text-amber-600" />
                    <span>जीवनशैली, सिटिंग पोस्चर व योगासन (Lifestyle & Posture)</span>
                  </div>
                  <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2.5 py-0.5 rounded-full">
                    जड़ से निवारण
                  </span>
                </div>

                {result.tier2LifestyleAndYoga.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-100 shadow-md"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                          {item.type}
                        </span>
                        <h4 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                          {item.hindiTitle || item.title}
                        </h4>
                      </div>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        {item.timing}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                      {item.instructions}
                    </p>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs mb-4">
                      <strong className="text-amber-900 block mb-0.5">शरीर को क्या फायदा होगा:</strong>
                      <span className="text-slate-700">{item.benefits}</span>
                    </div>

                    {/* Do's and Don'ts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {item.dos && item.dos.length > 0 && (
                        <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/60">
                          <span className="font-bold text-emerald-800 block mb-1">
                            ✓ क्या करें (Do's):
                          </span>
                          <ul className="space-y-1">
                            {item.dos.map((d, i) => (
                              <li key={i} className="flex items-center gap-1.5 text-emerald-950">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.donts && item.donts.length > 0 && (
                        <div className="bg-red-50/60 p-3 rounded-xl border border-red-200/60">
                          <span className="font-bold text-red-800 block mb-1">
                            ✕ क्या न करें (Don'ts):
                          </span>
                          <ul className="space-y-1">
                            {item.donts.map((d, i) => (
                              <li key={i} className="flex items-center gap-1.5 text-red-950">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: AI DOCTOR CLINICAL ADVICE & RED FLAGS */}
            {activeTab === 'tier3' && (
              <div className="space-y-4">
                <div className="bg-indigo-50/80 p-4 rounded-2xl border border-indigo-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                    <Stethoscope className="w-5 h-5 text-indigo-700" />
                    <span>AI डॉक्टर क्लिनिकल गाइड एवं परीक्षण (Doctor Triage)</span>
                  </div>
                  <span className="text-xs bg-indigo-200 text-indigo-900 font-bold px-2.5 py-0.5 rounded-full">
                    विशेषज्ञ सलाह
                  </span>
                </div>

                {/* Doctor Clinical Guidance Summary */}
                <div className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      सुझाए गए विशेषज्ञ (Recommended Specialist):
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">
                    {result.tier3DoctorAdvice.specialistType}
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {result.tier3DoctorAdvice.aiDoctorSummary}
                  </p>

                  {/* Red Flags / Emergency Warnings */}
                  <div className="mt-5 p-4 rounded-xl bg-red-50 border-2 border-red-200">
                    <div className="flex items-center gap-2 text-red-800 font-black text-sm mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>कब तुरंत अस्पताल या डॉक्टर के पास जाना चाहिए (Red Flags):</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-red-900 font-medium">
                      {result.tier3DoctorAdvice.redFlags.map((flag, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-600 font-bold mt-0.5">•</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Lab Tests */}
                  {result.tier3DoctorAdvice.recommendedLabTests.length > 0 && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <strong className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                        जांच के लिए अनुशंसित टेस्ट (Recommended Lab Tests):
                      </strong>
                      <div className="flex flex-wrap gap-2">
                        {result.tier3DoctorAdvice.recommendedLabTests.map((test, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white text-slate-700 font-semibold px-3 py-1 rounded-lg border border-slate-300 shadow-xs"
                          >
                            🧪 {test}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Talk to Chotelal Ji Direct CTA */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-sm font-extrabold text-slate-900 block">
                        संदेह या सवाल? छोटेलाल जी से तुरंत पूछें
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        30 वर्षों का अनुभव • 100% व्यक्तिगत व निःशुल्क समाधान
                      </span>
                    </div>

                    <button
                      onClick={onOpenChatWithContext}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/25 transition-all hover:scale-105 active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Talk to Chotelal Ji (बात करें)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Real-world Grounded Health Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Google Search Grounding for clinical trials & scientific evidence */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-indigo-950 font-black text-xs sm:text-sm">
                    <FlaskConical className="w-4 h-4 text-indigo-700" />
                    <span>क्लिनिकल शोध व वैज्ञानिक प्रमाण</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                    Google Search व gemini-3.5-flash द्वारा इस रोग व जड़ी-बूटियों पर आधुनिक मेडिकल ट्रायल्स देखें।
                  </p>
                </div>
                {onOpenSearchGrounding && (
                  <button
                    onClick={() =>
                      onOpenSearchGrounding(
                        result.diagnosis?.primaryConditionHindi ||
                          result.diagnosis?.primaryCondition ||
                          'Triphala clinical trials'
                      )
                    }
                    className="w-full py-2.5 px-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>शोधपत्र व वेब संदर्भ देखें (Search)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Google Maps Grounding for finding local Ayurvedic Clinics & Panchakarma */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-emerald-950 font-black text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                    <span>नजदीकी पंचकर्म व आयुर्वेदिक क्लिनिक</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                    Google Maps व gemini-3.5-flash द्वारा अपने आसपास सत्यापित वैद्य व क्षार-सूत्र केंद्र खोजें।
                  </p>
                </div>
                {onOpenMapsGrounding && (
                  <button
                    onClick={onOpenMapsGrounding}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>मैप्स पर क्लिनिक खोजें (Maps)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* AI Personal Diet Chart Section (7-day plan with breakfast, lunch, dinner, snacks and PDF download) */}
            <DietChartSection
              condition={result.diagnosis?.primaryConditionHindi || result.diagnosis?.primaryCondition || 'सामान्य स्वास्थ्य'}
              category={result.patientSummary?.category || 'general'}
              symptoms={result.patientSummary?.reportedSymptoms || ''}
              dosha={result.diagnosis?.ayurvedicDosha || 'दोषीय असंतुलन'}
              patientName="सम्मानित मरीज (Patient)"
            />

            {/* Bottom Actions for Patient */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {onOpenLiveVoice && (
                  <button
                    onClick={onOpenLiveVoice}
                    className="text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-emerald-900/20"
                  >
                    <span>CALL FOR FREE (छोटेलाल जी से बात)</span>
                  </button>
                )}

                <button
                  onClick={onOpenChatWithContext}
                  className="text-xs sm:text-sm font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 px-5 py-2.5 rounded-xl border border-amber-300 flex items-center gap-2 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-orange-600" />
                  <span>छोटेलाल जी से बात करें</span>
                </button>
              </div>

              <button
                onClick={onResetDiagnosis}
                className="text-xs text-slate-500 hover:text-slate-800 font-bold px-3 py-1.5"
              >
                ← नए लक्षण जांचें (Reset)
              </button>
            </div>
          </div>
        </div>
      </section>
  );
};
