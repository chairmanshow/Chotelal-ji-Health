import React, { useState, useEffect } from 'react';
import {
  X,
  LogIn,
  LogOut,
  User,
  ShieldCheck,
  FileText,
  Clock,
  ChevronRight,
  CheckCircle2,
  Mail,
  Lock,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ChotelalAvatar } from './ChotelalAvatar';
import { FirebaseSetupNotice } from './FirebaseSetupNotice';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'account' | 'history';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab = 'account' }) => {
  const {
    user,
    userProfile,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    resetPassword,
    signOut,
    error,
    unauthorizedDomain,
    emailProviderDisabled,
    signInAsGuest,
    clearError,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'account' | 'history'>(initialTab);
  const [authMode, setAuthMode] = useState<'google' | 'email_signin' | 'email_signup' | 'forgot_pass'>('google');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [diagnoses, setDiagnoses] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (user && activeTab === 'history') {
      fetchUserHistory();
    }
  }, [user, activeTab]);

  const fetchUserHistory = async () => {
    if (!user) return;
    setLoadingHistory(true);
    try {
      const q = query(
        collection(db, 'diagnoses'),
        where('userId', '==', user.uid)
      );
      const snapshot = await getDocs(q);
      const list: any[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      setDiagnoses(list);
    } catch (err) {
      console.warn('History fetch note:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    clearError();
    setInfoMessage('');
    try {
      await signInWithGoogle();
      if (user) {
        onClose();
      }
    } catch (e: any) {
      const code = e?.code || '';
      const msg = e?.message || '';
      if (
        code === 'auth/popup-closed-by-user' ||
        code === 'auth/cancelled-popup-request' ||
        msg.includes('popup-closed-by-user') ||
        msg.includes('cancelled-popup-request')
      ) {
        return;
      }
      console.warn('Google sign-in caught:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      return;
    }
    setIsSubmitting(true);
    clearError();
    setInfoMessage('');

    try {
      if (authMode === 'email_signin') {
        await signInWithEmail(email, password);
      } else if (authMode === 'email_signup') {
        await signUpWithEmail(email, password, displayName);
      } else if (authMode === 'forgot_pass') {
        await resetPassword(email);
        setInfoMessage('पासवर्ड रीसेट लिंक आपके ईमेल पर भेज दी गई है।');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChotelalAvatar size="sm" />
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-orange-200">
                सुरक्षित मरीज खाता (Patient Portal)
              </span>
              <h3 className="text-xl font-black">
                {user ? userProfile?.displayName || 'नमस्ते मरीज!' : 'छोटेलाल जी स्वास्थ्य खाता'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation when logged in */}
        {user && (
          <div className="flex border-b border-slate-200 bg-slate-50">
            <button
              onClick={() => setActiveTab('account')}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'account'
                  ? 'border-orange-600 text-orange-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>प्रोफाइल (Profile)</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'history'
                  ? 'border-orange-600 text-orange-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>स्वास्थ्य इतिहास (Prescriptions)</span>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {(unauthorizedDomain ||
            emailProviderDisabled ||
            (error &&
              (error.includes('Firebase') ||
                error.includes('Authorized Domain') ||
                error.includes('operation-not-allowed')))) ? (
            <div className="mb-4">
              <FirebaseSetupNotice
                onSuccessDemoLogin={() => onClose()}
                defaultEmail={email}
                defaultName={displayName}
              />
            </div>
          ) : error ? (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center justify-between">
              <span>{error}</span>
              <button onClick={clearError} className="text-red-500 font-bold ml-2">
                ✕
              </button>
            </div>
          ) : null}

          {infoMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              {infoMessage}
            </div>
          )}

          {!user ? (
            /* Not Logged In View */
            <div className="space-y-6">
              {/* Google 1-Click Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 font-extrabold text-sm flex items-center justify-center gap-3 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9c-.4-1.6-.4-3.8 0-5.4z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                  />
                </svg>
                <span>{isSubmitting ? 'कनेक्ट हो रहे हैं...' : 'Google से 1-क्लिक साइन इन'}</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">या ईमेल से</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Email/Password Auth Form */}
              <form onSubmit={handleEmailAuth} className="space-y-3.5">
                {authMode === 'email_signup' && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">पूरा नाम (Full Name)</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="आपका शुभ नाम..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-orange-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ईमेल पता (Email)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-orange-500"
                    />
                  </div>
                </div>

                {authMode !== 'forgot_pass' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">पासवर्ड (Password)</label>
                      {authMode === 'email_signin' && (
                        <button
                          type="button"
                          onClick={() => setAuthMode('forgot_pass')}
                          className="text-[11px] text-orange-600 font-bold hover:underline"
                        >
                          पासवर्ड भूल गए?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="कम से कम 6 अक्षर..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-orange-500"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? 'कृपया प्रतीक्षा करें...'
                      : authMode === 'email_signup'
                      ? 'नया निःशुल्क खाता बनाएं'
                      : authMode === 'forgot_pass'
                      ? 'रीसेट लिंक भेजें'
                      : 'लॉगिन करें'}
                  </span>
                </button>
              </form>

              {/* Mode toggles */}
              <div className="text-center text-xs text-slate-600 pt-2 border-t border-slate-100">
                {authMode === 'email_signup' ? (
                  <p>
                    पहले से खाता है?{' '}
                    <button
                      onClick={() => setAuthMode('email_signin')}
                      className="text-orange-600 font-bold hover:underline"
                    >
                      यहाँ लॉगिन करें
                    </button>
                  </p>
                ) : (
                  <p>
                    नया मरीज खाता बनाना है?{' '}
                    <button
                      onClick={() => setAuthMode('email_signup')}
                      className="text-orange-600 font-bold hover:underline"
                    >
                      मुफ़्त रजिस्टर करें
                    </button>
                  </p>
                )}
              </div>
            </div>
          ) : activeTab === 'account' ? (
            /* Logged In - Account Profile */
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-orange-500 shadow-sm"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white font-black text-xl flex items-center justify-center">
                    {user.displayName?.[0] || 'U'}
                  </div>
                )}
                <div>
                  <h4 className="text-base font-black text-slate-900">{user.displayName || 'सम्मानित मरीज'}</h4>
                  <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    सत्यापित मरीज (Verified)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 text-orange-900">
                  <span className="font-bold block">प्राकृतिक दोष विश्लेषण</span>
                  <span className="text-sm font-black mt-0.5 block">वात-पित्त संतुलन</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900">
                  <span className="font-bold block">सक्रिय परामर्शक</span>
                  <span className="text-sm font-black mt-0.5 block">वैद्य छोटेलाल जी</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => setActiveTab('history')}
                  className="text-xs font-bold text-orange-700 hover:text-orange-900 flex items-center gap-1"
                >
                  <span>मेरे पर्चे देखें ({diagnoses.length})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={signOut}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>लॉगआउट करें</span>
                </button>
              </div>
            </div>
          ) : (
            /* Logged In - Health History */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900">आपके पिछले स्वास्थ्य आकलन</h4>
                <button
                  onClick={fetchUserHistory}
                  className="text-xs font-bold text-orange-600 hover:underline"
                >
                  रिफ्रेश करें
                </button>
              </div>

              {loadingHistory ? (
                <div className="py-8 text-center text-xs text-slate-400">रिकॉर्ड लोड हो रहे हैं...</div>
              ) : diagnoses.length === 0 ? (
                <div className="py-8 text-center text-slate-500 space-y-2">
                  <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs">अभी तक कोई पुराना पर्चा सहेजा नहीं गया है।</p>
                  <p className="text-[11px] text-slate-400">
                    होमपेज पर जाकर 'AI रोग जांच' करें, वह यहां सुरक्षित रहेगा।
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {diagnoses.map((diag) => (
                    <div
                      key={diag.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-2 py-0.5 rounded-md">
                            {diag.patientSummary?.category || 'सामान्य'}
                          </span>
                          <h5 className="font-bold text-sm text-slate-900 mt-1">
                            {diag.diagnosis?.primaryConditionHindi || diag.diagnosis_text || 'स्वास्थ्य परामर्श'}
                          </h5>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                            लक्षण: {diag.patientSummary?.reportedSymptoms || 'विवरण सुरक्षित'}
                          </p>
                        </div>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {diag.createdAt ? new Date(diag.createdAt).toLocaleDateString('hi-IN') : 'सहेजा गया'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
