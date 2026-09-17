import React, { useCallback, useRef, useState } from 'react';
import { ResumeData } from '../../types/resume';
import { parseResumeText, ParseResult } from '../../services/resumeParserService';
import { parsePdfFile, ExtractProgressCallback } from '../../services/pdfImportService';
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  File,
  Loader2,
  FileInput,
  Eye,
  Trash2
} from 'lucide-react';

type ImportMode = 'pdf' | 'text';

interface ResumeImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (data: ResumeData) => void;
}

export const ResumeImportModal: React.FC<ResumeImportModalProps> = ({
  isOpen,
  onClose,
  onImportComplete
}) => {
  const [mode, setMode] = useState<ImportMode>('pdf');
  const [rawText, setRawText] = useState('');
  const [parseResult, setParseResult] = useState<(ParseResult & { usedOcr?: boolean }) | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractProgress, setExtractProgress] = useState(0);
  const [extractStage, setExtractStage] = useState('');
  const [usedOcr, setUsedOcr] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const resetAll = () => {
    setParseResult(null);
    setSelectedFile(null);
    setIsProcessing(false);
    setExtractProgress(0);
    setExtractStage('');
    setUsedOcr(false);
    setRawText('');
  };

  const handleParseText = () => {
    const res = parseResumeText(rawText);
    setParseResult(res);
    setUsedOcr(false);
  };

  const handleConfirmImport = () => {
    if (parseResult) {
      onImportComplete(parseResult.parsedData);
      resetAll();
      onClose();
    }
  };

  const handleFileSelection = useCallback(async (file: File) => {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please select a PDF file (.pdf)');
      return;
    }
    setSelectedFile(file);
    setParseResult(null);
  }, []);

  const handleProcessFile = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setExtractProgress(0);
    setExtractStage('Starting PDF analysis…');

    const onProgress: ExtractProgressCallback = (progress, stage) => {
      setExtractProgress(progress);
      setExtractStage(stage);
    };

    try {
      const result = await parsePdfFile(selectedFile, onProgress);
      setParseResult(result);
      setUsedOcr(!!result.usedOcr);
      setRawText(result.parsedData.summary ? '' : '');
    } catch (error) {
      console.error('Failed to process PDF:', error);
      setParseResult({
        parsedData: {
          personal: { fullName: '', title: '', email: '', phone: '', address: '', linkedin: '', github: '', portfolio: '', profilePhoto: '' },
          summary: '',
          education: [],
          skills: [],
          experience: [],
          projects: [],
          certifications: [],
          achievements: [],
          languages: [],
          interests: []
        },
        extractedTextLength: 0,
        confidenceScore: 0,
        warnings: ['Failed to process the PDF file. Please try text paste mode, or use a searchable PDF.']
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void handleFileSelection(file);
  }, [handleFileSelection]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-import-title"
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-slate-100 space-y-6"
      >

        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
              <Upload size={18} />
            </span>
            <div>
              <h2 id="resume-import-title" className="text-xl font-bold text-white">Import Existing Resume</h2>
              <p className="text-xs text-slate-400">Upload a PDF or paste text to extract your profile automatically</p>
            </div>
          </div>
          <button onClick={() => { resetAll(); onClose(); }} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg">
            <X size={18} />
          </button>
        </div>

        {!parseResult ? (
          <div className="space-y-5">
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => { setMode('pdf'); }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'pdf' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="flex items-center justify-center gap-1.5"><FileInput size={14} /> Upload PDF + OCR</span>
              </button>
              <button
                type="button"
                onClick={() => { setMode('text'); }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'text' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="flex items-center justify-center gap-1.5"><FileText size={14} /> Paste Text</span>
              </button>
            </div>

            {mode === 'pdf' ? (
              <div className="space-y-4">
                <div
                  ref={dropzoneRef}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`cursor-pointer border-2 border-dashed rounded-2xl p-8 text-center transition-all space-y-3 ${
                    isDragOver
                      ? 'border-amber-400 bg-amber-500/10'
                      : 'border-slate-700 bg-slate-950 hover:border-amber-500/50 hover:bg-slate-950/80'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`p-4 rounded-2xl ${isDragOver ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-900 text-slate-400'}`}>
                      <Upload size={28} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white">Drop your resume PDF here</p>
                      <p className="text-[11px] text-slate-500">or click to browse &nbsp;•&nbsp; uses OCR for scanned PDFs</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400">
                        <File size={10} /> .pdf only
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                        <Eye size={10} /> OCR Ready
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        <Sparkles size={10} /> Auto Parse
                      </span>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onClick={event => event.stopPropagation()}
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) void handleFileSelection(file);
                      e.currentTarget.value = '';
                    }}
                  />
                </div>

                {selectedFile && (
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400">
                        <File size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{selectedFile.name}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {formatFileSize(selectedFile.size)}
                          <span className="mx-1.5">•</span>
                          <span>{selectedFile.type || 'application/pdf'}</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() => setSelectedFile(null)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg disabled:opacity-50"
                        title="Remove file"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {isProcessing ? (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                            <Loader2 size={12} className="animate-spin text-amber-400" />
                            {extractStage || 'Analyzing resume…'}
                          </span>
                          <span className="font-mono text-amber-400 font-bold">{extractProgress}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400 transition-all duration-300"
                            style={{ width: `${extractProgress}%` }}
                          />
                        </div>
                        {extractProgress >= 50 && extractProgress < 100 && (
                          <p className="text-[10px] text-slate-500 text-right italic">
                            Optical Character Recognition may take a moment for scanned documents…
                          </p>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => void handleProcessFile()}
                        disabled={isProcessing}
                        className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                      >
                        <Sparkles size={14} /> Extract & Analyze Resume Content
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Paste Resume Text or File Content:</label>
                  <textarea
                    value={rawText}
                    onChange={e => setRawText(e.target.value)}
                    placeholder="Paste your raw resume text here (Personal details, Skills, Experience, Education)..."
                    rows={12}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono leading-relaxed"
                  />
                </div>
                <button
                  onClick={handleParseText}
                  disabled={!rawText.trim()}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Sparkles size={16} /> Analyze & Extract Profile Structure
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={16} /> Resume Parsed Successfully!
                  </span>
                  {usedOcr && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      <Eye size={10} /> OCR was used
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Confidence: <span className="text-white font-bold">{parseResult.confidenceScore}%</span>
                </span>
              </div>

              {parseResult.warnings.length > 0 && (
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300 space-y-1">
                  {parseResult.warnings.map((w, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <AlertCircle size={12} className="mt-0.5 shrink-0" /> <span>{w}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Extracted Data Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <p><span className="text-slate-400">Name:</span> <strong className="text-white">{parseResult.parsedData.personal.fullName || '—'}</strong></p>
                <p><span className="text-slate-400">Title:</span> <strong className="text-white">{parseResult.parsedData.personal.title || '—'}</strong></p>
                <p><span className="text-slate-400">Email:</span> <strong className="text-white">{parseResult.parsedData.personal.email || '—'}</strong></p>
                <p><span className="text-slate-400">Phone:</span> <strong className="text-white">{parseResult.parsedData.personal.phone || '—'}</strong></p>
              </div>
              <p className="pt-1"><span className="text-slate-400">Skills:</span> <strong className="text-cyan-400">{parseResult.parsedData.skills.map(s => s.name).join(', ') || 'None detected'}</strong></p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-500 uppercase">Experience</div>
                  <div className="text-base font-black text-white">{parseResult.parsedData.experience.length}</div>
                </div>
                <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-500 uppercase">Education</div>
                  <div className="text-base font-black text-white">{parseResult.parsedData.education.length}</div>
                </div>
                <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-500 uppercase">Projects</div>
                  <div className="text-base font-black text-white">{parseResult.parsedData.projects.length}</div>
                </div>
                <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-500 uppercase">Skills</div>
                  <div className="text-base font-black text-white">{parseResult.parsedData.skills.length}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setParseResult(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                ← Try Again
              </button>
              <button
                onClick={handleConfirmImport}
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg"
              >
                ✓ Import & Save to Central Profile
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
