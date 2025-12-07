import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

interface FooterProps {
  onAdminClick: () => void;
  isAdmin: boolean;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick, isAdmin }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
                <ShieldCheck className="text-emerald-500" />
                <span>SistemaPeru</span>
             </div>
             <p className="max-w-xs text-sm">
               Tu plataforma de confianza para soluciones financieras, trámites académicos y servicios digitales. Garantía y anonimato.
             </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Hacking Ético</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Notas Universitarias</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Transferencias</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Limpieza Legal</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="https://t.me/SistemaPeruOfical" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Telegram Oficial</a></li>
              <li><a href="https://wa.me/51939544566" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">WhatsApp (+51 939 544 566)</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} @SistemaPeruOfical. Todos los derechos reservados.</p>
          
          <button 
            onClick={onAdminClick}
            className={`mt-4 md:mt-0 p-2 rounded-full transition-colors ${isAdmin ? 'text-emerald-500' : 'text-slate-800 hover:text-slate-700'}`}
            title="Admin Access (Alt + 2)"
          >
            <Lock size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;