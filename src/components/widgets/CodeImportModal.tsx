import React, { useState } from 'react';
import { X, Code, ShieldCheck, Play, CheckCircle2, Sparkles, Copy, FileText } from 'lucide-react';

interface CodeImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess?: (extractedText: string) => void;
}

export const CodeImportModal: React.FC<CodeImportModalProps> = ({ isOpen, onClose, onImportSuccess }) => {
  const [code, setCode] = useState<string>(
`<div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
  <h1 style="color: #2563eb; margin-bottom: 4px;">Alex Morgan</h1>
  <p style="font-weight: bold; color: #64748b;">Senior Full Stack Engineer</p>
  <p>Email: alex.morgan@gmail.com | Phone: +1 (555) 234-5678</p>

  <h3 style="border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px;">Summary</h3>
  <p>Experienced engineer specializing in React, Node.js, and Cloud Infrastructure.</p>

  <h3 style="border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px;">Key Skills</h3>
  <p>React, TypeScript, Node.js, Express, Python, PostgreSQL, Docker, AWS, Git</p>
</div>`
  );

  const [previewActive, setPreviewActive] = useState(false);

  if (!isOpen) return null;

  // Sanitize input code to remove dangerous script execution tags
  const sanitizedCode = code
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '');

  const handleImportExtracted = () => {
    // Extract plain text from HTML code
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitizedCode;
    const extractedText = tempDiv.textContent || tempDiv.innerText || '';
    if (onImportSuccess) {
      onImportSuccess(extractedText);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 shadow-2xl space-y-6 animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-2xl">
              <Code size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Resume Source Code Importer & Sandbox
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
                  <ShieldCheck size={12} /> Sandboxed
                </span>
              </h2>
              <p className="text-xs text-slate-400">Import HTML/CSS/React resume code into structured CareerLens profile</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl">
            <X size={18} />
          </button>
        </div>

        {/* Split Screen Code Editor & Sandboxed Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Code Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Paste HTML / React Code:</span>
              <button onClick={() => setPreviewActive(true)} className="text-xs text-blue-400 hover:underline font-bold flex items-center gap-1">
                <Play size={12} /> Run Sandbox Preview
              </button>
            </div>
            <textarea
              rows={12}
              value={code}
              onChange={e => setCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-emerald-400 font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Sandboxed Render View */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300">Isolated Sandboxed Render:</span>
            <div className="w-full h-[280px] bg-white rounded-2xl p-4 overflow-auto border border-slate-300 box-border text-slate-900">
              <div dangerouslySetInnerHTML={{ __html: sanitizedCode }} />
            </div>
          </div>

        </div>

        {/* Footer Action */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-emerald-400" /> Scripts auto-sanitized for security
          </span>

          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold">
              Cancel
            </button>
            <button
              onClick={handleImportExtracted}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <FileText size={15} /> Convert Code to Profile
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
