import { ResumeData, Education, Experience, Project, Skill, Certification, Achievement, Language, Interest } from '../types/resume';

export interface ParseResult {
  parsedData: ResumeData;
  extractedTextLength: number;
  confidenceScore: number;
  warnings: string[];
}

export const parseResumeText = (text: string): ParseResult => {
  const lines = text
    .replace(/\r/g, '\n')
    .split('\n')
    .map(line => line.replace(/[ \t]+/g, ' ').trim())
    .filter(Boolean);
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
    leadershipActivities: [],
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

  const cleanLine = (line: string) => line.replace(/^[•●▪▸\-*]+\s*/, '').trim();
  const isBullet = (line: string) => /^[•●▪▸\-*]/.test(line);
  const sectionFor = (line: string): string | null => {
    const normalized = line.toLowerCase().replace(/[&:|]/g, ' ').replace(/\s+/g, ' ').trim();
    if (/^(summary|professional summary|profile|about me|objective)$/.test(normalized)) return 'summary';
    if (/^(skills?|technical skills|core competencies|technologies|expertise)$/.test(normalized)) return 'skills';
    if (/^(experience|professional experience|work experience|work history|employment)$/.test(normalized)) return 'experience';
    if (/^(education|academic background|qualifications)$/.test(normalized)) return 'education';
    if (/^(projects?|personal projects|academic projects|key technical projects)$/.test(normalized)) return 'projects';
    if (/^(certifications?|certificates?)$/.test(normalized)) return 'certifications';
    if (/^(achievements?|awards?|honors?)$/.test(normalized)) return 'achievements';
    if (/^(leadership activities|leadership|activities|volunteering|volunteer experience|extracurricular activities)$/.test(normalized)) return 'leadership';
    if (/^(languages?|language proficiency)$/.test(normalized)) return 'languages';
    if (/^(interests?|hobbies?)$/.test(normalized)) return 'interests';
    return null;
  };

  const topLines = lines.slice(0, 8);
  const nameLine = topLines.find(line =>
    !line.includes('@') && !/https?:\/\//i.test(line) && !/\d{5,}/.test(line) && /^[a-zA-Z][a-zA-Z .'-]{1,40}$/.test(line)
  );
  if (nameLine) parsedData.personal.fullName = nameLine;
  const titleLine = topLines.find(line => /engineer|developer|designer|analyst|student|manager|intern|specialist|architect/i.test(line) && line !== nameLine);
  if (titleLine) parsedData.personal.title = titleLine;
  else if (topLines[1] && topLines[1] !== nameLine && !topLines[1].includes('@')) parsedData.personal.title = cleanLine(topLines[1]);
  const addressMatch = text.match(/(?:address|location)\s*[:|-]?\s*([^\n]+)/i);
  if (addressMatch) parsedData.personal.address = addressMatch[1].trim();
  const portfolioMatch = text.match(/(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+\.(?:com|dev|me|io)(?:\/[a-z0-9_./-]*)?/i);
  if (portfolioMatch && !/linkedin|github/i.test(portfolioMatch[0])) parsedData.personal.portfolio = portfolioMatch[0];

  const skillsList: string[] = [];
  const expList: Experience[] = [];
  const eduList: Education[] = [];
  const projectList: Project[] = [];
  const certificationList: Certification[] = [];
  const achievementList: Achievement[] = [];
  const leadershipList: Achievement[] = [];
  const languageList: Language[] = [];
  const interestList: Interest[] = [];

  let currentSection = '';
  const sections: Record<string, string[]> = {};
  lines.forEach(line => {
    const section = sectionFor(line);
    if (section) {
      currentSection = section;
      sections[currentSection] ||= [];
    } else if (currentSection) {
      sections[currentSection].push(line);
    }
  });

  const splitTokens = (values: string[]) => values.flatMap(line => cleanLine(line).split(/[,|•·;:]/)).map(value => value.trim()).filter(value => value.length > 1 && value.length < 50);
  splitTokens(sections.skills || []).forEach(skill => { if (!skillsList.some(existing => existing.toLowerCase() === skill.toLowerCase())) skillsList.push(skill); });
  const technologies = (value: string) => value.match(/\b(React(?:\.js)?|Angular|Vue(?:\.js)?|Node\.js|Python|Java|C\+\+|TypeScript|JavaScript|SQL|AWS|Docker|Firebase|MongoDB|PostgreSQL|TensorFlow|PyTorch|HTML5?|CSS3?|Git|Figma|Kubernetes|Spring Boot)\b/gi) || [];
  const entries = (values: string[]) => {
    const result: { title: string; description: string; date: string }[] = [];
    values.forEach(line => {
      const value = cleanLine(line);
      const date = value.match(/\b(?:[A-Za-z]+\s+)?(?:19|20)\d{2}\s*(?:-|–|to)\s*(?:[A-Za-z]+\s+)?(?:(?:19|20)\d{2}|present|current)\b/i)?.[0] || '';
      if (isBullet(line) && result.length) result[result.length - 1].description += ` ${value}`;
      else result.push({ title: value.replace(date, '').replace(/\s{2,}/g, ' ').trim(), description: isBullet(line) ? value : '', date });
    });
    return result;
  };
  entries(sections.projects || []).forEach((entry, index) => projectList.push({ id: `project-${index}`, name: entry.title, description: entry.description || entry.title, technologies: technologies(`${entry.title} ${entry.description}`), githubLink: '', liveDemo: '' }));
  entries(sections.experience || []).forEach((entry, index) => expList.push({ id: `exp-${index}`, company: entry.title.split(/\s+-\s+|\|/)[0].trim(), role: entry.title.split(/\s+-\s+|\|/)[1]?.trim() || entry.title, duration: entry.date || 'Present', description: entry.description || entry.title }));
  entries(sections.education || []).forEach((entry, index) => eduList.push({ id: `edu-${index}`, institution: entry.title, degree: /master|m\.tech|m\.sc/i.test(entry.title) ? 'Master of Science' : 'Bachelor of Science', branch: /computer|engineering|science/i.test(entry.title) ? 'Computer Science' : '', cgpa: entry.title.match(/(?:cgpa|gpa)\s*[:=-]?\s*([\d.]+)/i)?.[1] || '', startYear: entry.date.split(/-|–|to/)[0]?.trim() || '', endYear: entry.date.split(/-|–|to/)[1]?.trim() || '' }));
  entries(sections.certifications || []).forEach((entry, index) => certificationList.push({ id: `cert-${index}`, title: entry.title, issuer: '', date: entry.date }));
  entries(sections.achievements || []).forEach((entry, index) => achievementList.push({ id: `ach-${index}`, title: entry.title, description: entry.description, date: entry.date }));
  entries(sections.leadership || []).forEach((entry, index) => leadershipList.push({ id: `lead-${index}`, title: entry.title, description: entry.description, date: entry.date }));
  splitTokens(sections.languages || []).forEach((language, index) => languageList.push({ id: `lang-${index}`, name: language.replace(/\s*[-:|].*$/, ''), proficiency: /native/i.test(language) ? 'Native' : /fluent/i.test(language) ? 'Fluent' : 'Professional' }));
  splitTokens(sections.interests || []).forEach((interest, index) => interestList.push({ id: `interest-${index}`, name: interest }));
  parsedData.summary = (sections.summary || []).filter(line => !isBullet(line)).join(' ').trim();
  if (!parsedData.summary) {
    const firstSectionIndex = lines.findIndex(line => sectionFor(line) !== null);
    const summaryLines = firstSectionIndex > 1 ? lines.slice(nameLine ? lines.indexOf(nameLine) + 1 : 1, firstSectionIndex) : [];
    parsedData.summary = summaryLines.filter(line => !line.includes('@') && !/https?:\/\//i.test(line)).join(' ').trim();
  }

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
  if (projectList.length > 0) parsedData.projects = projectList.slice(0, 8);
  if (certificationList.length > 0) parsedData.certifications = certificationList.slice(0, 8);
  if (achievementList.length > 0) parsedData.achievements = achievementList.slice(0, 8);
  if (leadershipList.length > 0) parsedData.leadershipActivities = leadershipList.slice(0, 8);
  if (languageList.length > 0) parsedData.languages = languageList.slice(0, 8);
  if (interestList.length > 0) parsedData.interests = interestList.slice(0, 8);

  const confidenceScore = Math.min(85, 40 + (parsedData.personal.email ? 15 : 0) + (parsedData.skills.length * 2) + (parsedData.experience.length * 10));

  return {
    parsedData,
    extractedTextLength: text.length,
    confidenceScore,
    warnings
  };
};
