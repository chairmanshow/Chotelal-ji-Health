import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  ShieldCheck,
  Send,
  Activity,
  Flame,
  Zap,
  Sparkles,
  Laptop,
  Moon,
  Coffee,
  HeartPulse,
} from 'lucide-react';
import { fetchWithFallback } from '../lib/api-config';
import { ChotelalAvatar } from './ChotelalAvatar';

interface LiveVoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

let cachedElderVoice: SpeechSynthesisVoice | null = null;

export const LiveVoiceCallModal: React.FC<LiveVoiceCallModalProps> = ({ isOpen, onClose }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [subtitle, setSubtitle] = useState('नमस्ते बेटा! नीचे "CALL FOR FREE" बटन दबाकर बेझिझक मुझसे बात करो।');
  const [userSpeechSubtitle, setUserSpeechSubtitle] = useState<string>('');
  const [textInput, setTextInput] = useState('');
  const [audioLevel, setAudioLevel] = useState<number>(0);

  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);
  const speechRecognitionRef = useRef<any>(null);
  const isSpeakingRef = useRef<boolean>(false);
  const recognitionSilenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Format Duration mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isConnected) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (recognitionSilenceTimerRef.current) clearTimeout(recognitionSilenceTimerRef.current);
    };
  }, [isConnected]);

  // Clean stop all audio playback
  const stopAudio = () => {
    audioQueueRef.current.forEach((node) => {
      try {
        node.stop();
      } catch (e) {}
    });
    audioQueueRef.current = [];
    nextStartTimeRef.current = 0;
    setIsSpeaking(false);
    isSpeakingRef.current = false;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Find consistent heavy deep mature elder voice
  const getElderVoice = (): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    if (cachedElderVoice) return cachedElderVoice;
    const voices = window.speechSynthesis.getVoices();
    cachedElderVoice =
      voices.find(
        (v) =>
          (v.lang.startsWith('hi') || v.lang.includes('IN')) &&
          (v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('madhur') ||
            v.name.toLowerCase().includes('rishi') ||
            v.name.toLowerCase().includes('deep'))
      ) ||
      voices.find((v) => v.lang.startsWith('hi')) ||
      voices.find((v) => (v.lang.includes('IN') || v.lang.includes('en')) && v.name.toLowerCase().includes('male')) ||
      null;
    return cachedElderVoice;
  };

  // Consistent heavy deep elder voice (Vaidya Chotelal Ji 62+ baritone)
  const speakWithDeepElderVoice = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || isSpeakerMuted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    const voice = getElderVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = 'hi-IN';
    utterance.rate = 0.90; // Slower, calm, unhurried
    utterance.pitch = 0.72; // Slightly low to sound heavy, deep & natural

    utterance.onstart = () => {
      setIsSpeaking(true);
      isSpeakingRef.current = true;
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      isSpeakingRef.current = false;
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      isSpeakingRef.current = false;
    };
    window.speechSynthesis.speak(utterance);
  };

  // Start Live Real-time Call
  const startLiveSession = async () => {
    setConnectionStatus('connecting');
    stopAudio();

    try {
      // 1. Audio Contexts: 16kHz for input mic, 24kHz for Gemini Live output
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const inputCtx = new AudioCtx({ sampleRate: 16000 });
      const outputCtx = new AudioCtx({ sampleRate: 24000 });

      if (inputCtx.state === 'suspended') await inputCtx.resume();
      if (outputCtx.state === 'suspended') await outputCtx.resume();

      inputAudioCtxRef.current = inputCtx;
      outputAudioCtxRef.current = outputCtx;

      // 2. Request mic permission
      let stream: MediaStream | null = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            sampleRate: 16000,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        streamRef.current = stream;
      } catch (micErr) {
        console.warn('Microphone permission note, proceeding with text & speech recognition:', micErr);
      }

      // 3. Connect WebSocket to Server Live audio engine
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('[Live Voice Call] Connected to Chotelal Ji Voice Engine');
        setIsConnected(true);
        setConnectionStatus('connected');
        setIsListening(true);

        // Send client-side speechConfig setup message to ensure voice_name is applied
        try {
          ws.send(
            JSON.stringify({
              setup: {
                speechConfig: {
                  voiceConfig: {
                    prebuiltVoiceConfig: {
                      voiceName: 'Algenib',
                    },
                  },
                },
                systemInstruction:
                  "You are Chotelal Ji, a 60-year-old Ayurvedic doctor. Speak slowly, with warmth, in short caring Hinglish sentences. Never sound robotic or rushed.",
              },
            })
          );
        } catch (setupErr) {
          console.warn('[Live Voice] Setup message send error:', setupErr);
        }

        const welcomeGreeting =
          'नमस्ते बेटा! मैं आपका वैदराज छोटेलाल जी सुन रहा हूँ। बताओ मेरे बच्चे, क्या तकलीफ है?';
        setSubtitle(welcomeGreeting);

        // Warm elder greeting once
        setTimeout(() => {
          if (!isSpeakerMuted && !isSpeakingRef.current) {
            speakWithDeepElderVoice(welcomeGreeting);
          }
        }, 300);

        // 4. Capture, analyze sound levels, and stream 16kHz PCM audio
        if (stream && inputCtx) {
          try {
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(2048, 1, 1);
            processorRef.current = processor;

            source.connect(processor);
            processor.connect(inputCtx.destination);

            processor.onaudioprocess = (e) => {
              // Don't send mic data while muted OR while the elder is speaking (prevent echo loop)
              if (isMuted || ws.readyState !== WebSocket.OPEN) return;
              const inputData = e.inputBuffer.getChannelData(0);

              // Calculate audio loudness level for UI wave
              let sum = 0;
              for (let i = 0; i < inputData.length; i++) {
                sum += inputData[i] * inputData[i];
              }
              const rms = Math.sqrt(sum / inputData.length);
              setAudioLevel(Math.min(100, Math.round(rms * 400)));

              // If model is speaking and user interrupts with a loud voice, stop model audio immediately
              if (rms > 0.08 && isSpeakingRef.current) {
                stopAudio();
                ws.send(JSON.stringify({ text: 'User started speaking.' }));
              }

              // Do not stream microphone background noise while the model is actively talking
              if (isSpeakingRef.current) return;

              // Convert Float32Array to 16-bit linear PCM
              const pcm16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                const s = Math.max(-1, Math.min(1, inputData[i]));
                pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
              }

              // Base64 encode
              const bytes = new Uint8Array(pcm16.buffer);
              let binary = '';
              for (let i = 0; i < bytes.byteLength; i++) {
                binary += String.fromCharCode(bytes[i]);
              }
              const base64Audio = btoa(binary);

              ws.send(JSON.stringify({ audio: base64Audio }));
            };
          } catch (e) {
            console.warn('Audio capture setup note:', e);
          }
        }

        // 5. Also launch real-time Web Speech Recognition so user sees words live on screen
        startSpeechRecognition();
      };

      ws.onmessage = async (event) => {
        try {
          const msg = JSON.parse(event.data);

          if (msg.interrupted) {
            stopAudio();
            return;
          }

          if (msg.audio) {
            setIsSpeaking(true);
            isSpeakingRef.current = true;
            playAudioChunk(outputCtx, msg.audio);
          }

          if (msg.text) {
            setSubtitle(msg.text);
          }

          if (msg.userTranscript) {
            setUserSpeechSubtitle(msg.userTranscript);
          }
        } catch (err) {
          console.warn('[Live Voice] Message parse note:', err);
        }
      };

      ws.onerror = () => {
        setupFallbackNLPMode();
      };

      ws.onclose = () => {
        if (isConnected) {
          setupFallbackNLPMode();
        }
      };
    } catch (err: any) {
      console.warn('[Live Voice] Initiation error, switching to fallback voice:', err);
      setupFallbackNLPMode();
    }
  };

  // Launch browser SpeechRecognition for crystal-clear real-time subtitles & input
  const startSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'hi-IN';

      recognition.onresult = (event: any) => {
        let interim = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const t = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += t;
          } else {
            interim += t;
          }
        }

        const fullText = (finalTranscript || interim).trim();
        if (fullText) {
          setUserSpeechSubtitle(fullText);

          // Clear previous timer and set debounce for end of speech
          if (recognitionSilenceTimerRef.current) {
            clearTimeout(recognitionSilenceTimerRef.current);
          }

          recognitionSilenceTimerRef.current = setTimeout(() => {
            if (fullText.length > 2) {
              handlePatientNLPSpoke(fullText);
            }
          }, 1400);
        }
      };

      recognition.onerror = () => {};
      recognition.onend = () => {
        if (isConnected) {
          try {
            recognition.start();
          } catch (e) {}
        }
      };

      recognition.start();
      speechRecognitionRef.current = recognition;
    } catch (e) {
      console.warn('SpeechRecognition note:', e);
    }
  };

  // Fallback interactive voice mode if network drops
  const setupFallbackNLPMode = () => {
    setIsConnected(true);
    setConnectionStatus('connected');
    setIsListening(true);
    setSubtitle('छोटेलाल जी ऑनलाइन हैं। आप सीधे बोलकर या लिखकर बात कर सकते हैं।');
    startSpeechRecognition();
  };

  // Handle patient spoke via voice or text input
  const handlePatientNLPSpoke = async (userInput: string) => {
    if (!userInput.trim()) return;
    stopAudio();
    setUserSpeechSubtitle(userInput);

    // If live WebSocket is connected, forward to Gemini Live session
    let sentToWs = false;
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify({ text: userInput }));
        sentToWs = true;
      } catch (e) {}
    }

    // Call NLP backend for instant deep grandfather response
    try {
      const res = await fetchWithFallback('https://chotelalji-tts.sumitshrivas24.workers.dev/api/video-call/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await res.json();
      const reply =
        data.reply ||
        'नमस्ते बेटा! चिंता मत करो। रोज सुबह 2 गिलास गुनगुना पानी पियो और रात को त्रिफला लो। बहुत जल्दी आराम मिलेगा।';

      setSubtitle(reply);
      // If websocket did not send native audio, speak with calibrated heavy elder voice
      if (!sentToWs || audioQueueRef.current.length === 0) {
        speakWithDeepElderVoice(reply);
      }
    } catch (err) {
      const fallbackReply =
        'बेटा, अपनी समस्या के लिए ज्यादा तनाव मत लो। 1 चम्मच त्रिफला गुनगुने पानी से लो और कुर्सी पर लगातार न बैठो।';
      setSubtitle(fallbackReply);
      speakWithDeepElderVoice(fallbackReply);
    }
  };

  // Play 24kHz PCM Little-Endian Chunk gaplessly
  const playAudioChunk = (ctx: AudioContext, base64Audio: string) => {
    if (isSpeakerMuted) return;
    try {
      const binary = atob(base64Audio);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      const pcm16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / 32768.0;
      }

      const audioBuffer = ctx.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);

      const currentTime = ctx.currentTime;
      if (nextStartTimeRef.current < currentTime) {
        nextStartTimeRef.current = currentTime;
      }

      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;

      audioQueueRef.current.push(source);
      source.onended = () => {
        const idx = audioQueueRef.current.indexOf(source);
        if (idx !== -1) audioQueueRef.current.splice(idx, 1);
        if (audioQueueRef.current.length === 0) {
          setIsSpeaking(false);
          isSpeakingRef.current = false;
        }
      };
    } catch (err) {
      console.warn('Audio playback error:', err);
    }
  };

  const endLiveSession = () => {
    stopAudio();
    setIsConnected(false);
    setIsListening(false);
    setConnectionStatus('idle');
    setAudioLevel(0);
    setUserSpeechSubtitle('');

    if (recognitionSilenceTimerRef.current) {
      clearTimeout(recognitionSilenceTimerRef.current);
      recognitionSilenceTimerRef.current = null;
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {}
      speechRecognitionRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close().catch(() => {});
      inputAudioCtxRef.current = null;
    }
    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close().catch(() => {});
      outputAudioCtxRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      endLiveSession();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-3xl shadow-2xl border border-amber-500/20 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 bg-slate-950/95 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ChotelalAvatar size="sm" showStatus glow={isSpeaking} />
              {isSpeaking && (
                <span className="absolute -inset-1 rounded-full border-2 border-orange-500 animate-ping opacity-75" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm sm:text-base text-white">वैद्य छोटेलाल जी</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/30 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
                  100% FREE CALL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'
                  }`}
                />
                {isConnected ? `लाइव कनेक्टेड • ${formatTime(callDuration)}` : 'तैयार • नीचे कॉल लगाएं'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/80 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>1-on-1 गोपनीय</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mascot Center Video Screen */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-radial from-amber-950/20 via-slate-900 to-slate-950 min-h-[280px]">
          {/* Subtle Ambient Pulse */}
          <div
            className={`transition-all duration-300 transform ${
              isSpeaking ? 'scale-105' : 'scale-100'
            }`}
          >
            <ChotelalAvatar
              size="hero"
              expression={isSpeaking ? 'speaking' : isListening ? 'welcoming' : 'welcoming'}
              glow={isSpeaking}
            />
          </div>

          {/* Sound Wave Visualizer Bars */}
          <div className="flex items-center gap-1.5 mt-5 h-9">
            {[0.3, 0.8, 0.5, 1.2, 0.7, 1.1, 0.6, 0.9, 0.4].map((height, i) => (
              <span
                key={i}
                className={`w-1.5 sm:w-2 rounded-full transition-all duration-150 ${
                  isSpeaking
                    ? 'bg-gradient-to-t from-orange-600 to-amber-400 animate-bounce'
                    : isConnected
                    ? audioLevel > 15
                      ? 'bg-emerald-400 h-5'
                      : 'bg-emerald-500/40 h-2.5'
                    : 'bg-slate-700 h-2'
                }`}
                style={{
                  height: isSpeaking ? `${Math.round(height * 28)}px` : undefined,
                  animationDelay: `${i * 85}ms`,
                }}
              />
            ))}
          </div>

          {/* Real-time Status Badge */}
          <div className="mt-3 text-center">
            {isSpeaking ? (
              <span className="text-xs font-black uppercase tracking-wider text-orange-300 flex items-center justify-center gap-1.5">
                <Volume2 className="w-4 h-4 animate-pulse text-orange-400" />
                छोटेलाल जी बोल रहे हैं (Heavy Elder Voice)...
              </span>
            ) : isConnected ? (
              <span className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                <Mic className="w-4 h-4 animate-pulse text-emerald-400" />
                आपकी बात सुन रहे हैं • सीधे बोलें
              </span>
            ) : connectionStatus === 'connecting' ? (
              <span className="text-xs font-bold text-amber-300 flex items-center justify-center gap-1.5">
                <Activity className="w-4 h-4 animate-spin text-amber-400" />
                कॉल कनेक्ट हो रही है...
              </span>
            ) : (
              <span className="text-xs font-semibold text-slate-400">
                नीचे <strong className="text-orange-400">"CALL FOR FREE"</strong> बटन दबाकर बात शुरू करें
              </span>
            )}
          </div>

          {/* Live Patient Speech Recognition Transcript */}
          {userSpeechSubtitle && isConnected && (
            <div className="w-full max-w-lg mt-3 px-4 py-2.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-left shadow-md">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                आप बोल रहे हैं (Live Listening):
              </span>
              <p className="text-xs text-emerald-100 font-medium line-clamp-2">"{userSpeechSubtitle}"</p>
            </div>
          )}

          {/* Vaidya Chotelal Ji Spoken Response Box */}
          <div className="w-full max-w-lg mt-2.5 p-3.5 rounded-2xl bg-slate-950/90 border border-amber-500/20 text-center shadow-lg">
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              <strong className="text-orange-400 font-bold">छोटेलाल जी:</strong> "{subtitle}"
            </p>
          </div>
        </div>

        {/* 20-30 Age Group High-Impact Symptom Chips */}
        <div className="px-5 py-2.5 bg-slate-950/70 border-t border-slate-800/80 overflow-x-auto flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
            <Zap className="w-3 h-3 text-orange-400" /> तुरंत पूछें:
          </span>
          {[
            'कुर्सी पर 8 घंटे बैठने से बवासीर और जलन',
            'रात 3 बजे तक नींद नहीं आती, ओवरथिंकिंग',
            '20s में बाल बहुत तेजी से झड़ रहे हैं',
            'दिनभर पेट में गैस, ब्लोटिंग व एसिडिटी',
            'स्क्रीन टाइम से आंखें व सिर भारी',
          ].map((symptom, idx) => (
            <button
              key={idx}
              disabled={!isConnected}
              onClick={() => handlePatientNLPSpoke(symptom)}
              className="text-[11px] font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-orange-950/60 border border-slate-700 hover:border-orange-500/50 px-3 py-1 rounded-xl whitespace-nowrap transition-all active:scale-95 disabled:opacity-40"
            >
              + {symptom}
            </button>
          ))}
        </div>

        {/* Text Input Option */}
        <div className="px-5 sm:px-6 py-3 bg-slate-950/90 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (textInput.trim()) {
                if (!isConnected) startLiveSession();
                handlePatientNLPSpoke(textInput.trim());
                setTextInput('');
              }
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="बोलने के बजाय लिखकर भी सवाल पूछ सकते हैं (जैसे: नींद व बालों के उपाय)..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-hidden focus:border-orange-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-orange-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>भेजें</span>
            </button>
          </form>
        </div>

        {/* Controls Footer */}
        <div className="px-5 sm:px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Mic Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              disabled={!isConnected}
              className={`p-3 rounded-2xl border transition-all ${
                isMuted
                  ? 'bg-red-500/20 text-red-400 border-red-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              } disabled:opacity-40`}
              title={isMuted ? 'माइक चालू करें' : 'माइक म्यूट करें'}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Speaker Volume Toggle */}
            <button
              onClick={() => {
                if (!isSpeakerMuted) stopAudio();
                setIsSpeakerMuted(!isSpeakerMuted);
              }}
              className={`p-3 rounded-2xl border transition-all ${
                isSpeakerMuted
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title={isSpeakerMuted ? 'आवाज चालू करें' : 'आवाज म्यूट करें'}
            >
              {isSpeakerMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Prominent "CALL FOR FREE" Button */}
          {!isConnected ? (
            <button
              onClick={startLiveSession}
              disabled={connectionStatus === 'connecting'}
              className="px-6 sm:px-9 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-500 text-white font-black text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 border border-emerald-400"
            >
              <Phone className="w-5 h-5 animate-bounce" />
              <span>CALL FOR FREE</span>
            </button>
          ) : (
            <button
              onClick={endLiveSession}
              className="px-6 sm:px-9 py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-sm flex items-center gap-2.5 shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <PhoneOff className="w-5 h-5" />
              <span>कॉल समाप्त करें (End Call)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
