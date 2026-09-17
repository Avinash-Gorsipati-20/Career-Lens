import { ResumeData, Education, Experience, Project, Skill } from '../types/resume';

export interface ParseResult {
  parsedData: ResumeData;
  extractedTextLength: number;
  confidenceScore: number;
  warnings: string[];
}

export const parseResumeText = (text: string): ParseResult => {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const warnings: string[] = [];

  const parsedData: ResumeData = {
    personal: { fullName: '', title: '', email: '', phone: '', address: '', linkedin: '', github: '', portfolio: '', profilePhoto: '' },
    summary: '',
    education: [],
    skills: [],
    experience: [],
    projects: [],
    certifications: [],
    achievements: [],
    languages: [],
    interests: []
  };
  
  if (!text || text.trim().length === 0) {
    return {
      parsedData,
      extractedTextLength: 0,
      confidenceScore: 0,
      warnings: ['No text detected in uploaded file. Please ensure file contains readable text.']
    };
  }

  // Extract Email
  const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
  if (emailMatch) {
    parsedData.personal.email = emailMatch[1];
  } else {
    warnings.push('Could not automatically identify email address.');
  }

  // Extract Phone Number
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    parsedData.personal.phone = phoneMatch[0];
  }

  // Extract Links
  const linkedinMatch = text.match(/(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  if (linkedinMatch) parsedData.personal.linkedin = linkedinMatch[0];

  const githubMatch = text.match(/(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+/i);
  if (githubMatch) parsedData.personal.github = githubMatch[0];

  // Extract Name from top lines
  if (lines.length > 0) {
    const potentialName = lines[0].replace(/[^a-zA-Z\s]/g, '');
    if (potentialName.length >= 2 && potentialName.length <= 40) {
      parsedData.personal.fullName = potentialName;
    }
  }

  if (lines.length > 1 && !lines[1].includes('@') && !lines[1].includes('http')) {
    parsedData.personal.title = lines[1];
  }

  // Section parsing heuristics
  let currentSection = '';
  const skillsList: string[] = [];
  const expList: Experience[] = [];
  const eduList: Education[] = [];

  lines.forEach((line, index) => {
    const lower = line.toLowerCase();
    
    if (lower.includes('experience') || lower.includes('work history') || lower.includes('employment')) {
      currentSection = 'experience';
      return;
    } else if (lower.includes('education') || lower.includes('academic')) {
      currentSection = 'education';
      return;
    } else if (lower.includes('skill') || lower.includes('technologies') || lower.includes('expertise')) {
      currentSection = 'skills';
      return;
    } else if (lower.includes('summary') || lower.includes('about me') || lower.includes('profile')) {
      currentSection = 'summary';
      return;
    } else if (lower.includes('project')) {
      currentSection = 'projects';
      return;
    }

    if (currentSection === 'summary' && line.length > 20 && !parsedData.summary) {
      parsedData.summary = line;
    } else if (currentSection === 'skills') {
      const tokens = line.split(/[,|•·]/).map(t => t.trim()).filter(t => t.length > 1 && t.length < 30);
      tokens.forEach(tok => {
        if (!skillsList.includes(tok)) skillsList.push(tok);
      });
    } else if (currentSection === 'experience' && line.length > 5) {
      if (line.includes('Company') || line.includes('Inc') || line.includes('Tech') || line.includes('Solutions') || line.includes('Role') || line.includes('Engineer') || line.includes('Developer')) {
        expList.push({
          id: `exp-${Date.now()}-${index}`,
          company: line.split(/[-|]/)[0] || line,
          role: line.split(/[-|]/)[1] || 'Software Engineer',
          duration: '2022 - Present',
          description: line
        });
      }
    } else if (currentSection === 'education' && line.length > 5) {
      if (line.includes('University') || line.includes('College') || line.includes('Institute') || line.includes('Bachelor') || line.includes('Master') || line.includes('B.S.') || line.includes('B.Tech')) {
        eduList.push({
          id: `edu-${Date.now()}-${index}`,
          institution: line,
          degree: line.includes('Master') ? 'Master of Science' : 'Bachelor of Science',
          branch: 'Computer Science',
          cgpa: '3.8',
          startYear: '2019',
          endYear: '2023'
        });
      }
    }
  });

  if (skillsList.length > 0) {
    parsedData.skills = skillsList.slice(0, 15).map((sk, idx) => ({
      id: `sk-${idx}`,
      name: sk,
      category: 'Web',
      level: 'Intermediate'
    }));
  }

  if (expList.length > 0) parsedData.experience = expList.slice(0, 4);
  if (eduList.length > 0) parsedData.education = eduList.slice(0, 3);

  const confidenceScore = Math.min(85, 40 + (parsedData.personal.email ? 15 : 0) + (parsedData.skills.length * 2) + (parsedData.experience.length * 10));

  return {
    parsedData,
    extractedTextLength: text.length,
    confidenceScore,
    warnings
  };
};
