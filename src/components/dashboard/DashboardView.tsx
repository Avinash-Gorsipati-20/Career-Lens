import React, { useCallback, useEffect, useState } from 'react';
import { ResumeData } from '../../types/resume';
import { SavedDocument } from '../../types/documents';
import { useAuth } from '../../context/AuthContext';
import { getDocuments, renameDocument } from '../../services/documentService';
import { calculateProgress } from '../../utils/progressCalculator';
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Edit3,
  FileText,
  Globe,
  Loader2,
  Pencil,
  Plus,
  Save,
  Trash2,
  X
} from 'lucide-react';

interface DashboardViewProps {
  data: ResumeData;
  onNavigate: (tab: 'resume' | 'targeted' | 'portfolio' | 'career' | 'jobs' | 'roadmap') => void;
  onOpenDocument: (document: SavedDocument) => Promise<void>;
  onSaveAsDocument: (document: SavedDocument) => void;
  onDeleteDocument: (document: SavedDocument) => Promise<void>;
  onOpenImport: () => void;
  onOpenCodeImport: () => void;
  onOpenGuidedInput: () => void;
  onOpenIntegration?: () => void;
  onOpenAtsChecker?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  data,
  onNavigate,
  onOpenDocument,
  onSaveAsDocument,
  onDeleteDocument,
  onOpenImport,
  onOpenCodeImport,
  onOpenGuidedInput,
  onOpenIntegration,
  onOpenAtsChecker
}) => {
  const { user } = useAuth();
  const completion = calculateProgress(data);
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(true);
  const [documentsError, setDocumentsError] = useState<string | null>(null);
  const [renameTarget, setRenameTarget] = useState<SavedDocument | null>(null);
  const [newName, setNewName] = useState('');
  const [isRenaming, setIsRenaming] = useState(false);
  const [actionDocumentId, setActionDocumentId] = useState<string | null>(null);

  const loadDocuments = useCallback(async () => {
    if (!user) return;
    setIsLoadingDocuments(true);
    setDocumentsError(null);
    try {
      setDocuments(await getDocuments(user.id));
    } catch (error) {
      console.error('Unable to load saved documents:', error);
      setDocumentsError('Unable to load your saved documents. Please try again.');
    } finally {
      setIsLoadingDocuments(false);
    }
  }, [user]);

  useEffect(() => { void loadDocuments(); }, [loadDocuments]);

  const openDocument = async (document: SavedDocument) => {
    setActionDocumentId(document.id);
    try {
      await onOpenDocument(document);
    } finally {
      setActionDocumentId(null);
    }
  };

  const removeDocument = async (document: SavedDocument) => {
    if (!window.confirm(`Delete “${document.name}”? This cannot be undone.`)) return;
    setActionDocumentId(document.id);
    try {
      await onDeleteDocument(document);
      await loadDocuments();
    } catch (error) {
      console.error('Unable to delete document:', error);
      setDocumentsError('Unable to delete your document. Please try again.');
    } finally {
      setActionDocumentId(null);
    }
  };

  const submitRename = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !renameTarget || !newName.trim()) return;
    setIsRenaming(true);
    try {
      await renameDocument(user.id, renameTarget.id, newName);
      setRenameTarget(null);
      await loadDocuments();
    } catch (error) {
      console.error('Unable to rename document:', error);
      setDocumentsError('Unable to rename your document. Please try again.');
    } finally {
      setIsRenaming(false);
    }
  };

  const resumeDocuments = documents.filter(document => document.type === 'resume');
  const portfolioDocuments = documents.filter(document => document.type === 'portfolio');

  const documentList = (type: 'resume' | 'portfolio', items: SavedDocument[]) => (
    <section className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <span className={`p-2 rounded-xl ${type === 'resume' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'}`}>
            {type === 'resume' ? <FileText size={18} /> : <Globe size={18} />}
          </span>
          <div>
            <h2 className="text-base font-bold text-white">{type === 'resume' ? 'My Resumes' : 'My Portfolios'}</h2>
            <p className="text-[11px] text-slate-400">Final documents saved to your Firebase account</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate(type === 'resume' ? 'resume' : 'portfolio')}
          className="p-2 text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
          title={`Create ${type === 'resume' ? 'resume' : 'portfolio'}`}
        >
          <Plus size={16} />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-2xl">
          No saved {type === 'resume' ? 'resumes' : 'portfolios'} yet.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(document => (
            <article key={document.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-white truncate">{document.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock3 size={12} /> Updated {new Date(document.updatedAt).toLocaleString()}
                  </p>
                </div>
                <span className={`shrink-0 px-2 py-0.5 rounded-full border text-[10px] uppercase font-mono ${type === 'resume' ? 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10' : 'border-purple-500/30 text-purple-300 bg-purple-500/10'}`}>
                  {type}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => void openDocument(document)} disabled={actionDocumentId === document.id} className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-[11px] font-bold flex items-center gap-1.5">
                  {actionDocumentId === document.id ? <Loader2 size={13} className="animate-spin" /> : <Edit3 size={13} />} Open / Edit
                </button>
                <button onClick={() => { setRenameTarget(document); setNewName(document.name); }} className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold flex items-center gap-1.5">
                  <Pencil size={13} /> Rename
                </button>
                <button onClick={() => onSaveAsDocument(document)} className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold flex items-center gap-1.5">
                  <Save size={13} /> Save As
                </button>
                <button onClick={() => void removeDocument(document)} disabled={actionDocumentId === document.id} className="ml-auto p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 disabled:opacity-60" title="Delete document">
                  <Trash2 size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="space-y-6 text-slate-100 font-sans pb-12 animate-fadeIn">
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/50 to-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs font-mono text-emerald-400"><CheckCircle2 size={14} /> Firebase cloud storage</span>
          <h1 className="text-3xl font-extrabold text-white">Welcome back, <span className="text-cyan-400">{user?.name || 'User'}</span></h1>
          <p className="max-w-2xl text-sm text-slate-300">Save only completed resumes and portfolios. Changes stay in the editor until you choose Save.</p>
        </div>
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
          <span className="text-2xl font-black text-cyan-400">{completion.totalProgress}%</span>
          <span className="text-xs text-slate-400">Profile completeness</span>
        </div>
      </div>

      {isLoadingDocuments ? (
        <div className="py-12 flex items-center justify-center gap-2 text-sm text-slate-400"><Loader2 size={18} className="animate-spin" /> Loading saved documents…</div>
      ) : documentsError ? (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-sm text-rose-200 flex items-center justify-between gap-4"><span className="flex items-center gap-2"><AlertCircle size={16} /> {documentsError}</span><button onClick={() => void loadDocuments()} className="text-xs font-bold text-rose-100 underline">Retry</button></div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {documentList('resume', resumeDocuments)}
          {documentList('portfolio', portfolioDocuments)}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button onClick={() => onNavigate('resume')} className="p-5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl text-left space-y-2"><FileText className="text-cyan-400" size={20} /><h2 className="font-bold">Resume Builder</h2><p className="text-xs text-slate-400">Create or edit your final resume.</p></button>
        <button onClick={() => onNavigate('portfolio')} className="p-5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl text-left space-y-2"><Globe className="text-purple-400" size={20} /><h2 className="font-bold">Portfolio Builder</h2><p className="text-xs text-slate-400">Choose a layout and save the final portfolio.</p></button>
        <button onClick={onOpenImport} className="p-5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl text-left space-y-2"><Plus className="text-emerald-400" size={20} /><h2 className="font-bold">Import Resume (PDF + OCR)</h2><p className="text-xs text-slate-400">Upload a PDF resume or paste text — extracts all fields automatically.</p></button>
        <button onClick={onOpenGuidedInput} className="p-5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl text-left space-y-2"><Edit3 className="text-blue-400" size={20} /><h2 className="font-bold">Profile Helper</h2><p className="text-xs text-slate-400">Improve the central profile before saving.</p></button>
      </div>

      {renameTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={submitRename} className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between"><div><h2 className="text-lg font-bold text-white">Rename {renameTarget.type}</h2><p className="text-xs text-slate-400 mt-1">Only the document name will change.</p></div><button type="button" onClick={() => setRenameTarget(null)} className="p-2 text-slate-400 hover:text-white"><X size={18} /></button></div>
            <label className="block text-xs font-semibold text-slate-300">{renameTarget.type === 'resume' ? 'Resume name' : 'Portfolio name'}<input autoFocus value={newName} onChange={event => setNewName(event.target.value)} className="mt-2 w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-blue-500" /></label>
            <div className="flex justify-end gap-3"><button type="button" onClick={() => setRenameTarget(null)} className="px-4 py-2 text-xs font-bold text-slate-300">Cancel</button><button disabled={isRenaming || !newName.trim()} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 rounded-xl text-xs font-bold text-white">{isRenaming ? 'Renaming…' : 'Rename'}</button></div>
          </form>
        </div>
      )}
    </div>
  );
};
