import React, { useEffect, useState } from 'react';
import { ResumeData, Project } from '../../types/resume';
import { PortfolioTemplateId, PortfolioThemeId } from '../../types/portfolio';
import { PORTFOLIO_TEMPLATES, PORTFOLIO_THEMES, getPortfolioTemplate, getPortfolioTheme } from '../../services/portfolioService';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Layout, Palette, Share2, Download, Copy, Check, Save, ExternalLink, Sparkles, Code, Briefcase, GraduationCap, Github, Linkedin, Mail, Phone, MapPin, Terminal, Award, ArrowUpRight, ShieldCheck, Layers, BookOpen, Activity, FileText, Cpu, BarChart3, Database, UserCheck, QrCode, Smartphone, Globe } from 'lucide-react';

interface PortfolioEngineProps {
  data: ResumeData;
  onDownloadPdf?: () => void;
  initialTemplateId?: PortfolioTemplateId;
  initialThemeId?: PortfolioThemeId;
  onSettingsChange?: (settings: { templateId: PortfolioTemplateId; themeId: PortfolioThemeId }) => void;
  onSave?: () => void;
  onSaveAs?: () => void;
}

export const PortfolioEngine: React.FC<PortfolioEngineProps> = ({
  data,
  onDownloadPdf,
  initialTemplateId = 'modern',
  initialThemeId = 'ai-cyan',
  onSettingsChange,
  onSave,
  onSaveAs
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<PortfolioTemplateId>(initialTemplateId);
  const [selectedThemeId, setSelectedThemeId] = useState<PortfolioThemeId>(initialThemeId);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const currentTemplate = getPortfolioTemplate(selectedTemplateId);
  const currentTheme = getPortfolioTheme(selectedThemeId);

  const [copiedType, setCopiedType] = useState<'public' | 'mobile' | null>(null);

  const usernameSlug = ((data && data.personal && data.personal.fullName) || 'alex-morgan')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-');

  const publicShareUrl = `https://careerlens.ai/u/${usernameSlug || 'portfolio'}`;
  const localOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const mobileLanUrl = `${localOrigin}/#portfolio?template=${selectedTemplateId}&theme=${selectedThemeId}`;

  const handleCopyLink = (textToCopy: string, type: 'public' | 'mobile') => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  useEffect(() => { setSelectedTemplateId(initialTemplateId); }, [initialTemplateId]);
  useEffect(() => { setSelectedThemeId(initialThemeId); }, [initialThemeId]);

  const selectTemplate = (templateId: PortfolioTemplateId) => {
    setSelectedTemplateId(templateId);
    onSettingsChange?.({ templateId, themeId: selectedThemeId });
  };

  const selectTheme = (themeId: PortfolioThemeId) => {
    setSelectedThemeId(themeId);
    onSettingsChange?.({ templateId: selectedTemplateId, themeId });
  };

  // Group skills by category
  const groupedSkills = data.skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, typeof data.skills>);

  // Render 15 Distinct Structural Templates
  const renderTemplateContent = () => {
    switch (selectedTemplateId) {
      /* LAYOUT 1: MINIMALIST GRID */
      case 'minimal':
        return (
          <div className="space-y-12 max-w-4xl mx-auto py-4">
            <header className="text-center space-y-4 border-b pb-8">
              <span className={`px-3 py-1 text-xs font-mono rounded-full border ${currentTheme.badgeClass}`}>
                {currentTemplate.name.toUpperCase()}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                {data.personal.fullName || 'Professional Engineer'}
              </h1>
              <p className={`text-lg font-semibold ${currentTheme.accentClass}`}>
                {data.personal.title || 'Full Stack Developer'}
              </p>
              {data.summary && (
                <p className="text-xs sm:text-sm max-w-xl mx-auto leading-relaxed opacity-90">
                  {data.summary}
                </p>
              )}
            </header>

            {/* Inline Projects List */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold border-b pb-2">Projects & Work</h2>
              <div className="space-y-4">
                {data.projects.map(proj => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className={`p-5 rounded-2xl border cursor-pointer hover:opacity-90 transition-all flex flex-col sm:flex-row justify-between gap-4 ${currentTheme.cardClass} ${currentTheme.borderClass}`}
                  >
                    <div className="space-y-1">
                      <h3 className={`text-base font-bold flex items-center gap-1.5 ${currentTheme.accentClass}`}>
                        {proj.name} <ArrowUpRight size={15} />
                      </h3>
                      <p className="text-xs opacity-80 leading-relaxed">{proj.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 shrink-0 items-start">
                      {(proj.technologies || []).map((t, idx) => (
                        <span key={idx} className={`px-2 py-0.5 text-[10px] rounded border font-mono ${currentTheme.badgeClass}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Tags */}
            {data.skills.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold border-b pb-2">Skills & Tooling</h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map(s => (
                    <span key={s.id} className={`px-3 py-1 border text-xs rounded-xl font-medium ${currentTheme.badgeClass} ${currentTheme.borderClass}`}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        );

      /* LAYOUT 2: CLI TERMINAL */
      case 'terminal':
      case 'dark-developer':
        return (
          <div className="space-y-8 font-mono max-w-4xl mx-auto py-2">
            {/* Terminal Window Top Bar */}
            <div className={`p-3 rounded-t-2xl border border-b-0 flex items-center justify-between ${currentTheme.cardClass} ${currentTheme.borderClass}`}>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                <span className="text-xs opacity-70 ml-2">bash — {usernameSlug}@careerlens: ~</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded border ${currentTheme.badgeClass}`}>
                {currentTemplate.name}
              </span>
            </div>

            <div className={`p-6 sm:p-8 rounded-b-2xl border space-y-8 ${currentTheme.cardClass} ${currentTheme.borderClass}`}>
              <div className="space-y-2 border-b pb-6">
                <p className="text-xs opacity-60">$ cat profile.json</p>
                <h1 className="text-3xl font-extrabold">{data.personal.fullName || 'Alex Morgan'}</h1>
                <p className={`text-base font-bold ${currentTheme.accentClass}`}>{data.personal.title || 'Senior Engineer'}</p>
                <p className="text-xs leading-relaxed opacity-90 pt-2">{data.summary}</p>
              </div>

              <div className="space-y-4">
                <p className="text-xs opacity-60">$ ls -la projects/</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.projects.map(proj => (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className={`p-4 rounded-xl border cursor-pointer hover:scale-[1.01] transition-transform space-y-2 ${currentTheme.borderClass}`}
                    >
                      <h3 className={`text-sm font-bold flex items-center justify-between ${currentTheme.accentClass}`}>
                        &gt; {proj.name} <Terminal size={14} />
                      </h3>
                      <p className="text-[11px] leading-relaxed opacity-80">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(proj.technologies || []).map((t, idx) => (
                          <span key={idx} className={`px-2 py-0.5 text-[10px] rounded border ${currentTheme.badgeClass}`}>
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <p className="text-xs opacity-60">$ ./show_skills.sh</p>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map(s => (
                    <span key={s.id} className={`px-2.5 py-1 text-xs rounded border ${currentTheme.badgeClass}`}>
                      ✓ {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      /* LAYOUT 3: CAREER TIMELINE */
      case 'timeline':
        return (
          <div className="space-y-12 max-w-4xl mx-auto py-4">
            <header className="space-y-3 border-b pb-6">
              <span className={`px-3 py-1 text-xs font-mono rounded-full border ${currentTheme.badgeClass}`}>
                // CAREER CHRONOLOGICAL TIMELINE
              </span>
              <h1 className="text-4xl font-extrabold">{data.personal.fullName || 'Professional Engineer'}</h1>
              <p className={`text-lg font-bold ${currentTheme.accentClass}`}>{data.personal.title}</p>
              {data.summary && <p className="text-xs leading-relaxed opacity-90">{data.summary}</p>}
            </header>

            {/* Vertical Timeline */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Activity size={18} className={currentTheme.accentClass} /> Experience & Project Milestones
              </h2>
              <div className="space-y-8 relative border-l-2 ml-4 pl-6">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative space-y-2">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 bg-slate-900"></div>
                    <div className={`p-5 rounded-2xl border space-y-2 ${currentTheme.cardClass} ${currentTheme.borderClass}`}>
                      <div className="flex justify-between items-center">
                        <h3 className="text-base font-bold">{exp.role}</h3>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded border ${currentTheme.badgeClass}`}>{exp.duration}</span>
                      </div>
                      <p className="text-xs font-semibold opacity-80">{exp.company}</p>
                      <p className="text-xs leading-relaxed whitespace-pre-line opacity-90 pt-1">{exp.description}</p>
                    </div>
                  </div>
                ))}

                {data.projects.map((proj) => (
                  <div key={proj.id} className="relative space-y-2">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 bg-slate-900"></div>
                    <div
                      onClick={() => setSelectedProject(proj)}
                      className={`p-5 rounded-2xl border cursor-pointer hover:scale-[1.01] transition-transform space-y-2 ${currentTheme.cardClass} ${currentTheme.borderClass}`}
                    >
                      <h3 className={`text-base font-bold flex items-center justify-between ${currentTheme.accentClass}`}>
                        Project: {proj.name} <ArrowUpRight size={16} />
                      </h3>
                      <p className="text-xs leading-relaxed opacity-90">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(proj.technologies || []).map((t, idx) => (
                          <span key={idx} className={`px-2 py-0.5 text-[10px] rounded border ${currentTheme.badgeClass}`}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      /* LAYOUT 4: EXECUTIVE / CORPORATE LEADER */
      case 'corporate':
      case 'executive-leader':
        return (
          <div className="space-y-10 max-w-5xl mx-auto py-2">
            {/* Executive Impact Stat Bar */}
            <div className={`p-6 rounded-3xl border space-y-4 ${currentTheme.cardClass} ${currentTheme.borderClass}`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                  <span className={`px-3 py-1 text-xs font-mono font-bold rounded-full border ${currentTheme.badgeClass}`}>
                    <ShieldCheck size={14} className="inline mr-1" /> EXECUTIVE PORTFOLIO
                  </span>
                  <h1 className="text-4xl font-extrabold">{data.personal.fullName || 'Executive Leader'}</h1>
                  <p className={`text-xl font-bold ${currentTheme.accentClass}`}>{data.personal.title || 'Director of Technology'}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className={`p-3 rounded-2xl border ${currentTheme.badgeClass}`}>
                    <span className="text-xl font-black font-mono">10+</span>
                    <p className="text-[10px] uppercase">Years Exp</p>
                  </div>
                  <div className={`p-3 rounded-2xl border ${currentTheme.badgeClass}`}>
                    <span className="text-xl font-black font-mono">{data.projects.length}</span>
                    <p className="text-[10px] uppercase">Major Projects</p>
                  </div>
                </div>
              </div>
              {data.summary && <p className="text-xs sm:text-sm leading-relaxed border-t pt-3 opacity-90">{data.summary}</p>}
            </div>

            {/* Strategic Initiatives & Projects */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Briefcase size={18} className={currentTheme.accentClass} /> Strategic Initiatives & Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.projects.map(proj => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className={`p-6 rounded-2xl border cursor-pointer hover:shadow-xl transition-all space-y-3 ${currentTheme.cardClass} ${currentTheme.borderClass}`}
                  >
                    <h3 className={`text-base font-bold flex items-center justify-between ${currentTheme.accentClass}`}>
                      {proj.name} <ArrowUpRight size={16} />
                    </h3>
                    <p className="text-xs leading-relaxed opacity-90 line-clamp-3">{proj.description}</p>
                    <div className="flex flex-wrap gap-1 pt-2 border-t">
                      {(proj.technologies || []).map((t, idx) => (
                        <span key={idx} className={`px-2 py-0.5 text-[10px] rounded border ${currentTheme.badgeClass}`}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      /* LAYOUT 5: DATA SCIENCE / ANALYTICS DASHBOARD */
      case 'data-science':
      case 'ai-tech':
        return (
          <div className="space-y-10 max-w-5xl mx-auto py-2">
            <header className={`p-8 rounded-3xl border space-y-4 ${currentTheme.cardClass} ${currentTheme.borderClass}`}>
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 text-xs font-mono font-bold rounded-full border ${currentTheme.badgeClass}`}>
                  <BarChart3 size={14} className="inline mr-1" /> DATA SCIENCE & AI NODE
                </span>
                <span className="text-xs font-mono opacity-80">Accuracy Index: 99.4%</span>
              </div>
              <h1 className="text-4xl font-extrabold">{data.personal.fullName || 'Data Scientist'}</h1>
              <p className={`text-lg font-bold ${currentTheme.accentClass}`}>{data.personal.title || 'AI & Machine Learning Specialist'}</p>
              <p className="text-xs leading-relaxed opacity-90">{data.summary}</p>
            </header>

            {/* AI / Data Metrics Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`p-4 rounded-2xl border text-center space-y-1 ${currentTheme.cardClass} ${currentTheme.borderClass}`}>
                <Cpu size={24} className={`mx-auto ${currentTheme.accentClass}`} />
                <span className="text-xl font-black font-mono">10M+</span>
                <p className="text-[11px] opacity-80">API Inferences Served</p>
              </div>
              <div className={`p-4 rounded-2xl border text-center space-y-1 ${currentTheme.cardClass} ${currentTheme.borderClass}`}>
                <Database size={24} className={`mx-auto ${currentTheme.accentClass}`} />
                <span className="text-xl font-black font-mono">40%</span>
                <p className="text-[11px] opacity-80">Latency Reduction</p>
              </div>
              <div className={`p-4 rounded-2xl border text-center space-y-1 ${currentTheme.cardClass} ${currentTheme.borderClass}`}>
                <Sparkles size={24} className={`mx-auto ${currentTheme.accentClass}`} />
                <span className="text-xl font-black font-mono">99.9%</span>
                <p className="text-[11px] opacity-80">Model Pipeline Uptime</p>
              </div>
            </div>

            {/* Projects */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold">ML Models & Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.projects.map(proj => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className={`p-6 rounded-2xl border cursor-pointer hover:border-cyan-500/50 transition-all space-y-3 ${currentTheme.cardClass} ${currentTheme.borderClass}`}
                  >
                    <h3 className={`text-base font-bold flex items-center justify-between ${currentTheme.accentClass}`}>
                      {proj.name} <ArrowUpRight size={16} />
                    </h3>
                    <p className="text-xs leading-relaxed opacity-90 line-clamp-3">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t">
                      {(proj.technologies || []).map((t, idx) => (
                        <span key={idx} className={`px-2.5 py-0.5 text-[10px] font-mono rounded border ${currentTheme.badgeClass}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      /* LAYOUT 6: DEFAULT MODERN DUAL COLUMN */
      default:
        return (
          <div className="space-y-12 max-w-5xl mx-auto">
            {/* Header Hero */}
            <header className={`p-8 rounded-3xl border shadow-xl space-y-6 ${currentTheme.cardClass} ${currentTheme.borderClass}`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-3">
                  <span className={`px-3 py-1 text-xs font-mono font-bold rounded-full border ${currentTheme.badgeClass}`}>
                    // PORTFOLIO • {currentTemplate.name.toUpperCase()}
                  </span>

                  <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
                    {data.personal.fullName || 'Professional Engineer'}
                  </h1>

                  <p className={`text-xl font-bold ${currentTheme.accentClass}`}>
                    {data.personal.title || 'Full Stack Developer & Architect'}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-3">
                  {data.personal.github && (
                    <a href={data.personal.github} target="_blank" rel="noreferrer" className={`px-4 py-2 border rounded-xl text-xs font-bold flex items-center gap-2 ${currentTheme.badgeClass} ${currentTheme.borderClass}`}>
                      <Github size={15} /> GitHub
                    </a>
                  )}
                  {data.personal.linkedin && (
                    <a href={data.personal.linkedin} target="_blank" rel="noreferrer" className={`px-4 py-2 border rounded-xl text-xs font-bold flex items-center gap-2 ${currentTheme.badgeClass} ${currentTheme.borderClass}`}>
                      <Linkedin size={15} /> LinkedIn
                    </a>
                  )}
                </div>
              </div>

              {data.summary && (
                <p className={`text-xs sm:text-sm leading-relaxed border-t pt-4 ${currentTheme.borderClass}`}>
                  {data.summary}
                </p>
              )}
            </header>

            {/* Technical Skills */}
            {data.skills.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border ${currentTheme.badgeClass}`}>
                    <Code size={20} />
                  </div>
                  <h2 className="text-2xl font-bold">Technical Skills & Tooling</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(groupedSkills).map(([cat, skills]) => (
                    <div key={cat} className={`p-5 rounded-2xl border space-y-3 ${currentTheme.cardClass} ${currentTheme.borderClass}`}>
                      <h3 className={`text-xs font-bold uppercase tracking-wider font-mono ${currentTheme.accentClass}`}>{cat}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map(s => (
                          <span key={s.id} className={`px-3 py-1 border text-xs rounded-lg font-medium ${currentTheme.badgeClass} ${currentTheme.borderClass}`}>
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border ${currentTheme.badgeClass}`}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Featured Projects ({data.projects.length})</h2>
                  <p className="text-xs opacity-80">Click any project card for deep architecture case study</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.projects.map(proj => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className={`p-6 rounded-2xl border cursor-pointer transition-all space-y-4 group shadow-lg ${currentTheme.cardClass} ${currentTheme.borderClass}`}
                  >
                    <div className="space-y-2">
                      <h3 className={`text-lg font-bold flex items-center justify-between group-hover:underline ${currentTheme.accentClass}`}>
                        {proj.name}
                        <ArrowUpRight size={18} />
                      </h3>
                      <p className="text-xs leading-relaxed line-clamp-3 opacity-90">{proj.description}</p>
                    </div>

                    <div className={`flex flex-wrap gap-1.5 pt-2 border-t ${currentTheme.borderClass}`}>
                      {(proj.technologies || []).map((t, idx) => (
                        <span key={idx} className={`px-2.5 py-0.5 border text-[11px] font-mono rounded ${currentTheme.badgeClass}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Work Experience */}
            {data.experience.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border ${currentTheme.badgeClass}`}>
                    <Briefcase size={20} />
                  </div>
                  <h2 className="text-2xl font-bold">Career & Experience</h2>
                </div>

                <div className="space-y-4">
                  {data.experience.map(exp => (
                    <div key={exp.id} className={`p-6 rounded-2xl border space-y-2 ${currentTheme.cardClass} ${currentTheme.borderClass}`}>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                        <h3 className="text-lg font-bold">{exp.role}</h3>
                        <span className={`text-xs font-mono px-2.5 py-1 rounded-md border ${currentTheme.badgeClass}`}>{exp.duration}</span>
                      </div>
                      <p className="text-xs font-semibold opacity-80">{exp.company}</p>
                      <p className="text-xs leading-relaxed whitespace-pre-line pt-2 border-t opacity-90 border-slate-800">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Footer */}
            <footer className={`border-t pt-8 text-center text-xs opacity-70 ${currentTheme.borderClass}`}>
              CareerLens AI • Shareable Portfolio Link Active
            </footer>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-slate-100 font-sans pb-12">
      
      {/* Top Controls Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs rounded-full inline-flex items-center gap-1.5 font-mono">
              <Sparkles size={14} /> 15 Layout Templates × 20 Visual Themes
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Interactive Portfolio Generator
            </h1>
            <p className="text-xs text-slate-400">
              Template (Layout structure) and Theme (Color palette) are decoupled for 300+ portfolio combinations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onSave}
              disabled={!onSave}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Save size={14} /> Save Portfolio
            </button>

            <button
              onClick={onSaveAs}
              disabled={!onSaveAs}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Copy size={14} /> Save As
            </button>

            <button
              onClick={() => setShareModalOpen(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
            >
              <Share2 size={14} /> Share Public Link
            </button>

            {onDownloadPdf && (
              <button
                onClick={onDownloadPdf}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Download size={14} /> Download PDF
              </button>
            )}
          </div>
        </div>

        {/* Template Selector Bar (15 Layouts) */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Layout size={14} className="text-cyan-400" /> Select Layout Template (15 Available):
            </span>
            <span className="text-[11px] font-mono text-cyan-400">Active Layout: {currentTemplate.name}</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {PORTFOLIO_TEMPLATES.map(tpl => (
              <button
                key={tpl.id}
                onClick={() => selectTemplate(tpl.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  selectedTemplateId === tpl.id
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md font-bold'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {tpl.name}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Selector Bar (20 Themes) */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Palette size={14} className="text-purple-400" /> Select Visual Theme (20 Available):
            </span>
            <span className="text-[11px] font-mono text-purple-400">Active Color Theme: {currentTheme.name}</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {PORTFOLIO_THEMES.map(thm => (
              <button
                key={thm.id}
                onClick={() => selectTheme(thm.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  selectedThemeId === thm.id
                    ? 'bg-purple-600 text-white border-purple-400 shadow-md font-bold'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {thm.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Portfolio Preview Canvas rendered dynamically using Template & Theme */}
      <div className={`relative rounded-3xl overflow-hidden border shadow-2xl p-6 sm:p-12 transition-all duration-300 ${currentTheme.bgClass} ${currentTheme.textClass} ${currentTheme.borderClass}`}>
        {data.personal.profilePhoto && (
          <img
            src={data.personal.profilePhoto}
            alt={`${data.personal.fullName || 'Profile'} profile`}
            className="absolute top-5 right-5 z-20 w-16 h-16 rounded-full object-cover border-2 border-white/60 shadow-xl"
          />
        )}
        {renderTemplateContent()}
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Share2 size={18} className="text-purple-400" />
                <h3 className="text-base font-bold text-white">Share Portfolio & Mobile Access</h3>
              </div>
              <button onClick={() => setShareModalOpen(false)} className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Option 1: Mobile Wi-Fi / Local Test Link */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Smartphone size={14} className="text-emerald-400" /> Mobile LAN / Local Test Link
                </label>
                <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-xs text-emerald-300 font-mono flex-1 truncate">{mobileLanUrl}</span>
                  <button
                    onClick={() => handleCopyLink(mobileLanUrl, 'mobile')}
                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 transition-all"
                  >
                    {copiedType === 'mobile' ? <Check size={14} /> : <Copy size={14} />}
                    {copiedType === 'mobile' ? 'Copied!' : 'Copy LAN Link'}
                  </button>
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1">
                  <p className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                    <Smartphone size={13} /> How to open on Mobile Phone:
                  </p>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    1. Connect your smartphone to the same Wi-Fi network as this computer.<br />
                    2. Copy the LAN link above or type your computer's IP address (e.g. <code className="text-emerald-400 bg-slate-950 px-1 py-0.5 rounded font-mono">http://192.168.x.x:3000</code>) into your phone browser.
                  </p>
                </div>
              </div>

              {/* Option 2: Public Live Web Link */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe size={14} className="text-purple-400" /> Public Hosted Portfolio URL
                </label>
                <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-xs text-purple-300 font-mono flex-1 truncate">{publicShareUrl}</span>
                  <button
                    onClick={() => handleCopyLink(publicShareUrl, 'public')}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 transition-all"
                  >
                    {copiedType === 'public' ? <Check size={14} /> : <Copy size={14} />}
                    {copiedType === 'public' ? 'Copied!' : 'Copy Public Link'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Case Study Detail Modal */}
      <ProjectDetailModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};
