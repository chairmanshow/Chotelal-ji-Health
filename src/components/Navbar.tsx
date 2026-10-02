import React, { useState } from 'react';
import { ChotelalAvatar } from './ChotelalAvatar';
import { ChotelalLogo } from './ChotelalLogo';
import { useRouter, Link } from '../router';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  X,
  Sparkles,
  MessageCircle,
  LogOut,
  User as UserIcon,
  Star,
} from 'lucide-react';
import { WHATSAPP_CHANNEL_URL } from '../lib/constants';

interface NavbarProps {
  onOpenVoiceModal?: () => void;
  onOpenChatModal?: () => void;
  onOpenExpertPlus?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenVoiceModal,
  onOpenChatModal,
  onOpenExpertPlus,
}) => {
  const { currentPath } = useRouter();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenChat = () => {
    if (onOpenChatModal) {
      onOpenChatModal();
    } else if (onOpenVoiceModal) {
      onOpenVoiceModal();
    }
  };

  const handleOpenExpert = () => {
    if (onOpenExpertPlus) {
      onOpenExpertPlus();
    } else {
      handleOpenChat();
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Diagnose', path: '/diagnose', badge: 'Free' },
    { label: 'Remedies', path: '/remedies' },
    { label: 'Blog', path: '/blog' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all duration-200">
      {/* Top Banner with soft warm highlight */}
      <div className="bg-gradient-to-r from-orange-50 via-white to-sky-50 border-b border-gray-100 text-slate-700 text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-slate-800 font-semibold">100% Free AI Ayurvedic Health Support</span>
            <span className="text-slate-400">•</span>
            <span className="text-orange-600 font-semibold">30+ Years Wisdom</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-emerald-700 hidden sm:inline">No Doctor Fees</span>
          </span>
          <div className="hidden md:flex items-center gap-4 text-slate-600 text-xs">
            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 flex items-center gap-1 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Join WhatsApp Channel</span>
            </a>
            <span>•</span>
            <span className="text-sky-600 font-semibold">100% Confidential</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <ChotelalLogo size="sm" showSubtitle={false} badgeOnly={true} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-serif group-hover:text-orange-600 transition-colors">
                  Chotelal Ji <span className="text-[#FF9933]">Health</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Aapki Sehat, Hamari Zimmedari
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 relative ${
                    isActive
                      ? 'text-orange-600 bg-orange-50 font-bold border border-orange-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-1.5 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-1.5 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* ⭐ EXPERT+ Highlighted Feature Button (Golden/Orange gradient + Glow) */}
            <button
              type="button"
              onClick={handleOpenExpert}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white shadow-[0_0_20px_rgba(255,153,51,0.45)] hover:shadow-[0_0_28px_rgba(255,153,51,0.65)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-yellow-200/50"
              title="Expert+ Consultation with Chotelal Ji"
            >
              <Star className="w-4 h-4 fill-yellow-200 text-yellow-200 animate-spin" />
              <span>Expert+</span>
            </button>

            {/* Chatbot Q&A button */}
            <button
              type="button"
              onClick={handleOpenChat}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition cursor-pointer"
              title="Chat with Chotelal Ji"
            >
              <MessageCircle className="w-4 h-4 text-orange-600" />
              <span>Ask Chotelal Ji</span>
            </button>

            {/* Start Free Diagnosis CTA */}
            <Link
              href="/diagnose"
              className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-orange-200" />
              <span className="hidden sm:inline">Start Diagnosis</span>
              <span className="sm:hidden">Diagnose</span>
            </Link>

            {/* User Profile & Logout (MANDATORY REQUIREMENT) */}
            {user && (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <div className="flex items-center gap-2 bg-slate-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-6 h-6 rounded-full border border-gray-300 object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="w-3.5 h-3.5" />}
                    </div>
                  )}
                  <span className="font-semibold text-slate-800 max-w-[100px] truncate hidden md:inline">
                    {user.displayName || 'User'}
                  </span>
                </div>

                <button
                  onClick={() => signOut()}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                  title="लॉगआउट (Logout)"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 shadow-lg py-4 px-6 space-y-3 animate-fadeIn">
          {/* User profile info in mobile menu */}
          {user && (
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold text-slate-800">{user.displayName || 'User'}</div>
                  <div className="text-[10px] text-slate-500">{user.email}</div>
                </div>
              </div>

              <button
                onClick={() => signOut()}
                className="flex items-center gap-1 text-xs text-rose-600 font-semibold px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-orange-600 bg-orange-50 font-bold border border-orange-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenExpert();
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white py-3 rounded-xl text-sm font-black shadow-md cursor-pointer border border-yellow-200/50"
            >
              <Star className="w-4 h-4 fill-yellow-200 text-yellow-200" />
              <span>⭐ Start Expert+ Consultation</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenChat();
              }}
              className="w-full flex items-center justify-center gap-2 bg-orange-50 text-orange-700 border border-orange-200 py-3 rounded-xl text-sm font-bold shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-orange-600" />
              <span>Ask Chotelal Ji (AI Voice Chat)</span>
            </button>

            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 py-3 rounded-xl text-sm font-bold shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join our WhatsApp Channel</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
