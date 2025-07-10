import React, { useState } from 'react';
import { Service, Stylist, TimeSlot } from '../../types';
import { services, stylists } from '../../data/mockData';
import { useAppointments } from '../../hooks/useAppointments';
import { useAuth } from '../../hooks/useAuth';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';

interface BookingFormProps {
  onSuccess: () => void;
  preSelectedService?: Service;
  preSelectedStylist?: Stylist;
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  onSuccess, 
  preSelectedService, 
  preSelectedStylist 
}) => {
  const { createAppointment, getAvailableTimeSlots, loading } = useAppointments();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    serviceIds: preSelectedService ? [preSelectedService.id] : [],
    stylistId: preSelectedStylist?.id || '',
    date: '',
    time: '',
    notes: ''
  });

  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [step, setStep] = useState(1);

  const selectedServices = services.filter(s => formData.serviceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0);

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceIds: prev.serviceIds.includes(serviceId)
        ? prev.serviceIds.filter(id => id !== serviceId)
        : [...prev.serviceIds, serviceId]
    }));
  };

  const handleDateChange = (date: string) => {
    setFormData(prev => ({ ...prev, date, time: '' }));
    if (date && formData.stylistId) {
      const slots = getAvailableTimeSlots(date, formData.stylistId);
      setAvailableSlots(slots);
    }
  };

  const handleStylistChange = (stylistId: string) => {
    setFormData(prev => ({ ...prev, stylistId, time: '' }));
    if (formData.date && stylistId) {
      const slots = getAvailableTimeSlots(formData.date, stylistId);
      setAvailableSlots(slots);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newAppointment = await createAppointment({
        clientId: user?.id || 'guest',
        stylistId: formData.stylistId,
        serviceIds: formData.serviceIds,
        date: formData.date,
        time: formData.time,
        status: 'pending',
        notes: formData.notes,
        totalPrice,
        duration: totalDuration,
        clientName: formData.name,
        clientPhone: formData.phone
      });
      
      console.log('Appointment created:', newAppointment);
      onSuccess();
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Error al crear la cita. Por favor intenta nuevamente.');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const canProceedToStep2 = formData.serviceIds.length > 0;
  const canProceedToStep3 = canProceedToStep2 && formData.stylistId;
  const canSubmit = canProceedToStep3 && formData.date && formData.time && formData.name && formData.phone;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((stepNumber) => (
          <React.Fragment key={stepNumber}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step >= stepNumber 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-400'
            }`}>
              {stepNumber}
            </div>
            {stepNumber < 4 && (
              <div className={`w-16 h-1 ${
                step > stepNumber ? 'bg-purple-600' : 'bg-gray-700'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="glass-effect rounded-2xl p-8">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Select Services */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-purple-400" />
                Selecciona tus Servicios
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.serviceIds.includes(service.id)
                        ? 'border-purple-500 bg-purple-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => handleServiceToggle(service.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-white">{service.name}</h3>
                      <span className="text-purple-400 font-semibold">
                        {formatPrice(service.price)}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{service.description}</p>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration} min
                    </div>
                  </div>
                ))}
              </div>

              {selectedServices.length > 0 && (
                <div className="bg-purple-900/30 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-white mb-2">Resumen de Servicios</h3>
                  <div className="space-y-1 text-sm">
                    {selectedServices.map(service => (
                      <div key={service.id} className="flex justify-between text-gray-300">
                        <span>{service.name}</span>
                        <span>{formatPrice(service.price)}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-600 pt-2 mt-2 flex justify-between font-semibold text-white">
                      <span>Total: {totalDuration} min</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!canProceedToStep2}
                className="btn-primary px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            </div>
          )}

          {/* Step 2: Select Stylist */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <User className="w-6 h-6 mr-3 text-purple-400" />
                Elige tu Estilista
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {stylists.map((stylist) => (
                  <div
                    key={stylist.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.stylistId === stylist.id
                        ? 'border-purple-500 bg-purple-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => handleStylistChange(stylist.id)}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {stylist.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <h3 className="font-semibold text-white mb-1">{stylist.name}</h3>
                      <div className="text-yellow-400 text-sm mb-2">★ {stylist.rating}</div>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {stylist.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-purple-900/50 text-purple-300 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!canProceedToStep3}
                  className="btn-primary px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Select Date & Time */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-purple-400" />
                Fecha y Hora
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {availableSlots.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Hora Disponible
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto custom-scrollbar">
                      {availableSlots.filter(slot => slot.available).map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, time: slot.time }))}
                          className={`p-2 text-sm rounded-lg transition-all ${
                            formData.time === slot.time
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  disabled={!formData.date || !formData.time}
                  className="btn-primary px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Contact Information */}
          {step === 4 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <User className="w-6 h-6 mr-3 text-purple-400" />
                Información de Contacto
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                {!user?.isGuest && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email (Opcional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                )}

                <div className={!user?.isGuest ? '' : 'md:col-span-2'}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Notas (Opcional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Comentarios adicionales..."
                  />
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-purple-900/30 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-white mb-4">Resumen de tu Reserva</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Servicios:</span>
                    <span className="text-white">{selectedServices.map(s => s.name).join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Estilista:</span>
                    <span className="text-white">{stylists.find(s => s.id === formData.stylistId)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Fecha:</span>
                    <span className="text-white">{new Date(formData.date).toLocaleDateString('es-CL')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Hora:</span>
                    <span className="text-white">{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Duración:</span>
                    <span className="text-white">{totalDuration} min</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2 mt-2 flex justify-between font-semibold text-white">
                    <span>Total:</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit || loading}
                  className="btn-primary px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Procesando...
                    </>
                  ) : (
                    'Confirmar Reserva'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookingForm;