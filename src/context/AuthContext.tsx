import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, validateFirestoreConnection } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phone?: string;
  isGuest?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  signInAsGuest: (name?: string, email?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
  unauthorizedDomain: string | null;
  emailProviderDisabled: boolean;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signInAsGuest: async () => {},
  resetPassword: async () => {},
  signOut: async () => {},
  error: null,
  unauthorizedDomain: null,
  emailProviderDisabled: false,
  clearError: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState<string | null>(null);
  const [emailProviderDisabled, setEmailProviderDisabled] = useState(false);

  useEffect(() => {
    // Restore local guest session if present
    try {
      const storedGuest = localStorage.getItem('chotelalji_guest_user');
      if (storedGuest) {
        const parsed = JSON.parse(storedGuest);
        setUser(parsed);
        setUserProfile({
          uid: parsed.uid,
          email: parsed.email || '',
          displayName: parsed.displayName || 'सम्मानित मरीज (Patient)',
          photoURL: parsed.photoURL || '',
          isGuest: true,
        });
      }
    } catch (e) {}

    // Validate Firestore connection on boot as mandated
    validateFirestoreConnection().catch((err) => {
      console.warn('Initial connection validation warning:', err);
    });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          localStorage.removeItem('chotelalji_guest_user');
        } catch (e) {}
        setUser(currentUser);
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            const newProfile: UserProfile = {
              uid: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'मरीज (Patient)',
              photoURL: currentUser.photoURL || '',
              createdAt: serverTimestamp(),
            };
            await setDoc(userRef, newProfile, { merge: true });
            setUserProfile(newProfile);
          }
        } catch (err: any) {
          console.warn('User profile sync note:', err);
          // Set basic local profile if rule restriction prevents read
          setUserProfile({
            uid: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'मरीज (Patient)',
            photoURL: currentUser.photoURL || '',
          });
        }
      } else {
        // If no firebase user, only clear if not in guest mode
        const storedGuest = localStorage.getItem('chotelalji_guest_user');
        if (!storedGuest) {
          setUser(null);
          setUserProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;

      // Update or create in Firestore
      const userRef = doc(db, 'users', loggedUser.uid);
      try {
        await setDoc(
          userRef,
          {
            uid: loggedUser.uid,
            email: loggedUser.email || '',
            displayName: loggedUser.displayName || 'मरीज (Patient)',
            photoURL: loggedUser.photoURL || '',
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (err: any) {
        console.warn('Firestore write on login note:', err);
      }
    } catch (err: any) {
      const code = err?.code || '';
      const msg = err?.message || '';

      // User closed or dismissed the popup window, or cancelled an in-flight popup.
      // This is a normal user cancellation action, not a system failure or runtime crash.
      if (
        code === 'auth/popup-closed-by-user' ||
        code === 'auth/cancelled-popup-request' ||
        msg.includes('popup-closed-by-user') ||
        msg.includes('cancelled-popup-request')
      ) {
        console.info('Google Sign-in popup was dismissed by the user.');
        return;
      }

      console.error('Google Sign-in failed:', err);

      let friendlyMsg = '';
      if (code === 'auth/unauthorized-domain' || msg.includes('unauthorized-domain')) {
        const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'run.app domain';
        setUnauthorizedDomain(currentHost);
        friendlyMsg = `Firebase Authorized Domain Error: Yeh domain (${currentHost}) aapke Firebase project 'chotelalji-health' me authorized nahi hai. Niche diye gaye helper se domain copy karke Firebase Console me add karein, ya Email & Password se turant login karein.`;
      } else if (code === 'auth/operation-not-allowed' || msg.includes('operation-not-allowed')) {
        friendlyMsg =
          'Firebase Error: Google Sign-in provider enable nahi hai. Kripya Firebase Console -> Authentication -> Sign-in method me jakar "Google" ko Enable karein.';
      } else if (code === 'auth/popup-blocked' || msg.includes('popup-blocked')) {
        friendlyMsg =
          'Browser Popup Blocked: Browser ne login window block kar di hai. URL bar me popup allow karein ya Email & Password se sign in karein.';
      } else {
        friendlyMsg = err?.message || 'Google Sign-in failed. Please try again.';
      }

      setError(friendlyMsg);
      const customErr = new Error(friendlyMsg);
      (customErr as any).code = code;
      throw customErr;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setError(null);
    try {
      const res = await signInWithEmailAndPassword(auth, email.trim(), pass);
      const loggedUser = res.user;
      const userRef = doc(db, 'users', loggedUser.uid);
      try {
        await setDoc(
          userRef,
          {
            uid: loggedUser.uid,
            email: loggedUser.email || '',
            displayName: loggedUser.displayName || email.split('@')[0],
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (err) {
        console.warn('Profile write on email signin note:', err);
      }
    } catch (err: any) {
      console.warn('Email signin error:', err);
      const code = err?.code || '';
      const rawMsg = err?.message || '';

      let msg = '';
      if (code === 'auth/operation-not-allowed' || rawMsg.includes('operation-not-allowed')) {
        setEmailProviderDisabled(true);
        msg =
          'Firebase Error: Email/Password login aapke Firebase project me enable nahi hai. Firebase Console > Authentication > Sign-in method me jakar Email/Password enable karein, ya Instant Login ⚡ button dabayein.';
      } else if (
        code === 'auth/invalid-credential' ||
        code === 'auth/wrong-password' ||
        code === 'auth/user-not-found'
      ) {
        msg = 'ईमेल या पासवर्ड गलत है। कृपया पुनः जांचें ya naya khata banayein.';
      } else {
        msg = err?.message || 'लॉगिन में त्रुटि आई।';
      }

      setError(msg);
      const customErr = new Error(msg);
      (customErr as any).code = code;
      throw customErr;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    setError(null);
    try {
      const res = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      const loggedUser = res.user;
      if (name.trim()) {
        try {
          await updateProfile(loggedUser, { displayName: name.trim() });
        } catch (e) {}
      }
      const userRef = doc(db, 'users', loggedUser.uid);
      try {
        await setDoc(userRef, {
          uid: loggedUser.uid,
          email: loggedUser.email || '',
          displayName: name.trim() || email.split('@')[0],
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.warn('Profile write on email signup note:', err);
      }
    } catch (err: any) {
      console.warn('Email signup error:', err);
      const code = err?.code || '';
      const rawMsg = err?.message || '';

      let msg = '';
      if (code === 'auth/operation-not-allowed' || rawMsg.includes('operation-not-allowed')) {
        setEmailProviderDisabled(true);
        msg =
          'Firebase Error: Email/Password sign-up aapke Firebase project me enable nahi hai. Firebase Console > Authentication > Sign-in method me jakar Email/Password enable karein, ya Instant Login ⚡ button dabayein.';
      } else if (code === 'auth/email-already-in-use') {
        msg = 'यह ईमेल पहले से पंजीकृत है। कृपया लॉगिन करें।';
      } else {
        msg = err?.message || 'पंजीकरण में त्रुटि आई।';
      }

      setError(msg);
      const customErr = new Error(msg);
      (customErr as any).code = code;
      throw customErr;
    }
  };

  const signInAsGuest = async (name?: string, email?: string) => {
    setError(null);
    clearError();
    const guestUid = 'guest_' + Date.now().toString(36);
    const guestUser: any = {
      uid: guestUid,
      email: email || 'patient@chotelalji-health.in',
      displayName: name || 'सम्मानित मरीज (Guest Patient)',
      photoURL: '',
      isAnonymous: true,
    };
    try {
      localStorage.setItem('chotelalji_guest_user', JSON.stringify(guestUser));
    } catch (e) {}
    setUser(guestUser);
    setUserProfile({
      uid: guestUid,
      email: guestUser.email,
      displayName: guestUser.displayName,
      photoURL: '',
      isGuest: true,
    });
  };

  const resetPassword = async (email: string) => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err?.message || 'पासवर्ड रीसेट लिंक भेजने में त्रुटि आई।');
      throw err;
    }
  };

  const signOut = async () => {
    try {
      try {
        localStorage.removeItem('chotelalji_guest_user');
      } catch (e) {}
      setUser(null);
      setUserProfile(null);
      if (auth.currentUser) {
        await firebaseSignOut(auth);
      }
    } catch (err: any) {
      console.error('Sign out error:', err);
      setError(err?.message || 'Sign out failed.');
    }
  };

  const clearError = () => {
    setError(null);
    setUnauthorizedDomain(null);
    setEmailProviderDisabled(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signInAsGuest,
        resetPassword,
        signOut,
        error,
        unauthorizedDomain,
        emailProviderDisabled,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
