import { ResumeData } from '../types/resume';

export interface AtsCategoryScore {
  score: number;
  maxScore: number;
  feedback: string[];
}

export interface JobDescriptionMatch {
  matchedKeywords: string[];
  missingKeywords: string[];
  matchRate: number; // Percentage 0-100
}

export interface AtsScoreResult {
  totalScore: number;
  scoreGrade: 'Excellent' | 'Good' | 'Fair' | 'Needs Improvement';
  categories: {
    contactInfo: AtsCategoryScore;
    contentStructure: AtsCategoryScore;
    impactMetrics: AtsCategoryScore;
    skillsOptimization: AtsCategoryScore;
  };
  jdMatch?: JobDescriptionMatch;
  actionableSuggestions: string[];
}

const ACTION_VERBS = [
  'achieved', 'architected', 'accelerated', 'automated', 'built', 'coached',
  'created', 'designed', 'developed', 'deployed', 'directed', 'engineered',
  'established', 'expanded', 'guided', 'implemented', 'improved', 'increased',
  'initiated', 'integrated', 'launched', 'led', 'managed', 'migrated',
  'negotiated', 'optimized', 'orchestrated', 'overhauled', 'pioneered',
  'produced', 'reduced', 'refactored', 'resolved', 'restructured', 'scaled',
  'spearheaded', 'streamlined', 'transformed', 'upgraded', 'delivered', 'formulated'
];

const METRIC_REGEX = /(\d+%|\$\d+|\d+\s*k\+?|\d+\s*M\+?|\d+\+|\d+\s*ms|\d+\s*users|\d+\s*clients|\d+\s*percent|\d+\s*times|\d+\s*x)/i;

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'if', 'then', 'else', 'when',
  'at', 'by', 'from', 'for', 'with', 'about', 'against', 'between', 'into',
  'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from',
  'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further',
  'then', 'once', 'here', 'there', 'all', 'any', 'both', 'each', 'few',
  'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
  'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'don', 'should',
  'now', 'are', 'was', 'were', 'have', 'has', 'had', 'do', 'does', 'did',
  'be', 'been', 'being', 'this', 'that', 'these', 'those', 'who', 'whom',
  'which', 'what', 'where', 'why', 'how', 'we', 'our', 'you', 'your', 'my'
]);

/**
 * Calculates ATS Compatibility Score and provides actionable feedback.
 */
