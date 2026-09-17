import { ResumeData } from '../types/resume';
import { XAiSuggestion, TargetedResumeVariant, TargetRoleRequirement } from '../types/targetedResume';

export const TARGET_ROLE_PRESETS: TargetRoleRequirement[] = [
  {
    roleTitle: 'Software Engineer',
    category: 'Engineering',
    keySkills: ['Data Structures', 'Algorithms', 'System Design', 'Git', 'Problem Solving', 'OOP'],
    niceToHaveSkills: ['Docker', 'CI/CD', 'AWS', 'Unit Testing'],
    expectedExperience: 'Mid to Senior',
    sampleDescription: 'Seeking a Software Engineer to design, build, and optimize scalable applications.'
  },
  {
    roleTitle: 'Java Developer',
    category: 'Backend',
    keySkills: ['Java', 'Spring Boot', 'SQL', 'REST APIs', 'Hibernate', 'Maven/Gradle'],
    niceToHaveSkills: ['JUnit', 'Microservices', 'Docker', 'Kafka', 'PostgreSQL'],
    expectedExperience: 'Backend Specialist',
    sampleDescription: 'Looking for a Java Developer proficient in Spring Boot, REST APIs, microservices, and database tuning.'
  },
  {
    roleTitle: 'Frontend Developer',
    category: 'Web',
    keySkills: ['React', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'Tailwind CSS', 'State Management'],
    niceToHaveSkills: ['Next.js', 'Web Vitals', 'Testing (Jest/Cypress)', 'GraphQL'],
    expectedExperience: 'UI/UX Specialist',
    sampleDescription: 'Front-End Engineer with expertise in modern React, responsive UI design, and web performance optimization.'
  },
  {
    roleTitle: 'Full Stack Developer',
    category: 'Web',
    keySkills: ['React', 'Node.js', 'Express', 'TypeScript', 'MongoDB/PostgreSQL', 'REST APIs'],
    niceToHaveSkills: ['Docker', 'AWS', 'Redis', 'GraphQL', 'Tailwind CSS'],
    expectedExperience: 'End-to-End Specialist',
    sampleDescription: 'Full Stack Engineer capable of building responsive UIs and robust REST APIs using React and Node.js.'
  },
  {
    roleTitle: 'Machine Learning Engineer',
    category: 'Data & AI',
    keySkills: ['Python', 'PyTorch', 'Scikit-Learn', 'TensorFlow', 'Data Preprocessing', 'ML Models'],
    niceToHaveSkills: ['LangChain', 'FastAPI', 'Pandas', 'MLOps', 'Vector Databases'],
    expectedExperience: 'AI Specialist',
    sampleDescription: 'ML Engineer to train predictive models, deploy inference APIs, and integrate LLM features.'
  },
  {
    roleTitle: 'Data Analyst',
    category: 'Data & AI',
    keySkills: ['SQL', 'Python', 'Pandas', 'Data Visualization', 'Excel', 'Statistics'],
    niceToHaveSkills: ['PowerBI', 'Tableau', 'BigQuery', 'A/B Testing'],
    expectedExperience: 'Analytics Specialist',
    sampleDescription: 'Analyze complex datasets, generate BI dashboards, and present actionable business insights.'
  },
  {
    roleTitle: 'DevOps Engineer',
    category: 'DevOps & Cloud',
    keySkills: ['Docker', 'AWS', 'Linux', 'CI/CD Pipelines', 'Git', 'Bash Scripting'],
    niceToHaveSkills: ['Kubernetes', 'Terraform', 'Prometheus', 'Python', 'Nginx'],
    expectedExperience: 'Cloud Infrastructure',
    sampleDescription: 'DevOps Engineer to automate CI/CD deployments, manage cloud clusters, and enforce security compliance.'
  },
  {
    roleTitle: 'Cybersecurity Analyst',
    category: 'Security',
    keySkills: ['Network Security', 'Ethical Hacking', 'Linux', 'Vulnerability Assessment', 'Cryptography'],
    niceToHaveSkills: ['Wireshark', 'Metasploit', 'SIEM tools', 'Python'],
    expectedExperience: 'Security Operations',
    sampleDescription: 'Identify security threats, conduct vulnerability scans, and implement defensive security controls.'
  }
];

