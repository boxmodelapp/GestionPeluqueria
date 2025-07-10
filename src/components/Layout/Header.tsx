import React from 'react';
import { Calendar, User, Menu, Bell, LogOut, Settings, Users, Scissors } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { salonSettings } from '../../data/salonSettings';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  onViewChange, 
  onMenuToggle, 
  isMobileMenuOpen 
}) => {
  const { user, logout } = useAuth();

  const getNavItems = () => {
    const baseItems = [
      { id: 'home', label: 'Inicio', icon: Calendar, roles: ['client', 'stylist', 'admin'] }
    ];

    if (user?.role === 'client') {
      return [
        ...baseItems,
        { id: 'booking', label: 'Reservar', icon: Calendar, roles: ['client'] },
        { id: 'appointments', label: 'Mis Citas', icon: User, roles: ['client'] }
      ];
    }

    if (user?.role === 'stylist') {
      return [
        ...baseItems,
        { id: 'agenda', label: 'Mi Agenda', icon: Calendar, roles: ['stylist'] },
        { id: 'profile', label: 'Mi Perfil', icon: User, roles: ['stylist'] }
      ];
    }

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { id: 'services', label: 'Servicios', icon: Scissors, roles: ['admin'] },
        { id: 'stylists', label: 'Peluqueros', icon: Users, roles: ['admin'] },
        { id: 'appointments', label: 'Todas las Citas', icon: Calendar, roles: ['admin'] },
        { id: 'settings', label: 'Configuración', icon: Settings, roles: ['admin'] }
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      console.log('🚪 User confirmed logout');
      logout();
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-red-400';
      case 'stylist': return 'text-blue-400';
      case 'client': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'stylist': return 'Peluquero';
      case 'client': return 'Cliente';
      default: return 'Usuario';
    }
  };

  return (
    <header className="glass-effect border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text">
              {salonSettings.name}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    currentView === item.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="hidden sm:block">
                <span className="text-sm text-gray-300">{user?.name}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${getRoleColor(user?.role || '')}`}>
                    {getRoleLabel(user?.role || '')}
                  </span>
                  {user?.isGuest && (
                    <span className="text-xs text-purple-400">• Invitado</span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.id);
                      onMenuToggle();
                    }}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      currentView === item.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;