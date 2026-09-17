import React from 'react';
import { ResumeData } from '../../types/resume';

export const GradientTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="bg-white text-slate-900 font-sans p-8 max-w-[210mm] min-h-[297mm] mx-auto shadow-sm box-border flex flex-col justify-between">
      <div className="space-y-6">
        
        {/* Startup Gradient Banner Header */}
        <header className="bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-900 text-white p-6 rounded-2xl shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">{personal.fullName || 'Your Name'}</h1>
              <p className="text-xs font-semibold text-pink-300 uppercase tracking-widest mt-1">{personal.title || 'Professional Title'}</p>
            </div>
            
            <div className="text-left sm:text-right text-xs text-indigo-100 space-y-0.5 font-mono">
              {personal.email && <div>{personal.email}</div>}
              {personal.phone && <div>{personal.phone}</div>}
              {personal.address && <div>{personal.address}</div>}
            </div>
          </div>

          {(personal.linkedin || personal.github || personal.portfolio) && (
            <div className="flex flex-wrap gap-3 pt-2 text-[11px] text-pink-200 border-t border-white/10 font-mono">
              {personal.linkedin && <span>LinkedIn: {personal.linkedin}</span>}
              {personal.github && <span>GitHub: {personal.github}</span>}
              {personal.portfolio && <span>Portfolio: {personal.portfolio}</span>}
            </div>
          )}
        </header>

        {/* Summary */}
        {summary && (
          <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-100 text-xs text-slate-800 leading-relaxed">
            {summary}
          </div>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold text-indigo-950 uppercase tracking-wider border-b-2 border-indigo-500 pb-1 w-fit">
              Professional Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold text-indigo-950">{exp.role}</h3>
                    <span className="text-[11px] font-mono text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full font-semibold">{exp.duration}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">{exp.company}</p>
                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pt-1">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Projects */}
        {projects.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold text-indigo-950 uppercase tracking-wider border-b-2 border-indigo-500 pb-1 w-fit">
              Featured Technical Projects
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {projects.map(proj => (
                <div key={proj.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-slate-900">{proj.name}</h3>
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-700">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Education Grid */}
        <div className="grid grid-cols-2 gap-6 pt-2">
          {skills.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold text-indigo-950 uppercase tracking-wider border-b-2 border-indigo-500 pb-1 w-fit">
                Skills & Technologies
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(s => (
                  <span key={s.id} className="px-2 py-0.5 bg-indigo-900 text-white text-[11px] font-semibold rounded-md shadow-xs">
                    {s.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold text-indigo-950 uppercase tracking-wider border-b-2 border-indigo-500 pb-1 w-fit">
                Education & Academics
              </h2>
              {education.map(edu => (
                <div key={edu.id} className="text-xs space-y-0.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-900">{edu.degree} - {edu.branch}</p>
                  <p className="text-slate-600">{edu.institution}</p>
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-1">
                    <span>{edu.startYear} - {edu.endYear}</span>
                    {edu.cgpa && <span className="font-semibold text-indigo-700">CGPA: {edu.cgpa}</span>}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

      </div>
    </div>
  );
};
