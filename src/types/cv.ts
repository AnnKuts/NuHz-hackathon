import React from 'react';

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
  photo: string;
  name: string;
  profession: string;
  location: string;
  email: string;
  phone: string;
  profileLinks: string[];
  
  aboutMe: string;
  
  skills: string;
  languages: string;
  
  education: string;
  
  projects: Project[];
  experiences: Experience[];
  
  interviewResults: string;
}

// Component interfaces
export interface ContactItemProps {
  icon: string;
  text: string;
}

export interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
  show?: boolean;
}

export interface CVSectionProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

export interface TextListProps {
  items: string[];
  className?: string;
}

export interface ExperienceItemProps {
  experience: Experience;
}

export interface ProjectItemProps {
  project: Project;
}