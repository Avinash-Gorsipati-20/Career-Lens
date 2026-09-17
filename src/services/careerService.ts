import { ResumeData } from '../types/resume';
import { JobRoleRequirement, CareerMatchResult } from '../types/career';

export type { CareerMatchResult };

export const CAREER_ROLES_DATABASE: JobRoleRequirement[] = [
  {
    id: 'fullstack-dev',
    title: 'Full Stack Web Developer',
    category: 'Full Stack',
    description: 'Build complete end-to-end web applications combining modern frontend frameworks with robust backend APIs and database architecture.',
    averageSalary: '$95,000 - $140,000',
    demandLevel: 'Very High',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'REST APIs', 'PostgreSQL', 'HTML/CSS', 'Git'],
    niceToHaveSkills: ['TypeScript', 'Docker', 'GraphQL', 'Tailwind CSS', 'Next.js'],
    minimumProjects: 2
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Engineer',
    category: 'Frontend',
    description: 'Design and build intuitive, responsive, high-performance user interfaces and interactive web experiences.',
    averageSalary: '$85,000 - $130,000',
    demandLevel: 'Very High',
    requiredSkills: ['JavaScript', 'React', 'HTML/CSS', 'TypeScript', 'Tailwind CSS', 'Git'],
    niceToHaveSkills: ['Next.js', 'Vue.js', 'Redux', 'Web Vitals', 'Testing Library'],
    minimumProjects: 2
  },
  {
    id: 'backend-dev',
    title: 'Backend Software Engineer',
    category: 'Backend',
    description: 'Architect scalable backend microservices, database schemas, authentication systems, and cloud API infrastructures.',
    averageSalary: '$90,000 - $145,000',
    demandLevel: 'Very High',
    requiredSkills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs', 'System Design', 'Git'],
    niceToHaveSkills: ['Docker', 'Redis', 'Kubernetes', 'AWS', 'Microservices'],
    minimumProjects: 2
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI & Machine Learning Engineer',
    category: 'Data & AI',
    description: 'Train machine learning models, build LLM powered tools, create predictive data pipelines, and deploy AI APIs.',
    averageSalary: '$110,000 - $165,000',
    demandLevel: 'Very High',
    requiredSkills: ['Python', 'PyTorch', 'Scikit-Learn', 'TensorFlow', 'Data Science', 'SQL'],
    niceToHaveSkills: ['LangChain', 'OpenAI API', 'Pandas', 'FastAPI', 'MLOps'],
    minimumProjects: 2
  },
  {
    id: 'devops-engineer',
    title: 'DevOps & Cloud Infrastructure Engineer',
    category: 'DevOps & Cloud',
    description: 'Automate CI/CD pipelines, manage Kubernetes clusters, enforce cloud security, and maintain 99.99% uptime.',
    averageSalary: '$100,000 - $155,000',
    demandLevel: 'High',
    requiredSkills: ['Docker', 'AWS', 'Linux', 'CI/CD Pipelines', 'Git', 'Bash Scripting'],
    niceToHaveSkills: ['Kubernetes', 'Terraform', 'Prometheus', 'Python', 'Nginx'],
    minimumProjects: 1
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst & Business Intelligence Specialist',
    category: 'Data & AI',
    description: 'Transform complex raw business datasets into actionable strategic dashboards, SQL queries, and statistical reports.',
    averageSalary: '$75,000 - $115,000',
    demandLevel: 'High',
    requiredSkills: ['Python', 'SQL', 'Data Visualization', 'Pandas', 'Excel'],
    niceToHaveSkills: ['PowerBI', 'Tableau', 'R', 'Statistics', 'BigQuery'],
    minimumProjects: 1
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Developer (iOS / Android)',
    category: 'Mobile',
    description: 'Develop high-performance native or cross-platform mobile applications for smartphones and wearable devices.',
    averageSalary: '$85,000 - $135,000',
    demandLevel: 'High',
    requiredSkills: ['React Native', 'JavaScript', 'REST APIs', 'Mobile UI/UX', 'Git'],
    niceToHaveSkills: ['Flutter', 'Swift', 'Kotlin', 'Firebase', 'App Store Deployment'],
    minimumProjects: 1
  },
  {
    id: 'security-engineer',
    title: 'Cybersecurity & Application Security Engineer',
    category: 'Security',
    description: 'Protect applications against security vulnerabilities, conduct penetration tests, and enforce zero-trust authentication.',
    averageSalary: '$105,000 - $160,000',
    demandLevel: 'Very High',
    requiredSkills: ['Linux', 'Network Security', 'Python', 'OWASP Top 10', 'Authentication'],
    niceToHaveSkills: ['Penetration Testing', 'Cryptography', 'Docker Security', 'Wireshark'],
    minimumProjects: 1
  }
];

