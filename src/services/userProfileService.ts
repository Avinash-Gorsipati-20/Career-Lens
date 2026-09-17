import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { auth, FirebaseUser, requireFirestore } from './firebase';
import { UserProfile } from '../types/documents';

const USERS_COLLECTION = 'users';
const MAX_PROFILE_PHOTO_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const CLOUDINARY_UPLOAD_ENDPOINT = 'https://api.cloudinary.com/v1_1';

const requireProfileOwner = (uid: string) => {
  const authenticatedUser = auth?.currentUser;
  if (!authenticatedUser || authenticatedUser.uid !== uid) {
    throw new Error('You must be signed in to access your profile.');
  }
};

const timestampToIso = (value: any): string => {
  if (value?.toDate) return value.toDate().toISOString();
  if (typeof value === 'string') return value;
  return new Date(0).toISOString();
};

const toUserProfile = (data: any): UserProfile => ({
  uid: data.uid,
  fullName: data.fullName || '',
  email: data.email || '',
  ...(data.photoUrl ? { photoUrl: data.photoUrl } : {}),
  createdAt: timestampToIso(data.createdAt),
  updatedAt: timestampToIso(data.updatedAt)
});

export const ensureUserProfile = async (firebaseUser: FirebaseUser): Promise<UserProfile> => {
  requireProfileOwner(firebaseUser.uid);
  const database = requireFirestore();
  const reference = doc(database, USERS_COLLECTION, firebaseUser.uid);
  const existing = await getDoc(reference);
  const fullName = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User';

  if (!existing.exists()) {
    const profile: Record<string, unknown> = {
      uid: firebaseUser.uid,
      fullName,
      email: firebaseUser.email || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    if (firebaseUser.photoURL) profile.photoUrl = firebaseUser.photoURL;
    await setDoc(reference, profile);
  } else {
    await updateDoc(reference, {
      fullName,
      email: firebaseUser.email || '',
      updatedAt: serverTimestamp()
    });
  }

  const updated = await getDoc(reference);
  return toUserProfile(updated.data());
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  requireProfileOwner(uid);
  const snapshot = await getDoc(doc(requireFirestore(), USERS_COLLECTION, uid));
  return snapshot.exists() ? toUserProfile(snapshot.data()) : null;
};

export const updateUserProfile = async (
  uid: string,
  updates: Pick<Partial<UserProfile>, 'fullName' | 'photoUrl'>
): Promise<void> => {
  requireProfileOwner(uid);
  const cleanUpdates = Object.fromEntries(
    Object.entries(updates).filter(([, value]) => value !== undefined)
  );
  await updateDoc(doc(requireFirestore(), USERS_COLLECTION, uid), {
    ...cleanUpdates,
    updatedAt: serverTimestamp()
  });
};

export const uploadProfilePhoto = async (uid: string, file: File): Promise<string> => {
  requireProfileOwner(uid);
  if (!file) {
    throw new Error('Please select a profile photo first.');
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error('Please select a JPG, JPEG, PNG, or WEBP image.');
  }
  if (file.size > MAX_PROFILE_PHOTO_BYTES) {
    throw new Error('Profile photos must be 5 MB or smaller.');
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary photo upload is not configured.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  let response: Response;
  try {
    response = await fetch(`${CLOUDINARY_UPLOAD_ENDPOINT}/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });
  } catch {
    throw new Error('Unable to reach Cloudinary. Check your network connection and try again.');
  }

  let result: { secure_url?: string; error?: { message?: string } };
  try {
    result = await response.json();
  } catch {
    throw new Error('Cloudinary returned an unreadable response.');
  }
  if (!response.ok || !result.secure_url) {
    throw new Error(result.error?.message || 'Cloudinary could not upload the profile photo.');
  }

  const photoUrl = result.secure_url;

  await updateUserProfile(uid, { photoUrl });
  return photoUrl;
};
