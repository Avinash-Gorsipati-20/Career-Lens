import React, { useState } from 'react';
import { ResumeData, Project } from '../../types/resume';
import { Github, Linkedin, Mail, Download, Code, Terminal, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';

export const CleanTechPortfolio: React.FC<{ data: ResumeData; onDownloadPdf?: () => void }> = ({ data, onDownloadPdf }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono p-6 sm:p-12 space-y-12 selection:bg-emerald-500 selection:text-slate-950">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Developer Dashboard Header */}
        <header className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-full inline-flex items-center gap-1.5">
                <Terminal size={14} /> Developer Stack Dashboard
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white font-sans">{data.personal.fullName || 'Tech Lead'}</h1>
              <p className="text-sm font-bold text-emerald-400">{data.personal.title || 'Senior Engineer'}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {data.personal.github && (
                <a href={data.personal.github} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-slate-200 text-xs rounded-xl flex items-center gap-2">
                  <Github size={15} /> GitHub
                </a>
              )}
              {onDownloadPdf && (
                <button onClick={onDownloadPdf} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2">
                  <Download size={15} /> Export PDF
                </button>
              )}
            </div>
          </div>

          {data.summary && (
            <p className="text-xs font-sans text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
              {data.summary}
            </p>
          )}
        </header>

        {/* Technical Stack Grid */}
        {data.skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">// Stack Capabilities</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="px-3 py-1 bg-slate-900 border border-slate-800 text-emerald-300 text-xs rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-400" /> {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Code Repositories & Projects */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">// Code Repositories ({data.projects.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map(proj => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all cursor-pointer group space-y-3"
              >
                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 flex items-center justify-between font-sans">
                  {proj.name}
                  <ArrowUpRight size={16} className="text-slate-500 group-hover:text-emerald-400" />
                </h3>
                <p className="text-xs font-sans text-slate-300 leading-relaxed line-clamp-3">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      <ProjectDetailModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};
