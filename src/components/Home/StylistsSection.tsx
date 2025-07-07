import React from 'react';
import { Stylist } from '../../types';
import { stylists } from '../../data/mockData';
import { Star, Award, Clock } from 'lucide-react';

interface StylistsSectionProps {
  onStylistSelect?: (stylist: Stylist) => void;
}

const StylistsSection: React.FC<StylistsSectionProps> = ({ onStylistSelect }) => {
  return (
    <section className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Nuestros Estilistas</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Conoce a nuestro equipo de profesionales expertos en belleza y estilo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stylists.map((stylist, index) => (
            <div
              key={stylist.id}
              className="glass-effect rounded-2xl p-6 card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {stylist.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {stylist.name}
                </h3>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 font-medium">{stylist.rating}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{stylist.experience}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Award className="w-4 h-4 mr-2 text-purple-400" />
                  Especialidades
                </h4>
                <div className="flex flex-wrap gap-2">
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

              {onStylistSelect && (
                <button
                  onClick={() => onStylistSelect(stylist)}
                  className="w-full btn-primary py-2 rounded-lg font-medium"
                >
                  Reservar con {stylist.name.split(' ')[0]}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StylistsSection;