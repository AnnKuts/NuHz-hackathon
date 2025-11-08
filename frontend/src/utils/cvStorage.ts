import type { FormData } from '../types/cv';
import { validateCV } from './validation';
import { cvApi } from '../api/cvApi';

const CV_STORAGE_KEY = 'created_cvs';

interface SavedCV {
  id: string;
  name: string;
  timestamp: number;
  date: string;
  isValid: boolean;
}

export const shouldSaveCV = (formData: FormData): boolean => {
  const validation = validateCV(formData);
  return validation.isValid && formData.name.trim().length > 0;
};

export const saveCV = async (formData: FormData, userId?: string): Promise<string | null> => {
  if (!shouldSaveCV(formData)) {
    return null;
  }

  const cvId = `cv_${Date.now()}`;
  const savedCV: SavedCV = {
    id: cvId,
    name: formData.name,
    timestamp: Date.now(),
    date: new Date().toLocaleDateString(),
    isValid: true
  };

  try {
    // Сохраняем локально
    const existingCVs = getCreatedCVs();
    
    // Проверяем, не сохранено ли уже CV с таким именем
    const existingCV = existingCVs.find(cv => cv.name === formData.name);
    if (existingCV) {
      return existingCV.id; // Не создаем дубликат
    }
    
    const updatedCVs = [...existingCVs, savedCV];
    localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(updatedCVs));

    // Если пользователь авторизован, сохраняем в API
    if (userId) {
      try {
        const cvData = {
          userId,
          personalInfo: {
            firstName: formData.name.split(' ')[0] || '',
            lastName: formData.name.split(' ').slice(1).join(' ') || '',
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
          },
          experience: formData.experiences.map(exp => ({
            company: exp.company,
            position: exp.position,
            startDate: exp.startDate,
            endDate: exp.endDate,
            description: exp.summary,
          })),
          education: formData.education ? [{
            institution: formData.education,
            degree: '',
            startDate: '',
            endDate: '',
          }] : [],
          skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
          projects: formData.projects.map(proj => ({
            name: proj.title,
            description: proj.summary,
            technologies: [],
            link: proj.link,
          })),
        };

        await cvApi.saveCV(cvData);
      } catch (apiError) {
        console.warn('Failed to save CV to API, saved locally:', apiError);
      }
    }

    return cvId;
  } catch (error) {
    console.error('Failed to save CV:', error);
    return null;
  }
};

export const getCreatedCVs = (): SavedCV[] => {
  try {
    const stored = localStorage.getItem(CV_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const getCVsCount = (): number => {
  return getCreatedCVs().length;
};

export const getLatestCV = (): SavedCV | null => {
  const cvs = getCreatedCVs();
  return cvs.length > 0 ? cvs[cvs.length - 1] : null;
};