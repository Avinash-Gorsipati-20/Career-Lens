import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from 'lucide-react';

export const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, education, skills, experience, projects, certifications, achievements, languages, interests } = data;

  return (
    <div className="bg-white text-slate-800 font-sans p-8 shadow-2xl rounded-sm min-h-[1050px] w-full text-[13px] leading-normal print:p-0 print:shadow-none print:w-full">
      {/* Header Banner */}
      <div className="border-b-2 border-blue-600 pb-5 mb-6 flex justify-between items-start">
        <div className="space-y-1 max-w-[70%]">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{personal.fullName || 'Your Name'}</h1>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">{personal.title || 'Professional Title'}</p>
          {summary && <p className="text-xs text-slate-600 mt-2 leading-relaxed">{summary}</p>}
        </div>

        <div className="text-right text-[11px] space-y-1 text-slate-600 shrink-0">
          {personal.email && <div className="flex items-center justify-end gap-1.5"><Mail size={12} className="text-blue-600" /> {personal.email}</div>}
          {personal.phone && <div className="flex items-center justify-end gap-1.5"><Phone size={12} className="text-blue-600" /> {personal.phone}</div>}
          {personal.address && <div className="flex items-center justify-end gap-1.5"><MapPin size={12} className="text-blue-600" /> {personal.address}</div>}
          {personal.linkedin && <div className="flex items-center justify-end gap-1.5 text-blue-600"><Linkedin size={12} /> {personal.linkedin.replace(/^https?:\/\//, '')}</div>}
          {personal.github && <div className="flex items-center justify-end gap-1.5 text-blue-600"><Github size={12} /> {personal.github.replace(/^https?:\/\//, '')}</div>}
          {personal.portfolio && <div className="flex items-center justify-end gap-1.5 text-blue-600"><Globe size={12} /> {personal.portfolio.replace(/^https?:\/\//, '')}</div>}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column (Work Experience & Projects) */}
        <div className="col-span-8 space-y-6">
          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-200 pb-1 mb-3">
                Professional Experience
              </h2>
              <div className="space-y-4">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900 text-sm">{exp.role}</h3>
                      <span className="text-[11px] font-semibold text-slate-500">{exp.duration}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-700 mb-1">{exp.company}</p>
                    <div className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-200 pb-1 mb-3">
                Key Technical Projects
              </h2>
              <div className="space-y-3.5">
                {projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        {proj.name}
                        {proj.liveDemo && (
                          <a href={proj.liveDemo} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-0.5">
                            <ExternalLink size={10} />
                          </a>
                        )}
                      </h3>
                      {proj.githubLink && (
                        <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-[10px] text-blue-600 font-mono flex items-center gap-1 hover:underline">
                          <Github size={10} />
                          <span>{proj.githubLink.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
                        </a>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {proj.technologies.map(t => (
                          <span key={t} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded font-mono border border-slate-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar (Skills, Education, Certifications, Extras) */}
        <div className="col-span-4 space-y-6 border-l border-slate-100 pl-5">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-200 pb-1 mb-2.5">
                Core Competencies
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(s => (
                  <span key={s.id} className="px-2 py-0.5 bg-blue-50 text-blue-900 border border-blue-200/80 rounded-md text-[11px] font-medium">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-200 pb-1 mb-2.5">
                Education
              </h2>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-slate-900 text-xs">{edu.degree}</h3>
                    <p className="text-[11px] text-slate-700">{edu.institution}</p>
                    {edu.branch && <p className="text-[10px] text-slate-500">{edu.branch}</p>}
                    <div className="flex justify-between items-center text-[10px] text-slate-500 mt-0.5">
                      <span>{edu.startYear} - {edu.endYear}</span>
                      {edu.cgpa && <span className="font-semibold text-blue-600">{edu.cgpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-200 pb-1 mb-2">
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map(c => (
                  <div key={c.id}>
                    <p className="font-semibold text-slate-800 text-[11px]">{c.title}</p>
                    <p className="text-[10px] text-slate-500">{c.issuer} ({c.date})</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-200 pb-1 mb-2">
                Languages
              </h2>
              <div className="space-y-1 text-xs">
                {languages.map(l => (
                  <div key={l.id} className="flex justify-between text-[11px]">
                    <span className="font-medium text-slate-800">{l.name}</span>
                    <span className="text-slate-500 text-[10px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-200 pb-1 mb-2">
                Achievements
              </h2>
              <div className="space-y-1.5 text-[11px]">
                {achievements.map(a => (
                  <div key={a.id}>
                    <p className="font-medium text-slate-900">{a.title}</p>
                    {a.description && <p className="text-[10px] text-slate-600">{a.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-200 pb-1 mb-2">
                Interests
              </h2>
              <p className="text-[11px] text-slate-600">
                {interests.map(i => i.name).join(' • ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
