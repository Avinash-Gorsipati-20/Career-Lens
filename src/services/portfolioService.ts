import { PortfolioTemplateDef, PortfolioThemeDef, PortfolioTemplateId, PortfolioThemeId } from '../types/portfolio';

export const PORTFOLIO_TEMPLATES: PortfolioTemplateDef[] = [
  { id: 'minimal', name: 'Minimalist Grid', description: 'Clean whitespace, elegant typography grid focus', badge: 'Sleek' },
  { id: 'modern', name: 'Modern Dual', description: 'Two-column hero header with modern card layouts', badge: 'Popular' },
  { id: 'developer', name: 'Developer Light', description: 'Clean repository lists, tech stack badges, and live demo links', badge: 'Engineering' },
  { id: 'dark-developer', name: 'Dark Cyber Developer', description: 'Neon accents, terminal badge styling, interactive case studies', badge: 'Trending' },
  { id: 'terminal', name: 'CLI Terminal', description: 'Command-line interface feel with monospace prompt outputs', badge: 'Hacker' },
  { id: 'creative', name: 'Creative Studio', description: 'Asymmetrical grid layout with dynamic floating media cards', badge: 'Design' },
  { id: 'corporate', name: 'Corporate Enterprise', description: 'Structured authority, formal sections, and executive summary', badge: 'Enterprise' },
  { id: 'academic', name: 'Academic Research', description: 'Publication emphasis, citations, and research credentials', badge: 'Scholar' },
  { id: 'editorial', name: 'Editorial Magazine', description: 'High-contrast editorial typography and longform storytelling', badge: 'Journal' },
  { id: 'project-focused', name: 'Project Case Study', description: 'Showcase-first layout highlighting deep architecture details', badge: 'Showcase' },
  { id: 'timeline', name: 'Career Timeline', description: 'Sequential career progression story with timeline milestones', badge: 'Story' },
  { id: 'ai-tech', name: 'AI Neural Node', description: 'Glowing neural network nodes, model tags, and AI metrics', badge: 'AI & ML' },
  { id: 'data-science', name: 'Data & Analytics', description: 'Metric badges, analytical charts, and data pipeline case studies', badge: 'Data' },
  { id: 'executive-leader', name: 'Executive Leader', description: 'Metric hero banner, corporate endorsements, and leadership stats', badge: 'Executive' },
  { id: 'glass-modern', name: 'Glassmorphism', description: 'Frosted glass panels with vivid background glowing gradients', badge: 'Modern' }
];

