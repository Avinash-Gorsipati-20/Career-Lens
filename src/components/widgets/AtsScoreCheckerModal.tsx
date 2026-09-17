import React, { useState, useMemo } from 'react';
import { ResumeData } from '../../types/resume';
import { calculateAtsScore } from '../../utils/atsCalculator';
import { Button } from '../ui/Button';
import { X, CheckCircle2, AlertCircle, Sparkles, Target, Zap, PlusCircle, Check } from 'lucide-react';

interface AtsScoreCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  onAddSkill?: (skillName: string) => void;
}

export const AtsScoreCheckerModal: React.FC<AtsScoreCheckerModalProps> = ({
  isOpen,
  onClose,
  resumeData,
  onAddSkill
}) => {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [addedSkills, setAddedSkills] = useState<Set<string>>(new Set());

  const atsResult = useMemo(() => {
    return calculateAtsScore(resumeData, jobDescription);
  }, [resumeData, jobDescription]);

  if (!isOpen) return null;

  const handleAddMissingSkill = (kw: string) => {
    if (onAddSkill) {
      onAddSkill(kw);
      setAddedSkills(prev => new Set(prev).add(kw));
    }
  };

  const scoreColor =
    atsResult.totalScore >= 85 ? 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10' :
    atsResult.totalScore >= 70 ? 'text-blue-400 border-blue-500/50 bg-blue-500/10' :
    atsResult.totalScore >= 55 ? 'text-amber-400 border-amber-500/50 bg-amber-500/10' :
    'text-red-400 border-red-500/50 bg-red-500/10';

  const scoreProgressColor =
    atsResult.totalScore >= 85 ? 'bg-emerald-500' :
    atsResult.totalScore >= 70 ? 'bg-blue-500' :
    atsResult.totalScore >= 55 ? 'bg-amber-500' :
    'bg-red-500';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
              <Target size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                ATS Compatibility Checker & Resume Optimizer
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
                  AI Powered
                </span>
              </h2>
              <p className="text-xs text-slate-400">Evaluate HR system parse rate, keyword match, and metric impact</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto scrollbar-thin">
          {/* Top Score Summary Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            {/* Big Score Radial Badge */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 border-r border-slate-800/80">
              <div className={`relative w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center shadow-xl ${scoreColor}`}>
                <span className="text-3xl font-black font-mono tracking-tight">{atsResult.totalScore}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">out of 100</span>
              </div>
              <div className="mt-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${scoreColor}`}>
                  {atsResult.scoreGrade} Rating
                </span>
              </div>
            </div>

            {/* Category Progress Bars */}
            <div className="md:col-span-8 space-y-3 justify-center flex flex-col">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Score Pillars</h3>

              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                    <span>Contact & Social Links</span>
                    <span className="font-mono text-slate-400">{atsResult.categories.contactInfo.score} / {atsResult.categories.contactInfo.maxScore}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${(atsResult.categories.contactInfo.score / atsResult.categories.contactInfo.maxScore) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                    <span>Content & Section Completeness</span>
                    <span className="font-mono text-slate-400">{atsResult.categories.contentStructure.score} / {atsResult.categories.contentStructure.maxScore}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${(atsResult.categories.contentStructure.score / atsResult.categories.contentStructure.maxScore) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                    <span>Action Verbs & Numeric Impact Metrics</span>
                    <span className="font-mono text-slate-400">{atsResult.categories.impactMetrics.score} / {atsResult.categories.impactMetrics.maxScore}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${(atsResult.categories.impactMetrics.score / atsResult.categories.impactMetrics.maxScore) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                    <span>Skills & Technology Breadth</span>
                    <span className="font-mono text-slate-400">{atsResult.categories.skillsOptimization.score} / {atsResult.categories.skillsOptimization.maxScore}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${(atsResult.categories.skillsOptimization.score / atsResult.categories.skillsOptimization.maxScore) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description Matcher Section */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400" />
                <h3 className="text-sm font-bold text-slate-200">Target Job Description Matcher</h3>
              </div>
              {atsResult.jdMatch && (
                <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-bold rounded-lg font-mono">
                  {atsResult.jdMatch.matchRate}% Match Rate
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400">
              Paste the Job Description (JD) below to compare keywords and extract missing skills required by the employer.
            </p>

            <textarea
              rows={3}
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              placeholder="Paste job description text here (e.g., 'We are looking for a Senior React Developer proficient in TypeScript, Node.js, AWS, and GraphQL...')"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />

            {/* JD Match Keyword Chips */}
            {atsResult.jdMatch && (
              <div className="space-y-3 pt-2">
                <div>
                  <h4 className="text-[11px] font-semibold text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={13} /> Matched Keywords ({atsResult.jdMatch.matchedKeywords.length})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {atsResult.jdMatch.matchedKeywords.length > 0 ? (
                      atsResult.jdMatch.matchedKeywords.map(kw => (
                        <span key={kw} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[11px] rounded-md flex items-center gap-1 font-mono">
                          <Check size={11} /> {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500 italic">No direct matches found yet. Paste job requirements above.</span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
                    <AlertCircle size={13} /> Missing Job Keywords ({atsResult.jdMatch.missingKeywords.length})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {atsResult.jdMatch.missingKeywords.length > 0 ? (
                      atsResult.jdMatch.missingKeywords.map(kw => {
                        const isAdded = addedSkills.has(kw);
                        return (
                          <button
                            key={kw}
                            onClick={() => handleAddMissingSkill(kw)}
                            disabled={isAdded}
                            title="Click to add as skill to resume"
                            className={`px-2 py-0.5 text-[11px] rounded-md flex items-center gap-1 font-mono transition-all ${
                              isAdded
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                                : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
                            }`}
                          >
                            {isAdded ? <Check size={11} /> : <PlusCircle size={11} />}
                            {kw}
                          </button>
                        );
                      })
                    ) : (
                      <span className="text-xs text-emerald-400 font-medium">Awesome! Your resume covers all key terms from this job description.</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actionable Recommendations Checklist */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Zap size={16} className="text-blue-400" />
              Actionable Recommendations to Boost ATS Rank
            </h3>

            {atsResult.actionableSuggestions.length > 0 ? (
              <ul className="space-y-2">
                {atsResult.actionableSuggestions.map((sug, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                    <span className="p-0.5 bg-blue-500/10 text-blue-400 rounded mt-0.5">
                      <CheckCircle2 size={13} />
                    </span>
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-emerald-400 font-medium">Your resume is fully optimized! Great job.</p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end px-6 py-4 bg-slate-950/50 border-t border-slate-800">
          <Button variant="primary" size="sm" onClick={onClose}>
            Done Optimizing
          </Button>
        </div>
      </div>
    </div>
  );
};
