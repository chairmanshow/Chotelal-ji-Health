import React, { useState, useEffect, useRef } from 'react';
import { ChotelalAvatar } from './ChotelalAvatar';
import { AudioWaveform } from './AudioWaveform';
import { fetchWithFallback } from '../lib/api-config';
import {
  Mic,
  MicOff,
  PhoneOff,
  Volume2,
  VolumeX,
  ShieldCheck,
  Activity,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface VoiceGreetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MessageHistoryItem {
  role: 'user' | 'model';
  content: string;
}

export const VoiceGreetingModal: React.FC<VoiceGreetingModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Call States
  const [callDuration, setCallDuration] = useState(0);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [activeCaption, setActiveCaption] = useState<string>(
    'नमस्ते! मैं छोटेलाल जी हूँ। बताओ, आपको क्या तकलीफ है?'
  );
  const [captionSpeaker, setCaptionSpeaker] = useState<'chotelal' | 'user'>('chotelal');
  const [audioLevel, setAudioLevel] = useState(0.5);
  const [conversationHistory, setConversationHistory] = useState<MessageHistoryItem[]>([]);
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);

  // Audio & Hardware Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const callTimerRef = useRef<any>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isAudioPlayingRef = useRef<boolean>(false);
  const hasSpokenGreetingRef = useRef<boolean>(false);
  const isMicMutedRef = useRef<boolean>(false);
  const isAiThinkingRef = useRef<boolean>(false);

  isMicMutedRef.current = isMicMuted;
  isAiThinkingRef.current = isAiThinking;

  // Format Duration mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Safe Audio Playback using Audio Queue System (Bug Fix: Zero Voice Overlap)
  const enqueueAndPlayAudio = async (text: string) => {
    if (!text.trim()) return;

    // Add text to voice queue
    audioQueueRef.current.push(text);

    if (isAudioPlayingRef.current) {
      return; // Already playing, queue will process next item
    }

    processAudioQueue();
  };

  const processAudioQueue = async () => {
    if (audioQueueRef.current.length === 0) {
      isAudioPlayingRef.current = false;
      setIsSpeaking(false);
      // Resume listening if call is active and not muted
      if (!isMicMutedRef.current && !isAiThinkingRef.current) {
        startListening();
      }
      return;
    }

    isAudioPlayingRef.current = true;
    setIsSpeaking(true);
    stopListening(); // Don't listen while speaking

    const nextText = audioQueueRef.current.shift()!;
    setActiveCaption(nextText);
    setCaptionSpeaker('chotelal');

    try {
      // Call Edge TTS endpoint with hi-IN-MadhurNeural, rate: -10%, pitch: -5Hz
      const response = await fetchWithFallback('https://chotelalji-tts.sumitshrivas24.workers.dev/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: nextText,
          rate: '-10%',
          pitch: '-5Hz',
        }),
      });

      if (!response.ok) {
        throw new Error('TTS fetch failed');
      }

      const data = await response.json();
      if (!data.success || !data.audioBase64) {
        throw new Error('Invalid audio data');
      }

      const audioSrc = `data:${data.mimeType || 'audio/mpeg'};base64,${data.audioBase64}`;

      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      const audioEl = audioRef.current;
      audioEl.src = audioSrc;
      audioEl.muted = isSpeakerMuted;

      // When audio finishes, play next in queue
      audioEl.onended = () => {
        processAudioQueue();
      };

      audioEl.onerror = () => {
        console.warn('Audio playback error, continuing queue');
        processAudioQueue();
      };

      await audioEl.play();
    } catch (err) {
      console.warn('TTS playback error:', err);
      // Fallback: brief timeout then next
      setTimeout(() => {
        processAudioQueue();
      }, 1500);
    }
  };

  // Start Web Speech API Recognition (lang: hi-IN)
  const startListening = () => {
    if (isMicMutedRef.current || isAiThinkingRef.current || isAudioPlayingRef.current) {
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
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
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setAudioLevel(0.6);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((res: any) => res[0].transcript)
          .join('');

        if (transcript) {
          setCaptionSpeaker('user');
          setActiveCaption(transcript);
          setAudioLevel(0.85);
        }

        // Final result -> send to AI
        if (event.results[0].isFinal) {
          const finalText = transcript.trim();
          if (finalText.length > 1) {
            handleUserMessage(finalText);
          }
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          setMicPermissionDenied(true);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        // If not playing audio and not thinking, restart listening
        if (!isAudioPlayingRef.current && !isAiThinkingRef.current && !isMicMutedRef.current) {
          setTimeout(() => {
            startListening();
          }, 300);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Recognition start warning:', err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
      setIsListening(false);
    }
  };

  // Handle user input message -> Gemini API -> Edge TTS reply
  const handleUserMessage = async (userText: string) => {
    const cleanText = userText.trim();
    if (!cleanText || isAiThinkingRef.current) return;

    stopListening();
    setIsAiThinking(true);
    setCaptionSpeaker('user');
    setActiveCaption(cleanText);

    const updatedHistory: MessageHistoryItem[] = [
      ...conversationHistory,
      { role: 'user', content: cleanText },
    ];
    setConversationHistory(updatedHistory);

    try {
      const response = await fetchWithFallback('https://chotelalji-tts.sumitshrivas24.workers.dev/api/call/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: cleanText,
          history: updatedHistory.slice(-6),
        }),
      });

      const data = await response.json();
      setIsAiThinking(false);

      if (data.replyText) {
        setConversationHistory((prev) => [
          ...prev,
          { role: 'model', content: data.replyText },
        ]);
        enqueueAndPlayAudio(data.replyText);
      }
    } catch (err) {
      console.error('Call message error:', err);
      setIsAiThinking(false);
      // Fallback comforting reply
      enqueueAndPlayAudio(
        'बेटा, आप बिल्कुल चिंता न करें। सादा सुपाच्य भोजन और गुनगुना पानी लें। मुझे अपनी परेशानी के बारे में थोड़ा और बताएं।'
      );
    }
  };

  // Call Start Lifecycle
  useEffect(() => {
    if (!isOpen) return;

    // Reset call state
    setCallDuration(0);
    setIsMicMuted(false);
    setIsSpeaking(false);
    setIsListening(false);
    setIsAiThinking(false);
    setMicPermissionDenied(false);
    hasSpokenGreetingRef.current = false;
    audioQueueRef.current = [];
    isAudioPlayingRef.current = false;

    // Request Mic permission cleanly
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          setMicPermissionDenied(false);
        })
        .catch((err) => {
          console.warn('Mic permission error:', err);
          setMicPermissionDenied(true);
        });
    }

    // Call Timer (00:00, 00:01...)
    callTimerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    // Initial Greeting (Spoken exactly ONCE as instructed: "Namaste! Main Chotelal Ji hoon. Batao, aapko kya takleef hai?")
    const initialGreeting =
      'Namaste! Main Chotelal Ji hoon. Batao, aapko kya takleef hai?';
    setActiveCaption(initialGreeting);
    setCaptionSpeaker('chotelal');

    const greetingTimer = setTimeout(() => {
      if (!hasSpokenGreetingRef.current) {
        hasSpokenGreetingRef.current = true;
        enqueueAndPlayAudio(initialGreeting);
      }
    }, 400);

    return () => {
      clearTimeout(greetingTimer);
      if (callTimerRef.current) clearInterval(callTimerRef.current);
      stopListening();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isOpen]);

  // Handle End Call (Cancel button immediately stops everything)
  const handleEndCall = () => {
    // 1. Cancel browser speech synthesis
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    // 2. Stop audio element playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    // 3. Stop mic recognition
    stopListening();
    audioQueueRef.current = [];
    isAudioPlayingRef.current = false;
    setIsSpeaking(false);
    setIsListening(false);

    if (callTimerRef.current) clearInterval(callTimerRef.current);
    onClose();
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMute = !isMicMuted;
    setIsMicMuted(nextMute);
    isMicMutedRef.current = nextMute;
    if (nextMute) {
      stopListening();
    } else if (!isSpeaking && !isAiThinking) {
      startListening();
    }
  };

  // Toggle Speaker
  const handleToggleSpeaker = () => {
    const nextSpeaker = !isSpeakerMuted;
    setIsSpeakerMuted(nextSpeaker);
    if (audioRef.current) {
      audioRef.current.muted = nextSpeaker;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-white via-sky-50 to-orange-50 flex flex-col justify-between text-slate-800 overflow-hidden select-none">
      {/* TOP BAR: Call Status & Timer */}
      <div className="w-full px-6 py-5 flex items-center justify-between border-b border-gray-200/80 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500 shadow-sm" />
          </div>
          <div>
            <div className="text-xs font-bold tracking-wider uppercase text-orange-600 flex items-center gap-1.5">
              <span>LIVE AI VOICE CALL</span>
              <span className="text-[10px] text-slate-500 font-normal border border-gray-200 bg-white px-1.5 py-0.5 rounded">
                Microsoft Neural Madhur
              </span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Free & Confidential Consultation</span>
            </div>
          </div>
        </div>

        {/* Call Timer (00:15) */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-1.5 rounded-full shadow-xs">
          <Activity className="w-4 h-4 text-orange-500 animate-pulse" />
          <span className="font-mono text-sm font-bold tracking-widest text-slate-800">
            {formatDuration(callDuration)}
          </span>
        </div>
      </div>

      {/* CENTER: Chotelal Ji Circular Photo with Glowing Ring + Sound Wave Animation */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-2xl mx-auto w-full py-6">
        {/* Chotelal Photo with Glowing Ring */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Avatar Container with State-based Glowing Ring */}
          <div
            className={`p-2.5 rounded-full transition-all duration-300 ${
              isSpeaking
                ? 'ring-4 ring-orange-400 shadow-[0_0_40px_rgba(255,153,51,0.5)] scale-105'
                : isListening
                ? 'ring-4 ring-emerald-500 shadow-[0_0_35px_rgba(16,185,129,0.5)] scale-102'
                : 'ring-2 ring-orange-200 shadow-md'
            }`}
          >
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden bg-white flex items-center justify-center border-2 border-white shadow-inner">
              <ChotelalAvatar
                size="xl"
                expression={isSpeaking ? 'speaking' : isAiThinking ? 'thinking' : 'welcoming'}
                glow={isSpeaking}
              />
            </div>
          </div>
        </div>

        {/* Identity & Status */}
        <div className="text-center mb-4 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">
            Chotelal Ji
          </h2>
          <p className="text-xs text-orange-600 font-bold tracking-wider">
            Senior Ayurvedic Counselor (30+ Years Wisdom)
          </p>

          {/* Real-time Status Badge */}
          <div className="pt-2 flex items-center justify-center gap-2">
            {isAiThinking ? (
              <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 px-4 py-1.5 rounded-full text-xs text-sky-700 font-medium animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-600" />
                <span>छोटेलाल जी विचार कर रहे हैं...</span>
              </div>
            ) : isSpeaking ? (
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-4 py-1.5 rounded-full text-xs text-orange-700 font-bold">
                <Volume2 className="w-3.5 h-3.5 text-orange-600 animate-bounce" />
                <span>छोटेलाल जी बोल रहे हैं...</span>
              </div>
            ) : isListening ? (
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full text-xs text-emerald-700 font-bold animate-pulse">
                <Mic className="w-3.5 h-3.5 text-emerald-600" />
                <span>आपकी आवाज़ सुन रहे हैं... बोलिए</span>
              </div>
            ) : isMicMuted ? (
              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-xs text-rose-700 font-medium">
                <MicOff className="w-3.5 h-3.5 text-rose-500" />
                <span>माइक म्यूट है (Mic Muted)</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-slate-100 border border-gray-200 px-3 py-1 rounded-full text-xs text-slate-600">
                <span>तैयार हैं...</span>
              </div>
            )}
          </div>
        </div>

        {/* Sound Wave Animation (Moving Bars) */}
        <div className="w-full max-w-sm mb-4">
          <AudioWaveform
            state={
              isSpeaking
                ? 'speaking'
                : isAiThinking
                ? 'thinking'
                : isListening
                ? 'listening'
                : 'idle'
            }
            audioLevel={audioLevel}
            barCount={28}
          />
        </div>

        {/* Live Captions Card (Beech me live captions) */}
        <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl p-5 shadow-sm relative">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider mb-2">
            <span
              className={
                captionSpeaker === 'chotelal' ? 'text-orange-600' : 'text-emerald-700'
              }
            >
              {captionSpeaker === 'chotelal' ? 'Chotelal Ji:' : 'आप (Patient):'}
            </span>
            <span className="text-slate-400 text-[10px]">Live Caption</span>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal min-h-[44px] flex items-center justify-center text-center">
            &ldquo;{activeCaption}&rdquo;
          </p>

          {/* Quick Hindi prompt suggestion pills */}
          {!isSpeaking && !isAiThinking && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] text-slate-400">सुझाव:</span>
              {[
                'बवासीर में क्या खाएं?',
                'गैस और एसिडिटी का घरेलू नुस्खा',
                'तनाव और नींद न आना',
                'बाल झड़ने का आयुर्वेदिक तेल',
              ].map((sugg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleUserMessage(sugg)}
                  className="text-xs bg-slate-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-slate-700 hover:text-orange-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  {sugg}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mic Permission Note */}
        {micPermissionDenied && (
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 flex items-center gap-2 text-xs text-amber-800 max-w-md">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              ब्राउज़र में माइक अनुमति की आवश्यकता है। कृपया एड्रेस बार में माइक को अनुमति दें।
            </span>
          </div>
        )}
      </div>

      {/* BOTTOM CONTROLS: 3 BUTTONS (Mute, End Call - Red, Speaker) */}
      <div className="w-full px-6 py-6 border-t border-gray-200/80 bg-white/90 backdrop-blur-md flex items-center justify-center gap-6 sm:gap-10">
        {/* 1. Mute Button */}
        <button
          onClick={handleToggleMute}
          className={`flex flex-col items-center gap-1.5 p-3 sm:px-5 sm:py-3 rounded-2xl border transition-all cursor-pointer ${
            isMicMuted
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : 'bg-slate-50 border-gray-200 text-slate-700 hover:bg-slate-100'
          }`}
          title={isMicMuted ? 'Unmute Mic' : 'Mute Mic'}
        >
          {isMicMuted ? <MicOff className="w-6 h-6 text-rose-600" /> : <Mic className="w-6 h-6" />}
          <span className="text-[11px] font-semibold">
            {isMicMuted ? 'Unmute' : 'Mute'}
          </span>
        </button>

        {/* 2. End Call Button (Red, prominent) */}
        <button
          onClick={handleEndCall}
          className="flex flex-col items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-8 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer"
          title="End Call"
        >
          <PhoneOff className="w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-wider">End Call</span>
        </button>

        {/* 3. Speaker Button */}
        <button
          onClick={handleToggleSpeaker}
          className={`flex flex-col items-center gap-1.5 p-3 sm:px-5 sm:py-3 rounded-2xl border transition-all cursor-pointer ${
            isSpeakerMuted
              ? 'bg-amber-50 border-amber-200 text-amber-700'
              : 'bg-slate-50 border-gray-200 text-slate-700 hover:bg-slate-100'
          }`}
          title={isSpeakerMuted ? 'Unmute Speaker' : 'Mute Speaker'}
        >
          {isSpeakerMuted ? (
            <VolumeX className="w-6 h-6 text-amber-600" />
          ) : (
            <Volume2 className="w-6 h-6 text-slate-700" />
          )}
          <span className="text-[11px] font-semibold">
            {isSpeakerMuted ? 'Muted' : 'Speaker'}
          </span>
        </button>
      </div>
    </div>
  );
};
