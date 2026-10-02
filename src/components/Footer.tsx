import React from 'react';
import { Link } from '../router';
import { ChotelalLogo } from './ChotelalLogo';
import {
  Heart,
  ShieldCheck,
  MessageCircle,
  AlertTriangle,
  FileText,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import {
  WHATSAPP_CHANNEL_URL,
  SUPPORT_EMAIL,
  GOOGLE_SUPPORT_FORM_URL,
} from '../lib/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F8FAFC] text-slate-600 border-t border-gray-200 relative z-10">
      {/* Top Disclaimer Highlight */}
      <div className="bg-amber-50 border-b border-amber-100 py-3.5 px-4 text-xs text-amber-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>महत्वपूर्ण चिकित्सीय सूचना:</strong> Chotelal Ji Health एक AI-संचालित आयुर्वेदिक स्वास्थ्य मंच है। किसी भी गंभीर आपातकाल में तुरंत 108 पर कॉल करें या नजदीकी अस्पताल जाएं।
            </span>
          </div>
          <Link
            href="/disclaimer"
            className="text-orange-700 hover:underline font-semibold shrink-0"
          >
            Medical Disclaimer →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <ChotelalLogo size="sm" showSubtitle={false} badgeOnly={true} />
              <div>
                <span className="text-2xl font-black text-slate-900 font-serif tracking-tight">
                  Chotelal Ji <span className="text-[#FF9933]">Health</span>
                </span>
                <p className="text-xs text-orange-600 font-medium">Aapki Sehat, Hamari Zimmedari</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              30+ वर्षों के प्रामाणिक शास्त्रीय आयुर्वेदिक ज्ञान (चरक व सुश्रुत संहिता) और आधुनिक RAG AI तकनीक का संगम। हमारा संकल्प हर नागरिक को निःशुल्क स्वास्थ्य परामर्श उपलब्ध कराना है।
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-2">
              <span className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Free Service
              </span>
              <span className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                Confidential & Secure
              </span>
            </div>

            {/* Direct Channel Button */}
            <div className="pt-2">
              <a
                href={WHATSAPP_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join our WhatsApp Channel</span>
              </a>
            </div>
          </div>

          {/* Health Categories */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/category/piles" className="hover:text-orange-600 transition-colors">
                  Piles & Sitting Care
                </Link>
              </li>
              <li>
                <Link href="/category/hair" className="hover:text-orange-600 transition-colors">
                  Hair Fall & Growth
                </Link>
              </li>
              <li>
                <Link href="/category/mental-health" className="hover:text-orange-600 transition-colors">
                  Stress & Mental Peace
                </Link>
              </li>
              <li>
                <Link href="/category/digestion" className="hover:text-orange-600 transition-colors">
                  Digestion & Acidity
                </Link>
              </li>
              <li>
                <Link href="/category/skin" className="hover:text-orange-600 transition-colors">
                  Skin Care & Glow
                </Link>
              </li>
              <li>
                <Link href="/category/sleep" className="hover:text-orange-600 transition-colors">
                  Sleep & Insomnia
                </Link>
              </li>
              <li>
                <Link href="/category/immunity" className="hover:text-orange-600 transition-colors">
                  Immunity Boost
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Health Guides */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
              Ayurvedic Guides
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/diagnose" className="hover:text-orange-600 transition-colors flex items-center gap-1.5 font-semibold text-orange-600">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>AI Diagnosis (Free)</span>
                </Link>
              </li>
              <li>
                <Link href="/diet-expert" className="hover:text-orange-600 transition-colors flex items-center gap-1.5 text-sky-600 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                  <span>AI Diet Expert (डाइट प्लानर)</span>
                </Link>
              </li>
              <li>
                <Link href="/remedies" className="hover:text-orange-600 transition-colors">
                  Home Remedies Library
                </Link>
              </li>
              <li>
                <Link href="/herbs" className="hover:text-orange-600 transition-colors">
                  Herbs Encyclopedia
                </Link>
              </li>
              <li>
                <Link href="/yoga" className="hover:text-orange-600 transition-colors">
                  Yoga & Pranayama Guide
                </Link>
              </li>
              <li>
                <Link href="/diet" className="hover:text-orange-600 transition-colors">
                  Dosha Diet Charts
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
              Legal & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-orange-600 transition-colors">
                  About Chotelal Ji
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-600 transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <a
                  href={GOOGLE_SUPPORT_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 transition-colors flex items-center gap-1 text-sky-600 font-semibold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Google Support Form</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-orange-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-orange-600 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-orange-600 transition-colors">
                  Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-orange-600 transition-colors">
                  FAQs
                </Link>
              </li>
              <li className="pt-2 text-xs text-slate-500">
                Email: <span className="text-orange-600 font-semibold">{SUPPORT_EMAIL}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <p className="font-semibold text-slate-700">
              Designed &amp; Developed by Sumit Shrivas | &copy; 2026 All Rights Reserved
            </p>
            <span className="hidden sm:inline text-slate-300">•</span>
            <p className="text-slate-500">Chotelal Ji Health Platform</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">
              Terms
            </Link>
            <Link href="/disclaimer" className="hover:text-slate-900 transition-colors">
              Disclaimer
            </Link>
            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-semibold"
            >
              WhatsApp Channel
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
