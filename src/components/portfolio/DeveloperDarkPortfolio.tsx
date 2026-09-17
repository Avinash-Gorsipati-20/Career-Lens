import React, { useState } from 'react';
import { ResumeData, Project } from '../../types/resume';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Download, Code, Briefcase, GraduationCap, Award, ChevronRight, Sparkles, Terminal } from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';

interface DeveloperDarkPortfolioProps {
  data: ResumeData;
  onDownloadPdf?: () => void;
}

export const DeveloperDarkPortfolio: React.FC<DeveloperDarkPortfolioProps> = ({ data, onDownloadPdf }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Group skills by category
  const groupedSkills = data.skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, typeof data.skills>);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 pb-16">
      
      {/* Background Accent Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-20 relative z-10">

        {/* Hero Section */}
        <section className="space-y-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 pt-6 pb-10 border-b border-slate-800/80">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-400">
              <Terminal size={14} /> Available for Senior & Lead Roles
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Hello, I'm <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">{data.personal.fullName || 'Professional Engineer'}</span>
            </h1>
            
            <p className="text-xl font-medium text-slate-300">
              {data.personal.title || 'Full Stack Developer & Systems Architect'}
            </p>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
              {data.summary || 'Passionate software engineer building resilient web applications, cloud native infrastructure, and intuitive digital experiences.'}
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              {data.personal.github && (
                <a href={data.personal.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 rounded-xl text-xs font-medium transition-all shadow-sm">
                  <Github size={16} /> GitHub Profile
                </a>
              )}
              {data.personal.linkedin && (
                <a href={data.personal.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:text-blue-300 rounded-xl text-xs font-medium transition-all shadow-sm">
                  <Linkedin size={16} /> LinkedIn
                </a>
              )}
              {onDownloadPdf && (
                <button onClick={onDownloadPdf} className="flex items-center gap-2 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-lg shadow-cyan-500/20">
                  <Download size={16} /> Download Resume PDF
                </button>
              )}
            </div>
          </div>

          {/* Avatar Profile Box */}
          <div className="relative group">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 p-1 shadow-2xl shadow-cyan-500/20">
              {data.personal.profilePhoto ? (
                <img src={data.personal.profilePhoto} alt={data.personal.fullName} className="w-full h-full object-cover rounded-[22px]" />
              ) : (
                <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-4xl font-extrabold text-cyan-400 font-mono">
                  {data.personal.fullName.split(' ').map(n => n[0]).join('') || 'DEV'}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Technical Expertise / Skills */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
              <Code size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Technical Expertise</h2>
              <p className="text-xs text-slate-400">Categorized proficiency across modern development stack</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedSkills).map(([cat, skills]) => (
              <div key={cat} className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all space-y-3">
                <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider font-mono">{cat}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map(s => (
                    <span key={s.id} className="px-3 py-1 bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 text-xs rounded-lg font-medium transition-colors">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects with Case Study Trigger */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400">
                <Sparkles size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
                <p className="text-xs text-slate-400">Click any project to inspect deep case study and architecture breakdown</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map(proj => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg hover:shadow-cyan-500/5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                      {proj.name}
                      <ChevronRight size={16} className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-4 pt-2 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5 font-mono">
                    {(proj.technologies || []).slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 bg-slate-950 border border-slate-800 text-cyan-300/90 text-[11px] rounded font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-cyan-400 font-semibold group-hover:underline">
                    View Case Study & Architecture →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        {data.experience.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400">
                <Briefcase size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Work Experience</h2>
                <p className="text-xs text-slate-400">Career progression and accomplishments</p>
              </div>
            </div>

            <div className="space-y-6 relative border-l-2 border-slate-800 ml-4 pl-6">
              {data.experience.map(exp => (
                <div key={exp.id} className="relative group space-y-2">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-500 group-hover:bg-cyan-400 transition-colors"></div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md w-fit">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-400">{exp.company}</p>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line pt-1">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.education.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                  <GraduationCap size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Education</h2>
              </div>
              <div className="space-y-3">
                {data.education.map(edu => (
                  <div key={edu.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-1">
                    <h3 className="text-sm font-bold text-white">{edu.degree} - {edu.branch}</h3>
                    <p className="text-xs text-slate-400">{edu.institution}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1 font-mono">
                      <span>{edu.startYear} - {edu.endYear}</span>
                      {edu.cgpa && <span className="text-emerald-400 font-semibold">CGPA: {edu.cgpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.certifications.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                  <Award size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Certifications</h2>
              </div>
              <div className="space-y-3">
                {data.certifications.map(cert => (
                  <div key={cert.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-1">
                    <h3 className="text-sm font-bold text-white">{cert.title}</h3>
                    <p className="text-xs text-slate-400">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Contact Footer */}
        <footer className="border-t border-slate-800/80 pt-10 text-center space-y-4">
          <h2 className="text-xl font-bold text-white">Let's Connect & Work Together</h2>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            {data.personal.email && (
              <span className="flex items-center gap-2">
                <Mail size={14} className="text-cyan-400" /> {data.personal.email}
              </span>
            )}
            {data.personal.phone && (
              <span className="flex items-center gap-2">
                <Phone size={14} className="text-cyan-400" /> {data.personal.phone}
              </span>
            )}
            {data.personal.address && (
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-cyan-400" /> {data.personal.address}
              </span>
            )}
          </div>
        </footer>

      </div>

      {/* Case Study Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
