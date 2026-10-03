import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Square,
  Play,
  RotateCcw,
  FileDown,
  ExternalLink,
  Star,
  CheckCircle2,
  ShieldCheck,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { ChotelalFace } from './ChotelalFace';
import { speak, stopSpeaking, toggleAudioMuted, isAudioMuted, subscribeSpeakingStatus } from '../lib/ttsService';
import { YouTubeVideoRecommendation } from '../lib/youtubeRecommendations';
import { generatePrescription } from '../lib/pdfGenerator';
import { generateClientAyurvedicDiagnosis } from '../lib/clientAyurvedicDiagnosis';

interface ChatMessage {
  id: string;
  sender: 'user' | 'chotelal';
  text: string;
  timestamp: string;
  isQuestion?: boolean;
  questionNumber?: number;
  isFinalDiagnosis?: boolean;
  diagnosisData?: {
    diagnosis: string;
    remedies: Array<{ name: string; dosage?: string; howToTake?: string }> | string[];
    exercises: string[];
    dietAdvice: { foodsToEat: string[]; foodsToAvoid: string[] };
    recommendedVideo?: YouTubeVideoRecommendation;
    chotelalAdvice: string;
    isExpertPlus?: boolean;
  };
}

interface ChotelalChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagnosisContext?: any;
  startWithExpertPlus?: boolean;
}

