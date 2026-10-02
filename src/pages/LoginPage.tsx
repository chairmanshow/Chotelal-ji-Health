import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChotelalLogo } from '../components/ChotelalLogo';
import { FirebaseSetupNotice } from '../components/FirebaseSetupNotice';
import {
  ShieldCheck,
  Heart,
  Sparkles,
  AlertCircle,
  Loader2,
  Mail,
  Lock,
  ArrowRight,
  User as UserIcon,
} from 'lucide-react';
import { Link, useRouter } from '../router';

export const LoginPage: React.FC = () => {
  const {
    user,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signInAsGuest,
    error,
    unauthorizedDomain,
    emailProviderDisabled,
    clearError,
  } = useAuth();
  const { navigate } = useRouter();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'google' | 'email_signin' | 'email_signup'>('google');

  // Email form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setIsSigningIn(true);
      setLocalError(null);
      clearError();
      await signInWithGoogle();
    } catch (err: any) {
      const code = err?.code || '';
      const msg = err?.message || '';
      if (
        code === 'auth/popup-closed-by-user' ||
        code === 'auth/cancelled-popup-request' ||
        msg.includes('popup-closed-by-user') ||
        msg.includes('cancelled-popup-request')
      ) {
        return;
      }
      console.warn('Google sign-in caught:', err);
      setLocalError(err?.message || 'Google Login failed. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setIsSigningIn(true);
      setLocalError(null);
      clearError();
      if (authMode === 'email_signup') {
        await signUpWithEmail(email, password, name || email.split('@')[0]);
      } else {
        await signInWithEmail(email, password);
      }
      navigate('/');
    } catch (err: any) {
      console.warn('Email auth caught in LoginPage:', err);
      setLocalError(err?.message || 'Email authentication failed.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    try {
      setIsSigningIn(true);
      await signInAsGuest('सम्मानित मरीज (Patient)', email || 'patient@chotelalji-health.in');
      navigate('/');
    } catch (e) {
      console.error(e);
    } finally {
      setIsSigningIn(false);
    }
  };

  const isFirebaseSetupIssue =
    Boolean(unauthorizedDomain) ||
    Boolean(emailProviderDisabled) ||
    Boolean(localError && (localError.includes('Firebase') || localError.includes('Authorized Domain') || localError.includes('operation-not-allowed'))) ||
    Boolean(error && (error.includes('Firebase') || error.includes('Authorized Domain') || error.includes('operation-not-allowed')));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4 selection:bg-orange-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-orange-100 rounded-full blur-2xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-sky-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Chotelal Ji Circular Avatar Emblem */}
          <div className="flex justify-center">
            <ChotelalLogo size="lg" showSubtitle={false} badgeOnly={true} />
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-3 py-0.5 rounded-full text-xs font-bold text-orange-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span>30+ Years Ayurvedic Wisdom</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 font-serif tracking-tight">
              Chotelal Ji <span className="text-orange-500">Health</span>
            </h1>
            <p className="text-xs text-slate-500">
              Aapki Sehat, Hamari Zimmedari
            </p>
          </div>

          {/* Firebase Setup Notice if domain or email provider issue triggered */}
          {isFirebaseSetupIssue && (
            <FirebaseSetupNotice
              onSuccessDemoLogin={() => navigate('/')}
              defaultEmail={email}
              defaultName={name}
            />
          )}

          {/* Standard Error Message (if other error) */}
          {!isFirebaseSetupIssue && (localError || error) && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl flex items-center justify-between text-left">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{localError || error}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLocalError(null);
                  clearError();
                }}
                className="text-rose-500 font-bold ml-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Google Login Button */}
          {authMode === 'google' ? (
            <div className="space-y-4 pt-1">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isSigningIn}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-800 font-bold py-3 px-5 rounded-2xl border-2 border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all text-xs sm:text-sm cursor-pointer disabled:opacity-50"
              >
                {isSigningIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                    <span>Google से जुड़ रहे हैं...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Google से 1-क्लिक लॉगिन</span>
                  </>
                )}
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-2 text-[10px] text-slate-400 uppercase font-bold absolute">
                  या
                </span>
              </div>

              {/* Switch to Email option */}
              <button
                type="button"
                onClick={() => {
                  setAuthMode('email_signin');
                  setLocalError(null);
                  clearError();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-orange-600" />
                <span>Email व Password से लॉगिन करें</span>
              </button>
            </div>
          ) : (
            /* Email Form */
            <form onSubmit={handleEmailSubmit} className="space-y-3 text-left pt-1">
              {authMode === 'email_signup' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    आपका नाम (Full Name)
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="उदा. राहुल शर्मा"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  ईमेल (Email Address)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  पासवर्ड (Password)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="कम से कम 6 अक्षर"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSigningIn}
                className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer disabled:opacity-50"
              >
                {isSigningIn ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <span>
                    {authMode === 'email_signup' ? 'निःशुल्क खाता बनाएं' : 'लॉगिन करें'}
                  </span>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    setAuthMode(authMode === 'email_signup' ? 'email_signin' : 'email_signup')
                  }
                  className="text-orange-600 font-bold hover:underline cursor-pointer"
                >
                  {authMode === 'email_signup'
                    ? 'पहले से खाता है? लॉगिन करें'
                    : 'नया खाता बनाना है? साइन अप करें'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('google');
                    setLocalError(null);
                  }}
                  className="text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Google Login पर जाएं
                </button>
              </div>
            </form>
          )}

          {/* Benefits summary */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-[11px] text-slate-600 space-y-1.5 text-left">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>100% Free AI Ayurvedic Health Assessment &amp; Prescription</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Personal health history &amp; diet chart saved securely</span>
            </div>
          </div>

          {/* Terms & Privacy */}
          <p className="text-[10px] text-slate-400 leading-relaxed pt-1">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-sky-600 hover:underline">
              Terms &amp; Conditions
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-sky-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