export function calculateAtsScore(data: ResumeData, jobDescriptionText?: string): AtsScoreResult {
  const suggestions: string[] = [];

  // 1. Contact Information Score (Max 20)
  let contactScore = 0;
  const contactFeedback: string[] = [];

  if (data.personal.fullName?.trim()) contactScore += 4;
  else contactFeedback.push('Add your full name.');

  if (data.personal.title?.trim()) contactScore += 4;
  else contactFeedback.push('Add a clear professional job title (e.g. Senior Software Engineer).');

  if (data.personal.email?.trim()) contactScore += 4;
  else contactFeedback.push('Include a professional email address.');

  if (data.personal.phone?.trim()) contactScore += 4;
  else contactFeedback.push('Include a contact phone number.');

  if (data.personal.linkedin?.trim() || data.personal.github?.trim() || data.personal.portfolio?.trim()) {
    contactScore += 4;
  } else {
    contactFeedback.push('Add at least one professional web link (LinkedIn, GitHub, or Portfolio).');
  }

  // 2. Content & Structure Score (Max 30)
  let structureScore = 0;
  const structureFeedback: string[] = [];

  // Summary check
  const summaryWordCount = data.summary?.trim() ? data.summary.trim().split(/\s+/).length : 0;
  if (summaryWordCount >= 25) {
    structureScore += 6;
  } else if (summaryWordCount > 0) {
    structureScore += 3;
    structureFeedback.push('Expand your summary to 30-60 words highlighting key value.');
  } else {
    structureFeedback.push('Add a concise Professional Summary section.');
  }

  // Work Experience check
  if (data.experience.length >= 2) {
    structureScore += 10;
  } else if (data.experience.length === 1) {
    structureScore += 6;
    structureFeedback.push('Add more work experience or project items if applicable.');
  } else {
    structureFeedback.push('Include your work experience history.');
  }

  // Education check
  if (data.education.length > 0) {
    structureScore += 6;
  } else {
    structureFeedback.push('Add your degree or education credentials.');
  }

  // Projects / Certifications / Achievements check
  if (data.projects.length > 0 || data.certifications.length > 0 || data.achievements.length > 0) {
    structureScore += 8;
  } else {
    structureFeedback.push('Add Technical Projects, Certifications, or Achievements to show proof of skills.');
  }

  // 3. Impact & Action Verbs Score (Max 25)
  let impactScore = 0;
  const impactFeedback: string[] = [];

  const fullText = [
    data.summary,
    ...data.experience.map(e => `${e.role} ${e.description}`),
    ...data.projects.map(p => `${p.name} ${p.description}`)
  ].join(' ').toLowerCase();

  // Action Verbs match count
  const matchedVerbs = ACTION_VERBS.filter(verb => fullText.includes(verb));
  if (matchedVerbs.length >= 5) {
    impactScore += 13;
  } else if (matchedVerbs.length >= 2) {
    impactScore += 8;
    impactFeedback.push(`You used ${matchedVerbs.length} action verbs. Aim for 5+ strong action verbs (e.g. Spearheaded, Engineered, Optimized).`);
  } else {
    impactFeedback.push('Start experience bullet points with strong action verbs like Developed, Managed, Architected, Scaled.');
  }

  // Quantifiable metrics check
  const metricMatches = (fullText.match(METRIC_REGEX) || []).length;
  if (metricMatches >= 3) {
    impactScore += 12;
  } else if (metricMatches >= 1) {
    impactScore += 6;
    impactFeedback.push('Add more quantifiable results (percentages %, revenue $, user counts, speed improvements).');
  } else {
    impactFeedback.push('Include numeric metrics and measurable achievements in your experience (e.g., "Increased sales by 35%").');
  }

  // 4. Skills & Keywords Score (Max 25)
  let skillsScore = 0;
  const skillsFeedback: string[] = [];

  if (data.skills.length >= 8) {
    skillsScore += 25;
  } else if (data.skills.length >= 4) {
    skillsScore += 15;
    skillsFeedback.push(`You have ${data.skills.length} skills listed. Adding 8+ relevant skills boosts ATS keyword matching.`);
  } else if (data.skills.length > 0) {
    skillsScore += 8;
    skillsFeedback.push('Expand your skills section with specific technical tools, frameworks, and core skills.');
  } else {
    skillsFeedback.push('Add skills to your resume.');
  }

  // Calculate Base ATS Score (0 - 100)
  const totalScore = contactScore + structureScore + impactScore + skillsScore;

  // Grade classification
  let scoreGrade: AtsScoreResult['scoreGrade'] = 'Needs Improvement';
  if (totalScore >= 85) scoreGrade = 'Excellent';
  else if (totalScore >= 70) scoreGrade = 'Good';
  else if (totalScore >= 55) scoreGrade = 'Fair';

  // Consolidate suggestions
  suggestions.push(...contactFeedback, ...structureFeedback, ...impactFeedback, ...skillsFeedback);

  // Job Description Matcher (Optional)
  let jdMatch: JobDescriptionMatch | undefined = undefined;
  if (jobDescriptionText && jobDescriptionText.trim().length > 10) {
    // Extract unique keywords from JD
    const rawTokens = jobDescriptionText
      .replace(/[^a-zA-Z0-9+#.\s]/g, ' ')
      .split(/\s+/)
      .map(w => w.trim().toLowerCase())
      .filter(w => w.length >= 3 && !STOP_WORDS.has(w));

    // Get frequency of tokens
    const freqMap: Record<string, number> = {};
    rawTokens.forEach(t => {
      freqMap[t] = (freqMap[t] || 0) + 1;
    });

    // Pick top 15 most frequent unique keywords
    const topJdKeywords = Object.keys(freqMap)
      .sort((a, b) => freqMap[b] - freqMap[a])
      .slice(0, 18);

    const resumeSearchableText = (
      data.personal.title + ' ' +
      data.summary + ' ' +
      data.skills.map(s => s.name).join(' ') + ' ' +
      data.experience.map(e => e.role + ' ' + e.description).join(' ') + ' ' +
      data.projects.map(p => p.name + ' ' + p.description + ' ' + p.technologies.join(' ')).join(' ')
    ).toLowerCase();

    const matchedKeywords = topJdKeywords.filter(kw => resumeSearchableText.includes(kw));
    const missingKeywords = topJdKeywords.filter(kw => !resumeSearchableText.includes(kw));
    const matchRate = Math.round((matchedKeywords.length / (topJdKeywords.length || 1)) * 100);

    jdMatch = {
      matchedKeywords,
      missingKeywords,
      matchRate
    };

    if (missingKeywords.length > 0) {
      suggestions.unshift(`Add missing job keywords to your resume: ${missingKeywords.slice(0, 5).join(', ')}.`);
    }
  }

  return {
    totalScore,
    scoreGrade,
    categories: {
      contactInfo: { score: contactScore, maxScore: 20, feedback: contactFeedback },
      contentStructure: { score: structureScore, maxScore: 30, feedback: structureFeedback },
      impactMetrics: { score: impactScore, maxScore: 25, feedback: impactFeedback },
      skillsOptimization: { score: skillsScore, maxScore: 25, feedback: skillsFeedback }
    },
    jdMatch,
    actionableSuggestions: suggestions
  };
}
