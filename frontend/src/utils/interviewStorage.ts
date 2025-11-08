interface InterviewResult {
  id: string;
  timestamp: number;
  score: number;
  totalQuestions: number;
  timeUsed: number;
  estimate: string | null;
  specialization: string;
  summary: string;
}

const STORAGE_KEY = 'interview_results';

export const saveInterviewResult = (result: Omit<InterviewResult, 'id' | 'timestamp'>): string => {
  const id = Date.now().toString();
  const fullResult: InterviewResult = {
    ...result,
    id,
    timestamp: Date.now(),
  };
  
  const existingResults = getInterviewResults();
  const updatedResults = [...existingResults, fullResult];
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults));
  return id;
};

export const getInterviewResults = (): InterviewResult[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const getLatestInterviewResult = (): InterviewResult | null => {
  const results = getInterviewResults();
  return results.length > 0 ? results[results.length - 1] : null;
};

export const formatInterviewResult = (result: InterviewResult): string => {
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