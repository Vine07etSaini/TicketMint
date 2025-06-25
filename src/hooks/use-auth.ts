
'use client';

import { createContext, useContext } from 'react';

export interface User {
  address: string;
  role: 'user' | 'admin';
}

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (role: 'user' | 'admin') => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthState | null>(null);

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
