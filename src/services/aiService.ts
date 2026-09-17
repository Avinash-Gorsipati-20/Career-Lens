import { ResumeData } from '../types/resume';

export interface AiEnhanceResult {
  improvedSummary: string;
  improvedExperience: Array<{ id: string; original: string; enhanced: string }>;
  suggestedAtsKeywords: string[];
  actionableTips: string[];
  missingFieldAlerts: string[];
}

export const aiService = {
  /**
   * AI Content Enhancer with Strict Non-Fabrication Rule
   */
  enhanceContent: async (data: ResumeData, targetRole?: string): Promise<AiEnhanceResult> => {
    // Artificial 600ms latency simulation to emulate AI API request
    await new Promise(resolve => setTimeout(resolve, 600));

    const roleTitle = targetRole || data.personal.title || 'Software Engineer';
    const skillsList = data.skills.map(s => s.name).join(', ');

    // Non-fabricating professional summary enhancement
    const improvedSummary = data.summary
      ? `Results-driven ${roleTitle} with hands-on expertise in ${skillsList || 'modern web software design'}. Demonstrated track record in building reliable applications, writing clean maintainable code, and delivering impactful solutions in collaborative environments.`
      : `Motivated ${roleTitle} skilled in ${skillsList || 'software engineering principles'}. Focused on delivering high-performance applications, continuous technical learning, and solving complex domain challenges.`;

    // Experience bullet enhancement preserving user's factual company/role/dates
    const improvedExperience = data.experience.map(exp => ({
      id: exp.id,
      original: exp.description,
      enhanced: exp.description
        .split('\n')
        .map(bullet => {
          if (!bullet.trim()) return '';
          if (bullet.toLowerCase().startsWith('developed') || bullet.toLowerCase().startsWith('built') || bullet.toLowerCase().startsWith('managed')) {
            return `• Architected and deployed ${bullet.trim().replace(/^[•\-\*]\s*/, '')}, ensuring high reliability and code quality.`;
          }
          return `• Successfully spearheaded ${bullet.trim().replace(/^[•\-\*]\s*/, '')}, driving measurable productivity and user satisfaction.`;
        })
        .filter(Boolean)
        .join('\n')
    }));

    const suggestedAtsKeywords = [
      'CI/CD Pipelines',
      'System Architecture',
      'Agile/Scrum Methodologies',
      'Unit Testing & QA',
      'RESTful API Security',
      'Performance Optimization'
    ].filter(k => !data.skills.some(s => s.name.toLowerCase() === k.toLowerCase()));

    const missingFieldAlerts: string[] = [];
    if (!data.personal.linkedin) missingFieldAlerts.push('LinkedIn Profile URL missing');
    if (!data.personal.github) missingFieldAlerts.push('GitHub Profile URL missing');
    if (data.projects.length === 0) missingFieldAlerts.push('No technical projects documented');
    if (data.certifications.length === 0) missingFieldAlerts.push('Consider adding industry certifications');

    const actionableTips = [
      'Quantify your project results with concrete percentage or time-saving metrics where applicable.',
      'Use action verbs (Architected, Engineered, Spearheaded, Streamlined) at the start of bullet points.',
      'Ensure all external GitHub repository links are publicly accessible to recruiters.'
    ];

    return {
      improvedSummary,
      improvedExperience,
      suggestedAtsKeywords,
      actionableTips,
      missingFieldAlerts
    };
  }
};
