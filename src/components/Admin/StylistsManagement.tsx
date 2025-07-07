import React, { useState } from 'react';
import { Stylist } from '../../types';
import { stylists as initialStylists } from '../../data/mockData';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  User, 
  Mail, 
  Phone, 
  Star,
  Award,
  Clock
} from 'lucide-react';

const StylistsManagement: React.FC = () => {
  const [stylists, setStylists] = useState<Stylist[]>(initialStylists);
  const [editingStylist, setEditingStylist] = useState<Stylist | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialties: [] as string[],
    experience: '',
    profileImage: ''
  });

  const specialtyOptions = [
    'Cortes', 'Color', 'Mechas', 'Peinados', 'Tratamientos', 'Alisado', 
    'Permanente', 'Extensiones', 'Maquillaje', 'Cejas'
  ];

  const handleEdit = (stylist: Stylist) => {
    setEditingStylist(stylist);
    setFormData({
      name: stylist.name,
      email: stylist.email,
      phone: stylist.phone,
      specialties: stylist.specialties,
      experience: stylist.experience,
      profileImage: stylist.profileImage || ''
    });
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialties: [],
      experience: '',
      profileImage: ''
    });
  };

  const handleSave = () => {
    if (editingStylist) {
      // Update existing stylist
      setStylists(prev => prev.map(stylist => 
        stylist.id === editingStylist.id 
          ? { 
              ...stylist, 
              ...formData,
              profileImage: formData.profileImage || undefined
            }
          : stylist
      ));
      setEditingStylist(null);
    } else if (isCreating) {
      // Create new stylist
      const newStylist: Stylist = {
        id: Date.now().toString(),
        ...formData,
        rating: 5.0,
        profileImage: formData.profileImage || undefined,
        schedule: {
          monday: { start: '09:00', end: '18:00', isWorking: true },
          tuesday: { start: '09:00', end: '18:00', isWorking: true },
          wednesday: { start: '09:00', end: '18:00', isWorking: true },
          thursday: { start: '09:00', end: '18:00', isWorking: true },
          friday: { start: '09:00', end: '19:00', isWorking: true },
          saturday: { start: '10:00', end: '17:00', isWorking: true },
          sunday: { start: '10:00', end: '15:00', isWorking: false }
        }
      };
      setStylists(prev => [...prev, newStylist]);
      setIsCreating(false);
    }
    resetForm();
  };

  const handleDelete = (stylistId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este peluquero?')) {
      setStylists(prev => prev.filter(stylist => stylist.id !== stylistId));
    }
  };

  const handleCancel = () => {
    setEditingStylist(null);
    setIsCreating(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialties: [],
      experience: '',
      profileImage: ''
    });
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Gestión de Peluqueros</h1>
        <button
          onClick={handleCreate}
          className="btn-primary px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Peluquero</span>
        </button>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingStylist) && (
        <div className="glass-effect rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {isCreating ? 'Agregar Nuevo Peluquero' : 'Editar Peluquero'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nombre del peluquero"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="email@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="+56 9 1234 5678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Experiencia
              </label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ej: 5 años de experiencia"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                URL de Imagen de Perfil (opcional)
              </label>
              <input
                type="url"
                value={formData.profileImage}
                onChange={(e) => setFormData(prev => ({ ...prev, profileImage: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Especialidades
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {specialtyOptions.map(specialty => (
                  <button
                    key={specialty}
                    type="button"
                    onClick={() => handleSpecialtyToggle(specialty)}
                    className={`p-2 text-sm rounded-lg transition-all ${
                      formData.specialties.includes(specialty)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="btn-primary px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar</span>
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Cancelar</span>
            </button>
          </div>
        </div>
      )}

      {/* Stylists List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stylists.map((stylist) => (
          <div key={stylist.id} className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {stylist.profileImage ? (
                  <img 
                    src={stylist.profileImage} 
                    alt={stylist.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {stylist.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-white">{stylist.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 text-sm">{stylist.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(stylist)}
                  className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(stylist.id)}
                  className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>{stylist.email}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Phone className="w-4 h-4 text-purple-400" />
                <span>{stylist.phone}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>{stylist.experience}</span>
              </div>

              <div>
                <div className="flex items-center space-x-2 text-gray-300 text-sm mb-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>Especialidades:</span>
                </div>
                <div className="flex flex-wrap gap-1">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default StylistsManagement;