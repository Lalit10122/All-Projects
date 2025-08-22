import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiPost } from '../lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  verified: boolean;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  verifyAccount: (code: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('auth_token');
    if (savedUser && token) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await apiPost('/api/auth/login', { email, password });
      if (res?.token && res?.user) {
        localStorage.setItem('auth_token', res.token);
        const mappedUser: User = {
          id: res.user.id,
          email: res.user.email,
          name: res.user.name,
          phone: res.user.phone,
          verified: !!res.user.verified,
          isAdmin: !!res.user.isAdmin
        };
        setUser(mappedUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mappedUser));
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    try {
      const res = await apiPost('/api/auth/register', { name, email, phone, password });
      if (res?.token && res?.user) {
        localStorage.setItem('auth_token', res.token);
        const mappedUser: User = {
          id: res.user.id,
          email: res.user.email,
          name: res.user.name,
          phone: res.user.phone,
          verified: !!res.user.verified,
          isAdmin: !!res.user.isAdmin
        };
        setUser(mappedUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mappedUser));
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
  };

  const verifyAccount = async (code: string): Promise<boolean> => {
    // Optional: backend email verification could be added. For now, accept demo code.
    if (code === '123456' && user) {
      const updatedUser = { ...user, verified: true };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      verifyAccount,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};