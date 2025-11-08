import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authApi, type User, type GoogleAuthData } from '../api/authApi';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  token: string | null;
  googleLogin: (googleData: GoogleAuthData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setToken(storedToken);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const googleLogin = async (googleData: GoogleAuthData) => {
    setIsLoading(true);
    try {
      const response = await authApi.googleLogin(googleData);
      const userData: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.fullName,
        createdAt: new Date().toISOString(),
      };
      
      setUser(userData);
      setToken(response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', response.token);
    } catch (error) {
      console.error('Google login failed:', error);
      const fallbackUser: User = {
        id: `user_${Date.now()}`,
        email: googleData.email,
        name: googleData.fullName,
        createdAt: new Date().toISOString(),
      };
      setUser(fallbackUser);
      localStorage.setItem('user', JSON.stringify(fallbackUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cvData');
    localStorage.removeItem('interviewResults');
    localStorage.removeItem('exportHistory');
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value: UserContextType = {
    user,
    token,
    isLoading,
    googleLogin,
    logout,
    updateUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};