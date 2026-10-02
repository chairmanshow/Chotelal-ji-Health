import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const clientCredentials = {
  apiKey: (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_FIREBASE_API_KEY) || (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_FIREBASE_API_KEY) || firebaseConfig.apiKey,
  authDomain: (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) || firebaseConfig.authDomain,
  projectId: (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_FIREBASE_PROJECT_ID) || firebaseConfig.projectId,
  storageBucket: (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) || firebaseConfig.storageBucket,
  messagingSenderId: (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) || firebaseConfig.messagingSenderId,
  appId: (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_FIREBASE_APP_ID) || firebaseConfig.appId,
};

// Initialize or reuse Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(clientCredentials);

// Initialize Firestore
export const db =
  firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
    ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
    : getFirestore(app);

export const auth = getAuth(app);

// Connection check as required by Firebase Integration standard
export async function validateFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline status:', error.message);
      return false;
    }
    // Any permission error still means server is reachable
    return true;
  }
}

export default app;
