import React from 'react';
import { ArrowRight, CheckCircle, Zap, Shield } from 'lucide-react';
import { BANK_LOGOS } from '../constants';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white min-h-[90vh] flex flex-col justify-center pt-24">
      {/* Abstract Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-brand-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-8 backdrop-blur-md animate-fade-in-down">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Sistema Operativo 24/7</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight animate-fade-in-up">
          Soluciones Digitales <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
            Sin Dejar Rastro
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
          Accede a servicios financieros exclusivos, trámites académicos directos y limpieza legal. 
          <span className="text-white font-semibold"> Rápido. Seguro. Garantizado.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16 animate-fade-in-up delay-200">
          <a 
            href="#pricing"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-emerald-600 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            <span className="relative flex items-center gap-2">
              Ver Paquetes de Dinero <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a 
            href="#services"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-300 bg-slate-900/50 border border-slate-700 rounded-xl hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all hover:scale-105"
          >
            Explorar Servicios
          </a>
        </div>

        {/* Bank Strip */}
        <div className="border-t border-slate-800/50 pt-10 animate-fade-in-up delay-300">
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-6">
            Trabajamos directamente con
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
             {BANK_LOGOS.map((bank) => (
               <div key={bank.name} className="h-10 flex items-center justify-center bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all">
                  {/* Using text for reliability, but structure allows img */}
                  <span className="text-lg font-bold" style={{ color: bank.name === 'BCP' ? '#ff7800' : bank.name === 'BBVA' ? '#004481' : 'white' }}>
                    {bank.name}
                  </span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;