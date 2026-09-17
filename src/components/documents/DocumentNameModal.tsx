import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { DocumentType } from '../../types/documents';

interface DocumentNameModalProps {
  isOpen: boolean;
  type: DocumentType;
  mode: 'new' | 'saveAs';
  defaultName?: string;
  isSaving?: boolean;
  onClose: () => void;
  onConfirm: (name: string) => Promise<void> | void;
}

export const DocumentNameModal: React.FC<DocumentNameModalProps> = ({
  isOpen,
  type,
  mode,
  defaultName = '',
  isSaving = false,
  onClose,
  onConfirm
}) => {
  const [name, setName] = useState(defaultName);

  useEffect(() => { if (isOpen) setName(defaultName); }, [defaultName, isOpen]);

  if (!isOpen) return null;

  const documentLabel = type === 'resume' ? 'resume' : 'portfolio';
  const title = mode === 'new'
    ? `Save your ${documentLabel}`
    : 'Save as';
  const action = mode === 'new'
    ? `Save ${type === 'resume' ? 'Resume' : 'Portfolio'}`
    : 'Save';

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || isSaving) return;
    await onConfirm(name.trim());
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <p className="mt-1 text-xs text-slate-400">This saves the current final state as one cloud document.</p>
          </div>
          <button type="button" onClick={onClose} disabled={isSaving} className="p-2 text-slate-400 hover:text-white disabled:opacity-50"><X size={18} /></button>
        </div>
        <label className="block text-xs font-semibold text-slate-300">
          {type === 'resume' ? 'Resume name' : 'Portfolio name'}
          <input
            autoFocus
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder={type === 'resume' ? 'e.g. Software Engineer Resume' : 'e.g. My Portfolio 2026'}
            maxLength={120}
            className="mt-2 w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500"
          />
        </label>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={isSaving} className="px-4 py-2 text-xs font-bold text-slate-300 disabled:opacity-50">Cancel</button>
          <button disabled={isSaving || !name.trim()} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 rounded-xl text-xs font-bold text-white">{isSaving ? 'Saving…' : action}</button>
        </div>
      </form>
    </div>
  );
};
