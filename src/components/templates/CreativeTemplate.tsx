import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from 'lucide-react';

export const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, education, skills, experience, projects, certifications, languages } = data;

  return (
    <div className="bg-white text-slate-800 font-sans shadow-2xl rounded-sm min-h-[1050px] w-full text-[12px] leading-normal flex print:p-0 print:shadow-none print:w-full">
      {/* Left Colored Sidebar */}
      <div className="w-[32%] bg-indigo-900 text-slate-100 p-6 space-y-6 shrink-0 print:bg-indigo-900">
        {/* Avatar / Initials */}
        <div className="text-center">
          {personal.profilePhoto ? (
            <img
              src={personal.profilePhoto}
              alt={personal.fullName}
              className="w-24 h-24 rounded-full mx-auto border-2 border-indigo-400 object-cover shadow-md mb-3"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-indigo-700 border-2 border-indigo-400 mx-auto flex items-center justify-center text-xl font-bold text-white mb-3">
              {personal.fullName ? personal.fullName.split(' ').map(n => n[0]).join('') : 'DEV'}
            </div>
          )}
          <h1 className="text-lg font-bold text-white leading-tight">{personal.fullName || 'Your Name'}</h1>
          <p className="text-[11px] font-medium text-indigo-200 mt-1 uppercase tracking-wider">{personal.title || 'Developer'}</p>
        </div>

        {/* Contact info */}
        <div className="space-y-2 text-[11px] text-indigo-100 border-t border-indigo-800/80 pt-4">
          {personal.email && <div className="flex items-center gap-2 overflow-hidden text-ellipsis"><Mail size={12} className="text-indigo-400 shrink-0" /> {personal.email}</div>}
          {personal.phone && <div className="flex items-center gap-2"><Phone size={12} className="text-indigo-400 shrink-0" /> {personal.phone}</div>}
          {personal.address && <div className="flex items-center gap-2"><MapPin size={12} className="text-indigo-400 shrink-0" /> {personal.address}</div>}
          {personal.github && <div className="flex items-center gap-2"><Github size={12} className="text-indigo-400 shrink-0" /> {personal.github.replace(/^https?:\/\//, '')}</div>}
          {personal.linkedin && <div className="flex items-center gap-2"><Linkedin size={12} className="text-indigo-400 shrink-0" /> {personal.linkedin.replace(/^https?:\/\//, '')}</div>}
          {personal.portfolio && <div className="flex items-center gap-2"><Globe size={12} className="text-indigo-400 shrink-0" /> {personal.portfolio.replace(/^https?:\/\//, '')}</div>}
        </div>

        {/* Skills Tag Cloud */}
        {skills.length > 0 && (
          <div className="border-t border-indigo-800/80 pt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2.5">
              Technical Stack
            </h2>
            <div className="flex flex-wrap gap-1">
              {skills.map(s => (
                <span key={s.id} className="px-2 py-0.5 bg-indigo-800/90 text-indigo-100 rounded text-[10px] border border-indigo-700">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="border-t border-indigo-800/80 pt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2.5">
              Education
            </h2>
            <div className="space-y-2 text-[11px]">
              {education.map(e => (
                <div key={e.id}>
                  <p className="font-semibold text-white">{e.degree}</p>
                  <p className="text-indigo-200 text-[10px]">{e.institution}</p>
                  <p className="text-indigo-300 text-[10px]">{e.startYear} - {e.endYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="border-t border-indigo-800/80 pt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">
              Languages
            </h2>
            <div className="space-y-1 text-[11px] text-indigo-200">
              {languages.map(l => (
                <div key={l.id} className="flex justify-between">
                  <span>{l.name}</span>
                  <span className="text-indigo-400">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Right Content */}
      <div className="w-[68%] p-8 space-y-6">
        {/* About / Summary */}
        {summary && (
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-900 pb-1 mb-2">
              About Me
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-900 pb-1 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-xs">{exp.role}</h3>
                    <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded">{exp.duration}</span>
                  </div>
                  <p className="text-xs font-medium text-indigo-700 mb-1">{exp.company}</p>
                  <div className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-900 pb-1 mb-3">
              Featured Projects
            </h2>
            <div className="space-y-3">
              {projects.map(p => (
                <div key={p.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-900 text-xs">{p.name}</h3>
                    <div className="flex items-center gap-2">
                      {p.githubLink && (
                        <a href={p.githubLink} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800" title="GitHub Repository">
                          <Github size={12} />
                        </a>
                      )}
                      {p.liveDemo && (
                        <a href={p.liveDemo} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800" title="Live Demo">
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">{p.description}</p>
                  {p.technologies && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.technologies.map(t => (
                        <span key={t} className="px-1.5 py-0.5 bg-white text-indigo-800 text-[9px] font-semibold border border-indigo-100 rounded">
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

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-900 pb-1 mb-2">
              Certifications
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {certifications.map(c => (
                <div key={c.id}>
                  <p className="font-semibold text-slate-900">{c.title}</p>
                  <p className="text-[10px] text-slate-500">{c.issuer} ({c.date})</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
