import React from 'react';
import { ResumeData } from '../../types/resume';
import { Terminal, Code2, Globe, Github, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const TechTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, summary, education, skills, experience, projects, certifications, achievements, languages } = data;

  const skillsByCategory = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="bg-slate-900 text-slate-100 font-mono p-8 shadow-2xl rounded-sm min-h-[1050px] w-full text-[12px] leading-relaxed print:bg-white print:text-black print:p-0 print:shadow-none font-sans">
      {/* Tech Top Header */}
      <div className="border-b-2 border-sky-500 pb-5 mb-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800 print:bg-slate-100 print:border-slate-300 print:text-black">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs mb-1">
              <Terminal size={14} />
              <span>developer_profile.json</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white print:text-black">
              {personal.fullName || 'DEVELOPER NAME'}
            </h1>
            <p className="text-sm font-semibold text-sky-400 mt-0.5 font-mono print:text-sky-700">
              {personal.title || 'FULL STACK ENGINEER'}
            </p>
          </div>

          {/* Quick Contact Links */}
          <div className="flex flex-wrap gap-y-1 gap-x-3 text-[11px] text-slate-300 font-mono print:text-slate-700">
            {personal.email && (
              <span className="flex items-center gap-1">
                <Mail size={12} className="text-sky-400" /> {personal.email}
              </span>
            )}
            {personal.phone && (
              <span className="flex items-center gap-1">
                <Phone size={12} className="text-sky-400" /> {personal.phone}
              </span>
            )}
            {personal.address && (
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-sky-400" /> {personal.address}
              </span>
            )}
            {personal.github && (
              <span className="flex items-center gap-1 text-sky-400">
                <Github size={12} /> {personal.github}
              </span>
            )}
            {personal.linkedin && (
              <span className="flex items-center gap-1 text-sky-400">
                <Globe size={12} /> {personal.linkedin}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold font-mono text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b border-slate-800 pb-1 print:text-sky-700 print:border-slate-300">
            <Code2 size={14} /> // ABOUT & OVERVIEW
          </h2>
          <p className="text-xs leading-relaxed text-slate-300 print:text-slate-800">{summary}</p>
        </div>
      )}

      {/* Technical Skills Stack */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold font-mono text-sky-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 border-b border-slate-800 pb-1 print:text-sky-700 print:border-slate-300">
            <Terminal size={14} /> // TECH_STACK & CORE_COMPETENCIES
          </h2>
          <div className="space-y-2">
            {Object.entries(skillsByCategory).map(([cat, list]) => (
              <div key={cat} className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs bg-slate-950/40 p-2 rounded-lg border border-slate-800/80 print:bg-slate-50 print:border-slate-200">
                <span className="font-mono text-sky-300 text-[11px] font-bold min-w-[140px] print:text-sky-800">{cat}:</span>
                <div className="flex flex-wrap gap-1.5">
                  {list.map(s => (
                    <span key={s.id} className="px-2 py-0.5 bg-sky-500/10 text-sky-300 border border-sky-500/30 rounded text-[11px] font-mono print:bg-sky-100 print:text-sky-900 print:border-sky-300">
                      {s.name} {s.level && <span className="opacity-60 text-[9px]">({s.level})</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold font-mono text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b border-slate-800 pb-1 print:text-sky-700 print:border-slate-300">
            <Code2 size={14} /> // WORK_EXPERIENCE
          </h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-sky-500/40 pl-3 space-y-1 print:border-sky-500">
                <div className="flex justify-between items-baseline font-bold text-xs text-slate-100 print:text-black">
                  <span className="text-sky-300 font-mono text-sm print:text-sky-800">{exp.role}</span>
                  <span className="text-[11px] font-mono text-slate-400 print:text-slate-600">{exp.duration}</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-300 print:text-slate-700">{exp.company}</div>
                <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed mt-1 print:text-slate-800">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Projects */}
      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold font-mono text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b border-slate-800 pb-1 print:text-sky-700 print:border-slate-300">
            <Github size={14} /> // FEATURED_PROJECTS
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {projects.map(proj => (
              <div key={proj.id} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 print:bg-slate-50 print:border-slate-200">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-xs text-sky-300 font-mono print:text-sky-800">{proj.name}</span>
                  <div className="flex items-center gap-2 text-[10px] text-sky-400">
                    {proj.githubLink && (
                      <a href={proj.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-0.5 hover:underline">
                        <Github size={11} /> Code
                      </a>
                    )}
                    {proj.liveDemo && (
                      <a href={proj.liveDemo} target="_blank" rel="noreferrer" className="flex items-center gap-0.5 hover:underline text-emerald-400">
                        <ExternalLink size={11} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed print:text-slate-800">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 bg-slate-900 text-slate-400 border border-slate-800 text-[10px] font-mono rounded print:bg-white print:text-slate-700 print:border-slate-300">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold font-mono text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b border-slate-800 pb-1 print:text-sky-700 print:border-slate-300">
            <Terminal size={14} /> // EDUCATION
          </h2>
          <div className="space-y-2">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between text-xs font-mono">
                <div>
                  <span className="font-bold text-slate-100 print:text-black">{edu.institution}</span> – {edu.degree} {edu.branch && `in ${edu.branch}`}
                  {edu.cgpa && <span className="text-sky-400 ml-2 print:text-sky-700">(GPA: {edu.cgpa})</span>}
                </div>
                <div className="text-slate-400 print:text-slate-600">{edu.startYear} - {edu.endYear}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
