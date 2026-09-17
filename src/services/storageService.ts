import { ResumeData } from '../types/resume';
const createEmptyResumeData = (): ResumeData => ({
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
});

const STORAGE_KEY = 'developer_portfolio_resume_data_v1';
const TIMESTAMP_KEY = 'developer_portfolio_resume_last_saved';

export const storageService = {
  loadResumeData: (): ResumeData => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error('Failed to load resume data from LocalStorage:', err);
    }
    return createEmptyResumeData();
  },

  saveResumeData: (data: ResumeData): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());
    } catch (err) {
      console.error('Failed to save resume data to LocalStorage:', err);
    }
  },

  getLastSavedTimestamp: (): string | null => {
    return localStorage.getItem(TIMESTAMP_KEY);
  },

  clearResumeData: (): ResumeData => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TIMESTAMP_KEY);
    } catch (err) {
      console.error('Failed to clear LocalStorage:', err);
    }
    return createEmptyResumeData();
  },

  exportToJson: (data: ResumeData): void => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `resume_${data.personal.fullName.toLowerCase().replace(/\s+/g, '_') || 'data'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }
};
