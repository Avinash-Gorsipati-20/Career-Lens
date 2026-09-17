import { ResumeData } from '../types/resume';

export interface PortfolioSchema {
  hero: {
    name: string;
    tagline: string;
    bio: string;
    socials: { linkedin: string; github: string; portfolio: string };
  };
  projects: Array<{
    title: string;
    description: string;
    techStack: string[];
    github: string;
    demo: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  experienceTimeline: Array<{
    role: string;
    company: string;
    period: string;
    bullets: string[];
  }>;
}

/**
 * Portfolio Website Generator Integration Endpoint
 * Teammates developing the Portfolio Generator module consume this output payload directly.
 */
export const portfolioIntegration = {
  /**
   * Transforms raw ResumeData into structure ready for Portfolio Generator
   */
  generatePortfolioPayload: (data: ResumeData): PortfolioSchema => {
    // Group skills by category
    const skillsGrouped = data.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill.name);
      return acc;
    }, {} as Record<string, string[]>);

    const skillList = Object.entries(skillsGrouped).map(([category, items]) => ({
      category,
      items
    }));

    return {
      hero: {
        name: data.personal.fullName,
        tagline: data.personal.title,
        bio: data.summary,
        socials: {
          linkedin: data.personal.linkedin,
          github: data.personal.github,
          portfolio: data.personal.portfolio
        }
      },
      projects: data.projects.map(p => ({
        title: p.name,
        description: p.description,
        techStack: p.technologies,
        github: p.githubLink,
        demo: p.liveDemo
      })),
      skills: skillList,
      experienceTimeline: data.experience.map(e => ({
        role: e.role,
        company: e.company,
        period: e.duration,
        bullets: e.description.split('\n').filter(Boolean)
      }))
    };
  }
};
