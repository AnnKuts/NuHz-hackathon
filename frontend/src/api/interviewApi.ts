import { API_CONFIG, API_ENDPOINTS, REQUEST_HEADERS } from './constants';

export interface InterviewResult {
  id?: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timestamp: string;
  questions: Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }>;
}

export class InterviewApi {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        [REQUEST_HEADERS.CONTENT_TYPE]: REQUEST_HEADERS.APPLICATION_JSON,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async saveInterviewResult(result: Omit<InterviewResult, 'id'>): Promise<InterviewResult> {
    return this.request<InterviewResult>(API_ENDPOINTS.INTERVIEW.RESULTS, {
      method: 'POST',
      body: JSON.stringify(result),
    });
  }

  async getInterviewResults(userId: string): Promise<InterviewResult[]> {
    return this.request<InterviewResult[]>(API_ENDPOINTS.INTERVIEW.BY_USER(userId));
  }

  async getLatestInterviewResult(userId: string): Promise<InterviewResult | null> {
    try {
      return await this.request<InterviewResult>(API_ENDPOINTS.INTERVIEW.LATEST(userId));
    } catch (error) {
      return null;
    }
  }

  async getUserStats(userId: string): Promise<{
    totalCVs: number;
    totalInterviews: number;
    averageScore: number;
    lastActivityDate: string;
  }> {
    return this.request(API_ENDPOINTS.USER.STATS(userId));
  }
}

export const interviewApi = new InterviewApi();