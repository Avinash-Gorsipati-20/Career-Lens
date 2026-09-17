import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { TARGET_ROLE_PRESETS } from '../../services/targetedResumeService';
import { getLearningResources } from '../../services/learningService';
import { BookOpen, Target, CheckCircle2, AlertTriangle, ExternalLink, ArrowRight, Sparkles, Layers, Code, PlayCircle, PlusCircle, Check } from 'lucide-react';

interface SkillGapRoadmapViewProps {
  data: ResumeData;
  onAddSkill?: (skillName: string) => void;
}

export const SkillGapRoadmapView: React.FC<SkillGapRoadmapViewProps> = ({ data, onAddSkill }) => {
  const [selectedRole, setSelectedRole] = useState<string>('Java Developer');
  const [addedSkills, setAddedSkills] = useState<Set<string>>(new Set());

  const currentRolePreset = TARGET_ROLE_PRESETS.find(r => r.roleTitle === selectedRole) || TARGET_ROLE_PRESETS[0];

  const userSkillNames = data.skills.map(s => s.name.toLowerCase());

  const strongSkills = currentRolePreset.keySkills.filter(req =>
    userSkillNames.some(us => us.includes(req.toLowerCase()))
  );

  const missingSkills = currentRolePreset.keySkills.filter(req =>
    !userSkillNames.some(us => us.includes(req.toLowerCase()))
  );

  const niceToHaveMissing = currentRolePreset.niceToHaveSkills.filter(req =>
    !userSkillNames.some(us => us.includes(req.toLowerCase()))
  );

  const handleAddMissingSkill = (skill: string) => {
    if (onAddSkill) {
      onAddSkill(skill);
      setAddedSkills(prev => new Set(prev).add(skill));
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100 font-sans pb-12">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-full inline-flex items-center gap-1.5 font-mono">
              <BookOpen size={14} /> Personalized Learning Ecosystem
            </span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Skill Gap & Learning Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              CareerLens AI analyzes your master profile against target career requirements, categorizes gaps, and generates an ordered learning roadmap with verified educational resources.
            </p>
          </div>

          {/* Role Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {TARGET_ROLE_PRESETS.slice(0, 5).map(preset => (
              <button
                key={preset.roleTitle}
                onClick={() => setSelectedRole(preset.roleTitle)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  selectedRole === preset.roleTitle
                    ? 'bg-rose-500 text-slate-950 border-rose-400 shadow-md font-bold'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {preset.roleTitle}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Gap Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Strong Skills */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <h2 className="text-sm font-bold text-white">Strong Profile Skills ({strongSkills.length})</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {strongSkills.length > 0 ? (
              strongSkills.map(s => (
                <span key={s} className="px-2.5 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs rounded-lg font-mono">
                  ✓ {s}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500 italic">Add skills to master profile to boost alignment.</span>
            )}
          </div>
        </div>

        {/* High Priority Gaps */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <AlertTriangle size={18} className="text-rose-400" />
            <h2 className="text-sm font-bold text-white">High Priority Skill Gaps ({missingSkills.length})</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {missingSkills.length > 0 ? (
              missingSkills.map(s => {
                const isAdded = addedSkills.has(s);
                return (
                  <button
                    key={s}
                    onClick={() => handleAddMissingSkill(s)}
                    disabled={isAdded}
                    className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all flex items-center gap-1 ${
                      isAdded
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20'
                    }`}
                  >
                    {isAdded ? <Check size={12} /> : <PlusCircle size={12} />}
                    {s}
                  </button>
                );
              })
            ) : (
              <span className="text-xs text-emerald-400 font-medium">All core role skills present!</span>
            )}
          </div>
        </div>

        {/* Nice-to-Have Gaps */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles size={18} className="text-purple-400" />
            <h2 className="text-sm font-bold text-white">Nice-to-Have Bonus Gaps ({niceToHaveMissing.length})</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {niceToHaveMissing.map(s => (
              <span key={s} className="px-2.5 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs rounded-lg font-mono">
                + {s}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Personalized Learning Roadmap Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers size={20} className="text-rose-400" />
            Personalized Learning Roadmap for {selectedRole}
          </h2>
          <span className="text-xs font-mono text-slate-400">Step-by-Step Progression</span>
        </div>

        <div className="space-y-6 relative border-l-2 border-slate-800 ml-4 pl-6">
          {missingSkills.map((sk, idx) => (
            <div key={sk} className="relative group space-y-3">
              {(() => {
                const resources = getLearningResources(sk);
                return (
                  <>
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-rose-500 group-hover:bg-rose-400 transition-colors"></div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 text-xs rounded font-mono">Phase {idx + 1}</span>
                    Master {sk}
                  </h3>
                  <button
                    onClick={() => handleAddMissingSkill(sk)}
                    className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold rounded-lg text-slate-200"
                  >
                    Add to Profile
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Building proficiency in {sk} satisfies critical employer requirements for {selectedRole} roles.
                </p>

                {/* Reputable Learning Links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <a
                    href={resources[0].url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs flex items-center justify-between text-cyan-300 font-medium group/link"
                  >
                    <span className="flex items-center gap-1.5"><BookOpen size={14} /> Official Documentation</span>
                    <ExternalLink size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href={resources[1].url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs flex items-center justify-between text-rose-300 font-medium group/link"
                  >
                    <span className="flex items-center gap-1.5"><PlayCircle size={14} /> Video Tutorials</span>
                    <ExternalLink size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href={resources[2].url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs flex items-center justify-between text-emerald-300 font-medium group/link"
                  >
                    <span className="flex items-center gap-1.5"><Code size={14} /> Hands-on Practice</span>
                    <ExternalLink size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
                  </>
                );
              })()}
            </div>
          ))}

          {missingSkills.length === 0 && (
            <p className="text-xs text-emerald-400 py-4">Great job! Your profile covers all core skills for {selectedRole}.</p>
          )}
        </div>
      </div>

    </div>
  );
};
