import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import {jwtDecode }from 'jwt-decode';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if token is stored in localStorage
    const token = localStorage.getItem('nexfern_token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({
          id: decoded.userId,
          name: decoded.name || '',
          email: decoded.email,
          role: decoded.role,
          dateJoined: decoded.dateJoined || ''
        });
      } catch (e) {
        setUser(null);
        localStorage.removeItem('nexfern_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('nexfern_token', data.token);
        const decoded: any = jwtDecode(data.token);
        setUser({
          id: decoded.userId,
          name: decoded.name || '',
          email: decoded.email,
          role: decoded.role,
          dateJoined: decoded.dateJoined || ''
        });
        setIsLoading(false);
        return true;
      }
    } catch (e) {
      // handle error
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexfern_token');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};