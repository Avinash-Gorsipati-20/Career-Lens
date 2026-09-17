export type DocumentType = 'resume' | 'portfolio';

/**
 * A saved document stored in Firestore: documents/{documentId}
 */
export interface SavedDocument {
  id: string;            // Firestore document ID
  userId: string;        // Firebase Auth UID
  type: DocumentType;
  name: string;
  content: Record<string, any>; // Complete final editor state (ResumeData or portfolio state)
  createdAt: string;     // ISO string (converted from Firestore Timestamp)
  updatedAt: string;     // ISO string
}

/**
 * Payload to create a new document (no id/timestamps — server fills those)
 */
export interface CreateDocumentPayload {
  userId: string;
  type: DocumentType;
  name: string;
  content: Record<string, any>;
}

/**
 * User profile stored in Firestore: users/{uid}
 */
export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Tracks whether the current resume/portfolio editor has a linked cloud document.
 */
export interface ActiveDocumentState {
  resumeDocId: string | null;    // Firestore doc ID of the currently open resume
  portfolioDocId: string | null; // Firestore doc ID of the currently open portfolio
}

/**
 * Portfolio document content shape (what is stored inside content for portfolios)
 */
export interface PortfolioContent {
  templateId: string;
  themeId: string;
  resumeData: Record<string, any>; // snapshot of ResumeData at save time
}
