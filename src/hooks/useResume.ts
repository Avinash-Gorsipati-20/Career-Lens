import { useState, useCallback } from 'react';
import { ResumeData, PersonalInfo, Education, Skill, Experience, Project, Certification, Achievement, Language, Interest, TemplateId } from '../types/resume';
import { storageService } from '../services/storageService';
import { validateResumeData } from '../utils/validation';

export const useResume = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => storageService.loadResumeData());
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('modern');

  // Update Personal Info
  const updatePersonal = useCallback((fields: Partial<PersonalInfo>) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, ...fields }
    }));
  }, []);

  // Update Summary
  const updateSummary = useCallback((summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  }, []);

  // Generic List Operations
  const addItem = useCallback(<K extends keyof ResumeData>(section: K, item: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...(prev[section] as any[]), item]
    }));
  }, []);

  const updateItem = useCallback(<K extends keyof ResumeData>(section: K, id: string, updatedFields: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).map(item => item.id === id ? { ...item, ...updatedFields } : item)
    }));
  }, []);

  const removeItem = useCallback(<K extends keyof ResumeData>(section: K, id: string) => {
    setResumeData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).filter(item => item.id !== id)
    }));
  }, []);

  // Specific helper for adding skills easily
  const addSkill = useCallback((skillName: string, category: Skill['category'] = 'Programming', level: Skill['level'] = 'Intermediate') => {
    if (!skillName.trim()) return;
    const newSkill: Skill = {
      id: `sk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: skillName.trim(),
      category,
      level
    };
    setResumeData(prev => {
      // Avoid duplicate skill name addition
      if (prev.skills.some(s => s.name.toLowerCase() === skillName.trim().toLowerCase())) {
        return prev;
      }
      return { ...prev, skills: [...prev.skills, newSkill] };
    });
  }, []);

  const clearData = useCallback(() => {
    const emptyData: ResumeData = {
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
    setResumeData(emptyData);
    storageService.clearResumeData();
  }, []);

  const importFromJson = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.personal && Array.isArray(parsed.skills)) {
        setResumeData({ ...(parsed as ResumeData), leadershipActivities: parsed.leadershipActivities || [] });
        return { success: true };
      }
      return { success: false, error: 'Invalid resume data structure' };
    } catch (e) {
      return { success: false, error: 'Failed to parse JSON file' };
    }
  }, []);

  const validationErrors = validateResumeData(resumeData);

  const replaceResumeData = useCallback((data: ResumeData) => {
    setResumeData({ ...data, leadershipActivities: data.leadershipActivities || [] });
  }, []);

  return {
    resumeData,
    selectedTemplate,
    setSelectedTemplate,
    updatePersonal,
    updateSummary,
    addItem,
    updateItem,
    removeItem,
    addSkill,
    clearData,
    importFromJson,
    replaceResumeData,
    validationErrors
  };
};
