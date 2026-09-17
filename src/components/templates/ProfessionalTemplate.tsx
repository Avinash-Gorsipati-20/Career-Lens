import React from 'react';
import { ResumeData } from '../../types/resume';

export const ProfessionalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, education, skills, experience, projects, certifications, achievements, languages } = data;

  return (
    <div className="bg-white text-slate-900 font-sans p-8 shadow-2xl rounded-sm min-h-[1050px] w-full text-[12.5px] leading-normal print:p-0 print:shadow-none print:w-full">
      {/* Top Header */}
      <div className="bg-slate-900 text-white p-6 -mx-8 -mt-8 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">{personal.fullName || 'Your Name'}</h1>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mt-1">{personal.title || 'Professional Title'}</p>
          </div>
          <div className="text-right text-[11px] text-slate-300 space-y-0.5">
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.address && <div>{personal.address}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
            {personal.github && <div>{personal.github}</div>}
            {personal.portfolio && <div>{personal.portfolio}</div>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-2">
            Executive Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Core Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-2">
            Technical & Core Capabilities
          </h2>
          <div className="grid grid-cols-3 gap-2 text-xs font-medium text-slate-800">
            {skills.map(s => (
              <div key={s.id} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900 text-sm">{exp.role}</h3>
                  <span className="text-[11px] font-semibold text-slate-600">{exp.duration}</span>
                </div>
                <p className="text-xs font-semibold text-blue-700 mb-1">{exp.company}</p>
                <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-3">
            Key Projects
          </h2>
          <div className="space-y-3">
            {projects.map(p => (
              <div key={p.id}>
                <div className="flex justify-between font-bold text-xs">
                  <span>{p.name}</span>
                  {p.technologies && <span className="font-normal text-[11px] text-slate-500">{p.technologies.join(', ')}</span>}
                </div>
                <p className="text-xs text-slate-600 mt-0.5">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-2">
            Education
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {education.map(e => (
              <div key={e.id} className="text-xs">
                <p className="font-bold text-slate-900">{e.degree} - {e.branch}</p>
                <p className="text-slate-600">{e.institution} ({e.startYear} - {e.endYear})</p>
                {e.cgpa && <p className="text-[11px] font-semibold text-blue-600">GPA: {e.cgpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Languages */}
      <div className="grid grid-cols-2 gap-4">
        {certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-2">
              Certifications
            </h2>
            <div className="space-y-1 text-xs">
              {certifications.map(c => (
                <div key={c.id}>
                  <span className="font-semibold">{c.title}</span> - {c.issuer}
                </div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-2">
              Languages
            </h2>
            <div className="space-y-1 text-xs">
              {languages.map(l => (
                <div key={l.id}>
                  <span className="font-semibold">{l.name}</span> ({l.proficiency})
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
