import { ResumeData } from './resume';

export interface XAiSuggestion {
  id: string;
  section: 'summary' | 'skills' | 'projects' | 'experience';
  title: string;
  whatChanged: string;
  why: string;
  evidence: string;
  isExistingSkill: boolean;
  actionType: 'reorder' | 'emphasize' | 'rephrase' | 'skill_gap';
  status: 'pending' | 'accepted' | 'rejected';
  suggestedText?: string;
  suggestedSkills?: string[];
  suggestedProjectIds?: string[];
}

export interface TargetedResumeVariant {
  id: string;
  userId: string;
  title: string; // e.g. "Java Developer Resume"
  targetRole: string;
  jobDescription?: string;
  customSummary?: string;
  emphasizedSkills: string[];
  projectOrder: string[];
  acceptedSuggestionIds: string[];
  templateId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TargetRoleRequirement {
  roleTitle: string;
  category: string;
  keySkills: string[];
  niceToHaveSkills: string[];
  expectedExperience: string;
  sampleDescription: string;
}
