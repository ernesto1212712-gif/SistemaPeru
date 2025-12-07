import React from 'react';
import { BANK_LOGOS } from '../constants';
import { ArrowRight, Wallet, CheckCircle2, Edit2, Trash2, Plus, Camera } from 'lucide-react';
import { PricingPackage } from '../types';

interface PricingTableProps {
  packages: PricingPackage[];
  isAdmin: boolean;
  onEdit: (pkg: PricingPackage) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onViewReferences: () => void;
}

const PricingTable: React.FC<PricingTableProps> = ({ 
  packages, 
  isAdmin,
  onEdit,
  onDelete,
  onAdd,
  onViewReferences
}) => {
  return (
    <section id="pricing" className="py-24 bg-slate-950 relative scroll-mt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <Wallet size={14} />
            <span>Retorno Inmediato</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Paquetes de <span className="text-emerald-400">Transferencia</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
            Multiplica tu capital. Sistema automático de dispersión bancaria.
          </p>

          <button 
            onClick={onViewReferences}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 border border-emerald-500/30 rounded-full text-emerald-400 font-medium hover:bg-emerald-950/30 hover:border-emerald-500/60 transition-all shadow-lg shadow-emerald-900/10 mb-8 group"
          >
            <Camera size={18} className="group-hover:scale-110 transition-transform" />
            Ver Referencias de Clientes
          </button>
          
          <div className="flex justify-center gap-4 mt-2">
            {BANK_LOGOS.slice(0, 4).map(bank => (
              <span key={bank.name} className="text-xs font-bold text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                {bank.name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`relative group rounded-2xl p-1 transition-all duration-300 hover:scale-[1.02] ${
                pkg.highlight 
                  ? 'bg-gradient-to-b from-emerald-500 to-teal-700 shadow-[0_0_30px_rgba(16,185,129,0.3)]' 
                  : 'bg-slate-800 border border-slate-700 hover:border-emerald-500/50'
              }`}
            >
               {/* Admin Controls */}
               {isAdmin && (
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onEdit(pkg); }}
                      className="p-2 bg-slate-900/80 text-white rounded-full hover:bg-emerald-600 transition-colors backdrop-blur-sm"
                      title="Editar"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDelete(pkg.id); }}
                      className="p-2 bg-slate-900/80 text-red-400 rounded-full hover:bg-red-600 hover:text-white transition-colors backdrop-blur-sm"
                      title="Eliminar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}

              <div className="h-full bg-slate-900 rounded-xl p-6 flex flex-col relative overflow-hidden">
                {pkg.highlight && (
                   <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                     MÁS VENDIDO
                   </div>
                )}
                
                <div className="mb-6 pb-6 border-b border-slate-800">
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Inversión</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">{pkg.pay}</span>
                    <span className="text-slate-500 font-medium hidden">PEN</span>
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                      <ArrowRight size={20} className="transform rotate-45" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Recibes en cuenta</p>
                      <p className="text-2xl font-bold text-emerald-400">{pkg.receive}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 size={14} className="text-emerald-500" /> 10 minutos entrega
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 size={14} className="text-emerald-500" /> Sin comisiones
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 size={14} className="text-emerald-500" /> Garantía total
                    </li>
                  </ul>
                </div>

                <button className={`w-full py-3 rounded-lg font-bold transition-all active:scale-95 ${
                  pkg.highlight 
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/50' 
                    : 'bg-slate-800 border border-slate-700 text-white hover:bg-slate-700'
                }`}>
                  Adquirir Ahora
                </button>
              </div>
            </div>
          ))}

          {/* Add New Package Card */}
          {isAdmin && (
            <button
              onClick={onAdd}
              className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed border-slate-700 hover:border-emerald-500 transition-all duration-300 flex flex-col items-center justify-center min-h-[300px]"
            >
               <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform mb-4">
                <Plus size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-300 group-hover:text-emerald-400">Nuevo Paquete</h3>
            </button>
          )}

        </div>
      </div>
    </section>
  );
};

export default PricingTable;