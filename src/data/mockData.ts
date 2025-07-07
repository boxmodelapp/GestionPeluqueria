import { Service, Stylist, Appointment, User } from '../types';

export const services: Service[] = [
  {
    id: '1',
    name: 'Corte de Cabello',
    description: 'Corte personalizado según tu estilo y preferencias',
    duration: 45,
    price: 25000,
    category: 'Cortes',
    icon: 'Scissors'
  },
  {
    id: '2',
    name: 'Coloración',
    description: 'Tinte completo con productos de alta calidad',
    duration: 120,
    price: 45000,
    category: 'Color',
    icon: 'Palette'
  },
  {
    id: '3',
    name: 'Mechas',
    description: 'Mechas profesionales para iluminar tu cabello',
    duration: 150,
    price: 55000,
    category: 'Color',
    icon: 'Brush'
  },
  {
    id: '4',
    name: 'Peinado',
    description: 'Peinado elegante para eventos especiales',
    duration: 60,
    price: 30000,
    category: 'Peinados',
    icon: 'Crown'
  },
  {
    id: '5',
    name: 'Tratamiento Capilar',
    description: 'Tratamiento nutritivo y reparador',
    duration: 90,
    price: 35000,
    category: 'Tratamientos',
    icon: 'Droplets'
  },
  {
    id: '6',
    name: 'Alisado',
    description: 'Alisado profesional de larga duración',
    duration: 180,
    price: 80000,
    category: 'Tratamientos',
    icon: 'Zap'
  }
];

export const stylists: Stylist[] = [
  {
    id: '1',
    name: 'María González',
    email: 'maria@salon.com',
    phone: '+56912345678',
    specialties: ['Cortes', 'Color'],
    rating: 4.9,
    experience: '8 años de experiencia',
    schedule: {
      monday: { start: '09:00', end: '18:00', isWorking: true },
      tuesday: { start: '09:00', end: '18:00', isWorking: true },
      wednesday: { start: '09:00', end: '18:00', isWorking: true },
      thursday: { start: '09:00', end: '18:00', isWorking: true },
      friday: { start: '09:00', end: '19:00', isWorking: true },
      saturday: { start: '10:00', end: '17:00', isWorking: true },
      sunday: { start: '10:00', end: '15:00', isWorking: false }
    }
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos@salon.com',
    phone: '+56987654321',
    specialties: ['Cortes', 'Peinados'],
    rating: 4.8,
    experience: '6 años de experiencia',
    schedule: {
      monday: { start: '10:00', end: '19:00', isWorking: true },
      tuesday: { start: '10:00', end: '19:00', isWorking: true },
      wednesday: { start: '10:00', end: '19:00', isWorking: true },
      thursday: { start: '10:00', end: '19:00', isWorking: true },
      friday: { start: '10:00', end: '20:00', isWorking: true },
      saturday: { start: '09:00', end: '18:00', isWorking: true },
      sunday: { start: '10:00', end: '15:00', isWorking: false }
    }
  },
  {
    id: '3',
    name: 'Ana Martínez',
    email: 'ana@salon.com',
    phone: '+56911223344',
    specialties: ['Color', 'Tratamientos'],
    rating: 4.9,
    experience: '10 años de experiencia',
    schedule: {
      monday: { start: '09:00', end: '17:00', isWorking: true },
      tuesday: { start: '09:00', end: '17:00', isWorking: true },
      wednesday: { start: '09:00', end: '17:00', isWorking: true },
      thursday: { start: '09:00', end: '17:00', isWorking: true },
      friday: { start: '09:00', end: '18:00', isWorking: true },
      saturday: { start: '10:00', end: '16:00', isWorking: true },
      sunday: { start: '10:00', end: '15:00', isWorking: false }
    }
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Cliente Demo',
  email: 'cliente@demo.com',
  phone: '+56912345678',
  role: 'client'
};

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientId: '1',
    stylistId: '1',
    serviceIds: ['1', '2'],
    date: '2024-01-15',
    time: '10:00',
    status: 'confirmed',
    totalPrice: 70000,
    duration: 165,
    notes: 'Cliente prefiere corte en capas'
  },
  {
    id: '2',
    clientId: '1',
    stylistId: '2',
    serviceIds: ['4'],
    date: '2024-01-20',
    time: '15:00',
    status: 'pending',
    totalPrice: 30000,
    duration: 60
  }
];