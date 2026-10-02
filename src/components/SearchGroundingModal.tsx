import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Sparkles,
  ExternalLink,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
} from 'lucide-react';

interface SearchGroundingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultQuery?: string;
}

export const SearchGroundingModal: React.FC<SearchGroundingModalProps> = ({
  isOpen,
  onClose,
  defaultQuery = 'Triphala clinical trials for hemorrhoids and constipation',
}) => {
  const [query, setQuery] = useState(defaultQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    summary: string;
    sources: Array<{ title: string; uri: string }>;
    groundedWith: string;
  } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && !result && !loading) {
      handleSearch(defaultQuery);
    }
  }, [isOpen]);

  const quickTopics = [
    'त्रिफला व बवासीर क्लिनिकल ट्रायल्स',
    'अश्वगंधा व अनिद्रा/तनाव रिसर्च',
    'भृंगराज व बाल झड़ने पर आधुनिक शोध',
    'क्षार-सूत्र व फिस्टुला सफलता दर (98%)',
  ];

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/ayurveda/search-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTerm }),
      });
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.warn('Search grounding error:', err);
      setError('रिसर्च खोजने में समस्या आई। कृपया पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight">आयुर्वेदिक क्लिनिकल रिसर्च फाइंडर</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/30 text-blue-200 border border-blue-400/40">
                  Google Search Grounded
                </span>
              </div>
              <p className="text-xs text-slate-300">
                gemini-3.5-flash द्वारा लाइव वैज्ञानिक शोध एवं आयुष मानक सत्यापन
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="जड़ी-बूटी या बीमारी का वैज्ञानिक शोध खोजें (जैसे: Ashwagandha sleep trials)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-300 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span>{loading ? 'खोज रहे हैं...' : 'रिसर्च खोजें'}</span>
            </button>
          </form>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-500 mr-1">लोकप्रिय विषय:</span>
            {quickTopics.map((topic, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(topic);
                  handleSearch(topic);
                }}
                className="text-[11px] font-bold text-blue-950 bg-blue-100/70 hover:bg-blue-200/80 border border-blue-200 px-2.5 py-1 rounded-lg transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Results Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto" />
              <p className="text-xs sm:text-sm font-bold text-slate-700">
                Google Search से नवीनतम आयुर्वेदिक शोधपत्र एवं आयुष डाटा एकत्रित किया जा रहा है...
              </p>
              <span className="text-xs text-slate-400">gemini-3.5-flash Search Grounding सक्रिय है</span>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Evidence Summary Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-blue-950 font-black text-sm">
                  <BookOpen className="w-4 h-4 text-blue-700" />
                  <span>वैज्ञानिक निष्कर्ष व नैदानिक प्रमाण (Clinical Evidence)</span>
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-line">
                  {result.summary}
                </div>
              </div>

              {/* Verified Web Citations with Real URLs */}
              {result.sources && result.sources.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                    सत्यापित शोध स्रोत एवं संदर्भ (Grounded Web Sources)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {result.sources.map((s, idx) => (
                      <a
                        key={idx}
                        href={s.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex items-start justify-between gap-2 group text-left"
                      >
                        <div className="flex-1">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 block line-clamp-1">
                            {s.title}
                          </span>
                          <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                            {s.uri}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center space-y-3">
              <FlaskConical className="w-12 h-12 text-blue-200 mx-auto" />
              <h4 className="text-sm font-black text-slate-900">
                सत्यापित आयुर्वेदिक शोध खोजें
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                ऊपर दिए गए सर्च बार में अपनी औषधि या लक्षण लिखें और Google Search ग्राउंडिंग के माध्यम से लाइव क्लिनिकल प्रमाण देखें।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
