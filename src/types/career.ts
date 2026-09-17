export interface JobRoleRequirement {
  id: string;
  title: string;
  category: 'Frontend' | 'Backend' | 'Full Stack' | 'Data & AI' | 'DevOps & Cloud' | 'Mobile' | 'Design & Product' | 'Security';
  description: string;
  averageSalary: string;
  demandLevel: 'Very High' | 'High' | 'Moderate';
  requiredSkills: string[];
  niceToHaveSkills: string[];
  minimumProjects: number;
}

export interface CareerMatchResult {
  id?: string;
  roleId: string;
  roleTitle: string;
  category: string;
  description?: string;
  averageSalary?: string;
  matchScore: number; // 0 to 100
  matchingSkills: string[];
  missingSkills: string[];
  relevantProjectsCount: number;
  explanation: {
    whyThisRole: string[];
    whatIsMissing: string[];
    whyLearnThese: string[];
    confidence: 'High' | 'Medium' | 'Low';
    evidence: string[];
  };
}

export type SkillGapCategory = 'Already Strong' | 'Developing' | 'Missing' | 'Priority';

export interface SkillGapItem {
  skillName: string;
  category: SkillGapCategory;
  reasoning: string;
  importance: 'Critical' | 'High' | 'Medium';
}

export interface LearningResource {
  title: string;
  type: 'Documentation' | 'Course' | 'Tutorial' | 'Practice' | 'Book' | 'Video';
  url: string;
  provider: string;
  isFree: boolean;
}

export interface LearningRoadmapStep {
  stepNumber: number;
  topic: string;
  description: string;
  targetSkills: string[];
  estimatedWeeks: number;
  prerequisites: string[];
  resources: LearningResource[];
}

export interface CareerAnalysisResult {
  profileId: string;
  matchedRoles: CareerMatchResult[];
  selectedRole?: CareerMatchResult;
  skillGaps: SkillGapItem[];
  roadmap: LearningRoadmapStep[];
  analyzedAt: string;
}
