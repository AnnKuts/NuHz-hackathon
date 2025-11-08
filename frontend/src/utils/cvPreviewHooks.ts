import type { FormData } from '../types/cv';

export interface ContactInfoItem {
  icon: string;
  text: string;
}

export interface SidebarSection {
  title: string;
  items: string[];
  className: string;
}

export interface MainSection {
  title: string;
  type: 'text' | 'experience' | 'projects';
  content?: string;
  items?: any[];
}

export const useContactInfo = (formData: FormData): ContactInfoItem[] => {
  const contactInfo: ContactInfoItem[] = [];

  if (formData.email) {
    contactInfo.push({ icon: '✉', text: formData.email });
  }
  
  if (formData.phone) {
    contactInfo.push({ icon: '📞', text: formData.phone });
  }

  if (formData.profileLinks && Array.isArray(formData.profileLinks)) {
    formData.profileLinks.forEach((link) => {
      if (link && link.trim()) {
        contactInfo.push({ icon: '🔗', text: link.trim() });
      }
    });
  }

  return contactInfo;
};

export const useSidebarSections = (formData: FormData): SidebarSection[] => {
  const sections: SidebarSection[] = [];

  if (formData.skills) {
    let skillItems: string[] = [];
    if (typeof formData.skills === 'string') {
      skillItems = formData.skills.split('\n').filter(skill => skill.trim());
    } else if (Array.isArray(formData.skills)) {
      skillItems = formData.skills;
    }
    
    if (skillItems.length > 0) {
      sections.push({
        title: 'Tools and Tech Skills',
        items: skillItems,
        className: 'cv-skills-content'
      });
    }
  }

  if (formData.languages) {
    let languageItems: string[] = [];
    if (typeof formData.languages === 'string') {
      languageItems = formData.languages.split('\n').filter(lang => lang.trim());
    } else if (Array.isArray(formData.languages)) {
      languageItems = formData.languages;
    }
    
    if (languageItems.length > 0) {
      sections.push({
        title: 'Languages',
        items: languageItems,
        className: 'cv-languages-content'
      });
    }
  }

  if (formData.education) {
    const educationItems = formData.education.split('\n').filter(edu => edu.trim());
    if (educationItems.length > 0) {
      sections.push({
        title: 'Education',
        items: educationItems,
        className: 'cv-education-content'
      });
    }
  }

  return sections;
};

export const useMainSections = (formData: FormData): MainSection[] => {
  const sections: MainSection[] = [];

  if (formData.aboutMe) {
    sections.push({
      title: 'About Me',
      type: 'text',
      content: formData.aboutMe
    });
  }

  if (formData.experiences && formData.experiences.length > 0) {
    sections.push({
      title: 'EXPERIENCE',
      type: 'experience',
      items: formData.experiences
    });
  }

  if (formData.projects && formData.projects.length > 0) {
    sections.push({
      title: 'PROJECTS',
      type: 'projects',
      items: formData.projects
    });
  }

  if (formData.interviewResults) {
    sections.push({
      title: 'INTERVIEW RESULTS',
      type: 'text',
      content: formData.interviewResults
    });
  }

  return sections;
};