import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Save, 
  Star,
  Award,
  Clock,
  Edit
} from 'lucide-react';

const StylistProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    experience: '5 años de experiencia',
    specialties: ['Cortes', 'Color'],
    profileImage: user?.avatar || '',
    bio: 'Especialista en cortes modernos y coloración. Me apasiona crear looks únicos para cada cliente.'
  });

  const specialtyOptions = [
    'Cortes', 'Color', 'Mechas', 'Peinados', 'Tratamientos', 'Alisado', 
    'Permanente', 'Extensiones', 'Maquillaje', 'Cejas'
  ];

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setProfileData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-primary px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
        >
          <Edit className="w-4 h-4" />
          <span>{isEditing ? 'Cancelar' : 'Editar Perfil'}</span>
        </button>
      </div>

      <div className="glass-effect rounded-2xl p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {profileData.profileImage ? (
                <img 
                  src={profileData.profileImage} 
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center border-4 border-purple-500">
                  <span className="text-3xl font-bold text-white">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
              
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 cursor-pointer hover:bg-purple-700 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-yellow-400 font-medium">4.9</span>
                <span className="text-gray-400 text-sm">(127 reseñas)</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>{profileData.experience}</span>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="flex-1 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nombre Completo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-white text-lg">{profileData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-white text-lg">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Teléfono
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-white text-lg">{profileData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Experiencia
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.experience}
                    onChange={(e) => setProfileData(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-white text-lg">{profileData.experience}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Biografía
              </label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              ) : (
                <p className="text-gray-300">{profileData.bio}</p>
              )}
            </div>

            {/* Specialties */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Award className="w-4 h-4 inline mr-2" />
                Especialidades
              </label>
              {isEditing ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {specialtyOptions.map(specialty => (
                    <button
                      key={specialty}
                      type="button"
                      onClick={() => handleSpecialtyToggle(specialty)}
                      className={`p-2 text-sm rounded-lg transition-all ${
                        profileData.specialties.includes(specialty)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="btn-primary px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Cambios</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-effect rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">127</div>
          <div className="text-gray-300">Citas Completadas</div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">4.9</div>
          <div className="text-gray-300">Calificación Promedio</div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
          <div className="text-gray-300">Satisfacción del Cliente</div>
        </div>
      </div>
    </div>
  );
};

export default StylistProfile;