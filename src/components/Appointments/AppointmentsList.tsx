import React from 'react';
import { Appointment } from '../../types';
import { services, stylists } from '../../data/mockData';
import { useAppointments } from '../../hooks/useAppointments';
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Phone,
  MessageSquare
} from 'lucide-react';

const AppointmentsList: React.FC = () => {
  const { appointments, updateAppointment, cancelAppointment, loading } = useAppointments();

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

  const handleCancelAppointment = async (appointmentId: string) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
      await cancelAppointment(appointmentId);
    }
  };

  const upcomingAppointments = appointments.filter(apt => 
    apt.status !== 'cancelled' && apt.status !== 'completed'
  );
  
  const pastAppointments = appointments.filter(apt => 
    apt.status === 'completed' || apt.status === 'cancelled'
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Upcoming Appointments */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Calendar className="w-6 h-6 mr-3 text-purple-400" />
          Próximas Citas
        </h2>
        
        {upcomingAppointments.length === 0 ? (
          <div className="glass-effect rounded-2xl p-8 text-center">
            <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No tienes citas próximas
            </h3>
            <p className="text-gray-500">
              ¡Reserva una cita para lucir espectacular!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingAppointments.map((appointment) => {
              const stylist = stylists.find(s => s.id === appointment.stylistId);
              const appointmentServices = services.filter(s => 
                appointment.serviceIds.includes(s.id)
              );

              return (
                <div
                  key={appointment.id}
                  className="glass-effect rounded-2xl p-6 card-hover animate-fade-in"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(appointment.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-purple-400">
                      {formatPrice(appointment.totalPrice)}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span>{appointment.time} ({appointment.duration} min)</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-gray-300">
                      <User className="w-4 h-4 text-purple-400" />
                      <span>{stylist?.name}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Servicios:</h4>
                    <div className="space-y-1">
                      {appointmentServices.map(service => (
                        <div key={service.id} className="flex justify-between text-sm">
                          <span className="text-gray-300">{service.name}</span>
                          <span className="text-gray-400">{service.duration} min</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Notas:
                      </h4>
                      <p className="text-sm text-gray-400 bg-gray-800/50 p-3 rounded-lg">
                        {appointment.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                      <Phone className="w-4 h-4" />
                      <span>Contactar</span>
                    </button>
                    
                    {appointment.status === 'pending' && (
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Cancelar</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-purple-400" />
            Historial de Citas
          </h2>
          
          <div className="space-y-4">
            {pastAppointments.map((appointment) => {
              const stylist = stylists.find(s => s.id === appointment.stylistId);
              const appointmentServices = services.filter(s => 
                appointment.serviceIds.includes(s.id)
              );

              return (
                <div
                  key={appointment.id}
                  className="glass-effect rounded-xl p-4 animate-fade-in"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(appointment.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-300">
                        {formatDate(appointment.date)} - {appointment.time}
                      </div>
                      
                      <div className="text-sm text-gray-400">
                        con {stylist?.name}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-400">
                        {appointmentServices.map(s => s.name).join(', ')}
                      </div>
                      <div className="font-semibold text-purple-400">
                        {formatPrice(appointment.totalPrice)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default AppointmentsList;