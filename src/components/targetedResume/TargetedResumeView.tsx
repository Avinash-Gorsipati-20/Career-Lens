import React, { useState, useMemo } from 'react';
import { ResumeData, TemplateId } from '../../types/resume';
import { TARGET_ROLE_PRESETS, targetedResumeService } from '../../services/targetedResumeService';
import { XAiSuggestion, TargetedResumeVariant } from '../../types/targetedResume';
import { ResumePreview } from '../preview/ResumePreview';
import { pdfService } from '../../services/pdfService';
import { RESUME_TEMPLATES } from '../../services/templateService';
import { Target, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Check, X, FileText, Download, RotateCcw, HelpCircle } from 'lucide-react';

interface TargetedResumeViewProps {
  data: ResumeData;
  onAddSkill?: (skillName: string) => void;
}

export const TargetedResumeView: React.FC<TargetedResumeViewProps> = ({ data, onAddSkill }) => {
  const [selectedRole, setSelectedRole] = useState<string>('Java Developer');
  const [customRole, setCustomRole] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('modern');

  const [suggestions, setSuggestions] = useState<XAiSuggestion[]>([]);
  const [acceptedIds, setAcceptedIds] = useState<Set<string>>(new Set());
  const [rejectedIds, setRejectedIds] = useState<Set<string>>(new Set());

  const [generatedVariant, setGeneratedVariant] = useState<TargetedResumeVariant | null>(null);

  const activeTargetRoleName = customRole.trim() || selectedRole;

  // Run XAI Analysis whenever Target Role or Job Description changes
  const analysis = useMemo(() => {
    const res = targetedResumeService.generateSuggestions(data, activeTargetRoleName, jobDescription);
    setSuggestions(res.suggestions);
    // Reset selections on new role analysis
    setAcceptedIds(new Set(res.suggestions.map(s => s.id)));
    setRejectedIds(new Set());
    setGeneratedVariant(null);
    return res;
  }, [data, activeTargetRoleName, jobDescription]);

  const toggleAccept = (id: string) => {
    setAcceptedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setRejectedIds(rPrev => { const rNext = new Set(rPrev); rNext.delete(id); return rNext; });
      }
      return next;
    });
  };

  const toggleReject = (id: string) => {
    setRejectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setAcceptedIds(aPrev => { const aNext = new Set(aPrev); aNext.delete(id); return aNext; });
      }
      return next;
    });
  };

  const handleGenerateTargetedResume = () => {
    const acceptedList = suggestions.filter(s => acceptedIds.has(s.id));
    const variant = targetedResumeService.createTargetedVariant(
      data,
      activeTargetRoleName,
      jobDescription,
      acceptedList
    );
    setGeneratedVariant(variant);
  };

  // Construct derived resume data for live preview
  const derivedPreviewData: ResumeData = useMemo(() => {
    if (!generatedVariant) return data;
    return {
      ...data,
      summary: generatedVariant.customSummary || data.summary
    };
  }, [data, generatedVariant]);

  const handleDownloadPdf = () => {
    const fileName = `Targeted_Resume_${activeTargetRoleName.replace(/\s+/g, '_')}.pdf`;
    pdfService.downloadPdf('resume-preview-document', fileName);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100 font-sans pb-12">
      
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs rounded-full inline-flex items-center gap-1.5 font-mono">
              <Target size={14} /> Major Feature • Explainable AI (XAI) Engine
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Targeted Resume Generator
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Create role-specific resumes tailored to job postings. CareerLens AI analyzes requirements, suggests evidence-backed changes, and generates derived variants while keeping your master profile 100% safe.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-3 shrink-0">
            <ShieldCheck size={24} className="text-emerald-400" />
            <div className="text-xs space-y-0.5">
              <span className="font-bold text-white">Master Profile Safe</span>
              <p className="text-[11px] text-slate-400">Targeted resumes are derived variants</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Select Target Role & Optional JD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Role Selection Controls (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Target size={18} className="text-blue-400" /> 1. Select Target Job Role
          </h2>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Target Career Role:</label>
            <div className="grid grid-cols-2 gap-2">
              {TARGET_ROLE_PRESETS.map(preset => (
                <button
                  key={preset.roleTitle}
                  type="button"
                  onClick={() => { setSelectedRole(preset.roleTitle); setCustomRole(''); }}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                    activeTargetRoleName === preset.roleTitle
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md font-bold'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {preset.roleTitle}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <label className="text-xs font-semibold text-slate-300">Or Enter Custom Role Title:</label>
            <input
              type="text"
              placeholder="e.g. Senior Golang Microservices Architect"
              value={customRole}
              onChange={e => setCustomRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">Paste Target Job Description (Optional):</label>
              <span className="text-[10px] text-blue-400 font-mono">Deep JD Keyword Analysis</span>
            </div>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              placeholder="Paste job posting requirements here for exact keyword extraction..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Right Role Alignment Summary (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-cyan-400" /> Target Role Alignment Analysis
              </h2>
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold rounded-lg font-mono">
                Role: {activeTargetRoleName}
              </span>
            </div>

            {/* Matched & Missing Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 size={15} /> Matched Skills ({analysis.matchedSkills.length})
                </h3>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {analysis.matchedSkills.length > 0 ? (
                    analysis.matchedSkills.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[11px] rounded font-mono">
                        ✓ {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">No direct keyword overlap yet.</span>
                  )}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle size={15} /> Skill Gaps ({analysis.missingSkills.length})
                </h3>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {analysis.missingSkills.length > 0 ? (
                    analysis.missingSkills.map(s => (
                      <button
                        key={s}
                        onClick={() => onAddSkill && onAddSkill(s)}
                        title="Click to add to your profile skills"
                        className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 text-[11px] rounded font-mono transition-colors flex items-center gap-1"
                      >
                        + {s}
                      </button>
                    ))
                  ) : (
                    <span className="text-xs text-emerald-400 font-medium">All role skills covered!</span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Review Explainable AI suggestions below. Each recommendation discloses <strong>What Changed</strong>, <strong>Why</strong>, and <strong>Supporting Evidence</strong>. You can Accept or Reject any suggestion before generating the final A4 targeted resume.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleGenerateTargetedResume}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold rounded-2xl text-xs shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={16} /> Apply Selected ({acceptedIds.size}) Suggestions & Generate A4 Targeted Resume
            </button>
          </div>
        </div>

      </div>

      {/* Step 2: Explainable AI Recommendation Deck */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-2xl">
              <HelpCircle size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                2. Explainable AI (XAI) Suggestions Deck
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full">
                  Fully User Controlled
                </span>
              </h2>
              <p className="text-xs text-slate-400">Transparent AI reasoning: Review what changes and why before accepting</p>
            </div>
          </div>
        </div>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map(sug => {
            const isAccepted = acceptedIds.has(sug.id);
            const isRejected = rejectedIds.has(sug.id);

            return (
              <div
                key={sug.id}
                className={`bg-slate-950 border rounded-2xl p-5 space-y-4 transition-all ${
                  isAccepted ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/5' :
                  isRejected ? 'border-rose-500/30 opacity-60' : 'border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">
                      Section: {sug.section}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{sug.title}</h3>
                  </div>

                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded font-mono ${
                    sug.isExistingSkill
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {sug.isExistingSkill ? '✓ Existing Skill' : '⚠ Skill Gap'}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                  <div>
                    <span className="font-bold text-cyan-400">WHAT CHANGED: </span>
                    <span>{sug.whatChanged}</span>
                  </div>
                  <div>
                    <span className="font-bold text-purple-400">WHY: </span>
                    <span>{sug.why}</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-400">EVIDENCE: </span>
                    <span>{sug.evidence}</span>
                  </div>
                </div>

                {/* User Accept/Reject Action Controls */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => toggleAccept(sug.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isAccepted
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-900 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-800'
                    }`}
                  >
                    <Check size={14} /> {isAccepted ? 'Accepted' : 'Accept Suggestion'}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleReject(sug.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isRejected
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-slate-900 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-slate-800'
                    }`}
                  >
                    <X size={14} /> {isRejected ? 'Rejected' : 'Reject'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 3: Generated A4 Targeted Resume Live Preview */}
      {generatedVariant && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl">
                <FileText size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  3. Generated Targeted A4 Resume Preview
                  <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                    A4 Ready
                  </span>
                </h2>
                <p className="text-xs text-slate-400">Variant: {generatedVariant.title}</p>
              </div>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Download size={16} /> Download A4 Targeted PDF
            </button>
          </div>

          {/* Template Selector Bar for Targeted Resume Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">Select Template Format (14 Available):</span>
              <span className="font-mono text-cyan-400">Active: {RESUME_TEMPLATES.find(t => t.id === activeTemplate)?.name || activeTemplate}</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
              {RESUME_TEMPLATES.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTemplate(t.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                    activeTemplate === t.id
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md font-bold'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[750px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <ResumePreview data={derivedPreviewData} templateId={activeTemplate} />
          </div>
        </div>
      )}

    </div>
  );
};