export const PORTFOLIO_THEMES: PortfolioThemeDef[] = [
  { id: 'slate', name: 'Slate Gray', bgClass: 'bg-slate-950', cardClass: 'bg-slate-900/90', textClass: 'text-slate-100', accentClass: 'text-cyan-400', borderClass: 'border-slate-800', badgeClass: 'bg-slate-800 text-slate-200 border-slate-700' },
  { id: 'monochrome', name: 'Monochrome Stark', bgClass: 'bg-black', cardClass: 'bg-zinc-900/90', textClass: 'text-zinc-100', accentClass: 'text-zinc-300', borderClass: 'border-zinc-700', badgeClass: 'bg-zinc-800 text-zinc-100 border-zinc-600' },
  { id: 'dark-cyber', name: 'Dark Cyber Matrix', bgClass: 'bg-[#020b14]', cardClass: 'bg-[#06182c]', textClass: 'text-cyan-100', accentClass: 'text-cyan-400', borderClass: 'border-cyan-500/40', badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50' },
  { id: 'crisp-light', name: 'Crisp White Light', bgClass: 'bg-slate-100', cardClass: 'bg-white', textClass: 'text-slate-900', accentClass: 'text-blue-600', borderClass: 'border-slate-250 border-slate-300', badgeClass: 'bg-blue-50 text-blue-800 border-blue-200' },
  { id: 'cyberpunk-neon', name: 'Cyberpunk Neon', bgClass: 'bg-[#14001c]', cardClass: 'bg-[#290038]', textClass: 'text-fuchsia-100', accentClass: 'text-fuchsia-400', borderClass: 'border-fuchsia-500/50', badgeClass: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40' },
  { id: 'ai-cyan', name: 'AI Electric Cyan', bgClass: 'bg-[#011627]', cardClass: 'bg-[#0b2942]', textClass: 'text-cyan-100', accentClass: 'text-cyan-300', borderClass: 'border-cyan-400/40', badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' },
  { id: 'deep-tech', name: 'Deep Tech Indigo', bgClass: 'bg-[#090a1f]', cardClass: 'bg-[#15173d]', textClass: 'text-indigo-100', accentClass: 'text-indigo-400', borderClass: 'border-indigo-500/40', badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40' },
  { id: 'gaming-emerald', name: 'Gaming Emerald', bgClass: 'bg-[#021c10]', cardClass: 'bg-[#073620]', textClass: 'text-emerald-100', accentClass: 'text-emerald-400', borderClass: 'border-emerald-500/40', badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' },
  { id: 'warm-amber', name: 'Warm Amber Gold', bgClass: 'bg-[#1f140a]', cardClass: 'bg-[#332213]', textClass: 'text-amber-100', accentClass: 'text-amber-400', borderClass: 'border-amber-600/40', badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { id: 'matcha-nature', name: 'Matcha Forest', bgClass: 'bg-[#0c1c11]', cardClass: 'bg-[#16331f]', textClass: 'text-emerald-100', accentClass: 'text-emerald-400', borderClass: 'border-emerald-700/50', badgeClass: 'bg-emerald-800/40 text-emerald-200 border-emerald-600/50' },
  { id: 'sunset-crimson', name: 'Sunset Crimson', bgClass: 'bg-[#1f050b]', cardClass: 'bg-[#380b15]', textClass: 'text-rose-100', accentClass: 'text-rose-400', borderClass: 'border-rose-500/40', badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-400/40' },
  { id: 'royal-indigo', name: 'Royal Violet Indigo', bgClass: 'bg-[#13072b]', cardClass: 'bg-[#261052]', textClass: 'text-violet-100', accentClass: 'text-violet-400', borderClass: 'border-violet-500/40', badgeClass: 'bg-violet-500/20 text-violet-300 border-violet-400/40' },
  { id: 'ocean-teal', name: 'Ocean Deep Teal', bgClass: 'bg-[#031d24]', cardClass: 'bg-[#093947]', textClass: 'text-teal-100', accentClass: 'text-teal-300', borderClass: 'border-teal-500/40', badgeClass: 'bg-teal-500/20 text-teal-300 border-teal-400/40' },
  { id: 'midnight-violet', name: 'Midnight Lavender', bgClass: 'bg-[#170529]', cardClass: 'bg-[#2d0b52]', textClass: 'text-purple-100', accentClass: 'text-purple-300', borderClass: 'border-purple-500/40', badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-400/40' },
  { id: 'corporate-navy', name: 'Corporate Deep Navy', bgClass: 'bg-[#0a192f]', cardClass: 'bg-[#112240]', textClass: 'text-blue-100', accentClass: 'text-blue-400', borderClass: 'border-blue-500/40', badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-400/40' },
  { id: 'academic-bronze', name: 'Academic Bronze', bgClass: 'bg-[#261d15]', cardClass: 'bg-[#3b2d20]', textClass: 'text-amber-100', accentClass: 'text-amber-400', borderClass: 'border-amber-700/50', badgeClass: 'bg-amber-800/40 text-amber-200 border-amber-600/50' },
  { id: 'architecture-neutral', name: 'Architecture Sand Light', bgClass: 'bg-[#f4efe6]', cardClass: 'bg-[#e5dccb]', textClass: 'text-stone-900', accentClass: 'text-amber-900', borderClass: 'border-stone-400', badgeClass: 'bg-stone-300 text-stone-900 border-stone-400' },
  { id: 'glass-frost', name: 'Glassmorphism Frost', bgClass: 'bg-gradient-to-br from-[#0c001f] via-[#1a0038] to-[#0c001f]', cardClass: 'bg-purple-900/30 backdrop-blur-xl', textClass: 'text-purple-100', accentClass: 'text-pink-400', borderClass: 'border-purple-500/30', badgeClass: 'bg-purple-500/20 text-pink-300 border-pink-500/40' },
  { id: 'velvet-rose', name: 'Velvet Pink', bgClass: 'bg-[#240816]', cardClass: 'bg-[#47112c]', textClass: 'text-pink-100', accentClass: 'text-pink-300', borderClass: 'border-pink-500/40', badgeClass: 'bg-pink-500/20 text-pink-300 border-pink-400/40' },
  { id: 'swiss-high-contrast', name: 'Swiss Asymmetric Light', bgClass: 'bg-slate-100', cardClass: 'bg-white', textClass: 'text-slate-950', accentClass: 'text-red-600', borderClass: 'border-slate-900', badgeClass: 'bg-slate-950 text-white border-slate-900' }
];

export const getPortfolioTemplate = (id: PortfolioTemplateId): PortfolioTemplateDef => {
  return PORTFOLIO_TEMPLATES.find(t => t.id === id) || PORTFOLIO_TEMPLATES[0];
};

export const getPortfolioTheme = (id: PortfolioThemeId): PortfolioThemeDef => {
  return PORTFOLIO_THEMES.find(t => t.id === id) || PORTFOLIO_THEMES[0];
};
