import React, { useState } from 'react';
import { ResumeData, Project } from '../../types/resume';
import { Github, Linkedin, Mail, Phone, MapPin, Download, ArrowUpRight, Code, Briefcase, GraduationCap, Award } from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';

interface PortfolioProps {
  data: ResumeData;
  onDownloadPdf?: () => void;
}

export const ModernMinimalPortfolio: React.FC<PortfolioProps> = ({ data, onDownloadPdf }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 sm:p-12 space-y-16 selection:bg-slate-900 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header Hero */}
        <header className="space-y-6 border-b border-slate-200 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">// PORTFOLIO</span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900">
                {data.personal.fullName || 'Professional Engineer'}
              </h1>
              <p className="text-xl font-medium text-slate-600">
                {data.personal.title || 'Full Stack Developer'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {data.personal.github && (
                <a href={data.personal.github} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all">
                  <Github size={15} /> GitHub
                </a>
              )}
              {data.personal.linkedin && (
                <a href={data.personal.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all">
                  <Linkedin size={15} /> LinkedIn
                </a>
              )}
              {onDownloadPdf && (
                <button onClick={onDownloadPdf} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all">
                  <Download size={15} /> Resume PDF
                </button>
              )}
            </div>
          </div>

          {data.summary && (
            <p className="text-sm text-slate-700 leading-relaxed max-w-2xl pt-2">
              {data.summary}
            </p>
          )}
        </header>

        {/* Selected Projects */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Code size={20} className="text-slate-500" /> Selected Works ({data.projects.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map(proj => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer group space-y-4"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                    {proj.name}
                    <ArrowUpRight size={18} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {(proj.technologies || []).map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-mono rounded">
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
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Skills & Tooling</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl shadow-xs">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Briefcase size={20} className="text-slate-500" /> Career History
            </h2>
            <div className="space-y-4">
              {data.experience.map(exp => (
                <div key={exp.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <h3 className="text-base font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-xs font-mono text-slate-500">{exp.duration}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-600">{exp.company}</p>
                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pt-1">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-slate-200 pt-8 text-center text-xs text-slate-500">
          Contact: {data.personal.email || 'alex.developer@example.com'}
        </footer>

      </div>

      <ProjectDetailModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};
