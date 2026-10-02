import { initializeApp, getApps, getApp, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const projectId = process.env.FIREBASE_PROJECT_ID || firebaseConfig.projectId;

let adminAppInstance: App | null = null;
let adminDbInstance: Firestore | null = null;
let adminAuthInstance: Auth | null = null;

try {
  adminAppInstance = getApps().length > 0 ? getApp() : initializeApp({ projectId });
  adminDbInstance = getFirestore(adminAppInstance);
  adminAuthInstance = getAuth(adminAppInstance);
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
}

export const adminApp = adminAppInstance;
export const adminDb = adminDbInstance;
export const adminAuth = adminAuthInstance;

export default adminAppInstance;
