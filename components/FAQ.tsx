import React, { useState } from 'react';
import { FAQ_DATA } from '../constants';
import { Plus, Minus, MessageCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-brand-600 uppercase bg-brand-100 rounded-full">
            Ayuda y Soporte
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-slate-600">
            Encuentra respuestas rápidas sobre cómo funciona nuestro verificador de BINs, planes y seguridad.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id}
                className={`group bg-white rounded-xl transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'shadow-lg border-l-4 border-l-brand-500 ring-1 ring-slate-200' 
                    : 'shadow-sm hover:shadow-md border border-slate-100'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-semibold text-lg pr-8 transition-colors ${
                    isOpen ? 'text-brand-700' : 'text-slate-800 group-hover:text-brand-600'
                  }`}>
                    {item.question}
                  </span>
                  <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                    isOpen ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                  }`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4">¿Aún tienes dudas?</p>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm text-slate-700 font-medium hover:border-brand-300 hover:text-brand-600 hover:shadow-md transition-all group"
          >
            <MessageCircle size={18} className="text-brand-500 group-hover:scale-110 transition-transform" />
            <span>Contactar Soporte Técnico</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;