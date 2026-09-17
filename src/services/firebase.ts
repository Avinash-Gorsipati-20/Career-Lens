import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  getAuth,
  type User as FirebaseUser
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Firebase's web configuration is public by design, but it must still belong
 * to the project's real Firebase application. Keep it out of source control
 * so a deployment cannot silently use somebody else's project.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const requiredFirebaseKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
] as const;

const missingFirebaseKeys = requiredFirebaseKeys.filter(key => !import.meta.env[key]);

export const isFirebaseConfigured = missingFirebaseKeys.length === 0;
export const firebaseConfigurationError = isFirebaseConfigured
  ? null
  : `Firebase is not configured. Add ${missingFirebaseKeys.join(', ')} to .env.local.`;

export const app = isFirebaseConfigured
  ? (getApps().length ? getApp() : initializeApp(firebaseConfig))
  : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

export const googleProvider = app ? new GoogleAuthProvider() : null;
export const githubProvider = app ? new GithubAuthProvider() : null;
export const microsoftProvider = app ? new OAuthProvider('microsoft.com') : null;

if (googleProvider) {
  googleProvider.setCustomParameters({ prompt: 'select_account' });
}

export const requireFirebaseAuth = () => {
  if (!auth) throw new Error(firebaseConfigurationError || 'Firebase Authentication is unavailable.');
  return auth;
};

export const requireFirestore = () => {
  if (!db) throw new Error(firebaseConfigurationError || 'Cloud Firestore is unavailable.');
  return db;
};

export type { FirebaseUser };
