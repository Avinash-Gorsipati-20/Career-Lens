import React from 'react';
import { ResumeData } from '../../types/resume';

export const AtsTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, education, skills, experience, projects, certifications, achievements, languages } = data;

  const contactLine = [
    personal.email,
    personal.phone,
    personal.address,
    personal.linkedin,
    personal.github,
    personal.portfolio
  ].filter(Boolean).join(' | ');

  // Group skills by category for ATS clarity
  const skillsByCategory = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="bg-white text-black font-sans p-10 shadow-2xl rounded-sm min-h-[1050px] w-full text-[12px] leading-normal print:p-0 print:shadow-none print:w-full">
      {/* Header */}
      <div className="text-center mb-5 border-b border-black pb-3">
        <h1 className="text-2xl font-bold uppercase tracking-wide">{personal.fullName || 'YOUR NAME'}</h1>
        <p className="text-sm font-semibold uppercase mt-0.5">{personal.title || 'PROFESSIONAL TITLE'}</p>
        <p className="text-[11px] mt-1.5">{contactLine}</p>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-xs text-justify leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
            TECHNICAL SKILLS
          </h2>
          <div className="space-y-1">
            {Object.entries(skillsByCategory).map(([cat, list]) => (
              <p key={cat} className="text-xs">
                <strong className="font-semibold">{cat}:</strong> {list.join(', ')}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">
            WORK EXPERIENCE
          </h2>
          <div className="space-y-3.5">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-xs">
                  <span>{exp.company}</span>
                  <span>{exp.duration}</span>
                </div>
                <div className="italic text-[11px] font-semibold mb-1">{exp.role}</div>
                <div className="text-xs whitespace-pre-line leading-relaxed pl-2">
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
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">
            TECHNICAL PROJECTS
          </h2>
          <div className="space-y-3">
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between font-bold text-xs">
                  <span>{proj.name}</span>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <span className="font-normal text-[11px] italic">[{proj.technologies.join(', ')}]</span>
                  )}
                </div>
                <p className="text-xs leading-relaxed mt-0.5">{proj.description}</p>
                {(proj.githubLink || proj.liveDemo) && (
                  <p className="text-[10px] text-slate-700">
                    {proj.githubLink && `GitHub: ${proj.githubLink} `}
                    {proj.liveDemo && `Demo: ${proj.liveDemo}`}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">
            EDUCATION
          </h2>
          <div className="space-y-2">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between text-xs">
                <div>
                  <span className="font-bold">{edu.institution}</span> – {edu.degree} {edu.branch && `in ${edu.branch}`}
                  {edu.cgpa && <span className="italic ml-2">(GPA: {edu.cgpa})</span>}
                </div>
                <div className="font-medium">{edu.startYear} - {edu.endYear}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Achievements */}
      {(certifications.length > 0 || achievements.length > 0) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
            HONORS & CERTIFICATIONS
          </h2>
          <ul className="list-disc pl-4 text-xs space-y-1">
            {certifications.map(c => (
              <li key={c.id}>
                <strong>{c.title}</strong> – {c.issuer} ({c.date})
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

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1">
            LANGUAGES
          </h2>
          <p className="text-xs">
            {languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};
