import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { salonSettings } from '../../data/salonSettings';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  UserPlus, 
  LogIn,
  Scissors,
  Star,
  MapPin,
  Clock
} from 'lucide-react';

const AuthPage: React.FC = () => {
  const { login, register, loginAsGuest, loading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'guest'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (authMode === 'guest') {
      if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
      if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
    } else {
      if (!formData.email.trim()) newErrors.email = 'El email es requerido';
      if (!formData.password) newErrors.password = 'La contraseña es requerida';
      
      if (authMode === 'register') {
        if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
        if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
        if (formData.password.length < 6) {
          newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (authMode === 'login') {
        await login(formData.email, formData.password);
      } else if (authMode === 'register') {
        await register(formData.name, formData.email, formData.phone, formData.password);
      } else if (authMode === 'guest') {
        await loginAsGuest(formData.name, formData.phone);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const switchMode = (mode: 'login' | 'register' | 'guest') => {
    setAuthMode(mode);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Side - Salon Banner */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${salonSettings.banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-black/60 to-purple-800/80"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold gradient-text">
                {salonSettings.name}
              </h1>
            </div>
            <p className="text-xl text-gray-200 leading-relaxed mb-6">
              {salonSettings.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-300">
              <MapPin className="w-5 h-5 text-purple-400" />
              <span>{salonSettings.address}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Phone className="w-5 h-5 text-purple-400" />
              <span>{salonSettings.phone}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Clock className="w-5 h-5 text-purple-400" />
              <span>Lun - Sáb: 9:00 - 19:00</span>
            </div>
          </div>

          <div className="mt-8 flex items-center space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-300">4.9/5 - Más de 2,500 clientes satisfechos</span>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">
                {salonSettings.name}
              </h1>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-8">
            {/* Auth Mode Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => switchMode('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  authMode === 'login'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => switchMode('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  authMode === 'register'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Registrarse
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field (Register and Guest) */}
              {(authMode === 'register' || authMode === 'guest') && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Tu nombre completo"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>
              )}

              {/* Email Field (Login and Register) */}
              {authMode !== 'guest' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
              )}

              {/* Phone Field (Register and Guest) */}
              {(authMode === 'register' || authMode === 'guest') && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="+56 9 1234 5678"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
              )}

              {/* Password Field (Login and Register) */}
              {authMode !== 'guest' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.password ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>
              )}

              {/* Confirm Password Field (Register only) */}
              {authMode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    {authMode === 'login' && <LogIn className="w-4 h-4 mr-2" />}
                    {authMode === 'register' && <UserPlus className="w-4 h-4 mr-2" />}
                    {authMode === 'guest' && <User className="w-4 h-4 mr-2" />}
                    {authMode === 'login' && 'Iniciar Sesión'}
                    {authMode === 'register' && 'Crear Cuenta'}
                    {authMode === 'guest' && 'Continuar como Invitado'}
                  </>
                )}
              </button>
            </form>

            {/* Guest Access */}
            {authMode !== 'guest' && (
              <div className="mt-6 text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-800 text-gray-400">o</span>
                  </div>
                </div>
                <button
                  onClick={() => switchMode('guest')}
                  className="mt-4 w-full py-2 px-4 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors flex items-center justify-center"
                >
                  <User className="w-4 h-4 mr-2" />
                  Acceso como Invitado
                </button>
              </div>
            )}

            {/* Back to Login/Register */}
            {authMode === 'guest' && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => switchMode('login')}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;