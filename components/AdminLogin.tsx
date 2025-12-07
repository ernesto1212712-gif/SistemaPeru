import React, { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'mela1234') {
      onLogin();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white"
        >
          ✕
        </button>
        
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-slate-800 rounded-full text-emerald-500 mb-4">
            <Lock size={24} />
          </div>
          <h2 className="text-xl font-bold text-white">Acceso Administrativo</h2>
          <p className="text-slate-400 text-sm mt-1">Ingresa la clave maestra</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className={`w-full bg-slate-950 border ${error ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all text-center tracking-widest`}
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-all active:scale-95"
          >
            INGRESAR
          </button>
        </form>

        {error && (
            <div className="mt-4 flex items-center justify-center gap-2 text-red-400 text-sm animate-shake">
                <AlertCircle size={16} />
                <span>Clave incorrecta</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;