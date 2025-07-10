import { useState, useEffect } from 'react';
import { Appointment, TimeSlot } from '../types';
import { useAuth } from './useAuth';

export const useAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  // Load appointments from localStorage on mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem('salon_appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('salon_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const createAppointment = async (appointment: Omit<Appointment, 'id'>) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAppointment: Appointment = {
        ...appointment,
        id: Date.now().toString(),
        clientName: user?.name || 'Cliente',
        clientPhone: user?.phone || 'Sin teléfono'
      };
      
      setAppointments(prev => [...prev, newAppointment]);
      return newAppointment;
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAppointments(prev =>
        prev.map(apt => apt.id === id ? { ...apt, ...updates } : apt)
      );
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id: string) => {
    await updateAppointment(id, { status: 'cancelled' });
  };

  const getAvailableTimeSlots = (date: string, stylistId: string): TimeSlot[] => {
    const timeSlots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 18;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isBooked = appointments.some(apt => 
          apt.date === date && 
          apt.time === time && 
          apt.stylistId === stylistId &&
          apt.status !== 'cancelled'
        );
        
        timeSlots.push({
          time,
          available: !isBooked,
          stylistId
        });
      }
    }
    
    return timeSlots;
  };

  // Filter appointments based on user role
  const getUserAppointments = () => {
    if (!user) return [];
    
    if (user.role === 'admin') {
      return appointments; // Admin sees all appointments
    } else if (user.role === 'stylist') {
      return appointments.filter(apt => apt.stylistId === user.id);
    } else {
      return appointments.filter(apt => apt.clientId === user.id);
    }
  };

  return {
    appointments: getUserAppointments(),
    allAppointments: appointments, // For admin use
    loading,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    getAvailableTimeSlots
  };
};