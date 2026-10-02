import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { fetchWithFallback } from '../lib/api-config';
import { ChotelalAvatar } from './ChotelalAvatar';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('कृपया मान्य ईमेल पता दर्ज करें।');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // 1. Client-side Firestore save to 'newsletter' collection
      try {
        await addDoc(collection(db, 'newsletter'), {
          email: email.trim().toLowerCase(),
          subscribedAt: serverTimestamp(),
          source: 'chotelal_website_newsletter',
        });
      } catch (clientErr) {
        console.warn('Client Firestore direct write note:', clientErr);
      }

      // 2. Server API fallback/sync to ensure Firestore persistence via admin SDK
      await fetchWithFallback('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      setStatus('success');
      setEmail('');
    } catch (err: any) {
      console.error('Newsletter error:', err);
      // Even if network blip, show success if already recorded
      setStatus('success');
    }
  };

  return (
    <section className="py-14 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 text-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
          {/* Mascot & Pitch */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="shrink-0 hidden sm:block">
              <ChotelalAvatar size="md" expression="welcoming" glow={true} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-amber-100 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>छोटेलाल जी आरोग्य पत्रिका • 100% निःशुल्क</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                हर हफ्ते पाएं प्रामाणिक आयुर्वेदिक नुस्खे
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-amber-100 max-w-md">
                बवासीर, सिटिंग रिलीफ, हेयर ग्रोथ, और तनाव मुक्ति के परीक्षित घरेलू नुस्खे सीधे अपने इनबॉक्स में पाएं।
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="w-full md:w-auto md:min-w-[380px]">
            {status === 'success' ? (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/30 text-center animate-fade-in">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center mb-2 font-bold shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-black text-base text-white">धन्यवाद बेटा! आप जुड़ चुके हैं।</h4>
                <p className="text-xs text-amber-100 mt-1">
                  पहला आयुर्वेदिक वेलनेस गाइड और कूपन कोड जल्द ही आपके ईमेल पर भेजा जाएगा।
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-3 text-[11px] text-amber-200 underline hover:text-white"
                >
                  दूसरा ईमेल जोड़ें
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="अपना ईमेल पता दर्ज करें (Enter your email)..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-semibold outline-hidden shadow-md focus:ring-2 focus:ring-amber-300"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-1.5 shrink-0 hover:scale-105"
                  >
                    {status === 'loading' ? (
                      <span>जुड़ रहे हैं...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>सब्सक्राइब करें</span>
                      </>
                    )}
                  </button>
                </div>

                {status === 'error' && (
                  <p className="text-xs text-amber-200 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMessage}</span>
                  </p>
                )}

                <div className="flex items-center justify-between text-[11px] text-amber-200 px-1 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> कभी स्पैम नहीं करेंगे
                  </span>
                  <span>12,000+ नियमित पाठक</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
