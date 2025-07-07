import React from 'react';
import { Calendar, Star, Clock, Users } from 'lucide-react';

interface HeroProps {
  onBookingClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookingClick }) => {
  const stats = [
    { icon: Users, label: 'Clientes Satisfechos', value: '2,500+' },
    { icon: Star, label: 'Calificación Promedio', value: '4.9' },
    { icon: Clock, label: 'Años de Experiencia', value: '15+' },
    { icon: Calendar, label: 'Citas Completadas', value: '10,000+' }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-purple-800/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Transforma tu Estilo</span>
            <br />
            <span className="text-gray-200">con Salon Elite</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Descubre la experiencia de belleza más exclusiva. Nuestros estilistas expertos 
            te ayudarán a lucir espectacular con los mejores tratamientos y técnicas de vanguardia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={onBookingClick}
              className="btn-primary px-8 py-4 rounded-xl font-semibold text-lg shadow-lg"
            >
              Reservar Cita Ahora
            </button>
            <button className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300">
              Ver Servicios
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-in">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;