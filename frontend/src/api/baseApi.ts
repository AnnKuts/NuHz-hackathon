import { API_CONFIG, REQUEST_HEADERS, HTTP_STATUS } from './constants';

export interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}

export class BaseApiClient {
  protected async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
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
        const errorData = await response.text();
        const apiError: ApiError = {
          status: response.status,
          message: response.statusText,
          details: errorData,
        };
        
        throw apiError;
      }
      
      // Handle empty responses (204 No Content)
      if (response.status === HTTP_STATUS.NO_CONTENT) {
        return {} as T;
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to server');
      }
      
      console.error(`API Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  protected buildUrl(endpoint: string, params?: Record<string, string | number>): string {
    let url = endpoint;
    
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
      
      url += `?${searchParams.toString()}`;
    }
    
    return url;
  }
}