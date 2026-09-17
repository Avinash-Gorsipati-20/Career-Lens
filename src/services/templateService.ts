import { TemplateMetadata, TemplateId } from '../types/resume';

export const RESUME_TEMPLATES: TemplateMetadata[] = [
  {
    id: 'modern',
    name: 'Modern Tech',
    description: 'Sleek two-column header layout with high readability and modern indigo highlights.',
    badge: 'Popular',
    accentColor: '#3b82f6',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'ats',
    name: 'ATS Friendly',
    description: 'Clean single-column standard formatting optimized for HR parsing software.',
    badge: 'ATS Optimized',
    accentColor: '#1e293b',
    thumbnail: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'professional',
    name: 'Executive Professional',
    description: 'Authoritative traditional design with crisp section borders and classic typography.',
    badge: 'Enterprise',
    accentColor: '#0f172a',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'minimal',
    name: 'Minimalist Clean',
    description: 'Ultra-clean whitespace-focused template letting your experience speak for itself.',
    badge: 'Sleek',
    accentColor: '#475569',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'creative',
    name: 'Creative Developer',
    description: 'Distinctive colored sidebar layout with dynamic skill tags and visual hierarchy.',
    badge: 'Creative',
    accentColor: '#6366f1',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'nordic',
    name: 'Nordic Clean Slate',
    description: 'Scandi minimalist structure with high contrast typography, crisp borders and slate accents.',
    badge: 'New',
    accentColor: '#0f766e',
    thumbnail: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'gradient',
    name: 'Vibrant Startup',
    description: 'Modern tech startup design with subtle header gradient, pill tags, and clean cards.',
    badge: 'Trending',
    accentColor: '#ec4899',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'matrix',
    name: 'Developer Matrix',
    description: 'Monospace tech lead structure with GitHub links, tech stack badges, and terminal accents.',
    badge: 'Engineer',
    accentColor: '#10b981',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'swiss',
    name: 'Swiss Grid Design',
    description: 'Asymmetric Swiss architecture with high hierarchy readability and clean grid alignment.',
    badge: 'Design Focus',
    accentColor: '#dc2626',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'elegant',
    name: 'Serif Elegant',
    description: 'Sophisticated typography layout ideal for senior roles, research & executive profiles.',
    badge: 'Classic',
    accentColor: '#854d0e',
    thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'tech',
    name: 'Silicon Valley Tech',
    description: 'High-tech dark accents, tech stack badges, and GitHub code links for software engineers.',
    badge: 'Developer',
    accentColor: '#0ea5e9',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'executive',
    name: 'Corporate Leader',
    description: 'Gold & navy accent bar, authoritative hierarchy, and leadership achievements spotlight.',
    badge: 'Executive',
    accentColor: '#1e3a8a',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'compact',
    name: 'Compact 1-Page',
    description: 'High-density, space-efficient single page template designed for maximum content.',
    badge: '1-Page',
    accentColor: '#059669',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'split',
    name: 'Modern Split Bar',
    description: 'Dynamic two-column layout with dark left sidebar for skills, contact, & education.',
    badge: 'Modern',
    accentColor: '#7c3aed',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=200'
  }
];

export const getTemplateMetadata = (id: TemplateId): TemplateMetadata => {
  return RESUME_TEMPLATES.find(t => t.id === id) || RESUME_TEMPLATES[0];
};
