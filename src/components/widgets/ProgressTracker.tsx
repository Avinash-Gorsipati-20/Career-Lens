import React from 'react';
import { ResumeData } from '../../types/resume';
import { calculateProgress } from '../../utils/progressCalculator';
import { CheckCircle2, Circle } from 'lucide-react';

interface ProgressTrackerProps {
  resumeData: ResumeData;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ resumeData }) => {
  const { totalProgress, sections } = calculateProgress(resumeData);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Resume Completeness
          </span>
          <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
            totalProgress >= 80 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
          }`}>
            {totalProgress}% Complete
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 transition-all duration-500"
          style={{ width: `${totalProgress}%` }}
        />
      </div>

      {/* Checkmarks Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
        {sections.map(sec => (
          <div key={sec.id} className="flex items-center gap-1.5 text-slate-400">
            {sec.isComplete ? (
              <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
            ) : (
              <Circle size={13} className="text-slate-600 shrink-0" />
            )}
            <span className={sec.isComplete ? 'text-slate-200 font-medium' : 'text-slate-500'}>
              {sec.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
