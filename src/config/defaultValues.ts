import type { FormData, Project, Experience } from '../types/cv';

export const defaultProject: Project = {
  title: "",
  link: "",
  summary: ""
};

export const defaultExperience: Experience = {
  position: "",
  company: "",
  summary: "",
  startDate: "",
  endDate: ""
};

export const defaultFormData: FormData = {
  photo: "",
  name: "",
  profession: "",
  location: "",
  email: "",
  phone: "",
  profileLinks: [""],
  
  aboutMe: "",
  
  skills: "",
  languages: "",
  
  education: "",
  
  projects: [defaultProject],
  experiences: [defaultExperience],
  
  interviewResults: "",
};