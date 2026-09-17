import React from 'react';
import { ResumeData } from '../../types/resume';

export const NordicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, experience, education, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white text-slate-900 font-sans p-8 max-w-[210mm] min-h-[297mm] mx-auto shadow-sm box-border flex flex-col justify-between">
      <div className="space-y-6">
        
        {/* Scandi Minimalist Header */}
        <header className="border-b-2 border-teal-800 pb-5">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{personal.fullName || 'Your Name'}</h1>
              <p className="text-sm font-semibold text-teal-800 uppercase tracking-widest mt-1">{personal.title || 'Professional Title'}</p>
            </div>
            
            <div className="text-right text-xs text-slate-600 space-y-1 font-mono">
              {personal.email && <div>{personal.email}</div>}
              {personal.phone && <div>{personal.phone}</div>}
              {personal.address && <div>{personal.address}</div>}
              {personal.linkedin && <div>LinkedIn: {personal.linkedin}</div>}
              {personal.github && <div>GitHub: {personal.github}</div>}
            </div>
          </div>

          {summary && (
            <p className="text-xs text-slate-700 leading-relaxed mt-4 pt-3 border-t border-slate-200">
              {summary}
            </p>
          )}
        </header>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Main Work History & Projects (8 cols) */}
          <div className="col-span-8 space-y-6">
            
            {/* Experience */}
            {experience.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xs font-bold text-teal-900 uppercase tracking-widest border-b border-teal-800/30 pb-1">
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {experience.map(exp => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-sm font-bold text-slate-900">{exp.role}</h3>
                        <span className="text-[11px] font-mono text-teal-800">{exp.duration}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-600">{exp.company}</p>
                      <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xs font-bold text-teal-900 uppercase tracking-widest border-b border-teal-800/30 pb-1">
                  Technical Projects
                </h2>
                <div className="space-y-3">
                  {projects.map(proj => (
                    <div key={proj.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xs font-bold text-slate-900">{proj.name}</h3>
                        {proj.technologies.length > 0 && (
                          <span className="text-[10px] font-mono text-slate-500">
                            {proj.technologies.join(', ')}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Skills, Education & Certs (4 cols) */}
          <div className="col-span-4 space-y-6 border-l border-slate-200 pl-5">
            
            {/* Skills */}
            {skills.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-xs font-bold text-teal-900 uppercase tracking-widest border-b border-teal-800/30 pb-1">
                  Core Skills
                </h2>
                <div className="flex flex-wrap gap-1">
                  {skills.map(s => (
                    <span key={s.id} className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 text-[11px] rounded font-medium">
                      {s.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-xs font-bold text-teal-900 uppercase tracking-widest border-b border-teal-800/30 pb-1">
                  Education
                </h2>
                {education.map(edu => (
                  <div key={edu.id} className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-900">{edu.degree}</p>
                    <p className="text-slate-600">{edu.institution}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{edu.startYear} - {edu.endYear}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-xs font-bold text-teal-900 uppercase tracking-widest border-b border-teal-800/30 pb-1">
                  Certifications
                </h2>
                {certifications.map(cert => (
                  <div key={cert.id} className="text-xs">
                    <p className="font-semibold text-slate-900">{cert.title}</p>
                    <p className="text-[10px] text-slate-500">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-xs font-bold text-teal-900 uppercase tracking-widest border-b border-teal-800/30 pb-1">
                  Achievements
                </h2>
                {achievements.map(ach => (
                  <div key={ach.id} className="text-xs">
                    <p className="font-semibold text-slate-900">{ach.title}</p>
                    <p className="text-[10px] text-slate-600">{ach.description}</p>
                  </div>
                ))}
              </section>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
