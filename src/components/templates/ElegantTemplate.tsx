import React from 'react';
import { ResumeData } from '../../types/resume';

export const ElegantTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, education, skills, experience, projects, certifications, achievements } = data;

  const contactText = [
    personal.email,
    personal.phone,
    personal.address,
    personal.linkedin,
    personal.github,
    personal.portfolio
  ].filter(Boolean).join('  ·  ');

  return (
    <div className="bg-white text-slate-900 font-serif p-10 shadow-2xl rounded-sm min-h-[1050px] w-full text-[12px] leading-relaxed print:p-0 print:shadow-none print:w-full">
      {/* Header */}
      <div className="text-center border-b border-amber-800/40 pb-5 mb-6">
        <h1 className="text-3xl font-serif text-amber-900 tracking-wide">{personal.fullName || 'Your Name'}</h1>
        <p className="text-xs font-sans uppercase tracking-widest text-slate-600 mt-1">{personal.title || 'Senior Software Engineer'}</p>
        <p className="text-[11px] font-sans text-slate-500 mt-2">{contactText}</p>
      </div>

      {/* Executive Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-amber-900 border-b border-amber-800/20 pb-1 mb-2">
            Profile Overview
          </h2>
          <p className="text-xs italic text-slate-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-amber-900 border-b border-amber-800/20 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-sans">
                  <h3 className="font-bold text-slate-900 text-xs">{exp.role}</h3>
                  <span className="text-[10px] text-slate-500">{exp.duration}</span>
                </div>
                <p className="text-xs italic text-amber-900 mb-1">{exp.company}</p>
                <div className="text-xs text-slate-700 whitespace-pre-line font-sans leading-relaxed">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-amber-900 border-b border-amber-800/20 pb-1 mb-3">
            Selected Projects
          </h2>
          <div className="space-y-3">
            {projects.map(p => (
              <div key={p.id}>
                <div className="flex justify-between font-sans text-xs">
                  <span className="font-bold text-slate-900">{p.name}</span>
                  {p.technologies && <span className="text-[10px] text-slate-500 italic">[{p.technologies.join(', ')}]</span>}
                </div>
                <p className="text-xs text-slate-700 mt-0.5">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Certifications */}
      <div className="grid grid-cols-2 gap-6">
        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-amber-900 border-b border-amber-800/20 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-2 text-xs">
              {education.map(e => (
                <div key={e.id}>
                  <p className="font-bold text-slate-900">{e.degree}</p>
                  <p className="italic text-slate-600">{e.institution} ({e.startYear} - {e.endYear})</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-amber-900 border-b border-amber-800/20 pb-1 mb-2">
              Key Skills
            </h2>
            <p className="text-xs font-sans text-slate-700 leading-relaxed">
              {skills.map(s => s.name).join('  ·  ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
