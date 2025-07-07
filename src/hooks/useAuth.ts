import { useState, useEffect } from 'react';
import { AuthUser } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (localStorage)
    const savedUser = localStorage.getItem('salon_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - determine role based on email
      let role: 'client' | 'stylist' | 'admin' = 'client';
      let name = 'Usuario Demo';
      
      if (email.includes('admin')) {
        role = 'admin';
        name = 'Administrador';
      } else if (email.includes('stylist') || email.includes('peluquero')) {
        role = 'stylist';
        name = 'Peluquero Demo';
      }
      
      const mockUser: AuthUser = {
        id: role === 'admin' ? 'admin1' : role === 'stylist' ? '1' : 'client1',
        name,
        email,
        phone: '+56912345678',
        role
      };
      
      setUser(mockUser);
      localStorage.setItem('salon_user', JSON.stringify(mockUser));
      return mockUser;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, phone: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: AuthUser = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        role: 'client'
      };
      
      setUser(newUser);
      localStorage.setItem('salon_user', JSON.stringify(newUser));
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const loginAsGuest = async (name: string, phone: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const guestUser: AuthUser = {
        id: `guest_${Date.now()}`,
        name,
        phone,
        role: 'client',
        isGuest: true
      };
      
      setUser(guestUser);
      localStorage.setItem('salon_user', JSON.stringify(guestUser));
      return guestUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('salon_user');
  };

  return {
    user,
    loading,
    login,
    register,
    loginAsGuest,
    logout,
    isAuthenticated: !!user
  };
};