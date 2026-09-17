import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { analyzeCareerMatch, CareerMatchResult } from '../../services/careerService';
import { Zap, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Target, HelpCircle, ShieldCheck, Award } from 'lucide-react';

interface CareerLensAiViewProps {
  data: ResumeData;
  onNavigateToTargeted?: () => void;
  onNavigateToRoadmap?: () => void;
}

export const CareerLensAiView: React.FC<CareerLensAiViewProps> = ({
  data,
  onNavigateToTargeted,
  onNavigateToRoadmap
}) => {
  const matches: CareerMatchResult[] = analyzeCareerMatch(data);
  const [selectedRole, setSelectedRole] = useState<CareerMatchResult>(matches[0] || matches[0]);

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100 font-sans pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-full inline-flex items-center gap-1.5 font-mono">
              <Zap size={14} /> Explainable AI Career Analysis Engine
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              CareerLens AI Role Recommendation & Scoring
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Transparent profile matching based on deterministic weights: Skills (40%), Projects (25%), Experience (15%), Education (10%), and Certifications (10%).
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-3 shrink-0">
            <ShieldCheck size={24} className="text-emerald-400" />
            <div className="text-xs space-y-0.5">
              <span className="font-bold text-white">Transparent XAI Scoring</span>
              <p className="text-[11px] text-slate-400">Match score alignment index</p>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Matches Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recommended Role Tabs (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Target size={18} className="text-emerald-400" /> Recommended Job Roles
          </h2>

          <div className="space-y-3">
            {matches.map(role => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`w-full p-4 rounded-2xl text-left transition-all border space-y-2 ${
                  selectedRole.id === role.id
                    ? 'bg-slate-950 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{role.roleTitle}</h3>
                  <span className="text-lg font-black font-mono text-emerald-400">{role.matchScore}%</span>
                </div>
                <p className="text-xs text-slate-400">{role.category} • Average Salary: {role.averageSalary}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Role Detail & XAI Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-5">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{selectedRole.category}</span>
                <h2 className="text-2xl font-bold text-white">{selectedRole.roleTitle}</h2>
              </div>
              <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Profile Match:</span>
                <span className="text-2xl font-black font-mono text-emerald-400">{selectedRole.matchScore}%</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{selectedRole.description}</p>

            {/* Explainable AI Reasons */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle size={15} /> Why This Role Matches Your Profile
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedRole.explanation.whyThisRole.map((reason: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Matched vs Missing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400">Matching Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRole.matchingSkills.map((s: string) => (
                    <span key={s} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[11px] rounded font-mono">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-amber-400">Missing Skill Gaps</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRole.missingSkills.map((s: string) => (
                    <span key={s} className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] rounded font-mono">
                      ⚠ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 italic">
              * Note: Profile Match represents alignment between your skills/projects and role requirements. It does not guarantee employment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
            {onNavigateToTargeted && (
              <button
                onClick={onNavigateToTargeted}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Target size={15} /> Create Targeted Resume for {selectedRole.roleTitle}
              </button>
            )}
            {onNavigateToRoadmap && (
              <button
                onClick={onNavigateToRoadmap}
                className="flex-1 py-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
              >
                <span>View Learning Roadmap</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
