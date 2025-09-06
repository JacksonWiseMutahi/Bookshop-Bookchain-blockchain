import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,
  });

  useEffect(() => {
    // Initialize default users if not exists
    const storedUsers = localStorage.getItem('registered_users');
    if (!storedUsers) {
      const defaultUsers = [
        {
          id: 'admin-1',
          name: 'Jackson Wise',
          email: 'admin@bookchain.co',
          password: 'admin123',
          role: 'admin',
          isActive: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'customer-1',
          name: 'Jane Smith',
          email: 'customer@bookchain.co',
          password: 'customer123',
          role: 'user',
          isActive: true,
          createdAt: new Date().toISOString(),
        }
      ];
      localStorage.setItem('registered_users', JSON.stringify(defaultUsers));
    }

    // Check for stored token on app load
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      setAuthState({
        user: JSON.parse(userData),
        accessToken: token,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Get stored users
      const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      
      // Check if user exists and password matches
      const user = storedUsers.find((u: any) => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      const loggedInUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: true,
        createdAt: user.createdAt,
      };
      
      const mockToken = 'mock-jwt-token';
      
      localStorage.setItem('access_token', mockToken);
      localStorage.setItem('user_data', JSON.stringify(loggedInUser));
      
      setAuthState({
        user: loggedInUser,
        accessToken: mockToken,
        isLoading: false,
      });
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Get existing users
      const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      
      // Check if user already exists
      if (storedUsers.find((u: any) => u.email === email)) {
        throw new Error('User already exists');
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        role: 'user',
        isActive: true,
        createdAt: new Date().toISOString(),
      };
      
      // Add to stored users
      storedUsers.push(newUser);
      localStorage.setItem('registered_users', JSON.stringify(storedUsers));
      
      const loggedInUser: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role as 'user' | 'admin',
        isActive: true,
        createdAt: newUser.createdAt,
      };
      
      const mockToken = 'mock-jwt-token';
      
      localStorage.setItem('access_token', mockToken);
      localStorage.setItem('user_data', JSON.stringify(loggedInUser));
      
      setAuthState({
        user: loggedInUser,
        accessToken: mockToken,
        isLoading: false,
      });
    } catch (error) {
      throw new Error('Signup failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    setAuthState({
      user: null,
      accessToken: null,
      isLoading: false,
    });
  };

  const refreshToken = async () => {
    // TODO: Implement token refresh logic
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};