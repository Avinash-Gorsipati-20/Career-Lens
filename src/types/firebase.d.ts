/* The installed Firebase package does not expose declarations to this project's bundler resolver. */
declare module 'firebase/app' {
  export function initializeApp(config: Record<string, string | undefined>): any;
  export function getApps(): any[];
  export function getApp(): any;
}

declare module 'firebase/auth' {
  export type User = {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    metadata?: { creationTime?: string };
  };
  export function getAuth(app?: any): any;
  export class GoogleAuthProvider { setCustomParameters(params: Record<string, string>): void; }
  export class GithubAuthProvider {}
  export class OAuthProvider { constructor(providerId: string); }
  export function signInWithPopup(auth: any, provider: any): Promise<{ user: User }>;
  export function signInWithEmailAndPassword(auth: any, email: string, password: string): Promise<{ user: User }>;
  export function createUserWithEmailAndPassword(auth: any, email: string, password: string): Promise<{ user: User }>;
  export function signOut(auth: any): Promise<void>;
  export function onAuthStateChanged(auth: any, callback: (user: User | null) => void): () => void;
  export function updateProfile(user: User, profile: { displayName?: string; photoURL?: string }): Promise<void>;
}

declare module 'firebase/firestore' {
  export function getFirestore(app?: any): any;
  export function collection(db: any, path: string): any;
  export function doc(db: any, path: string, id?: string): any;
  export function getDoc(reference: any): Promise<any>;
  export function getDocs(query: any): Promise<any>;
  export function addDoc(reference: any, data: Record<string, unknown>): Promise<any>;
  export function setDoc(reference: any, data: Record<string, unknown>, options?: { merge?: boolean }): Promise<void>;
  export function updateDoc(reference: any, data: Record<string, unknown>): Promise<void>;
  export function deleteDoc(reference: any): Promise<void>;
  export function query(reference: any, ...constraints: any[]): any;
  export function where(fieldPath: string, opStr: string, value: unknown): any;
  export function serverTimestamp(): unknown;
}

