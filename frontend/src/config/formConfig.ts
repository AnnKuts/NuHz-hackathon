import type { FormField } from '../types/forms';

export const formConfig: FormField[] = [
  { 
    name: 'photo', 
    label: 'Profile Photo', 
    type: 'file', 
    inputType: 'file', 
    placeholder: '', 
    section: 'Personal Information' 
  },
  { 
    name: 'name', 
    label: 'Full Name', 
    type: 'input', 
    inputType: 'text', 
    placeholder: 'Joe Johnson', 
    section: 'Personal Information' 
  },
  { 
    name: 'profession', 
    label: 'Job Title', 
    type: 'input', 
    inputType: 'text', 
    placeholder: 'Frontend Developer', 
    section: 'Personal Information' 
  },
  { 
    name: 'location', 
    label: 'Location', 
    type: 'input', 
    inputType: 'text', 
    placeholder: 'City, Country', 
    section: 'Personal Information' 
  },
  { 
    name: 'email', 
    label: 'Email Address', 
    type: 'input', 
    inputType: 'email', 
    placeholder: 'your_email@example.com', 
    section: 'Personal Information' 
  },
  { 
    name: 'phone', 
    label: 'Phone', 
    type: 'input', 
    inputType: 'text', 
    placeholder: '+380 xxx xx xx', 
    section: 'Personal Information' 
  },
  { 
    name: 'profileLinks', 
    label: 'Profile Links', 
    type: 'multiInput', 
    placeholder: 'LinkedIn, GitHub, etc...', 
    section: 'Personal Information', 
    maxItems: 4 
  },

  { 
    name: 'aboutMe', 
    label: 'About Me', 
    type: 'textarea', 
    placeholder: 'Write a brief description about yourself, your background, and career goals', 
    section: 'About Me', 
    rows: 4 
  },

  { 
    name: 'skills', 
    label: 'Skills & Technologies', 
    type: 'textarea', 
    placeholder: 'List your soft and technical skills', 
    section: 'Skills & Languages', 
    rows: 4 
  },
  { 
    name: 'languages', 
    label: 'Languages', 
    type: 'textarea', 
    placeholder: 'Ukrainian (Native), English (B2)', 
    section: 'Skills & Languages', 
    rows: 2 
  },

  { 
    name: 'education', 
    label: 'Education', 
    type: 'textarea', 
    placeholder: 'University, Degree, Years', 
    section: 'Education', 
    rows: 3 
  },

  { 
    name: 'projects', 
    label: 'Projects', 
    type: 'projectList', 
    placeholder: '', 
    section: 'Projects' 
  },
  { 
    name: 'experiences', 
    label: 'Work Experience', 
    type: 'experienceList', 
    placeholder: '', 
    section: 'Experience' 
  },

  { 
    name: 'interviewResults', 
    label: 'Training Results', 
    type: 'textarea', 
    placeholder: 'Results from interview simulator', 
    section: 'Additional Information', 
    rows: 3 
  },
];