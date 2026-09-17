import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { AuthState, User } from '../types/auth';
import {
  auth,
  firebaseConfigurationError,
  githubProvider,
  googleProvider,
  microsoftProvider,
  requireFirebaseAuth,
  type FirebaseUser
} from '../services/firebase';
import { ensureUserProfile } from '../services/userProfileService';

export interface AuthContextType extends AuthState {
  loginWithGoogle: () => Promise<boolean>;
  signInWithGooglePopup: () => Promise<boolean>;
  signInWithGithubPopup: () => Promise<boolean>;
  signInWithMicrosoftPopup: () => Promise<boolean>;
  loginWithEmailPassword: (email: string, password: string) => Promise<boolean>;
  signupWithEmailPassword: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setProfilePhotoUrl: (photoUrl: string) => void;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapFirebaseUser = (firebaseUser: FirebaseUser, photoUrl?: string): User => ({
  id: firebaseUser.uid,
  email: firebaseUser.email || '',
  name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
  avatarUrl: photoUrl || firebaseUser.photoURL || undefined,
  createdAt: firebaseUser.metadata?.creationTime || new Date().toISOString(),
  provider: 'firebase'
});

const authErrorMessage = (error: any, fallback: string) => {
  switch (error?.code) {
    case 'auth/popup-closed-by-user': return 'Sign-in was cancelled before it completed.';
    case 'auth/unauthorized-domain': return 'This domain is not authorized in Firebase Authentication.';
    case 'auth/operation-not-allowed': return 'This sign-in method is not enabled in Firebase Authentication.';
    case 'auth/email-already-in-use': return 'An account with this email already exists. Please sign in.';
    case 'auth/weak-password': return 'Password should be at least 6 characters.';
    case 'auth/invalid-email': return 'Please enter a valid email address.';
    case 'auth/user-not-found':
    case 'auth/invalid-credential': return 'No account was found with that email and password.';
    case 'auth/wrong-password': return 'Incorrect password.';
    case 'auth/too-many-requests': return 'Too many attempts. Please try again later.';
    default: return fallback;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      setAuthError(firebaseConfigurationError || 'Firebase Authentication is unavailable.');
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (!firebaseUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const profile = await ensureUserProfile(firebaseUser);
        setUser(mapFirebaseUser(firebaseUser, profile.photoUrl));
        setAuthError(null);
      } catch (error) {
        // Authentication remains valid; document requests provide their own error feedback.
        setUser(mapFirebaseUser(firebaseUser));
        setAuthError('Signed in, but your cloud profile could not be loaded. Check Firestore setup and rules.');
        console.error('Unable to initialize Firebase profile:', error);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const clearAuthError = () => setAuthError(null);

  const completePopupSignIn = async (provider: any, providerName: string): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      await signInWithPopup(requireFirebaseAuth(), provider);
      return true;
    } catch (error) {
      setAuthError(authErrorMessage(error, `${providerName} sign-in failed. Please try again.`));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGooglePopup = () => googleProvider
    ? completePopupSignIn(googleProvider, 'Google')
    : Promise.resolve(false);

  const signInWithGithubPopup = () => githubProvider
    ? completePopupSignIn(githubProvider, 'GitHub')
    : Promise.resolve(false);

  const signInWithMicrosoftPopup = () => microsoftProvider
    ? completePopupSignIn(microsoftProvider, 'Microsoft')
    : Promise.resolve(false);

  const loginWithEmailPassword = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(requireFirebaseAuth(), email, password);
      return true;
    } catch (error) {
      setAuthError(authErrorMessage(error, 'Unable to sign in. Please try again.'));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signupWithEmailPassword = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const credentials = await createUserWithEmailAndPassword(requireFirebaseAuth(), email, password);
      await updateProfile(credentials.user, { displayName: name.trim() || email.split('@')[0] });
      return true;
    } catch (error) {
      setAuthError(authErrorMessage(error, 'Unable to create your account. Please try again.'));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(requireFirebaseAuth());
    } finally {
      setUser(null);
      setAuthError(null);
    }
  };

  const setProfilePhotoUrl = (photoUrl: string) => {
    setUser(current => current ? { ...current, avatarUrl: photoUrl } : current);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      authError,
      loginWithGoogle: signInWithGooglePopup,
      signInWithGooglePopup,
      signInWithGithubPopup,
      signInWithMicrosoftPopup,
      loginWithEmailPassword,
      signupWithEmailPassword,
      logout,
      setProfilePhotoUrl,
      clearAuthError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
