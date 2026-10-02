'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ChotelalChatWidget } from './ChotelalChatWidget';
import { ChotelalChatModal } from '../../src/components/ChotelalChatModal';
import { AuthModal } from '../../src/components/AuthModal';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface LayoutProps {
  children: React.ReactNode;
  currentPath?: string;
  breadcrumbs?: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentPath = '/',
  breadcrumbs,
  onNavigate,
}) => {
  const [isLiveVoiceOpen, setIsLiveVoiceOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF0] text-slate-800 font-sans selection:bg-[#FF9933]/30 selection:text-slate-900">
      {/* Universal Clean Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Top Breadcrumb (shown on all pages except Homepage '/') */}
      {currentPath !== '/' && breadcrumbs && breadcrumbs.length > 0 && (
        <div className="bg-white/80 border-b border-slate-200/80 py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <button
              onClick={() => handleNavigate('/')}
              className="flex items-center gap-1 hover:text-[#1E3A8A] transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-[#FF9933]" />
              <span>Home</span>
            </button>

            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                {crumb.path ? (
                  <button
                    onClick={() => handleNavigate(crumb.path!)}
                    className="hover:text-[#1E3A8A] transition-colors"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-[#1E3A8A] font-bold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Main Page Content */}
      <main className="flex-1">{children}</main>

      {/* Universal Floating Chotelal Chat & Live Voice Widget */}
      <ChotelalChatWidget
        onOpenLiveVoice={() => setIsLiveVoiceOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Modals */}
      <ChotelalChatModal
        isOpen={isLiveVoiceOpen}
        onClose={() => setIsLiveVoiceOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
};