export const analyzeCareerMatch = (data: ResumeData): CareerMatchResult[] => {
  const userSkillNames = data.skills.map(s => s.name.toLowerCase());
  const userProjectTechs = data.projects.flatMap(p => p.technologies.map(t => t.toLowerCase()));
  const allUserSkills = Array.from(new Set([...userSkillNames, ...userProjectTechs]));

  return CAREER_ROLES_DATABASE.map(role => {
    const requiredMatches = role.requiredSkills.filter(req => 
      allUserSkills.some(usr => usr.includes(req.toLowerCase()) || req.toLowerCase().includes(usr))
    );

    const missingRequired = role.requiredSkills.filter(req => !requiredMatches.includes(req));

    const niceToHaveMatches = role.niceToHaveSkills.filter(nice => 
      allUserSkills.some(usr => usr.includes(nice.toLowerCase()) || nice.toLowerCase().includes(usr))
    );

    const projectBonus = Math.min(data.projects.length * 5, 15);
    const expBonus = Math.min(data.experience.length * 10, 20);

    const baseScore = (requiredMatches.length / role.requiredSkills.length) * 65;
    const bonusScore = (niceToHaveMatches.length / role.niceToHaveSkills.length) * 15;
    
    let totalScore = Math.round(baseScore + bonusScore + projectBonus + expBonus);
    if (totalScore > 98) totalScore = 98;
    if (totalScore < 15) totalScore = 15;

    // Explainable AI Generation
    const whyThisRole: string[] = [];
    if (requiredMatches.length > 0) {
      whyThisRole.push(`You already possess key core skills: ${requiredMatches.slice(0, 4).join(', ')}.`);
    }
    if (data.projects.length > 0) {
      whyThisRole.push(`You have ${data.projects.length} documented project(s) demonstrating hands-on technology implementation.`);
    }
    if (data.experience.length > 0) {
      whyThisRole.push(`Your professional experience as "${data.experience[0].role}" provides practical industry domain context.`);
    }
    if (whyThisRole.length === 0) {
      whyThisRole.push('Based on your educational background and foundational skills.');
    }

    const whatIsMissing: string[] = missingRequired.length > 0
      ? [`Missing essential skills for this position: ${missingRequired.slice(0, 4).join(', ')}.`]
      : ['No critical core skills missing, but mastering advanced toolings will strengthen your candidate profile.'];

    const whyLearnThese: string[] = missingRequired.map(s => 
      `${s} is heavily demanded by top employers hiring for ${role.title} positions to build production systems.`
    );

    const evidence = [
      ...requiredMatches.map(m => `Proven Skill: ${m}`),
      ...data.projects.slice(0, 2).map(p => `Relevant Project: "${p.name}"`),
    ];

    const confidence: 'High' | 'Medium' | 'Low' = totalScore >= 75 ? 'High' : totalScore >= 50 ? 'Medium' : 'Low';

    return {
      id: role.id,
      roleId: role.id,
      roleTitle: role.title,
      category: role.category,
      description: role.description,
      averageSalary: role.averageSalary,
      matchScore: totalScore,
      matchingSkills: requiredMatches,
      missingSkills: missingRequired,
      relevantProjectsCount: data.projects.length,
      explanation: {
        whyThisRole,
        whatIsMissing,
        whyLearnThese,
        confidence,
        evidence
      }
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
};
