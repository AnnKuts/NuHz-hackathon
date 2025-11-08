import { API_CONFIG, API_ENDPOINTS, REQUEST_HEADERS } from './constants';

export interface GoogleAuthData {
  googleId: string;
  email: string;
  fullName: string;
  profilePicture?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export class AuthApi {
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

  async googleLogin(googleData: GoogleAuthData): Promise<AuthResponse> {
    return this.request<AuthResponse>(API_ENDPOINTS.AUTH.GOOGLE_LOGIN, {
      method: 'POST',
      body: JSON.stringify(googleData),
    });
  }

  async getCurrentUser(token: string): Promise<User> {
    return this.request<User>(API_ENDPOINTS.AUTH.ME, {
      headers: {
        [REQUEST_HEADERS.AUTHORIZATION]: `Bearer ${token}`,
      },
    });
  }
}

export const authApi = new AuthApi();