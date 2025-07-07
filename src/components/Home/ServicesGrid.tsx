import React from 'react';
import { Service } from '../../types';
import { services } from '../../data/mockData';
import { 
  Scissors, 
  Palette, 
  Brush, 
  Crown, 
  Droplets, 
  Zap,
  Clock,
  DollarSign
} from 'lucide-react';

interface ServicesGridProps {
  onServiceSelect?: (service: Service) => void;
}

const iconMap = {
  Scissors,
  Palette,
  Brush,
  Crown,
  Droplets,
  Zap
};

const ServicesGrid: React.FC<ServicesGridProps> = ({ onServiceSelect }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    }
    return `${mins}min`;
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Nuestros Servicios</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios de belleza con los mejores profesionales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={service.id}
                className="glass-effect rounded-2xl p-6 card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {service.name}
                </h3>
                
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{formatDuration(service.duration)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-400">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold">{formatPrice(service.price)}</span>
                  </div>
                </div>

                {onServiceSelect && (
                  <button
                    onClick={() => onServiceSelect(service)}
                    className="w-full btn-primary py-2 rounded-lg font-medium"
                  >
                    Seleccionar Servicio
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;