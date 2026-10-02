import React, { useState } from 'react';
import { MessageCircle, Sparkles, X } from 'lucide-react';
import { WHATSAPP_CHANNEL_URL } from '../lib/constants';

interface FloatingWhatsAppButtonProps {
  onOpenChat?: () => void;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  onOpenChat,
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleOpenChat = () => {
    if (onOpenChat) {
      onOpenChat();
    } else {
      window.dispatchEvent(new CustomEvent('chotelal:open-chat-modal'));
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Speech Bubble / Tooltip */}
      {showTooltip && (
        <div className="bg-white rounded-2xl p-3 shadow-xl border border-orange-100 max-w-xs animate-bounce text-xs text-slate-800 relative hidden sm:block">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 bg-slate-100 hover:bg-slate-200 rounded-full p-0.5 text-slate-500 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping shrink-0" />
            <p className="font-semibold text-slate-900">
              Namaste! Koi health issue hai?
            </p>
          </div>
          <p className="text-slate-500 text-[11px] mt-0.5">
            Chotelal Ji se chat karein ya WhatsApp Channel join karein.
          </p>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Quick AI Chatbot Consultation Button */}
        <button
          onClick={handleOpenChat}
          className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs px-4 py-3 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all duration-200 cursor-pointer border-2 border-white"
          title="Chat with Chotelal Ji (AI Voice & Q&A)"
        >
          <Sparkles className="w-4 h-4 text-yellow-200" />
          <span className="font-bold">Ask Chotelal Ji</span>
        </button>

        {/* WhatsApp Main Floating Action Button */}
        <a
          href={WHATSAPP_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 border-white"
          title="Join WhatsApp Channel"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm hidden sm:inline">WhatsApp Channel</span>
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300" />
          </span>
        </a>
      </div>
    </div>
  );
};
