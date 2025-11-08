import type { FormData } from '../types/cv';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const isValidEmail = (email: string): boolean => {
  return email.includes('@') && email.includes('.') && email.length > 5;
};

export const isValidPhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
};

export const isValidDate = (date: string): boolean => {
  if (!date.trim()) return true;
  return /^\d{4}$/.test(date) || /^\d{2}\/\d{4}$/.test(date) || /^\d{4}-\d{2}-\d{2}$/.test(date);
};

export const validateCV = (formData: FormData): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!formData.name.trim()) {
    errors.push({ field: 'name', message: "Name is required" });
  }

  if (!formData.profession.trim()) {
    errors.push({ field: 'profession', message: "Profession is required" });
  }

  if (!formData.email.trim()) {
    errors.push({ field: 'email', message: "Email is required" });
  } else if (!isValidEmail(formData.email)) {
    errors.push({ field: 'email', message: "Invalid email format" });
  }

  if (formData.phone.trim() && !isValidPhone(formData.phone)) {
    errors.push({ field: 'phone', message: "Invalid phone format" });
  }

  formData.experiences.forEach((exp, index) => {
    if (exp.startDate && !isValidDate(exp.startDate)) {
      errors.push({ field: `experiences.${index}.startDate`, message: "Invalid date format" });
    }
    if (exp.endDate && !isValidDate(exp.endDate)) {
      errors.push({ field: `experiences.${index}.endDate`, message: "Invalid date format" });
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};