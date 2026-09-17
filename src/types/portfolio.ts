export type PortfolioTemplateId =
  | 'minimal'
  | 'modern'
  | 'developer'
  | 'dark-developer'
  | 'terminal'
  | 'creative'
  | 'corporate'
  | 'academic'
  | 'editorial'
  | 'project-focused'
  | 'timeline'
  | 'ai-tech'
  | 'data-science'
  | 'executive-leader'
  | 'glass-modern';

export type PortfolioThemeId =
  | 'slate'
  | 'monochrome'
  | 'dark-cyber'
  | 'crisp-light'
  | 'cyberpunk-neon'
  | 'ai-cyan'
  | 'deep-tech'
  | 'gaming-emerald'
  | 'warm-amber'
  | 'matcha-nature'
  | 'sunset-crimson'
  | 'royal-indigo'
  | 'ocean-teal'
  | 'midnight-violet'
  | 'corporate-navy'
  | 'academic-bronze'
  | 'architecture-neutral'
  | 'glass-frost'
  | 'velvet-rose'
  | 'swiss-high-contrast';

export interface PortfolioTemplateDef {
  id: PortfolioTemplateId;
  name: string;
  description: string;
  badge: string;
}

export interface PortfolioThemeDef {
  id: PortfolioThemeId;
  name: string;
  bgClass: string;
  cardClass: string;
  textClass: string;
  accentClass: string;
  borderClass: string;
  badgeClass: string;
}
