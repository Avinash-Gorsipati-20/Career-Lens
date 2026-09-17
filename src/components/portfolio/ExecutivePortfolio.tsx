import React, { useState } from 'react';
import { ResumeData, Project } from '../../types/resume';
import { Github, Linkedin, Mail, Download, ShieldCheck, Briefcase, GraduationCap, Award, ChevronRight } from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';

export const ExecutivePortfolio: React.FC<{ data: ResumeData; onDownloadPdf?: () => void }> = ({ data, onDownloadPdf }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 sm:p-12 space-y-12 selection:bg-blue-600 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Executive Header */}
        <header className="bg-slate-900 border-l-4 border-blue-500 rounded-2xl p-8 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck size={14} /> Executive Leadership Profile
              </span>
              <h1 className="text-4xl font-extrabold text-white mt-1">{data.personal.fullName || 'Executive Leader'}</h1>
              <p className="text-lg text-slate-300 font-medium">{data.personal.title || 'Director of Engineering'}</p>
            </div>

            {onDownloadPdf && (
              <button onClick={onDownloadPdf} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg">
                <Download size={15} /> Download Portfolio PDF
              </button>
            )}
          </div>

          {data.summary && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
              {data.summary}
            </p>
          )}
        </header>

        {/* Executive Experience Timeline */}
        {data.experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Briefcase size={20} className="text-blue-400" /> Leadership & Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map(exp => (
                <div key={exp.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">{exp.duration}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-400">{exp.company}</p>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line pt-2 border-t border-slate-800/80">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Projects */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Strategic Initiatives & Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map(proj => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all cursor-pointer group space-y-3"
              >
                <h3 className="text-base font-bold text-white group-hover:text-blue-400 flex items-center justify-between">
                  {proj.name}
                  <ChevronRight size={18} className="text-slate-500 group-hover:text-blue-400" />
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      <ProjectDetailModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};
