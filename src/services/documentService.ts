import {
  addDoc,
  collection,
  deleteDoc as deleteFirestoreDocument,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  setDoc
} from 'firebase/firestore';
import { auth, requireFirestore } from './firebase';
import { CreateDocumentPayload, DocumentType, SavedDocument } from '../types/documents';

const DOCUMENTS_COLLECTION = 'documents';

const requireDocumentOwner = (userId: string) => {
  const authenticatedUser = auth?.currentUser;
  if (!authenticatedUser || authenticatedUser.uid !== userId) {
    throw new Error('You must be signed in to access your saved documents.');
  }
};

const removeUndefined = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(removeUndefined);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, item]) => item !== undefined)
        .map(([key, item]) => [key, removeUndefined(item)])
    );
  }
  return value;
};

const timestampToIso = (value: any): string => {
  if (value?.toDate) return value.toDate().toISOString();
  if (typeof value === 'string') return value;
  return new Date(0).toISOString();
};

const toSavedDocument = (snapshot: any): SavedDocument => {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    userId: data.userId,
    type: data.type,
    name: data.name,
    content: data.content || {},
    createdAt: timestampToIso(data.createdAt),
    updatedAt: timestampToIso(data.updatedAt)
  };
};

export const createDocument = async (payload: CreateDocumentPayload): Promise<string> => {
  requireDocumentOwner(payload.userId);
  const database = requireFirestore();
  const reference = await addDoc(collection(database, DOCUMENTS_COLLECTION), {
    userId: payload.userId,
    type: payload.type,
    name: payload.name.trim(),
    content: removeUndefined(payload.content),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return reference.id;
};

export const getDocuments = async (userId: string, type?: DocumentType): Promise<SavedDocument[]> => {
  requireDocumentOwner(userId);
  const database = requireFirestore();
  const userDocuments = await getDocs(query(
    collection(database, DOCUMENTS_COLLECTION),
    where('userId', '==', userId)
  ));

  const documents: SavedDocument[] = userDocuments.docs
    .map((snapshot: any) => toSavedDocument(snapshot));

  return documents
    .filter(document => !type || document.type === type)
    .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime());
};

export const getDocument = async (userId: string, documentId: string): Promise<SavedDocument | null> => {
  requireDocumentOwner(userId);
  const database = requireFirestore();
  const snapshot = await getDoc(doc(database, DOCUMENTS_COLLECTION, documentId));
  if (!snapshot.exists()) return null;

  const savedDocument = toSavedDocument(snapshot);
  if (savedDocument.userId !== userId) {
    throw new Error('You do not have access to this document.');
  }
  return savedDocument;
};

export const updateDocument = async (
  userId: string,
  documentId: string,
  content: Record<string, unknown>
): Promise<void> => {
  await getDocument(userId, documentId);
  const database = requireFirestore();
  await updateDoc(doc(database, DOCUMENTS_COLLECTION, documentId), {
    content: removeUndefined(content),
    updatedAt: serverTimestamp()
  });
};

export const renameDocument = async (userId: string, documentId: string, name: string): Promise<void> => {
  await getDocument(userId, documentId);
  const database = requireFirestore();
  await updateDoc(doc(database, DOCUMENTS_COLLECTION, documentId), {
    name: name.trim(),
    updatedAt: serverTimestamp()
  });
};

export const duplicateDocument = async (
  userId: string,
  source: Pick<SavedDocument, 'type' | 'content'>,
  name: string
): Promise<string> => createDocument({ userId, type: source.type, content: source.content, name });

export const deleteDocument = async (userId: string, documentId: string): Promise<void> => {
  await getDocument(userId, documentId);
  const database = requireFirestore();
  await deleteFirestoreDocument(doc(database, DOCUMENTS_COLLECTION, documentId));
};

export const publishPortfolio = async (
  userId: string,
  slug: string,
  content: Record<string, unknown>
): Promise<void> => {
  requireDocumentOwner(userId);
  await setDoc(doc(requireFirestore(), 'publicPortfolios', slug), {
    userId,
    username: slug,
    content: removeUndefined(content),
    updatedAt: serverTimestamp()
  });
};

export const getPublicPortfolio = async (slug: string): Promise<Record<string, any> | null> => {
  const snapshot = await getDoc(doc(requireFirestore(), 'publicPortfolios', slug));
  return snapshot.exists() ? snapshot.data() as Record<string, any> : null;
};
