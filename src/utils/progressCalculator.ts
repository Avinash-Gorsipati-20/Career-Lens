import { ResumeData } from '../types/resume';

export interface SectionStatus {
  id: string;
  name: string;
  isComplete: boolean;
  weight: number;
}

export const calculateProgress = (data: ResumeData) => {
  const sections: SectionStatus[] = [
    {
      id: 'personal',
      name: 'Personal Info',
      isComplete: Boolean(data.personal.fullName && data.personal.email && data.personal.phone),
      weight: 20
    },
    {
      id: 'summary',
      name: 'Summary',
      isComplete: Boolean(data.summary && data.summary.trim().length > 20),
      weight: 15
    },
    {
      id: 'education',
      name: 'Education',
      isComplete: data.education.length > 0 && Boolean(data.education[0].institution && data.education[0].degree),
      weight: 15
    },
    {
      id: 'skills',
      name: 'Skills',
      isComplete: data.skills.length >= 3,
      weight: 15
    },
    {
      id: 'experience',
      name: 'Experience',
      isComplete: data.experience.length > 0 && Boolean(data.experience[0].company && data.experience[0].role),
      weight: 15
    },
    {
      id: 'projects',
      name: 'Projects',
      isComplete: data.projects.length > 0 && Boolean(data.projects[0].name && data.projects[0].description),
      weight: 10
    },
    {
      id: 'extras',
      name: 'Certifications & Extras',
      isComplete: data.certifications.length > 0 || data.achievements.length > 0 || data.languages.length > 0,
      weight: 10
    }
  ];

  const completedWeight = sections.reduce((acc, curr) => acc + (curr.isComplete ? curr.weight : 0), 0);
  const totalProgress = Math.min(100, Math.round(completedWeight));

  return {
    totalProgress,
    sections
  };
};