export const ChotelalChatModal: React.FC<ChotelalChatModalProps> = ({
  isOpen,
  onClose,
  diagnosisContext,
  startWithExpertPlus = false,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingState, setIsSpeakingState] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isExpertPlusMode, setIsExpertPlusMode] = useState<boolean>(startWithExpertPlus);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const hasInitializedRef = useRef<boolean>(false);

  // Sync TTS state
  useEffect(() => {
    const unsub = subscribeSpeakingStatus((speaking) => {
      setIsSpeakingState(speaking);
    });
    setMuted(isAudioMuted());
    return () => {
      unsub();
      stopSpeaking();
    };
  }, []);

  // Initialize or reset conversation when opened
  useEffect(() => {
    if (isOpen) {
      if (!hasInitializedRef.current || messages.length === 0) {
        hasInitializedRef.current = true;
        setCurrentStep(1);
        setIsExpertPlusMode(startWithExpertPlus);

        const welcomeText = isExpertPlusMode
          ? 'Namaste beta! Main Chotelal Ji hoon. Aapka swagat hai Expert+ Consultation me. Batao, aapko kya takleef hai? Main aapki poori sthiti samajh kar nuskhe aur aahar chart banaunga.'
          : 'Namaste beta! Main Chotelal Ji hoon. Batao, aapko kya takleef hai?';

        const welcomeMsg: ChatMessage = {
          id: 'welcome-' + Date.now(),
          sender: 'chotelal',
          text: welcomeText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([welcomeMsg]);

        // Speak welcome message
        setTimeout(() => {
          speak(welcomeText);
        }, 300);
      }
    } else {
      stopSpeaking();
      stopListening();
    }
  }, [isOpen, startWithExpertPlus]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Microphone - Web Speech API (hi-IN)
  const startListening = () => {
    stopSpeaking();
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Aapke browser me speech recognition support nahi hai. Kripya type karein.');
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setInputText(transcript);
          handleSendMessage(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
          console.warn('Speech recognition status:', event.error);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.warn('Mic start error:', e);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  // Toggle Mute Audio
  const handleToggleMute = () => {
    const next = toggleAudioMuted();
    setMuted(next);
  };

  // Send Message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    stopSpeaking();
    stopListening();

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      let data: any = null;

      try {
        const response = await fetch('https://chotelalji-tts.sumitshrivas24.workers.dev/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            history: [...messages, userMsg].map((m) => ({
              sender: m.sender,
              text: m.text,
            })),
            step: currentStep,
            isExpertPlus: isExpertPlusMode,
            currentDiagnosisContext: diagnosisContext,
          }),
        });

        if (response.ok) {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            data = await response.json();
          }
        }
      } catch (networkErr) {
        console.warn('Backend chat unreachable or static host, using client conversational engine:', networkErr);
      }

      // If backend was not reached or returned 404 (e.g. on Cloudflare Pages static hosting)
      if (!data || !data.reply) {
        const userMessages = [...messages, userMsg]
          .filter((m) => m.sender === 'user')
          .map((m) => m.text)
          .join(' ');

        if (currentStep === 1) {
          data = {
            reply: 'Haan beta, maine aapki takleef suni. Ye batao ki kitne din se ye pareshani hai, aur kya dard ya jalan zyada rehti hai?',
            stage: 'question',
            isFinalDiagnosis: false,
            questionNumber: 1,
          };
        } else if (currentStep === 2) {
          data = {
            reply: 'Theek hai beta. Ye batao ki kya roz subah pet theek se saaf hota hai, aur neend theek se aati hai ya stress rehta hai?',
            stage: 'question',
            isFinalDiagnosis: false,
            questionNumber: 2,
          };
        } else {
          // Final Prescription Step
          const diagResult = generateClientAyurvedicDiagnosis(userMessages, 'general', 'medium', '1 hafta', 'बेटा');
          data = {
            reply: `Beta, maine aapki poori sthiti samajh li hai. Niche maine aapke liye classical Ayurvedic aushadhi, yoga, aahar aur Patanjali ka YouTube video jod diya hai. Inka niyam se palan karein. Apna khayal rakhna beta.`,
            stage: 'final',
            isFinalDiagnosis: true,
            questionNumber: 3,
            diagnosis: diagResult.diagnosis,
            remedies: diagResult.herbal_remedies,
            exercises: diagResult.exercises,
            dietAdvice: diagResult.dietAdvice,
            recommendedVideo: diagResult.recommendedVideo,
            chotelalAdvice: diagResult.chotelalAdvice,
          };
        }
      }

      const replyText = data.reply || 'Namaste beta! Gunguna paani piyo aur aaram karo. Apna khayal rakhna beta.';
      const isFinal = Boolean(data.isFinalDiagnosis);
      const nextStepNum = isFinal ? 4 : (data.questionNumber || currentStep) + 1;
      setCurrentStep(nextStepNum);

      const chotelalReply: ChatMessage = {
        id: 'chotelal-' + Date.now(),
        sender: 'chotelal',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isQuestion: !isFinal,
        questionNumber: data.questionNumber || currentStep,
        isFinalDiagnosis: isFinal,
        diagnosisData: isFinal
          ? {
              diagnosis: data.diagnosis || 'Ayurvedic Dosha Imbalance',
              remedies: data.remedies || [],
              exercises: data.exercises || [],
              dietAdvice: data.dietAdvice || { foodsToEat: [], foodsToAvoid: [] },
              recommendedVideo: data.recommendedVideo,
              chotelalAdvice: data.chotelalAdvice || 'Apna khayal rakhna beta. 7 din me sudhar na dikhe to doctor se milein.',
              isExpertPlus: isExpertPlusMode,
            }
          : undefined,
      };

      setMessages((prev) => [...prev, chotelalReply]);

      // Speak reply aloud in fast, warm Indian male tone
      speak(replyText);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackText = 'Namaste beta! Gunguna paani piyo aur saada khana khao. Apna khayal rakhna beta.';
      setMessages((prev) => [
        ...prev,
        {
          id: 'chote-err-' + Date.now(),
          sender: 'chotelal',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      speak(fallbackText);
    } finally {
      setIsLoading(false);
    }
  };

  // Replay voice for any message
  const handleReplayVoice = (text: string) => {
    stopSpeaking();
    speak(text);
  };

  // Download PDF Prescription from the card
  const handleDownloadPDF = (diagData: any) => {
    generatePrescription({
      patientName: 'Aadarneey Mareez',
      symptoms: messages.filter((m) => m.sender === 'user').map((m) => m.text).join(', ') || 'Ayurvedic Health Consultation',
      diagnosis: diagData.diagnosis,
      remedies: diagData.remedies,
      exercises: diagData.exercises,
      dietAdvice: diagData.dietAdvice,
      advice: diagData.chotelalAdvice,
    });
  };

  // Reset Conversation
  const handleReset = () => {
    stopSpeaking();
    stopListening();
    setCurrentStep(1);
    setMessages([]);
    hasInitializedRef.current = false;
    setTimeout(() => {
      const welcome = 'Namaste beta! Main Chotelal Ji hoon. Batao, aapko kya takleef hai?';
      setMessages([
        {
          id: 'welcome-' + Date.now(),
          sender: 'chotelal',
          text: welcome,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      speak(welcome);
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-3 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col h-[90vh] max-h-[750px] overflow-hidden">
        
        {/* TOP BAR / HEADER */}
        <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ChotelalFace size="sm" />
              {isSpeakingState && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-slate-900 text-base font-serif">
                  Vaidya Chotelal Ji
                </h3>
                {isExpertPlusMode ? (
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                    <Star className="w-3 h-3 fill-yellow-200" />
                    EXPERT+
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online • AI Voice
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                3-Step Q&amp;A Consultation • Patanjali Verified Video
              </p>
            </div>
          </div>

          {/* Controls: Mute/Unmute, Reset, Close */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleMute}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                muted
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100'
              }`}
              title={muted ? 'Unmute Voice' : 'Mute Voice'}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 transition cursor-pointer"
              title="Reset Chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* STEP PROGRESS TRACKER */}
        <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-5 py-2 flex items-center justify-between text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-orange-600">
              {currentStep <= 3 ? `Sawal ${Math.min(currentStep, 3)}/3` : 'Final Prescription'}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 hidden sm:inline">
              {currentStep === 1
                ? 'Apni takleef batayein'
                : currentStep === 2
                ? 'Chotelal Ji takleef ki gehraai samajh rahe hain'
                : currentStep === 3
                ? 'Khana-peena aur pichli dawai ki jankari'
                : 'Patanjali Video + Aushadhi taiyar hai'}
            </span>
          </div>

          {!isExpertPlusMode && (
            <button
              type="button"
              onClick={() => setIsExpertPlusMode(true)}
              className="text-[11px] font-black text-amber-600 hover:text-amber-700 flex items-center gap-1 underline cursor-pointer"
            >
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>Expert+ me upgrade karein</span>
            </button>
          )}
        </div>

        {/* MESSAGES BODY CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FFFFFF]">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                {!isUser && (
                  <div className="shrink-0 mt-1">
                    <ChotelalFace size="xs" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[78%] space-y-2`}>
                  {/* Standard Message Bubble */}
                  <div
                    className={`rounded-2xl p-4 text-sm leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-orange-500 text-white rounded-br-xs font-medium'
                        : 'bg-[#F8FAFC] text-slate-900 border border-[#E2E8F0] rounded-tl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {/* Audio Replay icon for Chotelal Ji replies */}
                    {!isUser && (
                      <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 mt-2 text-[11px] text-slate-500">
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => handleReplayVoice(msg.text)}
                          className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-bold cursor-pointer"
                          title="Voice Dobara Sunen"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Voice Sunen</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* FINAL COMPREHENSIVE ANSWER CARD WITH YOUTUBE VIDEO */}
                  {msg.isFinalDiagnosis && msg.diagnosisData && (
                    <div className="w-full bg-white rounded-2xl border-2 border-orange-300 shadow-md p-5 space-y-5 text-left mt-3">
                      
                      {/* Card Header */}
                      <div className="flex items-center justify-between border-b border-orange-100 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-orange-100 text-orange-700 rounded-xl">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-black text-slate-900 text-base font-serif">
                              🧔 CHOTELAL JI KA JAWAB
                            </h4>
                            <p className="text-[11px] text-orange-600 font-bold">
                              {msg.diagnosisData.isExpertPlus ? 'EXPERT+ PRIORITY CONSULTATION' : 'Ayurvedic Assessment & Remedies'}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDownloadPDF(msg.diagnosisData)}
                          className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition cursor-pointer"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span>📄 PDF Prescription</span>
                        </button>
                      </div>

                      {/* 1. Diagnosis Section */}
                      <div className="bg-orange-50/70 rounded-xl p-3.5 border border-orange-200 text-xs space-y-1">
                        <p className="font-black text-orange-950 uppercase tracking-wide">
                          📋 Diagnosis &amp; Root Cause:
                        </p>
                        <p className="font-medium text-slate-800 leading-relaxed">
                          {msg.diagnosisData.diagnosis}
                        </p>
                      </div>

                      {/* 2. Herbal Remedies Table/List */}
                      <div className="space-y-2">
                        <p className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>🌿 Ayurvedic Remedies (Aushadhi):</span>
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                          {(Array.isArray(msg.diagnosisData.remedies) ? msg.diagnosisData.remedies : []).map((rem: any, idx: number) => {
                            const title = typeof rem === 'string' ? rem : rem.name;
                            const dosage = typeof rem === 'string' ? '1 chammach gungune paani ke saath' : (rem.dosage || rem.howToTake);
                            return (
                              <div
                                key={idx}
                                className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-2.5 text-xs flex items-start justify-between gap-3"
                              >
                                <span className="font-black text-slate-900">
                                  • {title}
                                </span>
                                <span className="text-orange-700 font-semibold bg-orange-50 px-2 py-0.5 rounded-md shrink-0 border border-orange-200">
                                  {dosage}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 3. Yoga & Exercises */}
                      {msg.diagnosisData.exercises && msg.diagnosisData.exercises.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-sky-500" />
                            <span>🧘 Yoga &amp; Exercises:</span>
                          </p>
                          <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc">
                            {msg.diagnosisData.exercises.slice(0, 3).map((ex, i) => (
                              <li key={i} className="leading-relaxed font-medium">
                                {ex}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 4. Diet Advice */}
                      {msg.diagnosisData.dietAdvice && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 space-y-1">
                            <p className="font-bold text-emerald-900">🍽️ Kya Khayein (Pathya):</p>
                            <p className="text-emerald-800 leading-relaxed font-medium">
                              {msg.diagnosisData.dietAdvice.foodsToEat?.join(', ') || 'Gunguna paani, lauki, moong dal khichdi, papeeta.'}
                            </p>
                          </div>
                          <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3 space-y-1">
                            <p className="font-bold text-rose-900">🚫 Kya Na Khayein (Apathya):</p>
                            <p className="text-rose-800 leading-relaxed font-medium">
                              {msg.diagnosisData.dietAdvice.foodsToAvoid?.join(', ') || 'Lal mirch, tali-bhuni cheezein, maida, der raat jaagna.'}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* 5. RECOMMENDED YOUTUBE VIDEO SECTION — REMOVED PER REQUEST */}

                      {/* 6. Chotelal Ji Ki Salah */}
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
                        <ChotelalFace size="xs" />
                        <div>
                          <p className="font-bold text-amber-900">💬 Chotelal Ji Ki Salah:</p>
                          <p className="italic text-amber-800 font-medium pt-0.5">
                            &ldquo;{msg.diagnosisData.chotelalAdvice}&rdquo;
                          </p>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing / Loading indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start animate-fadeIn">
              <ChotelalFace size="xs" />
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-2 text-xs text-slate-500 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 font-semibold text-slate-600">छोटेलाल जी विचार कर रहे हैं...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT FORM BAR */}
        <div className="p-3 sm:p-4 bg-white border-t border-gray-100 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Mic Button */}
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`p-3 rounded-2xl border transition cursor-pointer shrink-0 ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse shadow-md shadow-rose-500/20'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Click to speak in Hindi/English'}
            >
              {isListening ? <Square className="w-5 h-5 fill-white" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isListening
                  ? 'Sun raha hoon beta, boliye...'
                  : currentStep === 1
                  ? 'Apne lakshan likhein ya mic se bolein...'
                  : 'Chotelal Ji ke sawal ka uttar dein...'
              }
              disabled={isLoading}
              className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-orange-500 focus:bg-white rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden transition"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-2xl shadow-sm transition cursor-pointer shrink-0"
              title="Bhejein"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          {/* Quick tips row */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 px-1">
            <span>Tip: Mic se Hindi ya English mix me bolein</span>
            <span className="font-semibold text-emerald-600">Voice Output Active</span>
          </div>
        </div>

      </div>
    </div>
  );
};
