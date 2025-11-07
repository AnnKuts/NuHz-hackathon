/**
 * Form Types
 * Интерфейсы для форм и их полей
 */

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