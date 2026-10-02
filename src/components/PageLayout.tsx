import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingWhatsAppButton } from './FloatingWhatsAppButton';
import { ChotelalChatModal } from './ChotelalChatModal';
import { useRouter, Link } from '../router';
import { ChevronRight, Sparkles } from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  pageTitle?: string;
  pageSubtitle?: string;
  badge?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showBreadcrumbs = true,
  pageTitle,
  pageSubtitle,
  badge,
}) => {
  const { breadcrumbs } = useRouter();
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [startExpertPlus, setStartExpertPlus] = useState(false);

  useEffect(() => {
    const handleChatOpen = (e: any) => {
      setStartExpertPlus(Boolean(e?.detail?.expertPlus));
      setIsChatModalOpen(true);
    };
    window.addEventListener('chotelal:open-voice-modal', handleChatOpen);
    window.addEventListener('chotelal:open-chat-modal', handleChatOpen);
    return () => {
      window.removeEventListener('chotelal:open-voice-modal', handleChatOpen);
      window.removeEventListener('chotelal:open-chat-modal', handleChatOpen);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-orange-100 selection:text-orange-900 relative">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          onOpenChatModal={() => {
            setStartExpertPlus(false);
            setIsChatModalOpen(true);
          }}
          onOpenExpertPlus={() => {
            setStartExpertPlus(true);
            setIsChatModalOpen(true);
          }}
        />

        {/* Breadcrumbs */}
        {showBreadcrumbs && breadcrumbs.length > 1 && (
          <div className="bg-[#F8FAFC] border-b border-gray-100 py-3 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
              <nav className="flex items-center space-x-1.5 text-slate-500 overflow-x-auto py-1">
                {breadcrumbs.map((crumb, idx) => {
                  const isLast = idx === breadcrumbs.length - 1;
                  return (
                    <React.Fragment key={crumb.path}>
                      {idx > 0 && (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                      {isLast ? (
                        <span className="font-semibold text-orange-600 truncate">
                          {crumb.label}
                        </span>
                      ) : (
                        <Link
                          href={crumb.path}
                          className="hover:text-orange-600 transition-colors shrink-0"
                        >
                          {crumb.label}
                        </Link>
                      )}
                    </React.Fragment>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Optional Page Header Banner */}
        {pageTitle && (
          <div className="bg-gradient-to-br from-orange-50 via-white to-sky-50 border-b border-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center space-y-3">
              {badge && (
                <div className="inline-flex items-center gap-1.5 bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>{badge}</span>
                </div>
              )}
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
                {pageTitle}
              </h1>
              {pageSubtitle && (
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  {pageSubtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Main Page Body */}
        <main className="flex-1 bg-white">
          {children}
        </main>

        <Footer />

        {/* Global Floating WhatsApp Assist Button */}
        <FloatingWhatsAppButton />

        {/* AI Diagnostic Voice & Text Chatbot Modal (3-Step Q&A + YouTube Video) */}
        <ChotelalChatModal
          isOpen={isChatModalOpen}
          onClose={() => setIsChatModalOpen(false)}
          startWithExpertPlus={startExpertPlus}
        />
      </div>
    </div>
  );
};
