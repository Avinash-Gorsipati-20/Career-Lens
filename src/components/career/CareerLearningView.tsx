import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { analyzeCareerMatch, CAREER_ROLES_DATABASE } from '../../services/careerService';
import { generateSkillGapAnalysis, generatePersonalizedRoadmap } from '../../services/learningService';
import { Target, CheckCircle2, AlertTriangle, Lightbulb, BookOpen, ExternalLink, ShieldCheck, ArrowRight, Sparkles, Layers, HelpCircle } from 'lucide-react';

interface CareerLearningViewProps {
  data: ResumeData;
  onAddSkill?: (skillName: string) => void;
}

export const CareerLearningView: React.FC<CareerLearningViewProps> = ({ data, onAddSkill }) => {
  const matchedRoles = analyzeCareerMatch(data);
  const [selectedRoleId, setSelectedRoleId] = useState<string>(matchedRoles[0]?.roleId || 'fullstack-dev');

  const activeMatch = matchedRoles.find(r => r.roleId === selectedRoleId) || matchedRoles[0];
  const activeRoleDetails = CAREER_ROLES_DATABASE.find(r => r.id === selectedRoleId) || CAREER_ROLES_DATABASE[0];

  const skillGaps = generateSkillGapAnalysis(data, selectedRoleId);
  const roadmapSteps = generatePersonalizedRoadmap(data, selectedRoleId);

  return (
    <div className="space-y-8 text-slate-100 font-sans pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Target size={200} className="text-blue-400" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-mono text-blue-400">
          <Sparkles size={14} /> Explainable AI Career Intelligence Engine
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Career Role Matching & Learning Roadmap
        </h1>
        
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Analyzes your central professional profile skills, experience, and projects against top technical job roles. Identifies precise skill gaps and outlines a personalized step-by-step learning roadmap.
        </p>
      </div>

      {/* Role Selection Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers size={18} className="text-blue-400" /> Select Target Career Role to Analyze
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {matchedRoles.map(m => (
            <button
              key={m.roleId}
              onClick={() => setSelectedRoleId(m.roleId)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                selectedRoleId === m.roleId
                  ? 'bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{m.category}</span>
                <h3 className="text-sm font-bold text-white mt-1">{m.roleTitle}</h3>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span className="text-xs font-semibold text-slate-400">Match Score</span>
                <span className={`text-sm font-extrabold font-mono ${m.matchScore >= 75 ? 'text-emerald-400' : m.matchScore >= 50 ? 'text-amber-400' : 'text-slate-300'}`}>
                  {m.matchScore}%
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Match Overview & Explainable AI Box */}
      {activeMatch && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Match Score Card */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Target Role Selected</span>
              <h2 className="text-2xl font-extrabold text-white">{activeMatch.roleTitle}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">{activeRoleDetails.description}</p>
            </div>

            {/* Score Radial Visual */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 text-center space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Profile Match Indicator</span>
              <div className="text-5xl font-black text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text font-mono">
                {activeMatch.matchScore}%
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-medium text-slate-300">
                <ShieldCheck size={14} className="text-blue-400" /> Confidence Level: <span className="text-white font-bold">{activeMatch.explanation.confidence}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex justify-between">
                <span>Avg Market Salary:</span>
                <span className="font-semibold text-white">{activeRoleDetails.averageSalary}</span>
              </div>
              <div className="flex justify-between">
                <span>Market Demand:</span>
                <span className="font-semibold text-emerald-400">{activeRoleDetails.demandLevel}</span>
              </div>
            </div>
          </div>

          {/* Explainable AI Details Card */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                  <Lightbulb size={18} />
                </span>
                <h3 className="text-lg font-bold text-white">Explainable AI Match Reasoning</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Transparent Analysis</span>
            </div>

            {/* Why This Role */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Why This Role Was Recommended For You
              </h4>
              <ul className="space-y-1.5">
                {activeMatch.explanation.whyThisRole.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What is Missing */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle size={14} /> Critical Skill Gaps & Missing Qualifications
              </h4>
              <ul className="space-y-1.5">
                {activeMatch.explanation.whatIsMissing.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Learn These */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle size={14} /> Industry Rationale — Why Learn Missing Skills?
              </h4>
              <ul className="space-y-1.5">
                {activeMatch.explanation.whyLearnThese.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Skill Gap Analysis Visual Categorization */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Target size={20} className="text-blue-400" /> Skill Gap Matrix Categorization
          </h2>
          <span className="text-xs text-slate-400">Classified based on central profile data</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Priority */}
          <div className="bg-slate-950 border border-rose-500/30 rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-extrabold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              Priority (Must Learn)
            </h3>
            <div className="space-y-2">
              {skillGaps.filter(g => g.category === 'Priority').map(g => (
                <div key={g.skillName} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{g.skillName}</span>
                    {onAddSkill && (
                      <button onClick={() => onAddSkill(g.skillName)} className="text-[10px] text-blue-400 hover:underline">+ Add to Profile</button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{g.reasoning}</p>
                </div>
              ))}
              {skillGaps.filter(g => g.category === 'Priority').length === 0 && (
                <p className="text-xs text-slate-500">No critical priority gaps missing!</p>
              )}
            </div>
          </div>

          {/* Developing */}
          <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">Developing (In Progress)</h3>
            <div className="space-y-2">
              {skillGaps.filter(g => g.category === 'Developing').map(g => (
                <div key={g.skillName} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-white">{g.skillName}</span>
                  <p className="text-[11px] text-slate-400 leading-tight">{g.reasoning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Already Strong */}
          <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">Already Strong</h3>
            <div className="space-y-2">
              {skillGaps.filter(g => g.category === 'Already Strong').map(g => (
                <div key={g.skillName} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-white">{g.skillName}</span>
                  <p className="text-[11px] text-slate-400 leading-tight">{g.reasoning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Missing */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Nice-To-Have</h3>
            <div className="space-y-2">
              {skillGaps.filter(g => g.category === 'Missing').map(g => (
                <div key={g.skillName} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-slate-300">{g.skillName}</span>
                  <p className="text-[11px] text-slate-400 leading-tight">{g.reasoning}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Personalized Learning Roadmap */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen size={20} className="text-blue-400" /> Personalized Learning Roadmap & Resources
            </h2>
            <p className="text-xs text-slate-400">Step-by-step roadmap tailored specifically to your skill gap timeline</p>
          </div>
          <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            {roadmapSteps.length} Sequential Learning Steps
          </span>
        </div>

        <div className="space-y-6">
          {roadmapSteps.map((step) => (
            <div key={step.stepNumber} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-blue-500/40 transition-all">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm font-mono shadow-md">
                    {step.stepNumber}
                  </span>
                  <h3 className="text-lg font-bold text-white">{step.topic}</h3>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                  Est. Duration: {step.estimatedWeeks} Weeks
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>

              {/* Recommended Resources */}
              {step.resources.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Curated Reliable Learning Resources</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {step.resources.map((res, rIdx) => (
                      <a
                        key={rIdx}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/50 rounded-xl text-xs flex items-center justify-between transition-all group"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">{res.title}</span>
                          </div>
                          <span className="text-[11px] text-slate-400">{res.provider} • {res.type}</span>
                        </div>
                        <ExternalLink size={14} className="text-slate-500 group-hover:text-blue-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
