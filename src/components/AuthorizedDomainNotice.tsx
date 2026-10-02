import React, { useState } from 'react';
import { ShieldAlert, Copy, Check, ExternalLink, ArrowRight } from 'lucide-react';

interface AuthorizedDomainNoticeProps {
  domain?: string;
  onUseEmail?: () => void;
}

export const AuthorizedDomainNotice: React.FC<AuthorizedDomainNoticeProps> = ({
  domain,
  onUseEmail,
}) => {
  const [copied, setCopied] = useState(false);
  const currentDomain =
    domain || (typeof window !== 'undefined' ? window.location.hostname : 'run.app domain');

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(currentDomain);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4 text-xs text-amber-950 space-y-3 text-left animate-fadeIn shadow-xs">
      <div className="flex items-start gap-2.5">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-extrabold text-amber-900 text-sm">
            Firebase: Domain Authorized Nahi Hai (1-Minute Fix)
          </h4>
          <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
            Aapne naya Firebase project (<strong>chotelalji-health</strong>) link kiya hai. Google Login tabhi kaam karta hai jab ye preview domain aapke Firebase Console me authorized ho.
          </p>
        </div>
      </div>

      {/* Copy domain box */}
      <div className="bg-white border border-amber-200 rounded-xl p-2.5 flex items-center justify-between gap-2">
        <div className="font-mono text-[11px] text-slate-800 truncate select-all">
          {currentDomain}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 inline-flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Domain</span>
            </>
          )}
        </button>
      </div>

      {/* 3 Step instructions */}
      <div className="space-y-1 text-[11px] text-amber-900 bg-amber-100/60 p-2.5 rounded-xl">
        <div className="font-bold">Kaise Add Karein:</div>
        <ol className="list-decimal pl-4 space-y-1">
          <li>
            Upar <strong>"Copy Domain"</strong> dabayein.
          </li>
          <li>
            <a
              href="https://console.firebase.google.com/project/chotelalji-health/authentication/settings"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-orange-700 font-bold underline hover:text-orange-900"
            >
              <span>Firebase Console Settings Kholein</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li>
            <strong>Authorized domains</strong> me jakar <strong>"Add domain"</strong> par paste karein aur Save karein.
          </li>
        </ol>
      </div>

      {/* Quick alternative button */}
      {onUseEmail && (
        <button
          type="button"
          onClick={onUseEmail}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-orange-50 text-orange-700 border border-orange-300 rounded-xl font-bold text-xs transition cursor-pointer"
        >
          <span>Bina domain add kiye Email &amp; Password se turant login karein</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
