import React, { useState } from 'react';
import {
  ShieldAlert,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Mail,
  Globe,
  KeyRound,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface FirebaseSetupNoticeProps {
  onSuccessDemoLogin?: () => void;
  defaultEmail?: string;
  defaultName?: string;
}

export const FirebaseSetupNotice: React.FC<FirebaseSetupNoticeProps> = ({
  onSuccessDemoLogin,
  defaultEmail,
  defaultName,
}) => {
  const { unauthorizedDomain, emailProviderDisabled, signInAsGuest } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const currentDomain =
    unauthorizedDomain ||
    (typeof window !== 'undefined' ? window.location.hostname : 'run.app domain');

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(currentDomain);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleInstantDemo = async () => {
    setIsDemoLoading(true);
    try {
      await signInAsGuest(defaultName || 'सम्मानित मरीज (Patient)', defaultEmail || 'patient@chotelalji-health.in');
      if (onSuccessDemoLogin) {
        onSuccessDemoLogin();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsDemoLoading(false);
    }
  };

  return (
    <div className="bg-amber-50/95 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-xs text-amber-950 space-y-4 text-left shadow-md animate-fadeIn">
      {/* Header */}
      <div className="flex items-start gap-2.5">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-black text-amber-950 text-sm sm:text-base">
            Firebase Project (chotelalji-health) Setup Notice
          </h4>
          <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
            Aapne naya Firebase project link kiya hai. Naye project me Google aur Email sign-in providers Firebase Console me enable karne hote hain.
          </p>
        </div>
      </div>

      {/* Instant 1-Click Fallback Button (Hero CTA) */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl p-3 text-white shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span>Bina rukawat turant app chalayein:</span>
            </div>
            <p className="text-[11px] text-orange-100 mt-0.5">
              Firebase console khole bina instant patient session shuru karein.
            </p>
          </div>
          <button
            type="button"
            onClick={handleInstantDemo}
            disabled={isDemoLoading}
            className="shrink-0 bg-white hover:bg-orange-50 text-orange-700 font-black px-3.5 py-2 rounded-lg text-xs shadow-md transition hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isDemoLoading ? 'लॉगिन हो रहा है...' : 'Instant Login ⚡'}
          </button>
        </div>
      </div>

      {/* Two Essential Steps Guide */}
      <div className="space-y-2.5 pt-1">
        <div className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1">
          <KeyRound className="w-3.5 h-3.5 text-amber-700" />
          <span>Firebase Console me 2 Asaan Settings:</span>
        </div>

        {/* Step 1: Authorized Domain for Google */}
        <div className="bg-white border border-amber-200 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-sky-600" />
              <span>1. Google Sign-In ke liye Domain Authorize karein:</span>
            </div>
            <a
              href="https://console.firebase.google.com/project/chotelalji-health/authentication/settings"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-orange-700 font-bold underline inline-flex items-center gap-0.5"
            >
              <span>Settings Kholein</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] sm:text-[11px] text-slate-700 truncate select-all">
              {currentDomain}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 inline-flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white font-bold px-2 py-1 rounded text-[10px] transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Domain</span>
                </>
              )}
            </button>
          </div>
          <p className="text-[10px] text-slate-500">
            Firebase Console &gt; Authentication &gt; <strong>Settings</strong> &gt; <strong>Authorized domains</strong> me jakar "Add domain" par paste karein.
          </p>
        </div>

        {/* Step 2: Email/Password Provider Enable */}
        <div className="bg-white border border-amber-200 rounded-xl p-3 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-orange-600" />
              <span>2. Email &amp; Password Login Enable karein:</span>
            </div>
            <a
              href="https://console.firebase.google.com/project/chotelalji-health/authentication/providers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-orange-700 font-bold underline inline-flex items-center gap-0.5"
            >
              <span>Sign-in method Kholein</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
          <p className="text-[10px] text-slate-600 leading-relaxed">
            Firebase Console &gt; Authentication &gt; <strong>Sign-in method</strong> me <strong>Email/Password</strong> par click karein aur <strong>Enable</strong> toggle ON karke Save karein.
          </p>
        </div>
      </div>
    </div>
  );
};
