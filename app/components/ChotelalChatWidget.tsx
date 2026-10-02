'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  PhoneCall,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  Video,
} from 'lucide-react';
import { ChotelalAvatar } from '../../src/components/ChotelalAvatar';

interface ChotelalChatWidgetProps {
  onOpenLiveVoice?: () => void;
  onNavigate?: (path: string) => void;
}

export const ChotelalChatWidget: React.FC<ChotelalChatWidgetProps> = ({
  onOpenLiveVoice,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'नमस्ते बेटा! मैं आपका वैदराज छोटेलाल जी। कोई भी स्वास्थ्य समस्या हो, बेझिझक मुझसे पूछो।',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/video-call/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text:
            data.reply ||
            'नमस्ते बेटा! इस समस्या के लिए सुबह गुनगुना पानी और रात को 1 चम्मच त्रिफला चूर्ण लो। पूरा पर्चा देखने के लिए ऊपर "Diagnose" पेज पर जाओ।',
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text:
            'बेटा, थोड़ा सब्र रखो। ज्यादा तनाव मत लो, पानी खूब पियो और तली-भुनी चीजें मत खाओ।',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Buttons in Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
        {/* Instant Live Voice Call Floating Pill */}
        <button
          type="button"
          onClick={
            onOpenLiveVoice
              ? onOpenLiveVoice
              : () => {
                  if (onNavigate) onNavigate('/video-call');
                  else window.location.href = '/video-call';
                }
          }
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-500 text-white shadow-xl hover:shadow-2xl shadow-emerald-900/40 transition-all transform hover:scale-105 border-2 border-white font-black"
          title="छोटेलाल जी से मुफ़्त में सीधे बात करें"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <PhoneCall className="w-3.5 h-3.5" />
          <span className="text-xs sm:text-sm font-black tracking-wide">
            CALL FOR FREE
          </span>
        </button>

        {/* Chat Widget Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-3 p-2.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-[#FF9933] to-amber-600 text-white shadow-xl hover:shadow-2xl shadow-orange-600/30 transition-all transform hover:scale-105 border-2 border-white"
          title="छोटेलाल जी से चैट करें"
        >
          <div className="relative">
            <ChotelalAvatar size="sm" expression="welcoming" showBadge={false} />
          </div>
          <div className="hidden sm:block text-left pr-1">
            <span className="text-xs font-bold block text-amber-200">छोटेलाल जी ऑनलाइन</span>
            <span className="text-sm font-black text-white">सीधे सवाल पूछें</span>
          </div>
        </button>
      </div>

      {/* Chat Popover Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border-2 border-[#FF9933]/50 overflow-hidden flex flex-col h-[480px] animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#FF9933] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChotelalAvatar size="sm" expression="welcoming" showBadge={false} />
              <div>
                <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                  <span>वैदराज छोटेलाल जी</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <p className="text-[11px] text-amber-200">
                  30+ वर्ष अनुभवी आयुर्वेदिक चिकित्सक
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-[#1E3A8A] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-500 italic text-[11px] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF9933] animate-ping" />
                  <span>छोटेलाल जी सोच रहे हैं...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="अपनी समस्या यहाँ लिखें..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#FF9933] outline-hidden"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#FF9933] hover:bg-amber-600 text-white shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