export const targetedResumeService = {
  /**
   * Generates Explainable AI Suggestions for a Target Job Role vs Master Profile
   */
  generateSuggestions(
    profile: ResumeData,
    targetRole: string,
    jobDescriptionText?: string
  ): { suggestions: XAiSuggestion[]; matchedSkills: string[]; missingSkills: string[] } {
    const suggestions: XAiSuggestion[] = [];
    const userSkillNames = profile.skills.map(s => s.name.toLowerCase());

    // Find preset or extract terms from custom JD
    const matchedPreset = TARGET_ROLE_PRESETS.find(
      r => r.roleTitle.toLowerCase() === targetRole.toLowerCase()
    );

    const requiredSkills = matchedPreset
      ? matchedPreset.keySkills
      : ['Problem Solving', 'Git', 'System Architecture', 'Communication'];

    const matchedSkills = requiredSkills.filter(req =>
      userSkillNames.some(us => us.includes(req.toLowerCase()))
    );

    const missingSkills = requiredSkills.filter(req =>
      !userSkillNames.some(us => us.includes(req.toLowerCase()))
    );

    // 1. Summary Suggestion
    if (profile.summary) {
      suggestions.push({
        id: 'sug-summary-1',
        section: 'summary',
        title: `Tailor Summary for ${targetRole}`,
        whatChanged: `Emphasize ${targetRole} focus and key competencies (${matchedSkills.slice(0, 3).join(', ') || targetRole}).`,
        why: `Recruiters & ATS scanning for ${targetRole} prioritize candidate summaries mentioning target role keywords in the first 2 sentences.`,
        evidence: `Your profile already contains relevant skills: ${matchedSkills.join(', ') || 'technical fundamentals'}.`,
        isExistingSkill: true,
        actionType: 'rephrase',
        status: 'pending',
        suggestedText: `Results-driven ${targetRole} with proven expertise in ${matchedSkills.join(', ') || targetRole}. Experienced in building scalable applications, collaborative problem solving, and delivering robust solutions.`
      });
    }

    // 2. Skills Reorder Suggestion
    if (matchedSkills.length > 0) {
      suggestions.push({
        id: 'sug-skills-1',
        section: 'skills',
        title: `Prioritize Target Role Skills (${matchedSkills.join(', ')})`,
        whatChanged: `Move target skills (${matchedSkills.join(', ')}) to the top of the skills section.`,
        why: `ATS parsers assign higher relevance weights to skills that appear near the top of the skills inventory.`,
        evidence: `Matches ${matchedSkills.length} required skill keywords for ${targetRole}.`,
        isExistingSkill: true,
        actionType: 'reorder',
        status: 'pending',
        suggestedSkills: matchedSkills
      });
    }

    // 3. Projects Prioritization
    const relevantProjects = profile.projects.filter(p =>
      matchedSkills.some(sk =>
        p.description.toLowerCase().includes(sk.toLowerCase()) ||
        p.technologies.some(t => t.toLowerCase().includes(sk.toLowerCase()))
      )
    );

    if (relevantProjects.length > 0) {
      suggestions.push({
        id: 'sug-proj-1',
        section: 'projects',
        title: `Highlight Relevant Project: ${relevantProjects[0].name}`,
        whatChanged: `Move project "${relevantProjects[0].name}" to the #1 featured project position.`,
        why: `This project directly uses technologies (${relevantProjects[0].technologies.join(', ')}) required for the ${targetRole} role.`,
        evidence: `Project description contains ${targetRole} technology alignment.`,
        isExistingSkill: true,
        actionType: 'reorder',
        status: 'pending',
        suggestedProjectIds: [relevantProjects[0].id]
      });
    }

    // 4. Missing Skill Gap Alert (Crucial Rule: Do NOT invent fake skills)
    if (missingSkills.length > 0) {
      suggestions.push({
        id: 'sug-gap-1',
        section: 'skills',
        title: `Skill Gap Identified: ${missingSkills.slice(0, 3).join(', ')}`,
        whatChanged: `Flagged ${missingSkills.join(', ')} as target role skill gaps.`,
        why: `These skills appear in ${targetRole} job requirements but are not yet present in your master profile.`,
        evidence: `Job requirement check: ${missingSkills.join(', ')}.`,
        isExistingSkill: false,
        actionType: 'skill_gap',
        status: 'pending'
      });
    }

    return { suggestions, matchedSkills, missingSkills };
  },

  /**
   * Generates a Derived Targeted Resume Variant (Master profile remains unchanged!)
   */
  createTargetedVariant(
    masterProfile: ResumeData,
    targetRole: string,
    jobDescription: string,
    acceptedSuggestions: XAiSuggestion[]
  ): TargetedResumeVariant {
    const summarySug = acceptedSuggestions.find(s => s.section === 'summary');
    const customSummary = summarySug?.suggestedText || masterProfile.summary;

    const emphasizedSkills = acceptedSuggestions
      .filter(s => s.suggestedSkills)
      .flatMap(s => s.suggestedSkills || []);

    const projectOrder = acceptedSuggestions
      .filter(s => s.suggestedProjectIds)
      .flatMap(s => s.suggestedProjectIds || []);

    return {
      id: `tr-${Date.now()}`,
      userId: masterProfile.userId || 'usr-default',
      title: `${targetRole} Targeted Resume`,
      targetRole,
      jobDescription,
      customSummary,
      emphasizedSkills,
      projectOrder,
      acceptedSuggestionIds: acceptedSuggestions.map(s => s.id),
      templateId: 'modern',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
};
