import React from 'react';
import { ResumeData } from '../../types/resume';

export const SwissGridTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="bg-white text-slate-950 font-sans p-8 max-w-[210mm] min-h-[297mm] mx-auto shadow-sm box-border flex flex-col justify-between">
      <div className="space-y-6">
        
        {/* Asymmetrical Swiss Header */}
        <header className="grid grid-cols-12 gap-6 border-b-4 border-slate-950 pb-6">
          <div className="col-span-8 space-y-2">
            <h1 className="text-4xl font-black uppercase tracking-tight leading-none text-slate-950">
              {personal.fullName || 'FIRSTNAME LASTNAME'}
            </h1>
            <p className="text-sm font-bold text-red-600 uppercase tracking-widest">
              {personal.title || 'DESIGN & ENGINEERING'}
            </p>
            {summary && (
              <p className="text-xs text-slate-700 leading-relaxed pt-2">
                {summary}
              </p>
            )}
          </div>

          <div className="col-span-4 text-right text-xs font-mono space-y-1 text-slate-700">
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.address && <div>{personal.address}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
            {personal.portfolio && <div>{personal.portfolio}</div>}
          </div>
        </header>

        {/* Swiss Grid Content */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Main Column */}
          <div className="col-span-8 space-y-6">
            
            {experience.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-950 pb-1">
                  01 / Experience
                </h2>
                <div className="space-y-4">
                  {experience.map(exp => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-sm font-bold text-slate-950 uppercase">{exp.role}</h3>
                        <span className="text-[10px] font-mono text-slate-500">{exp.duration}</span>
                      </div>
                      <p className="text-xs font-semibold text-red-600">{exp.company}</p>
                      <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-950 pb-1">
                  02 / Selected Projects
                </h2>
                <div className="space-y-3">
                  {projects.map(proj => (
                    <div key={proj.id} className="space-y-1">
                      <h3 className="text-xs font-bold text-slate-950">{proj.name}</h3>
                      <p className="text-xs text-slate-700">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 font-mono text-[10px] text-slate-500">
                        {proj.technologies.join(' • ')}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4 space-y-6">
            
            {skills.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-950 pb-1">
                  03 / Capabilities
                </h2>
                <div className="space-y-1">
                  {skills.map(s => (
                    <div key={s.id} className="text-xs font-semibold text-slate-800 border-b border-slate-100 pb-1">
                      {s.name}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-950 pb-1">
                  04 / Education
                </h2>
                {education.map(edu => (
                  <div key={edu.id} className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-950">{edu.degree}</p>
                    <p className="text-slate-600">{edu.institution}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{edu.startYear} - {edu.endYear}</p>
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
