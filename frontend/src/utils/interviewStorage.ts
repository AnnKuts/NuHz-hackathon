import { interviewApi, type InterviewResult } from '../api/interviewApi';

const STORAGE_KEY = 'interview_results';

export const saveInterviewResult = async (
  result: {
    score: number;
    totalQuestions: number;
    timeUsed: number;
    estimate: string | null;
    specialization: string;
    summary: string;
  },
  userId?: string
): Promise<string> => {
  // Если userId не передан, получаем из localStorage (для совместимости)
  if (!userId) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      userId = user.id;
    }
  }

  const apiData = {
    userId: userId || 'anonymous',
    score: result.score,
    totalQuestions: result.totalQuestions,
    correctAnswers: result.score,
    timestamp: new Date().toISOString(),
    timeUsed: result.timeUsed,
    estimate: result.estimate || undefined,
    specialization: result.specialization,
    questions: [{
      question: `${result.specialization} interview`,
      userAnswer: result.summary,
      correctAnswer: result.estimate || 'No estimate',
      isCorrect: result.score > result.totalQuestions * 0.6
    }]
  };

  try {
    const savedResult = await interviewApi.saveInterviewResult(apiData);
    
    // Также сохраняем в localStorage как резервный вариант
    const localResult = {
      id: savedResult.id || Date.now().toString(),
      timestamp: Date.parse(savedResult.timestamp),
      ...result
    };
    
    const existingResults = getInterviewResults();
    const updatedResults = [...existingResults, localResult];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults));
    
    return savedResult.id || localResult.id;
  } catch (error) {
    console.error('Failed to save to API, using localStorage:', error);
    
    const id = Date.now().toString();
    const localResult = {
      id,
      timestamp: Date.now(),
      ...result
    };
    
    const existingResults = getInterviewResults();
    const updatedResults = [...existingResults, localResult];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults));
    
    return id;
  }
};

interface LocalInterviewResult {
  id: string;
  timestamp: number;
  score: number;
  totalQuestions: number;
  timeUsed: number;
  estimate: string | null;
  specialization: string;
  summary: string;
}

export const getInterviewResults = (): LocalInterviewResult[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const getLatestInterviewResult = (): LocalInterviewResult | null => {
  const results = getInterviewResults();
  return results.length > 0 ? results[results.length - 1] : null;
};

export const getApiInterviewResults = async (userId?: string): Promise<InterviewResult[]> => {
  // Если userId не передан, получаем из localStorage
  if (!userId) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      userId = user.id;
    }
  }

  if (!userId) {
    console.warn('No user ID available for API call');
    return [];
  }

  try {
    return await interviewApi.getInterviewResults(userId);
  } catch (error) {
    console.error('Failed to fetch from API, using localStorage:', error);
    return [];
  }
};

export const formatInterviewResult = (result: LocalInterviewResult): string => {
  const date = new Date(result.timestamp).toLocaleDateString();
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  
  let summary = `Interview (${date}): ${result.score}/${result.totalQuestions} (${percentage}%)`;
  
  if (result.estimate) {
    summary += ` - ${result.estimate}`;
  }
  
  if (result.specialization) {
    summary += ` [${result.specialization}]`;
  }
  
  return summary;
};