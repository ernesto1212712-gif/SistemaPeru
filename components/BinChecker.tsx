import React, { useState } from 'react';
import { Search, Loader2, CreditCard } from 'lucide-react';
import { analyzeBinWithAI } from '../services/geminiService';
import { BinInfo } from '../types';

const BinChecker: React.FC = () => {
  const [binInput, setBinInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BinInfo | null>(null);
  const [error, setError] = useState('');

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (binInput.length < 6) {
      setError('Por favor ingresa al menos los primeros 6 dígitos.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 800)); 
      
      const rawJson = await analyzeBinWithAI(binInput);
      // Clean JSON string in case model adds backticks
      const cleanJson = rawJson.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const data = JSON.parse(cleanJson);
      setResult({
        bin: binInput.substring(0, 6),
        bank: data.bank || 'Desconocido',
        brand: data.brand || 'Desconocido',
        country: data.country || 'Desconocido',
        level: data.level || 'Clásica',
        type: data.type || 'Crédito'
      });
    } catch (err) {
      setError('No se pudo verificar el BIN. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="checker" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Verificador de BIN Premium</h2>
              <p className="text-slate-500">Ingresa los primeros 6 dígitos de cualquier tarjeta para revelar sus detalles.</p>
            </div>

            <form onSubmit={handleCheck} className="max-w-md mx-auto relative mb-10">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <CreditCard size={20} />
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={binInput}
                  onChange={(e) => setBinInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Ej: 414720"
                  className="block w-full pl-10 pr-24 py-4 border border-slate-200 rounded-xl text-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-2 bottom-2 bg-brand-600 text-white px-6 rounded-lg font-medium hover:bg-brand-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Verificar'}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            </form>

            {result && (
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 animate-fade-in">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                   <div className="space-y-1">
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">BIN</p>
                      <p className="text-xl font-bold text-slate-900 font-mono">{result.bin}XXXX</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Marca</p>
                      <p className="text-lg font-medium text-slate-800">{result.brand}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Banco</p>
                      <p className="text-lg font-medium text-slate-800">{result.bank}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Tipo</p>
                      <p className="text-lg font-medium text-slate-800">{result.type}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Nivel</p>
                      <p className="text-lg font-medium text-slate-800">{result.level}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">País</p>
                      <p className="text-lg font-medium text-slate-800">{result.country}</p>
                   </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-slate-100 p-4 text-center text-xs text-slate-400 border-t border-slate-200">
            Los datos mostrados son estimaciones basadas en IA para demostración. No utilizar en producción real.
          </div>
        </div>
      </div>
    </section>
  );
};

export default BinChecker;
