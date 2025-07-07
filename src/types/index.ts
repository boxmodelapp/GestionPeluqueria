export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'stylist' | 'admin';
  avatar?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // en minutos
  price: number;
  category: string;
  icon: string;
}

export interface Stylist {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  avatar?: string;
  rating: number;
  experience: string;
  schedule: WorkingHours;
  profileImage?: string;
}

export interface WorkingHours {
  [key: string]: {
    start: string;
    end: string;
    isWorking: boolean;
  };
}

export interface Appointment {
  id: string;
  clientId: string;
  stylistId: string;
  serviceIds: string[];
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  totalPrice: number;
  duration: number;
  clientName?: string;
  clientPhone?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  stylistId?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  phone: string;
  role: 'client' | 'stylist' | 'admin';
  isGuest?: boolean;
  avatar?: string;
}

export interface SalonSettings {
  name: string;
  logo?: string;
  banner?: string;
  description: string;
  address: string;
  phone: string;
  email: string;
}