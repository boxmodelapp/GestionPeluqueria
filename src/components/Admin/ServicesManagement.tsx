import React, { useState } from 'react';
import { Service } from '../../types';
import { services as initialServices } from '../../data/mockData';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Clock, 
  DollarSign,
  Scissors,
  Palette,
  Brush,
  Crown,
  Droplets,
  Zap
} from 'lucide-react';

const iconOptions = [
  { value: 'Scissors', label: 'Tijeras', icon: Scissors },
  { value: 'Palette', label: 'Paleta', icon: Palette },
  { value: 'Brush', label: 'Pincel', icon: Brush },
  { value: 'Crown', label: 'Corona', icon: Crown },
  { value: 'Droplets', label: 'Gotas', icon: Droplets },
  { value: 'Zap', label: 'Rayo', icon: Zap }
];

const ServicesManagement: React.FC = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 30,
    price: 0,
    category: '',
    icon: 'Scissors'
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      category: service.category,
      icon: service.icon
    });
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      name: '',
      description: '',
      duration: 30,
      price: 0,
      category: '',
      icon: 'Scissors'
    });
  };

  const handleSave = () => {
    if (editingService) {
      // Update existing service
      setServices(prev => prev.map(service => 
        service.id === editingService.id 
          ? { ...service, ...formData }
          : service
      ));
      setEditingService(null);
    } else if (isCreating) {
      // Create new service
      const newService: Service = {
        id: Date.now().toString(),
        ...formData
      };
      setServices(prev => [...prev, newService]);
      setIsCreating(false);
    }
    resetForm();
  };

  const handleDelete = (serviceId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      setServices(prev => prev.filter(service => service.id !== serviceId));
    }
  };

  const handleCancel = () => {
    setEditingService(null);
    setIsCreating(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      duration: 30,
      price: 0,
      category: '',
      icon: 'Scissors'
    });
  };

  const getIcon = (iconName: string) => {
    const iconOption = iconOptions.find(option => option.value === iconName);
    return iconOption ? iconOption.icon : Scissors;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Gestión de Servicios</h1>
        <button
          onClick={handleCreate}
          className="btn-primary px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Servicio</span>
        </button>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingService) && (
        <div className="glass-effect rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {isCreating ? 'Crear Nuevo Servicio' : 'Editar Servicio'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre del Servicio
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ej: Corte de Cabello"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Categoría
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ej: Cortes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Duración (minutos)
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="15"
                step="15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Precio (CLP)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="0"
                step="1000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Descripción del servicio..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Icono
              </label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {iconOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = getIcon(service.icon);
          return (
            <div key={service.id} className="glass-effect rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {service.name}
              </h3>
              
              <p className="text-gray-300 mb-4 text-sm">
                {service.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration} min</span>
                  </div>
                  <span className="text-sm px-2 py-1 bg-purple-900/50 text-purple-300 rounded-full">
                    {service.category}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-purple-400">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold">{formatPrice(service.price)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesManagement;