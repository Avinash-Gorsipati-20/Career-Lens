export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  portfolio: string;
  profilePhoto?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  branch: string;
  cgpa: string;
  startYear: string;
  endYear: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Programming' | 'Web' | 'Database' | 'DevOps & Cloud' | 'AI & Data' | 'Frameworks' | 'Tools & Software' | 'Soft Skills' | 'Other';
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience?: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  achievements?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveDemo: string;
  problemStatement?: string;
  solution?: string;
  userRole?: string;
  challenges?: string;
  results?: string;
  screenshots?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
}

export interface Interest {
  id: string;
  name: string;
}

/**
 * MASTER PROFESSIONAL PROFILE / RESUME DATA MODEL
 * This single unified object is passed directly to all Templates,
 * Portfolio Generator, AI Enhancer, Career AI, and Storage services.
 */
export interface ResumeData {
  id?: string;
  userId?: string;
  personal: PersonalInfo;
  summary: string;
  education: Education[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  languages: Language[];
  interests: Interest[];
  updatedAt?: string;
}

export type TemplateId = 'modern' | 'ats' | 'professional' | 'minimal' | 'creative' | 'elegant' | 'tech' | 'executive' | 'compact' | 'split' | 'nordic' | 'gradient' | 'matrix' | 'swiss';

export interface TemplateMetadata {
  id: TemplateId;
  name: string;
  description: string;
  badge?: string;
  accentColor: string;
  thumbnail: string;
}

export interface ValidationErrors {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  fullName?: string;
  title?: string;
  duplicateSkills?: string[];
  [key: string]: string | string[] | undefined;
}
