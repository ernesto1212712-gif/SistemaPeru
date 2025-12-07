import React from 'react';
import { CheckCircle2, Eye, Camera, ShieldAlert, Edit2, Trash2, Plus } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesGridProps {
  services: ServiceItem[];
  isAdmin: boolean;
  onViewReferences: (service: ServiceItem) => void;
  onEdit: (service: ServiceItem) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ 
  services,
  isAdmin,
  onViewReferences,
  onEdit,
  onDelete,
  onAdd
}) => {
  return (
    <section id="services" className="py-24 bg-slate-900 scroll-mt-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-900/30 border border-emerald-500/20 rounded-full">
            Catálogo de Servicios
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Soluciones <span className="text-emerald-500">Especializadas</span>
          </h2>
          <p className="text-lg text-slate-400">
            Hacking Ético, Trámites Legales, Académicos y Financieros. Resultados garantizados y discreción absoluta.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:-translate-y-1"
              >
                {/* Admin Controls */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onEdit(service); }}
                      className="p-2 bg-slate-700 text-white rounded-full hover:bg-emerald-600 transition-colors"
                      title="Editar"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDelete(service.id); }}
                      className="p-2 bg-slate-700 text-red-400 rounded-full hover:bg-red-600 hover:text-white transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-black/20">
                           {Icon ? <Icon size={28} /> : <ShieldAlert size={28}/>}
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-700 text-slate-500">
                           <ShieldAlert size={16} />
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {service.title}
                    </h3>
                    
                    <p className="text-slate-400 mb-6 text-sm leading-relaxed flex-grow">
                    {service.description}
                    </p>

                    {service.features && (
                    <ul className="space-y-3 mb-8">
                        {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]"></div>
                            <span>{feature}</span>
                        </li>
                        ))}
                    </ul>
                    )}

                    <button 
                    onClick={() => onViewReferences(service)}
                    className="w-full mt-auto flex items-center justify-center gap-2 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 font-medium hover:border-emerald-500/50 hover:text-white transition-all group-hover:shadow-lg"
                    >
                    <Camera size={18} className="text-emerald-500" />
                    <span>Ver Evidencias</span>
                    </button>
                </div>
              </div>
            );
          })}
          
          {/* Add New Service Card */}
          {isAdmin && (
            <button
              onClick={onAdd}
              className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border-2 border-dashed border-slate-700 hover:border-emerald-500 transition-all duration-300 flex flex-col items-center justify-center h-full min-h-[400px]"
            >
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform mb-4">
                <Plus size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-300 group-hover:text-emerald-400">Agregar Servicio</h3>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;