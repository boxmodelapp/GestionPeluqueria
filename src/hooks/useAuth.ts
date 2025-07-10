import { useState, useEffect } from 'react';
import { AuthUser } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (localStorage)
    const savedUser = localStorage.getItem('salon_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('salon_user');
      }
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
      } else {
        name = 'Cliente Demo';
      }
      
      const mockUser: AuthUser = {
        id: role === 'admin' ? 'admin1' : role === 'stylist' ? '1' : 'client1',
        name,
        email,
        phone: '+56912345678',
        role
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('salon_user', JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
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
      setIsAuthenticated(true);
      localStorage.setItem('salon_user', JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
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
      setIsAuthenticated(true);
      localStorage.setItem('salon_user', JSON.stringify(guestUser));
      return guestUser;
    } catch (error) {
      console.error('Guest login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('🚪 Logging out user...');
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('salon_user');
    console.log('✅ User logged out successfully');
  };

  return {
    user,
    loading,
    login,
    register,
    loginAsGuest,
    logout,
    isAuthenticated
  };
};