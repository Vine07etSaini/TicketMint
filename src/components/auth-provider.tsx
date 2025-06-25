
'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext, type User } from '@/hooks/use-auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('ticketmint-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Failed to access localStorage', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((role: 'user' | 'admin') => {
    const dummyAddress = `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    const newUser: User = { address: dummyAddress, role };
    localStorage.setItem('ticketmint-user', JSON.stringify(newUser));
    setUser(newUser);
    router.push('/');
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem('ticketmint-user');
    setUser(null);
    router.push('/');
  }, [router]);

  const isAuthenticated = !isLoading && !!user;
  const isAdmin = !isLoading && user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
