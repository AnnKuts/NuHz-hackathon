import type { FormData } from './cv';

export interface FormField {
  name: string;
  label: string;
  type: 'input' | 'textarea' | 'multiInput' | 'projectList' | 'experienceList' | 'file';
  inputType?: 'text' | 'email' | 'file';
  placeholder: string;
  section: string;
  rows?: number;
  maxItems?: number;
}

export interface MasterCVProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export interface PreviewCVProps {
  formData: FormData;
}

export interface ExportButtonsProps {
  previewRef: React.RefObject<HTMLDivElement>;
  cvData: FormData;
  className?: string;
}

export interface ExportButtonConfig {
  format: 'pdf' | 'png' | 'json';
  label: string;
  description: string;
}

export interface ExportOptions {
  format: 'pdf' | 'png' | 'json';
  filename?: string;
}