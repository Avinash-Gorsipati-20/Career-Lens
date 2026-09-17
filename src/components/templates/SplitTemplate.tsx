import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, GraduationCap, Award, Briefcase, Code, Sparkles } from 'lucide-react';

export const SplitTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, education, skills, experience, projects, certifications, achievements, languages, interests } = data;

  const skillsByCategory = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Skills';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="bg-white text-slate-900 font-sans shadow-2xl rounded-sm min-h-[1050px] w-full text-[12px] flex flex-col md:flex-row print:p-0 print:shadow-none">
      {/* Left Sidebar (Dark Slate / Purple accent) */}
      <div className="w-full md:w-1/3 bg-slate-900 text-slate-100 p-6 flex flex-col justify-between space-y-6 print:bg-slate-900 print:text-white">
        {/* Contact Info Box */}
        <div className="space-y-4">
          <div>
            <h1 className="text-xl font-black text-white tracking-tight leading-tight uppercase">
              {personal.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-xs font-bold text-violet-400 mt-1 uppercase tracking-wide">
              {personal.title || 'YOUR TITLE'}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-[11px] text-slate-300 border-t border-slate-800 pt-3">
            {personal.email && (
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-violet-400 shrink-0" />
                <span className="break-all">{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-violet-400 shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.address && (
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-violet-400 shrink-0" />
                <span>{personal.address}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={13} className="text-violet-400 shrink-0" />
                <span className="break-all text-xs">{personal.linkedin}</span>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-2">
                <Github size={13} className="text-violet-400 shrink-0" />
                <span className="break-all text-xs">{personal.github}</span>
              </div>
            )}
            {personal.portfolio && (
              <div className="flex items-center gap-2">
                <Globe size={13} className="text-violet-400 shrink-0" />
                <span className="break-all text-xs">{personal.portfolio}</span>
              </div>
            )}
          </div>

          {/* Skills Breakdown */}
          {skills.length > 0 && (
            <div className="space-y-2 border-t border-slate-800 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                <Code size={14} /> SKILLS & STACK
              </h3>
              <div className="space-y-2">
                {Object.entries(skillsByCategory).map(([cat, list]) => (
                  <div key={cat} className="space-y-1">
                    <span className="text-[10px] font-semibold uppercase text-slate-400">{cat}</span>
                    <div className="flex flex-wrap gap-1">
                      {list.map((name, i) => (
                        <span key={i} className="px-2 py-0.5 bg-violet-600/20 text-violet-300 border border-violet-500/30 text-[10px] rounded">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Sidebar */}
          {education.length > 0 && (
            <div className="space-y-2 border-t border-slate-800 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                <GraduationCap size={14} /> EDUCATION
              </h3>
              <div className="space-y-2.5">
                {education.map(edu => (
                  <div key={edu.id} className="text-[11px]">
                    <div className="font-bold text-white">{edu.institution}</div>
                    <div className="text-violet-300">{edu.degree} {edu.branch && `(${edu.branch})`}</div>
                    <div className="text-[10px] text-slate-400">{edu.startYear} - {edu.endYear} {edu.cgpa && `| GPA: ${edu.cgpa}`}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="space-y-1.5 border-t border-slate-800 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-violet-400">LANGUAGES</h3>
              <div className="text-[11px] text-slate-300 space-y-0.5">
                {languages.map(l => (
                  <div key={l.id} className="flex justify-between">
                    <span>{l.name}</span>
                    <span className="text-[10px] text-slate-400">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Main Column */}
      <div className="w-full md:w-2/3 p-6 space-y-5 bg-white text-slate-900">
        {/* Professional Summary */}
        {summary && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 border-violet-600 pb-1 mb-2 flex items-center gap-1.5">
              <Sparkles size={14} className="text-violet-600" /> EXECUTIVE SUMMARY
            </h2>
            <p className="text-xs leading-relaxed text-slate-700">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 border-violet-600 pb-1 mb-3 flex items-center gap-1.5">
              <Briefcase size={14} className="text-violet-600" /> WORK EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline font-bold text-xs">
                    <span className="text-violet-950 font-bold">{exp.role}</span>
                    <span className="text-slate-500 text-[11px] font-mono">{exp.duration}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-violet-700">{exp.company}</div>
                  <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 border-violet-600 pb-1 mb-3 flex items-center gap-1.5">
              <Code size={14} className="text-violet-600" /> KEY PROJECTS
            </h2>
            <div className="space-y-3">
              {projects.map(proj => (
                <div key={proj.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-baseline font-bold text-xs text-slate-950 mb-1">
                    <span>{proj.name}</span>
                    {proj.technologies?.length > 0 && (
                      <span className="font-normal text-[10px] text-slate-500 font-mono">[{proj.technologies.join(', ')}]</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Achievements */}
        {(certifications.length > 0 || achievements.length > 0) && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 border-violet-600 pb-1 mb-2 flex items-center gap-1.5">
              <Award size={14} className="text-violet-600" /> CERTIFICATIONS & HONORS
            </h2>
            <ul className="list-disc pl-4 text-xs space-y-1 text-slate-700">
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
      </div>
    </div>
  );
};
