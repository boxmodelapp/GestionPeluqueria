import { useState, useEffect } from 'react';
import { Appointment, TimeSlot } from '../types';
import { mockAppointments } from '../data/mockData';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [loading, setLoading] = useState(false);

  const createAppointment = async (appointment: Omit<Appointment, 'id'>) => {
    setLoading(true);
    try {
      const newAppointment: Appointment = {
        ...appointment,
        id: Date.now().toString(),
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

  return {
    appointments,
    loading,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    getAvailableTimeSlots
  };
};