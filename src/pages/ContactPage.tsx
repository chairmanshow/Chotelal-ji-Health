import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import {
  Mail,
  PhoneCall,
  MessageCircle,
  FileText,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Headphones,
} from 'lucide-react';
import {
  SUPPORT_EMAIL,
  GOOGLE_SUPPORT_FORM_URL,
  GOOGLE_SUPPORT_FORM_EMBED_URL,
} from '../lib/constants';

export const ContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'googleForm' | 'quickMessage'>('googleForm');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <PageLayout
      pageTitle="संपर्क एवं सहायता (Support & Contact)"
      pageSubtitle="स्वास्थ्य संबंधी किसी भी प्रश्न, सुझाव या सहायता के लिए छोटेलाल जी और हमारी टीम आपके साथ है।"
      badge="24x7 मुफ़्त सेवा व सहायता"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Support Options Header / Google Form Spotlight */}
        <div className="bg-gradient-to-r from-blue-900/40 via-cyan-900/30 to-purple-900/40 border border-[#00D4FF]/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_35px_rgba(0,212,255,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/40 px-3 py-1 rounded-full text-xs font-bold text-cyan-300">
              <Headphones className="w-3.5 h-3.5" />
              <span>आधिकारिक Google Support Form</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
              क्या आपको कोई सहायता या प्रश्न पूछना है?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              आप नीचे दिए गए आधिकारिक Google Form के माध्यम से सीधे अपनी समस्या भेज सकते हैं। हमारी सहायता टीम 24 घंटे के भीतर आपसे संपर्क करेगी।
            </p>
          </div>

          <a
            href={GOOGLE_SUPPORT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all transform hover:scale-105 text-sm"
          >
            <FileText className="w-4 h-4" />
            <span>Google Support Form खोलें</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Contact Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111827] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white font-serif flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>सीधे संपर्क सूत्र</span>
              </h3>

              <div className="space-y-5 text-sm text-slate-300">
                {/* Official Support Email */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-white text-xs uppercase tracking-wider mb-0.5">
                      आधिकारिक सहायता ईमेल
                    </strong>
                    <a
                      href={`mailto:${SUPPORT_EMAIL}`}
                      className="text-cyan-400 hover:text-cyan-300 font-mono text-sm break-all hover:underline"
                    >
                      {SUPPORT_EMAIL}
                    </a>
                    <p className="text-[11px] text-slate-400 mt-0.5">24x7 ईमेल सहायता उपलब्ध</p>
                  </div>
                </div>

                {/* WhatsApp Support */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-white text-xs uppercase tracking-wider mb-0.5">
                      WhatsApp सहायता चैनल
                    </strong>
                    <p className="text-slate-400 text-xs">मुफ़्त स्वास्थ्य सुझाव व अपडेट</p>
                    <a
                      href="https://wa.me/?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%20%E0%A4%9B%E0%A5%8B%E0%A4%9F%E0%A5%87%E0%A4%B2%E0%A4%BE%E0%A4%B2%20%E0%A4%9C%E0%A5%80!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-bold hover:underline inline-block mt-1 text-xs"
                    >
                      WhatsApp पर चैट करें →
                    </a>
                  </div>
                </div>

                {/* Free Live Voice Call */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-white text-xs uppercase tracking-wider mb-0.5">
                      मुफ़्त 1:1 AI वॉयस कॉल
                    </strong>
                    <p className="text-slate-400 text-xs">
                      छोटेलाल जी से सीधे अपनी आवाज़ में बात करने के लिए ऊपर &quot;CALL FOR FREE&quot; बटन दबाएं।
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Banner */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>आपातकालीन सूचना:</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  यदि तीव्र रक्तस्राव, असहनीय सीने में दर्द या सांस लेने में गंभीर रुकावट हो, तो तुरंत एम्बुलेंस (108) पर कॉल करें या नज़दीकी अस्पताल जाएं।
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: Google Form Embed & Direct Message */}
          <div className="lg:col-span-7">
            <div className="bg-[#111827] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
              {/* Tab Selector */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('googleForm')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'googleForm'
                      ? 'bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/50 shadow-[0_0_12px_rgba(0,212,255,0.3)]'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Google Form सपोर्ट (अनुशंसित)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('quickMessage')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'quickMessage'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>त्वरित संदेश (Quick Message)</span>
                </button>
              </div>

              {/* View 1: Embedded Google Form */}
              {activeTab === 'googleForm' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white font-serif">
                        Google Form सहायता फॉर्म
                      </h4>
                      <p className="text-xs text-slate-400">
                        फॉर्म भरें, हमारी टीम आपको सीधे सहायता प्रदान करेगी।
                      </p>
                    </div>
                    <a
                      href={GOOGLE_SUPPORT_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1"
                    >
                      <span>नई विंडो में खोलें</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Responsive Iframe Container */}
                  <div className="w-full bg-[#0A0E1A] rounded-2xl overflow-hidden border border-white/10 min-h-[580px] relative shadow-inner">
                    <iframe
                      src={GOOGLE_SUPPORT_FORM_EMBED_URL}
                      width="100%"
                      height="650"
                      frameBorder="0"
                      marginHeight={0}
                      marginWidth={0}
                      title="Google Support Form"
                      className="w-full border-0"
                    >
                      Loading…
                    </iframe>
                  </div>
                </div>
              )}

              {/* View 2: Quick Message Form */}
              {activeTab === 'quickMessage' && (
                <div>
                  {isSubmitted ? (
                    <div className="py-12 text-center space-y-4 animate-fadeIn">
                      <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-white font-serif">
                        आपका संदेश प्राप्त हो गया है!
                      </h3>
                      <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                        धन्यवाद {name}। हमारी आयुर्वेदिक टीम और छोटेलाल जी आपके संदेश का अध्ययन कर शीघ्र ही <strong>{SUPPORT_EMAIL}</strong> या WhatsApp पर संपर्क करेंगे।
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setName('');
                          setPhone('');
                          setSubject('');
                          setMessage('');
                        }}
                        className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-colors cursor-pointer shadow-md"
                      >
                        अन्य संदेश भेजें
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <h4 className="text-lg font-bold text-white font-serif">
                        संदेश या प्रश्न भेजें
                      </h4>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          आपका पूरा नाम *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="उदा. अमित कुमार"
                          className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:outline-hidden focus:border-cyan-400 text-sm text-white placeholder-slate-500 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">
                            WhatsApp नंबर या फोन *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="उदा. 9876543210"
                            className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:outline-hidden focus:border-cyan-400 text-sm text-white placeholder-slate-500 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">
                            विषय (Subject)
                          </label>
                          <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="उदा. डाइट व पाचन समस्या"
                            className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:outline-hidden focus:border-cyan-400 text-sm text-white placeholder-slate-500 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          अपनी स्वास्थ्य समस्या या प्रश्न लिखें *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="अपनी समस्या का विवरण यहाँ लिखें..."
                          className="w-full p-4 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:outline-hidden focus:border-cyan-400 text-sm text-white placeholder-slate-500 leading-relaxed transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>संदेश भेजें (Send Message)</span>
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
