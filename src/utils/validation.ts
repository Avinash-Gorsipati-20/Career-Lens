import { ResumeData, ValidationErrors } from '../types/resume';

export const validateEmail = (email: string): boolean => {
  if (!email) return true;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateUrl = (url: string): boolean => {
  if (!url) return true;
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
};

export const validatePhone = (phone: string): boolean => {
  if (!phone) return true;
  const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
  return re.test(phone);
};

export const validateResumeData = (data: ResumeData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.personal.fullName.trim()) {
    errors.fullName = 'Full Name is required';
  }

  if (!data.personal.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!validateEmail(data.personal.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (data.personal.phone && !validatePhone(data.personal.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (data.personal.linkedin && !validateUrl(data.personal.linkedin)) {
    errors.linkedin = 'Invalid URL format';
  }

  if (data.personal.github && !validateUrl(data.personal.github)) {
    errors.github = 'Invalid URL format';
  }

  if (data.personal.portfolio && !validateUrl(data.personal.portfolio)) {
    errors.portfolio = 'Invalid URL format';
  }

  // Check duplicate skills
  const skillNames = data.skills.map(s => s.name.trim().toLowerCase());
  const duplicates = skillNames.filter((item, index) => skillNames.indexOf(item) !== index);
  if (duplicates.length > 0) {
    errors.duplicateSkills = Array.from(new Set(duplicates));
  }

  return errors;
};
