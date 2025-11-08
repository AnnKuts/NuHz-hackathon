import { API_CONFIG, API_ENDPOINTS, REQUEST_HEADERS } from './constants';

export interface CVData {
  id?: string;
  userId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
  };
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export class CVApi {
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

  async saveCV(cvData: Omit<CVData, 'id' | 'createdAt' | 'updatedAt'>): Promise<CVData> {
    return this.request<CVData>(API_ENDPOINTS.CV.BASE, {
      method: 'POST',
      body: JSON.stringify(cvData),
    });
  }

  async getCVs(userId: string): Promise<CVData[]> {
    return this.request<CVData[]>(API_ENDPOINTS.CV.BY_USER(userId));
  }

  async updateCV(cvId: string, cvData: Partial<CVData>): Promise<CVData> {
    return this.request<CVData>(API_ENDPOINTS.CV.BY_ID(cvId), {
      method: 'PUT',
      body: JSON.stringify(cvData),
    });
  }

  async deleteCV(cvId: string): Promise<void> {
    return this.request<void>(API_ENDPOINTS.CV.BY_ID(cvId), {
      method: 'DELETE',
    });
  }
}

export const cvApi = new CVApi();