import React, { useState } from 'react';
import { ResumeData, Project } from '../../types/resume';
import { Github, Linkedin, Mail, Download, Sparkles, Code, Briefcase, GraduationCap, ArrowUpRight } from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';

export const CreativeGlassPortfolio: React.FC<{ data: ResumeData; onDownloadPdf?: () => void }> = ({ data, onDownloadPdf }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 sm:p-12 space-y-12 relative overflow-hidden">
      {/* Vibrant Backdrop Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Glass Hero Banner */}
        <header className="bg-slate-900/60 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-mono">
                <Sparkles size={14} className="inline mr-1" /> Glassmorphic Studio Edition
              </span>
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                {data.personal.fullName || 'Creative Engineer'}
              </h1>
              <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {data.personal.title || 'Product Developer'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {data.personal.github && (
                <a href={data.personal.github} target="_blank" rel="noreferrer" className="px-4 py-2 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 rounded-2xl text-xs font-bold flex items-center gap-2">
                  <Github size={16} /> GitHub
                </a>
              )}
              {onDownloadPdf && (
                <button onClick={onDownloadPdf} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-purple-500/25">
                  <Download size={16} /> Download PDF
                </button>
              )}
            </div>
          </div>

          {data.summary && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-purple-500/15 pt-4">
              {data.summary}
            </p>
          )}
        </header>

        {/* Featured Projects Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code size={22} className="text-purple-400" /> Interactive Case Studies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map(proj => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="bg-slate-900/50 backdrop-blur-lg border border-purple-500/20 hover:border-purple-500/50 rounded-3xl p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all cursor-pointer group space-y-4"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                    {proj.name}
                    <ArrowUpRight size={18} className="text-slate-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-purple-500/15">
                  {(proj.technologies || []).map((t, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px] rounded-lg font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Skills Matrix</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="px-3.5 py-1.5 bg-slate-900/60 border border-purple-500/20 text-purple-200 text-xs font-semibold rounded-2xl">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

      </div>

      <ProjectDetailModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};
