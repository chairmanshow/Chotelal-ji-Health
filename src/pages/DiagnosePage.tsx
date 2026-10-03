import React, { useState, useRef, useEffect } from 'react';
import { PageLayout } from '../components/PageLayout';
import { ChotelalLogo } from '../components/ChotelalLogo';
import { useAuth } from '../context/AuthContext';
import {
  Mic,
  MicOff,
  Sparkles,
  FileDown,
  MessageCircle,
  Loader2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Flame,
  Feather,
  Brain,
  Activity,
  Heart,
  BookOpen,
  ShieldAlert,
  Calendar,
  User,
  Hash,
  Share2,
  Volume2,
  VolumeX,
  Square,
  Radio,
} from 'lucide-react';
import { generatePrescription } from '../lib/pdfGenerator';
import { fetchWithFallback } from '../lib/api-config';
import { ChotelalChatModal } from '../components/ChotelalChatModal';
import { generateClientAyurvedicDiagnosis } from '../lib/clientAyurvedicDiagnosis';

export const DiagnosePage: React.FC = () => {
  const { user } = useAuth();

  // Form State
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('1 hafta');
  const [severity, setSeverity] = useState<'Halka' | 'Medium' | 'Serious'>('Medium');
  const [category, setCategory] = useState<'piles' | 'hair' | 'mental' | 'general'>('piles');
  const [patientName, setPatientName] = useState(user?.displayName || 'Priye Bandhu');

  // Mic Speech-to-Text State
  const [isListening, setIsListening] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const speechRecognitionRef = useRef<any>(null);

  // Status & Results
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  // Modals & Audio
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isSpeakingPrescription, setIsSpeakingPrescription] = useState(false);
  const prescriptionAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (user?.displayName && patientName === 'Priye Bandhu') {
      setPatientName(user.displayName);
    }
  }, [user]);

  // Handle Speech-to-Text via Web Speech API in Hindi (hi-IN)
  const toggleSpeechRecognition = () => {
    if (isListening) {
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch (e) {}
      }
      setIsListening(false);
      return;
    }

    // Stop prescription audio if playing
    stopPrescriptionAudio();

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Aapke browser me speech recognition support nahi hai. Kripya type karein.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setSpokenTranscript('');
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let finalTrans = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const t = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTrans += t;
          } else {
            interim += t;
          }
        }

        const currentText = (finalTrans || interim).trim();
        if (currentText) {
          setSpokenTranscript(currentText);
          setSymptoms((prev) => {
            return currentText;
          });
        }
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition notice:', e);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      speechRecognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Speech start error:', err);
      setIsListening(false);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setError('Kripya Step 1 me apni takleef ya symptoms likhein.');
      return;
    }

    if (isListening && speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {}
      setIsListening(false);
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        symptoms: symptoms.trim(),
        duration,
        severity: severity.toLowerCase(),
        category,
        patientName: patientName.trim() || user?.displayName || 'Priye Bandhu',
      };

      let data: any = null;

      try {
        const res = await fetchWithFallback('https://chotelalji-tts.sumitshrivas24.workers.dev/api/ai-diagnose', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            data = await res.json();
          }
        }
      } catch (networkErr) {
        console.warn('Backend API unreachable or static deployment, using client Ayurvedic engine:', networkErr);
      }

      // If backend was not reached or returned 404 (e.g. on Cloudflare Pages static hosting)
      if (!data || !data.diagnosis) {
        data = generateClientAyurvedicDiagnosis(
          symptoms.trim(),
          category,
          severity.toLowerCase(),
          duration,
          patientName.trim() || user?.displayName || 'बेटा'
        );
      }

      setResult(data);

      // Smooth scroll to prescription section
      setTimeout(() => {
        const presEl = document.getElementById('prescription-result');
        if (presEl) {
          presEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } catch (err: any) {
      console.error('Diagnosis submission error, using resilient fallback:', err);
      // Guarantee result is always rendered even in unexpected edge cases
      const fallbackData = generateClientAyurvedicDiagnosis(
        symptoms.trim(),
        category,
        severity.toLowerCase(),
        duration,
        patientName.trim() || user?.displayName || 'बेटा'
      );
      setResult(fallbackData);
    } finally {
      setIsLoading(false);
    }
  };

  // Stop Prescription Audio
  const stopPrescriptionAudio = () => {
    if (prescriptionAudioRef.current) {
      try {
        prescriptionAudioRef.current.pause();
        prescriptionAudioRef.current.currentTime = 0;
      } catch (e) {}
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingPrescription(false);
  };

  // Read Prescription Aloud using Edge TTS & Web Speech fallback
  const handleListenPrescriptionAloud = async () => {
    if (isSpeakingPrescription) {
      stopPrescriptionAudio();
      return;
    }

    if (!result) return;

    setIsSpeakingPrescription(true);

    const speechText =
      `नमस्ते ${patientName || 'बेटा'}! आपकी जांच के अनुसार, समस्या ${result.diagnosis || 'त्रिदोष असंतुलन'} है। ` +
      `छोटेलाल जी की सलाह है: ${result.chotelalAdvice || 'अपने खानपान का विशेष ध्यान रखें।'}` +
      (result.herbal_remedies && result.herbal_remedies.length > 0
        ? ` मुख्य औषधि: ${result.herbal_remedies[0]}।`
        : '') +
      ` नियमित रूप से पालन करें, जल्दी ही आराम मिलेगा।`;

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: speechText,
          rate: '-10%',
          pitch: '-5Hz',
        }),
      });

      const data = await res.json();
      if (data.success && data.audioBase64) {
        if (!prescriptionAudioRef.current) {
          prescriptionAudioRef.current = new Audio();
        }
        prescriptionAudioRef.current.src = `data:${data.mimeType || 'audio/mpeg'};base64,${data.audioBase64}`;
        prescriptionAudioRef.current.onended = () => {
          setIsSpeakingPrescription(false);
        };
        prescriptionAudioRef.current.onerror = () => {
          fallbackSpeechSynthesis(speechText);
        };
        await prescriptionAudioRef.current.play();
        return;
      }
    } catch (e) {
      console.warn('Prescription TTS error, using fallback:', e);
    }

    fallbackSpeechSynthesis(speechText);
  };

  const fallbackSpeechSynthesis = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeakingPrescription(false);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[*#_`]/g, '');
      const utter = new SpeechSynthesisUtterance(clean);
      utter.lang = 'hi-IN';
      utter.rate = 0.95;
      utter.pitch = 0.95;
      utter.onstart = () => setIsSpeakingPrescription(true);
      utter.onend = () => setIsSpeakingPrescription(false);
      utter.onerror = () => setIsSpeakingPrescription(false);
      window.speechSynthesis.speak(utter);
    } catch {
      setIsSpeakingPrescription(false);
    }
  };

  // PDF Generation
  const handleDownloadPDF = () => {
    if (!result) return;
    generatePrescription({
      patientName: patientName.trim() || user?.displayName || 'Priye Bandhu',
      age: '32',
      gender: 'Specified in Profile',
      symptoms: symptoms.trim() || result.patientSummary?.reportedSymptoms || 'Ayurvedic Symptoms',
      duration,
      severity,
      diagnosis: result.diagnosis || 'Arsha / Piles Tridosha Imbalance',
      ayurvedicDosha: result.ayurvedicType || result.diagnosisDetails?.ayurvedicDosha || 'Vata-Pitta Pradhan',
      remedies: result.herbal_remedies || [],
      treatment: result.ayurvedic_treatment || [],
      exercises: result.exercises || [],
      dietAdvice: {
        foodsToEat: result.dietAdvice?.foodsToEat || ['Gunguna paani', 'Lauki', 'Moong dal'],
        foodsToAvoid: result.dietAdvice?.foodsToAvoid || ['Lal mirch', 'Tali-bhuni cheezein', 'Maida'],
      },
      advice: result.chotelalAdvice || 'Beta, aapki sehat sabse pehle hai. Ye nuskhe regular follow karo. 7 din me sudhar na dikhe to doctor se milein.',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      diagnosisId: result.diagnosisId || result.id || `CHL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    });
  };

  // WhatsApp Share
  const handleShareWhatsApp = () => {
    if (!result) return;
    const diagId = result.diagnosisId || result.id || 'CHL-2026-PRESCRIPTION';
    const remediesStr = (result.herbal_remedies || []).map((h: string) => `🌿 ${h}`).join('\n');
    const dietEatStr = (result.dietAdvice?.foodsToEat || []).slice(0, 3).join(', ');
    const dietAvoidStr = (result.dietAdvice?.foodsToAvoid || []).slice(0, 3).join(', ');

    const shareText =
      `*CHOTELAL JI HEALTH — AYURVEDIC PRESCRIPTION* 🌿\n` +
      `"Aapki Sehat, Hamari Zimmedari"\n\n` +
      `👤 *Patient:* ${patientName.trim() || user?.displayName || 'Priye Bandhu'}\n` +
      `🆔 *Diagnosis ID:* ${diagId}\n` +
      `📅 *Date:* ${new Date().toLocaleDateString('en-IN')}\n\n` +
      `📋 *Aapki Takleef:* ${symptoms}\n` +
      `🔍 *Diagnosis:* ${result.diagnosis}\n` +
      `⚖️ *Ayurvedic Type:* ${result.ayurvedicType || 'Vata-Pitta'}\n\n` +
      `🌿 *Herbal Remedies:*\n${remediesStr}\n\n` +
      `🍽️ *Diet Advice:*\n• Khayein: ${dietEatStr}\n• Avoid: ${dietAvoidStr}\n\n` +
      `💬 *Chotelal Ji Ki Salah:*\n"${result.chotelalAdvice || 'Beta, aapki sehat sabse pehle hai. Nuskhe niyam se lein.'}"\n\n` +
      `⚠️ *Disclaimer:* Ye AI-generated information hai. Emergency me turant doctor se milein.\n\n` +
      `© 2026 Sumit Shrivas. All Rights Reserved.`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleReset = () => {
    stopPrescriptionAudio();
    setResult(null);
    setSymptoms('');
    setSpokenTranscript('');
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageLayout
      pageTitle="मुफ़्त आयुर्वेदिक रोग जांच"
      pageSubtitle="चरक व सुश्रुत संहिता के प्रामाणिक ज्ञान और RAG AI पर आधारित व्यक्तिगत स्वास्थ्य विश्लेषण"
      badge="RAG Powered AI Vaidya"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#FCFBF8]/40 selection:bg-orange-100">

        {/* SECTION 1: HERO (CLEAN) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>100% निःशुल्क आयुर्वेदिक स्वास्थ्य जांच</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-serif tracking-tight">
              Apni Sehat Ka Khayal Rakhein
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Sirf 2 minute me free Ayurvedic diagnosis payein
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> चरक संहिता प्रमाणित
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-sky-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-sky-600" /> Voice & Text Chat सपोर्ट
              </span>
            </div>
          </div>

          {/* Chotelal Ji Circular Mascot Logo */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="p-2 bg-gradient-to-br from-orange-100 via-amber-50 to-blue-50 rounded-full border border-orange-200 shadow-xs">
              <ChotelalLogo size="md" showSubtitle={false} badgeOnly={true} />
            </div>
            <span className="text-[11px] font-bold text-orange-600 mt-1">वैद्यराज छोटेलाल जी</span>
          </div>
        </section>

        {/* SECTION 2: DIAGNOSIS FORM (CLEAN) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>अपनी समस्या दर्ज करें</span>
            </h2>
            <span className="text-xs text-slate-400">Step 1 to 4</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Symptoms Textbox with Web Speech API Mic and Pulsing Waveform */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full inline-flex items-center justify-center">
                    1
                  </span>
                  <span>Aapko kya takleef hai? (अपने लक्षण लिखें या बोलें)</span>
                </label>
                
                {/* Active Web Speech API Mic Toggle Button */}
                <button
                  type="button"
                  onClick={toggleSpeechRecognition}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                    isListening
                      ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-200'
                      : 'bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200'
                  }`}
                  title="बोलकर लक्षण दर्ज करें (Web Speech API)"
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-3.5 h-3.5 animate-spin" />
                      <span>सुन रहा हूँ... बोलिए (Stop Mic)</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5 text-orange-600" />
                      <span>माइक से बोलें (Voice)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  rows={3}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="उदा. मुझे 5 दिनों से पेट में जलन, कब्ज और मलत्याग के समय दर्द हो रहा है..."
                  className={`w-full p-4 rounded-2xl border transition outline-none text-slate-800 text-sm sm:text-base bg-white resize-y ${
                    isListening
                      ? 'border-emerald-500 ring-2 ring-emerald-200 bg-emerald-50/20'
                      : 'border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                  }`}
                />
              </div>

              {/* Visual Indicator: Pulsing Waveform Bars when AI / Mic is Actively Listening */}
              {isListening && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-bold">माइक चालू है • सीधे अपनी भाषा में बोलिए:</span>
                  </div>
                  {/* Animated Waveform Bars */}
                  <div className="flex items-center gap-1 h-4">
                    {[12, 22, 16, 28, 20, 14, 26, 18].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-emerald-600 rounded-full animate-bounce"
                        style={{ height: `${h}px`, animationDelay: `${i * 80}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Duration Dropdown */}
            <div className="space-y-2">
              <label className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-1.5">
                <span className="bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full inline-flex items-center justify-center">
                  2
                </span>
                <span>Kitne din se? (समस्या की अवधि)</span>
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-slate-800 text-sm font-medium bg-white"
              >
                <option value="1 din">1 din (आज से ही शुरू हुआ)</option>
                <option value="1 hafta">1 hafta (लगभग 5-7 दिन)</option>
                <option value="1 mahina">1 mahina (2 से 4 सप्ताह)</option>
                <option value="6 mahine+">6 mahine+ (काफी पुराना / क्रोनिक रोग)</option>
              </select>
            </div>

            {/* Step 3: Severity 3 Buttons */}
            <div className="space-y-2">
              <label className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-1.5">
                <span className="bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full inline-flex items-center justify-center">
                  3
                </span>
                <span>Kitna serious hai? (गंभीरता का स्तर)</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Halka', 'Medium', 'Serious'] as const).map((lvl) => {
                  const isSelected = severity === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSeverity(lvl)}
                      className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center cursor-pointer ${
                        isSelected
                          ? lvl === 'Serious'
                            ? 'bg-rose-50 border-rose-400 text-rose-700 shadow-xs'
                            : 'bg-orange-500 text-white border-orange-500 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {lvl === 'Halka' && 'हल्का (Mild)'}
                      {lvl === 'Medium' && 'मध्यम (Moderate)'}
                      {lvl === 'Serious' && 'गंभीर (Severe)'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Category 4 Cards */}
            <div className="space-y-2">
              <label className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-1.5">
                <span className="bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full inline-flex items-center justify-center">
                  4
                </span>
                <span>Category chunein (रोग की श्रेणी)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'piles', label: 'Piles', sub: 'बवासीर व जलन', icon: Activity },
                  { id: 'hair', label: 'Hair', sub: 'बाल झड़ना व डैंड्रफ', icon: Feather },
                  { id: 'mental', label: 'Mental', sub: 'तनाव व अनिद्रा', icon: Brain },
                  { id: 'general', label: 'General', sub: 'पाचन, गैस व अन्य', icon: Flame },
                ].map((item) => {
                  const isSelected = category === item.id;
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setCategory(item.id as any)}
                      className={`p-3.5 rounded-2xl border cursor-pointer text-center transition-all ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/70 text-orange-900 shadow-xs ring-1 ring-orange-400'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mx-auto mb-1 ${isSelected ? 'text-orange-600' : 'text-slate-400'}`} />
                      <div className="font-bold text-xs sm:text-sm">{item.label}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{item.sub}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Optional Patient Name */}
            <div className="pt-1">
              <label className="text-xs text-slate-500 block mb-1">
                प्रिस्क्रिप्शन पर आपका नाम (वैकल्पिक):
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="उदा. राहुल शर्मा"
                className="w-full sm:w-72 p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:border-orange-500"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-base sm:text-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>प्रामाणिक आयुर्वेदिक ग्रंथों (RAG) से जांच हो रही है...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span>Free Diagnosis Payein</span>
                </>
              )}
            </button>
          </form>
        </section>

        {/* SECTION 3: RESULT (PRESCRIPTION THEME WITH TEXT-TO-SPEECH READ ALOUD) */}
        {result && (
          <section
            id="prescription-result"
            className="scroll-mt-6 transition-all duration-500 animate-fadeIn"
          >
            {/* The Authentic Ayurvedic Prescription Paper Slip */}
            <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-md p-6 sm:p-10 text-slate-800 font-sans relative overflow-hidden">
              
              {/* Prescription Header */}
              <div className="border-b-2 border-slate-800 pb-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div className="flex items-center gap-3">
                    <ChotelalLogo size="md" showSubtitle={false} badgeOnly={true} />
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif tracking-tight flex items-center gap-1.5">
                        <span>CHOTELAL JI HEALTH</span>
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-orange-600">
                        Aapki Sehat, Hamari Zimmedari
                      </p>
                      <p className="text-[10px] text-slate-500">
                        आयुष मंत्रालय अनुपालन • 30+ वर्षों का प्रामाणिक अनुभव
                      </p>
                    </div>
                  </div>

                  {/* Right Header Metadata with TTS Listen Button */}
                  <div className="flex flex-col items-center sm:items-end gap-2">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 space-y-1 text-center sm:text-right min-w-[200px]">
                      <div>
                        <span className="font-semibold text-slate-500">Patient:</span>{' '}
                        <strong className="text-slate-900">{patientName || user?.displayName || 'Priye Bandhu'}</strong>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-500">Date:</span>{' '}
                        <strong>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-500">Diagnosis ID:</span>{' '}
                        <strong className="text-orange-700">{result.diagnosisId || result.id || 'CHL-2026-9284'}</strong>
                      </div>
                    </div>

                    {/* Prominent Listen Aloud Text-to-Speech Button */}
                    <button
                      type="button"
                      onClick={handleListenPrescriptionAloud}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
                        isSpeakingPrescription
                          ? 'bg-orange-600 text-white animate-pulse ring-2 ring-orange-300'
                          : 'bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200'
                      }`}
                      title="पूरा पर्चा आवाज़ में सुनें (Text-to-Speech)"
                    >
                      {isSpeakingPrescription ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-white" />
                          <span>रोकें (Stop Audio)</span>
                          {/* Pulsing Waveform Bars */}
                          <div className="flex items-center gap-0.5 h-3 ml-1">
                            {[10, 16, 22, 14].map((h, i) => (
                              <span
                                key={i}
                                className="w-1 bg-white rounded-full animate-pulse"
                                style={{ height: `${h}px`, animationDelay: `${i * 90}ms` }}
                              />
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 text-orange-600" />
                          <span>🔊 आवाज़ में सुनें (Read Aloud)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Prescription Body Details */}
              <div className="py-6 space-y-6 text-sm sm:text-base leading-relaxed">
                
                {/* 📋 Aapki Takleef */}
                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/70">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 text-orange-700 mb-1">
                    <span>📋 Aapki Takleef (Reported Symptoms):</span>
                  </h3>
                  <p className="text-slate-800 font-medium italic">
                    &ldquo;{symptoms.trim() || result.patientSummary?.reportedSymptoms}&rdquo;
                  </p>
                  <div className="text-xs text-slate-500 mt-1">
                    अवधि: <strong>{duration}</strong> | गंभीरता: <strong>{severity}</strong>
                  </div>
                </div>

                {/* 🔍 Diagnosis & Ayurvedic Type */}
                <div className="border-b border-slate-200 pb-4">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 mb-2">
                    <span className="text-orange-600 font-black">🔍 Diagnosis:</span>
                    <span className="text-slate-900 font-serif text-lg">{result.diagnosis}</span>
                  </h3>
                  <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-900 px-3 py-1 rounded-xl text-xs font-bold">
                    <span>Ayurvedic Type:</span>
                    <span className="text-blue-700">{result.ayurvedicType || result.diagnosisDetails?.ayurvedicDosha || 'वात-पित्त प्रधान त्रिदोष'}</span>
                  </div>
                </div>

                {/* 🌿 Herbal Remedies */}
                <div className="border-b border-slate-200 pb-4 space-y-2">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 text-emerald-800">
                    <span>🌿 Herbal Remedies (शास्त्रीय औषधियां व खुराक):</span>
                  </h3>
                  <ul className="space-y-2 pl-2">
                    {(result.herbal_remedies || []).map((herb: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-slate-800 font-medium">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                        <span>{herb}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 🧘 Ayurvedic Treatment */}
                {(result.ayurvedic_treatment?.length > 0) && (
                  <div className="border-b border-slate-200 pb-4 space-y-2">
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 text-sky-800">
                      <span>🧘 Ayurvedic Treatment (आयुर्वेदिक उपचार व प्राकृतिक थेरेपी):</span>
                    </h3>
                    <ul className="space-y-1.5 pl-2">
                      {result.ayurvedic_treatment.map((t: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-slate-700">
                          <span className="text-sky-600 font-bold shrink-0 mt-0.5">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 🤸 Yoga & Exercises */}
                {(result.exercises?.length > 0) && (
                  <div className="border-b border-slate-200 pb-4 space-y-2">
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 text-purple-900">
                      <span>🤸 Yoga &amp; Exercises (योगासन व प्राणायाम):</span>
                    </h3>
                    <ul className="space-y-1.5 pl-2">
                      {result.exercises.map((ex: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-slate-700">
                          <span className="text-purple-600 font-bold shrink-0 mt-0.5">•</span>
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 🍽️ Diet Advice */}
                <div className="border-b border-slate-200 pb-4 space-y-2">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 text-amber-800">
                    <span>🍽️ Diet Advice (पथ्य एवं अपथ्य आहार):</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-emerald-950">
                      <strong className="block text-emerald-800 mb-1 font-bold">✓ Khayein (पथ्य - लाभकारी):</strong>
                      <p>{(result.dietAdvice?.foodsToEat || ['गुनगुना पानी', 'मूंग दाल खिचड़ी', 'ताजा फल']).join(', ')}</p>
                    </div>
                    <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-200 text-rose-950">
                      <strong className="block text-rose-800 mb-1 font-bold">✗ Avoid (अपथ्य - वर्जित):</strong>
                      <p>{(result.dietAdvice?.foodsToAvoid || ['लाल मिर्च', 'तली-भुनी चीजें', 'मैदा']).join(', ')}</p>
                    </div>
                  </div>
                </div>

                {/* 📚 Verified Classical Sources & Citations (RAG) */}
                {result.citations && result.citations.length > 0 && (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-orange-600" />
                      <span>प्रमाणिक ग्रंथ संदर्भ (Classical Sources):</span>
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {result.citations.map((c: string, idx: number) => (
                        <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-medium text-[11px]">
                          📜 {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 💬 Chotelal Ji Ki Salah with Audio Indicator */}
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
                      <span>💬 Chotelal Ji Ki Salah:</span>
                    </h4>
                    {isSpeakingPrescription && (
                      <span className="text-orange-700 text-xs font-bold flex items-center gap-1">
                        <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                        <span>आवाज़ में पढ़ रहे हैं...</span>
                      </span>
                    )}
                  </div>
                  <p className="text-slate-900 font-medium italic text-sm sm:text-base leading-relaxed">
                    &ldquo;{result.chotelalAdvice || 'Beta, aapki sehat sabse pehle hai. Ye nuskhe regular follow karo. 7 din me sudhar na dikhe to doctor se milein.'}&rdquo;
                  </p>
                </div>

                {/* ⚠️ Disclaimer */}
                <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-normal flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Disclaimer:</strong> {result.warning || 'Ye AI-generated information hai. Emergency me turant doctor se milein.'}
                  </span>
                </div>
              </div>

              {/* Prescription Footer */}
              <div className="pt-4 border-t-2 border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-800">
                  © 2026 Sumit Shrivas | All Rights Reserved
                </span>
                <span className="font-semibold text-slate-500">
                  Chotelal Ji Health Platform
                </span>
              </div>
            </div>

            {/* SECTION 4: ACTIONS */}
            <div className="mt-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                {/* Download PDF button (orange) */}
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-xs transition cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>

                {/* Share on WhatsApp button (green) */}
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-xs transition cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share on WhatsApp</span>
                </button>

                {/* Voice Chat with Chotelal Ji (3-Step Q&A + YouTube Video) */}
                <button
                  type="button"
                  onClick={() => setIsChatModalOpen(true)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-xs transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Ask Chotelal Ji (AI Voice Chat)</span>
                </button>
              </div>

              {/* Reset link */}
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-orange-600 underline font-semibold cursor-pointer ml-auto"
              >
                + Nayi Jaanch Karein (New Diagnosis)
              </button>
            </div>
          </section>
        )}

        {/* Diagnostic Voice Chat Modal with 3-Step Q&A & YouTube Video */}
        <ChotelalChatModal
          isOpen={isChatModalOpen}
          onClose={() => setIsChatModalOpen(false)}
          diagnosisContext={result}
        />
      </div>
    </PageLayout>
  );
};
