import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Award } from 'lucide-react';

export const ExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, education, skills, experience, projects, certifications, achievements, languages } = data;

  const contactLine = [
    personal.email && `Email: ${personal.email}`,
    personal.phone && `Tel: ${personal.phone}`,
    personal.address && `Location: ${personal.address}`,
    personal.linkedin && `LinkedIn: ${personal.linkedin}`
  ].filter(Boolean).join('  •  ');

  return (
    <div className="bg-white text-slate-900 font-serif p-10 shadow-2xl rounded-sm min-h-[1050px] w-full text-[12px] leading-relaxed print:p-0 print:shadow-none">
      {/* Top Corporate Header Banner */}
      <div className="border-b-4 border-blue-900 pb-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-wide text-blue-950 font-sans">
              {personal.fullName || 'EXECUTIVE NAME'}
            </h1>
            <p className="text-base font-semibold text-amber-700 tracking-wider uppercase mt-0.5 font-sans">
              {personal.title || 'CHIEF EXECUTIVE OFFICER / DIRECTOR'}
            </p>
          </div>

          <div className="text-right text-[11px] font-sans text-slate-600 space-y-0.5">
            {personal.email && <p><strong className="text-blue-950">Email:</strong> {personal.email}</p>}
            {personal.phone && <p><strong className="text-blue-950">Phone:</strong> {personal.phone}</p>}
            {personal.address && <p><strong className="text-blue-950">Address:</strong> {personal.address}</p>}
          </div>
        </div>

        {/* Sub-contact bar */}
        {(personal.linkedin || personal.github || personal.portfolio) && (
          <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] font-sans text-slate-600 flex flex-wrap gap-4">
            {personal.linkedin && <span><strong>LinkedIn:</strong> {personal.linkedin}</span>}
            {personal.portfolio && <span><strong>Portfolio:</strong> {personal.portfolio}</span>}
            {personal.github && <span><strong>GitHub:</strong> {personal.github}</span>}
          </div>
        )}
      </div>

      {/* Executive Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-xs font-bold font-sans uppercase tracking-widest text-blue-950 border-b-2 border-slate-300 pb-1 mb-2">
            EXECUTIVE PROFILE & STRATEGIC VISION
          </h2>
          <p className="text-xs text-justify leading-relaxed text-slate-800">{summary}</p>
        </div>
      )}

      {/* Core Competencies & Leadership Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold font-sans uppercase tracking-widest text-blue-950 border-b-2 border-slate-300 pb-1 mb-2">
            CORE COMPETENCIES & EXPERTISE
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-1.5 gap-x-4 font-sans text-xs">
            {skills.map(skill => (
              <div key={skill.id} className="flex items-center gap-1.5 border-l-2 border-amber-600 pl-2">
                <span className="font-semibold text-slate-900">{skill.name}</span>
                {skill.level && <span className="text-[10px] text-slate-500">({skill.level})</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Leadership Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold font-sans uppercase tracking-widest text-blue-950 border-b-2 border-slate-300 pb-1 mb-3">
            EXECUTIVE EXPERIENCE
          </h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-sans text-xs">
                  <span className="font-bold text-sm text-blue-950">{exp.role}</span>
                  <span className="font-semibold text-amber-700">{exp.duration}</span>
                </div>
                <div className="font-sans italic text-xs text-slate-700 mb-1.5">{exp.company}</div>
                <p className="text-xs whitespace-pre-line leading-relaxed text-slate-800 text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Projects & Strategic Initiatives */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold font-sans uppercase tracking-widest text-blue-950 border-b-2 border-slate-300 pb-1 mb-3">
            STRATEGIC PROJECTS & INITIATIVES
          </h2>
          <div className="space-y-3">
            {projects.map(proj => (
              <div key={proj.id} className="font-sans">
                <div className="flex justify-between items-baseline font-bold text-xs text-blue-950">
                  <span>{proj.name}</span>
                  {proj.technologies?.length > 0 && (
                    <span className="font-normal text-[11px] text-slate-600 italic">
                      [{proj.technologies.join(', ')}]
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-slate-800 mt-0.5">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold font-sans uppercase tracking-widest text-blue-950 border-b-2 border-slate-300 pb-1 mb-2">
            EDUCATION & CREDENTIALS
          </h2>
          <div className="space-y-2 font-sans">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between text-xs">
                <div>
                  <span className="font-bold text-blue-950">{edu.degree}</span> in {edu.branch || 'Field'} – <span className="italic">{edu.institution}</span>
                  {edu.cgpa && <span className="text-amber-700 font-semibold ml-2">(GPA: {edu.cgpa})</span>}
                </div>
                <div className="font-medium text-slate-600">{edu.startYear} - {edu.endYear}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Honors, Certifications & Achievements */}
      {(certifications.length > 0 || achievements.length > 0) && (
        <div>
          <h2 className="text-xs font-bold font-sans uppercase tracking-widest text-blue-950 border-b-2 border-slate-300 pb-1 mb-2">
            HONORS, BOARD ROLES & CERTIFICATIONS
          </h2>
          <ul className="list-disc pl-4 text-xs font-sans space-y-1 text-slate-800">
            {certifications.map(c => (
              <li key={c.id}>
                <strong>{c.title}</strong> – Issued by {c.issuer} ({c.date})
              </li>
            ))}
            {achievements.map(a => (
              <li key={a.id}>
                <strong>{a.title}:</strong> {a.description} {a.date && `(${a.date})`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
