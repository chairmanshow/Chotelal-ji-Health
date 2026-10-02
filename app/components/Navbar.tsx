'use client';

import React, { useState } from 'react';
import {
  Menu,
  X,
  Stethoscope,
  Sparkles,
  ShoppingBag,
  BookOpen,
  Info,
  PhoneCall,
  User,
  Activity,
  Flame,
  Globe,
  Video,
} from 'lucide-react';

interface NavbarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  onOpenAuth?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath = '/',
  onNavigate,
  onOpenAuth,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'hi' | 'en'>('hi');

  const navLinks = [
    { label: 'Home', path: '/', labelHindi: 'होम' },
    { label: 'Diagnose', path: '/diagnose', labelHindi: 'रोग जांच' },
    { label: 'Products', path: '/products', labelHindi: 'औषधालय' },
    { label: 'Doctors', path: '/doctors', labelHindi: 'डॉक्टर' },
    { label: 'Tracker', path: '/tracker', labelHindi: 'हेल्थ ट्रैकर' },
    { label: 'Blog', path: '/blog', labelHindi: 'आयुर्वेद ब्लॉग' },
    { label: 'About', path: '/about', labelHindi: 'हमारे बारे में' },
  ];

  const handleLinkClick = (path: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else {
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF0]/95 backdrop-blur-md border-b border-[#FF9933]/30 shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-[#1E3A8A] via-[#1E3A8A] to-[#FF9933] text-white text-xs py-1.5 px-4 font-medium flex items-center justify-between">
        <span className="hidden sm:inline">
          🌿 100% निःशुल्क AI रोग जांच • शुद्ध आयुर्वेदिक स्वास्थ्य व प्राकृतिक उपचार
        </span>
        <span className="sm:hidden text-center w-full">
          छोटेलाल जी हेल्थ • Aapki Sehat, Hamari Zimmedari
        </span>
        <div className="hidden md:flex items-center gap-4 text-amber-100 text-[11px]">
          <span className="flex items-center gap-1 font-bold">
            <PhoneCall className="w-3 h-3 text-[#FF9933]" /> टोल-फ्री: 1800-CHOTELAL
          </span>
          <span>|</span>
          <span className="text-emerald-300 font-bold">✓ आयुष मंत्रालय अनुपालन</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo & Name */}
        <div
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Circular Logo Emblem */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9933] to-amber-600 p-0.5 shadow-md flex items-center justify-center transform group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-[#FFFDD0] flex items-center justify-center border-2 border-white">
              <span className="text-sm font-black text-[#1E3A8A] tracking-tighter">
                CJH
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-[#1E3A8A] tracking-tight">
                Chotelal Ji <span className="text-[#FF9933]">Health</span>
              </span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 italic">
              Aapki Sehat, Hamari Zimmedari
            </p>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-bold text-sm text-slate-700">
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.path ||
              (link.path !== '/' && currentPath.startsWith(link.path));

            return (
              <button
                key={link.path}
                type="button"
                onClick={() => handleLinkClick(link.path)}
                className={`px-3 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#1E3A8A] bg-[#FF9933]/15 font-black border border-[#FF9933]/30'
                    : 'text-slate-600 hover:text-[#1E3A8A] hover:bg-slate-100'
                }`}
              >
                {lang === 'hi' ? link.labelHindi : link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Language Switcher + Consultation Button + Profile */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-2xs"
            title="भाषा बदलें (Switch Language)"
          >
            <Globe className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>{lang === 'hi' ? 'EN' : 'हिन्दी'}</span>
          </button>

          {/* Book Consultation / Video Call Button */}
          <button
            type="button"
            onClick={() => handleLinkClick('/doctors')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF9933] to-amber-600 hover:from-amber-600 hover:to-[#FF9933] text-white text-xs font-black shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 transform hover:scale-[1.02]"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'परामर्श बुक करें' : 'Book Consultation'}</span>
          </button>

          {/* Profile / Auth Button */}
          <button
            type="button"
            onClick={onOpenAuth ? onOpenAuth : () => handleLinkClick('/history')}
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-[#1E3A8A] transition-colors shadow-2xs"
            title="User Profile / History"
          >
            <User className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700"
          >
            {lang === 'hi' ? 'EN' : 'हिन्दी'}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.path ||
              (link.path !== '/' && currentPath.startsWith(link.path));

            return (
              <button
                key={link.path}
                type="button"
                onClick={() => handleLinkClick(link.path)}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-[#FF9933]/15 text-[#1E3A8A] font-black'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{lang === 'hi' ? link.labelHindi : link.label}</span>
                <span className="text-xs text-slate-400 font-normal">{link.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleLinkClick('/doctors')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF9933] to-amber-600 text-white font-black text-sm shadow-md text-center flex items-center justify-center gap-2"
            >
              <Stethoscope className="w-4 h-4" />
              <span>परामर्श बुक करें (Book Consultation)</span>
            </button>

            <button
              type="button"
              onClick={() => handleLinkClick('/video-call')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-black text-sm shadow-xs text-center flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4" />
              <span>छोटेलाल जी से फ्री वीडियो कॉल</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
