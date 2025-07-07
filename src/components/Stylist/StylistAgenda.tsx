import React, { useState } from 'react';
import { Appointment } from '../../types';
import { services, stylists } from '../../data/mockData';
import { useAppointments } from '../../hooks/useAppointments';
import { useAuth } from '../../hooks/useAuth';
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Phone,
  MessageSquare,
  Filter
} from 'lucide-react';

const StylistAgenda: React.FC = () => {
  const { user } = useAuth();
  const { appointments, updateAppointment, loading } = useAppointments();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter appointments for current stylist
  const stylistAppointments = appointments.filter(apt => apt.stylistId === user?.id);
  
  // Filter by date and status
  const filteredAppointments = stylistAppointments.filter(apt => {
    const dateMatch = apt.date === selectedDate;
    const statusMatch = statusFilter === 'all' || apt.status === statusFilter;
    return dateMatch && statusMatch;
  });

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-400" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'completed':
        return 'Completada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Desconocido';
    }
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-400 bg-green-900/30';
      case 'pending':
        return 'text-yellow-400 bg-yellow-900/30';
      case 'completed':
        return 'text-blue-400 bg-blue-900/30';
      case 'cancelled':
        return 'text-red-400 bg-red-900/30';
      default:
        return 'text-gray-400 bg-gray-900/30';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleConfirmAppointment = async (appointmentId: string) => {
    await updateAppointment(appointmentId, { status: 'confirmed' });
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
      await updateAppointment(appointmentId, { status: 'cancelled' });
    }
  };

  const handleCompleteAppointment = async (appointmentId: string) => {
    await updateAppointment(appointmentId, { status: 'completed' });
  };

  const getUpcomingDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-white">Mi Agenda</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Date Filter */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {getUpcomingDays().map(date => (
                <option key={date} value={date}>
                  {formatDate(date)}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-purple-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Todas</option>
              <option value="pending">Pendientes</option>
              <option value="confirmed">Confirmadas</option>
              <option value="completed">Completadas</option>
              <option value="cancelled">Canceladas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="glass-effect rounded-2xl p-8 text-center">
          <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            No tienes citas para esta fecha
          </h3>
          <p className="text-gray-500">
            Selecciona otra fecha para ver tus citas programadas
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((appointment) => {
              const appointmentServices = services.filter(s => 
                appointment.serviceIds.includes(s.id)
              );

              return (
                <div
                  key={appointment.id}
                  className="glass-effect rounded-2xl p-6 animate-fade-in"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        {getStatusIcon(appointment.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                        <span className="text-2xl font-bold text-purple-400">
                          {appointment.time}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-gray-300">
                            <User className="w-4 h-4 text-purple-400" />
                            <span className="font-medium">{appointment.clientName || 'Cliente'}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-gray-300">
                            <Phone className="w-4 h-4 text-purple-400" />
                            <span>{appointment.clientPhone || 'Sin teléfono'}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-gray-300">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <span>{appointment.duration} min</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-300">Servicios:</h4>
                          <div className="space-y-1">
                            {appointmentServices.map(service => (
                              <div key={service.id} className="flex justify-between text-sm">
                                <span className="text-gray-300">{service.name}</span>
                                <span className="text-gray-400">{service.duration} min</span>
                              </div>
                            ))}
                          </div>
                          <div className="text-lg font-semibold text-purple-400">
                            Total: {formatPrice(appointment.totalPrice)}
                          </div>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Notas:
                          </h4>
                          <p className="text-sm text-gray-400 bg-gray-800/50 p-3 rounded-lg">
                            {appointment.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2 lg:w-48">
                      {appointment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleConfirmAppointment(appointment.id)}
                            disabled={loading}
                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Confirmar</span>
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            disabled={loading}
                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Cancelar</span>
                          </button>
                        </>
                      )}

                      {appointment.status === 'confirmed' && (
                        <button
                          onClick={() => handleCompleteAppointment(appointment.id)}
                          disabled={loading}
                          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Marcar Completada</span>
                        </button>
                      )}

                      <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                        <Phone className="w-4 h-4" />
                        <span>Contactar</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default StylistAgenda;