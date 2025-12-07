import React, { useState, useEffect } from 'react';
import { X, Save, Check } from 'lucide-react';
import { ServiceItem, PricingPackage } from '../types';
import { ICON_MAP } from '../constants';

interface ProductEditorProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'service' | 'package';
  initialData?: ServiceItem | PricingPackage | null;
  onSave: (data: any) => void;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ 
  isOpen, 
  onClose, 
  mode, 
  initialData, 
  onSave 
}) => {
  // Common state
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      // Defaults
      if (mode === 'service') {
        setFormData({
          title: '',
          description: '',
          iconName: 'Zap',
          features: []
        });
      } else {
        setFormData({
          pay: 'S/ ',
          receive: 'S/ ',
          highlight: false
        });
      }
    }
  }, [initialData, mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-700 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800 rounded-t-2xl">
          <h3 className="text-xl font-bold text-white">
            {initialData ? 'Editar' : 'Crear'} {mode === 'service' ? 'Servicio' : 'Paquete'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          
          {mode === 'service' ? (
            <>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Título del Servicio</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none"
                  placeholder="Ej: Hacking de Redes"
                />
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-1">Descripción</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description || ''}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none"
                  placeholder="Descripción breve..."
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Icono</label>
                <div className="grid grid-cols-6 gap-2 bg-slate-800 p-2 rounded-lg border border-slate-600 max-h-32 overflow-y-auto">
                  {Object.keys(ICON_MAP).map(iconKey => {
                    const Icon = ICON_MAP[iconKey];
                    const isSelected = formData.iconName === iconKey;
                    return (
                      <button
                        key={iconKey}
                        type="button"
                        onClick={() => setFormData({...formData, iconName: iconKey})}
                        className={`p-2 rounded flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-700'
                        }`}
                        title={iconKey}
                      >
                        <Icon size={20} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Características (Una por línea)</label>
                <textarea
                  rows={4}
                  value={Array.isArray(formData.features) ? formData.features.join('\n') : ''}
                  onChange={e => setFormData({...formData, features: e.target.value.split('\n')})}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none"
                  placeholder="WhatsApp&#10;Telegram&#10;Garantía"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Monto a Pagar</label>
                <input
                  type="text"
                  required
                  value={formData.pay || ''}
                  onChange={e => setFormData({...formData, pay: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none font-bold"
                  placeholder="S/ 150"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Monto a Recibir</label>
                <input
                  type="text"
                  required
                  value={formData.receive || ''}
                  onChange={e => setFormData({...formData, receive: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none font-bold text-emerald-400"
                  placeholder="S/ 3500"
                />
              </div>

              <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg border border-slate-700">
                <input
                  type="checkbox"
                  id="highlight"
                  checked={formData.highlight || false}
                  onChange={e => setFormData({...formData, highlight: e.target.checked})}
                  className="w-5 h-5 rounded border-slate-600 text-emerald-600 focus:ring-emerald-500 bg-slate-700"
                />
                <label htmlFor="highlight" className="text-white text-sm font-medium cursor-pointer">
                  Destacar este paquete (Más Vendido)
                </label>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-slate-700 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-500 transition-colors flex items-center gap-2"
            >
              <Save size={18} />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditor;