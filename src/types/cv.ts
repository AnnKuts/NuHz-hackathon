/**
 * CV Data Types
 * Интерфейсы для данных резюме
 */

export interface Project {
  title: string;
  link: string;
  summary: string;
}

export interface Experience {
  position: string;
  company: string;
  summary: string;
  startDate: string;
  endDate: string;
}

export interface FormData {
  // Personal Info
  photo: string;
  name: string;
  profession: string;
  location: string;
  email: string;
  phone: string;
  profileLinks: string[];
  
  // About Me
  aboutMe: string;
  
  // Skills and Languages
  skills: string;
  languages: string;
  
  // Education
  education: string;
  
  // Projects and Experience (complex structures)
  projects: Project[];
  experiences: Experience[];
  
  // Additional
  interviewResults: string;
}