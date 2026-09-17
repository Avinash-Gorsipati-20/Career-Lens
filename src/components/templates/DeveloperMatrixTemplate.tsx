import React from 'react';
import { ResumeData } from '../../types/resume';

export const DeveloperMatrixTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="bg-white text-slate-900 font-mono p-8 max-w-[210mm] min-h-[297mm] mx-auto shadow-sm box-border flex flex-col justify-between">
      <div className="space-y-5">
        
        {/* Terminal Header */}
        <header className="border-2 border-slate-900 p-5 bg-slate-950 text-emerald-400 rounded-lg space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">// ARCHITECT_PROFILE.SH</div>
              <h1 className="text-2xl font-black text-white">{personal.fullName || 'DEV_USER'}</h1>
              <p className="text-xs text-emerald-400 font-bold">{personal.title || 'FULLSTACK_ENGINEER'}</p>
            </div>
            
            <div className="text-right text-[11px] text-slate-300 space-y-0.5">
              {personal.email && <div>{personal.email}</div>}
              {personal.phone && <div>{personal.phone}</div>}
              {personal.github && <div className="text-cyan-400">{personal.github}</div>}
            </div>
          </div>

          {summary && (
            <p className="text-xs text-slate-300 border-t border-slate-800 pt-2 leading-relaxed">
              &gt; {summary}
            </p>
          )}
        </header>

        {/* Technical Stack Matrix */}
        {skills.length > 0 && (
          <section className="border border-slate-300 p-3.5 rounded bg-slate-50 space-y-2">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-emerald-700">
              [SYSTEM_CAPABILITIES & STACK]
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(s => (
                <span key={s.id} className="px-2 py-0.5 bg-slate-900 text-emerald-400 text-[10px] font-bold rounded">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience History */}
        {experience.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase border-b-2 border-slate-900 pb-0.5">
              [WORK_EXPERIENCE]
            </h2>
            <div className="space-y-3">
              {experience.map(exp => (
                <div key={exp.id} className="space-y-1 border-l-2 border-emerald-600 pl-3">
                  <div className="flex justify-between text-xs font-bold text-slate-900">
                    <span>{exp.role} @ {exp.company}</span>
                    <span className="text-emerald-700">{exp.duration}</span>
                  </div>
                  <p className="text-xs font-sans text-slate-700 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Repositories & Projects */}
        {projects.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase border-b-2 border-slate-900 pb-0.5">
              [DEPLOYED_PROJECTS]
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {projects.map(proj => (
                <div key={proj.id} className="p-2.5 bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>repo: {proj.name}</span>
                    <span className="text-emerald-600 text-[10px]">{proj.technologies.join(', ')}</span>
                  </div>
                  <p className="text-[11px] font-sans text-slate-700">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Credentials */}
        {education.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold text-slate-900 uppercase border-b-2 border-slate-900 pb-0.5">
              [ACADEMICS]
            </h2>
            {education.map(edu => (
              <div key={edu.id} className="text-xs flex justify-between">
                <span>{edu.degree} ({edu.institution})</span>
                <span className="text-slate-600 font-bold">{edu.startYear} - {edu.endYear}</span>
              </div>
            ))}
          </section>
        )}

      </div>
    </div>
  );
};
