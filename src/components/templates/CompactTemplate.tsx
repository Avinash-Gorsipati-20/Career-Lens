import React from 'react';
import { ResumeData } from '../../types/resume';

export const CompactTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, education, skills, experience, projects, certifications, achievements, languages } = data;

  const contactItems = [
    personal.email,
    personal.phone,
    personal.address,
    personal.linkedin,
    personal.github,
    personal.portfolio
  ].filter(Boolean);

  return (
    <div className="bg-white text-slate-900 font-sans p-6 shadow-2xl rounded-sm min-h-[1050px] w-full text-[11px] leading-tight print:p-0 print:shadow-none">
      {/* Dense Header */}
      <div className="border-b border-emerald-600 pb-2 mb-3 flex flex-col md:flex-row justify-between items-start md:items-end gap-1">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight text-slate-950">{personal.fullName || 'YOUR NAME'}</h1>
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">{personal.title || 'PROFESSIONAL TITLE'}</p>
        </div>
        <div className="text-[10px] text-slate-600 flex flex-wrap gap-x-2.5 gap-y-0.5">
          {contactItems.map((item, i) => (
            <span key={i}>
              {item} {i < contactItems.length - 1 && <span className="text-emerald-500 font-bold ml-2">|</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-wider text-emerald-800 border-b border-slate-200 pb-0.5 mb-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> SUMMARY
          </h2>
          <p className="text-[11px] leading-snug text-slate-700">{summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-wider text-emerald-800 border-b border-slate-200 pb-0.5 mb-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> CORE SKILLS
          </h2>
          <div className="flex flex-wrap gap-1">
            {skills.map(s => (
              <span key={s.id} className="px-1.5 py-0.5 bg-slate-100 text-slate-800 border border-slate-200 rounded text-[10px] font-medium">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-wider text-emerald-800 border-b border-slate-200 pb-0.5 mb-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> EXPERIENCE
          </h2>
          <div className="space-y-2">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-[11px] text-slate-950">
                  <span>{exp.role} <span className="font-normal text-slate-600">@ {exp.company}</span></span>
                  <span className="text-emerald-700 text-[10px] font-mono">{exp.duration}</span>
                </div>
                <p className="text-[10.5px] text-slate-700 whitespace-pre-line leading-normal mt-0.5 pl-2 border-l border-slate-200">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-wider text-emerald-800 border-b border-slate-200 pb-0.5 mb-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> PROJECTS
          </h2>
          <div className="space-y-2">
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between font-bold text-[11px] text-slate-950">
                  <span>{proj.name}</span>
                  {proj.technologies?.length > 0 && (
                    <span className="font-normal text-[9.5px] text-slate-500 font-mono">[{proj.technologies.join(', ')}]</span>
                  )}
                </div>
                <p className="text-[10.5px] text-slate-700 leading-snug">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-wider text-emerald-800 border-b border-slate-200 pb-0.5 mb-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> EDUCATION
          </h2>
          <div className="space-y-1">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between text-[10.5px]">
                <span>
                  <strong className="text-slate-950">{edu.institution}</strong> – {edu.degree} {edu.branch && `(${edu.branch})`}
                  {edu.cgpa && <span className="text-slate-500 font-mono ml-1">GPA: {edu.cgpa}</span>}
                </span>
                <span className="text-slate-500 font-mono">{edu.startYear} - {edu.endYear}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Languages compact line */}
      {(certifications.length > 0 || languages.length > 0) && (
        <div>
          <h2 className="text-[11px] font-black uppercase tracking-wider text-emerald-800 border-b border-slate-200 pb-0.5 mb-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> ADDITIONAL INFORMATION
          </h2>
          <div className="text-[10px] space-y-0.5 text-slate-700">
            {certifications.length > 0 && (
              <p>
                <strong>Certifications:</strong> {certifications.map(c => `${c.title} (${c.issuer})`).join(' • ')}
              </p>
            )}
            {languages.length > 0 && (
              <p>
                <strong>Languages:</strong> {languages.map(l => `${l.name} (${l.proficiency})`).join(' • ')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
