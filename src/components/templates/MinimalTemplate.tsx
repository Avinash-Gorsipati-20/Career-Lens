import React from 'react';
import { ResumeData } from '../../types/resume';

export const MinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, education, skills, experience, projects, certifications } = data;

  return (
    <div className="bg-white text-slate-800 font-sans p-10 shadow-2xl rounded-sm min-h-[1050px] w-full text-[12px] leading-normal print:p-0 print:shadow-none print:w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light text-slate-900 tracking-tight">{personal.fullName || 'Your Name'}</h1>
        <p className="text-xs uppercase tracking-widest text-slate-400 font-medium mt-1">{personal.title || 'Software Engineer'}</p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}
          {personal.github && <span>{personal.github.replace(/^https?:\/\//, '')}</span>}
          {personal.linkedin && <span>{personal.linkedin.replace(/^https?:\/\//, '')}</span>}
          {personal.portfolio && <span>{personal.portfolio.replace(/^https?:\/\//, '')}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-8">
          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-4">
            Experience
          </h2>
          <div className="space-y-5">
            {experience.map(exp => (
              <div key={exp.id} className="grid grid-cols-12 gap-2">
                <div className="col-span-3 text-[11px] text-slate-400 font-mono">{exp.duration}</div>
                <div className="col-span-9">
                  <h3 className="font-medium text-slate-900 text-xs">{exp.role}</h3>
                  <p className="text-[11px] text-slate-500 mb-1">{exp.company}</p>
                  <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Skills & Tools
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            {skills.map(s => s.name).join('  ·  ')}
          </p>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-4">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map(p => (
              <div key={p.id} className="grid grid-cols-12 gap-2">
                <div className="col-span-3 text-[11px] text-slate-400 font-mono">
                  {p.technologies?.slice(0, 2).join(', ')}
                </div>
                <div className="col-span-9">
                  <h3 className="font-medium text-slate-900 text-xs">{p.name}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Education
          </h2>
          <div className="space-y-2">
            {education.map(e => (
              <div key={e.id} className="flex justify-between text-xs">
                <span className="font-medium text-slate-800">{e.degree} - {e.institution}</span>
                <span className="text-slate-400 text-[11px] font-mono">{e.startYear} - {e.endYear}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
