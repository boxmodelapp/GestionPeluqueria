import React from 'react';
import { CheckCircle, Calendar, Clock, User } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentDetails?: {
    date: string;
    time: string;
    stylistName: string;
    services: string[];
    totalPrice: number;
  };
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  appointmentDetails 
}) => {
  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-effect rounded-2xl p-8 max-w-md w-full animate-fade-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            ¡Reserva Confirmada!
          </h2>
          <p className="text-gray-300">
            Tu cita ha sido reservada exitosamente
          </p>
        </div>

        {appointmentDetails && (
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3 text-gray-300">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span>{formatDate(appointmentDetails.date)}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-300">
              <Clock className="w-5 h-5 text-purple-400" />
              <span>{appointmentDetails.time}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-300">
              <User className="w-5 h-5 text-purple-400" />
              <span>{appointmentDetails.stylistName}</span>
            </div>

            <div className="bg-purple-900/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Servicios:</h4>
              <div className="space-y-1">
                {appointmentDetails.services.map((service, index) => (
                  <div key={index} className="text-sm text-gray-300">
                    • {service}
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-600 pt-2 mt-3 flex justify-between font-semibold text-white">
                <span>Total:</span>
                <span>{formatPrice(appointmentDetails.totalPrice)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm text-gray-400 text-center">
            Recibirás un email de confirmación con todos los detalles de tu cita.
          </p>
          
          <button
            onClick={onClose}
            className="w-full btn-primary py-3 rounded-lg font-semibold"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;