import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import AuthPage from './components/Auth/AuthPage';
import Header from './components/Layout/Header';
import Hero from './components/Home/Hero';
import ServicesGrid from './components/Home/ServicesGrid';
import StylistsSection from './components/Home/StylistsSection';
import BookingForm from './components/Booking/BookingForm';
import AppointmentsList from './components/Appointments/AppointmentsList';
import SuccessModal from './components/Common/SuccessModal';
import ServicesManagement from './components/Admin/ServicesManagement';
import StylistsManagement from './components/Admin/StylistsManagement';
import StylistAgenda from './components/Stylist/StylistAgenda';
import StylistProfile from './components/Stylist/StylistProfile';
import { Service, Stylist } from './types';

function App() {
  const { isAuthenticated, user } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<Service | undefined>();
  const [preSelectedStylist, setPreSelectedStylist] = useState<Stylist | undefined>();

  // Debug authentication state
  console.log('App render - isAuthenticated:', isAuthenticated, 'user:', user);

  // Reset view when user logs out
  React.useEffect(() => {
    if (!isAuthenticated) {
      setCurrentView('home');
      setIsMobileMenuOpen(false);
      setShowSuccessModal(false);
      setPreSelectedService(undefined);
      setPreSelectedStylist(undefined);
    }
  }, [isAuthenticated]);

  // Show auth page if user is not authenticated
  if (!isAuthenticated) {
    console.log('Showing AuthPage because user is not authenticated');
    return <AuthPage />;
  }
  
  console.log('User is authenticated, showing main app');

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    // Reset pre-selections when changing views
    if (view !== 'booking') {
      setPreSelectedService(undefined);
      setPreSelectedStylist(undefined);
    }
  };

  const handleBookingClick = () => {
    setCurrentView('booking');
  };

  const handleServiceSelect = (service: Service) => {
    setPreSelectedService(service);
    setCurrentView('booking');
  };

  const handleStylistSelect = (stylist: Stylist) => {
    setPreSelectedStylist(stylist);
    setCurrentView('booking');
  };

  const handleBookingSuccess = () => {
    setShowSuccessModal(true);
    setCurrentView('appointments');
  };

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderContent = () => {
    // Client views
    if (user?.role === 'client') {
      switch (currentView) {
        case 'home':
          return (
            <div className="space-y-0">
              <Hero onBookingClick={handleBookingClick} />
              <ServicesGrid onServiceSelect={handleServiceSelect} />
              <StylistsSection onStylistSelect={handleStylistSelect} />
            </div>
          );
        case 'booking':
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="gradient-text">Reserva tu Cita</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Completa el formulario para reservar tu cita perfecta
                </p>
              </div>
              <BookingForm
                onSuccess={handleBookingSuccess}
                preSelectedService={preSelectedService}
                preSelectedStylist={preSelectedStylist}
              />
            </div>
          );
        case 'appointments':
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="gradient-text">Mis Citas</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Gestiona todas tus citas de belleza
                </p>
              </div>
              <AppointmentsList />
            </div>
          );
        default:
          return <div>Vista no encontrada</div>;
      }
    }

    // Stylist views
    if (user?.role === 'stylist') {
      switch (currentView) {
        case 'home':
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="gradient-text">Bienvenido, {user.name}</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Gestiona tu agenda y perfil profesional
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className="glass-effect rounded-2xl p-6 cursor-pointer card-hover"
                  onClick={() => setCurrentView('agenda')}
                >
                  <h2 className="text-xl font-semibold text-white mb-2">Mi Agenda</h2>
                  <p className="text-gray-300">Ver y gestionar tus citas programadas</p>
                </div>
                <div 
                  className="glass-effect rounded-2xl p-6 cursor-pointer card-hover"
                  onClick={() => setCurrentView('profile')}
                >
                  <h2 className="text-xl font-semibold text-white mb-2">Mi Perfil</h2>
                  <p className="text-gray-300">Actualizar información y foto de perfil</p>
                </div>
              </div>
            </div>
          );
        case 'agenda':
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <StylistAgenda />
            </div>
          );
        case 'profile':
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <StylistProfile />
            </div>
          );
        default:
          return <div>Vista no encontrada</div>;
      }
    }

    // Admin views
    if (user?.role === 'admin') {
      switch (currentView) {
        case 'home':
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="gradient-text">Panel de Administración</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Gestiona todos los aspectos de tu salón
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div 
                  className="glass-effect rounded-2xl p-6 cursor-pointer card-hover"
                  onClick={() => setCurrentView('services')}
                >
                  <h2 className="text-xl font-semibold text-white mb-2">Servicios</h2>
                  <p className="text-gray-300">Gestionar servicios y precios</p>
                </div>
                <div 
                  className="glass-effect rounded-2xl p-6 cursor-pointer card-hover"
                  onClick={() => setCurrentView('stylists')}
                >
                  <h2 className="text-xl font-semibold text-white mb-2">Peluqueros</h2>
                  <p className="text-gray-300">Administrar equipo de trabajo</p>
                </div>
                <div 
                  className="glass-effect rounded-2xl p-6 cursor-pointer card-hover"
                  onClick={() => setCurrentView('appointments')}
                >
                  <h2 className="text-xl font-semibold text-white mb-2">Citas</h2>
                  <p className="text-gray-300">Ver todas las citas del salón</p>
                </div>
                <div 
                  className="glass-effect rounded-2xl p-6 cursor-pointer card-hover"
                  onClick={() => setCurrentView('settings')}
                >
                  <h2 className="text-xl font-semibold text-white mb-2">Configuración</h2>
                  <p className="text-gray-300">Ajustes del salón</p>
                </div>
              </div>
            </div>
          );
        case 'services':
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ServicesManagement />
            </div>
          );
        case 'stylists':
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <StylistsManagement />
            </div>
          );
        case 'appointments':
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="gradient-text">Todas las Citas</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Vista general de todas las citas del salón
                </p>
              </div>
              <AppointmentsList />
            </div>
          );
        case 'settings':
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="gradient-text">Configuración del Salón</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Personaliza la información y apariencia de tu salón
                </p>
              </div>
              <div className="glass-effect rounded-2xl p-8">
                <p className="text-gray-300 text-center">
                  Panel de configuración en desarrollo...
                </p>
              </div>
            </div>
          );
        default:
          return <div>Vista no encontrada</div>;
      }
    }

    return <div>Rol no reconocido</div>;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        onMenuToggle={handleMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <main className="pb-8">
        {renderContent()}
      </main>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}

export default App;