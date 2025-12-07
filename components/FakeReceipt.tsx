import React from 'react';
import { Check, Share2, Download, ChevronRight, X, MoreVertical, Search, Menu } from 'lucide-react';

interface FakeReceiptProps {
  variant?: 'bcp' | 'yape' | 'interbank';
  amount: string;
  receiver: string;
  sender: string;
  date: string;
  time: string;
  operationNumber: string;
  id?: string;
}

const FakeReceipt: React.FC<FakeReceiptProps> = ({
  variant = 'bcp',
  amount,
  receiver,
  sender,
  date,
  time,
  operationNumber,
  id
}) => {
  const cleanAmount = amount.replace('S/', '').trim();

  // --- YAPE DESIGN ---
  if (variant === 'yape') {
    return (
      <div 
        id={id} 
        className="w-[375px] bg-[#591d87] overflow-hidden font-sans relative shadow-2xl mx-auto min-h-[700px] flex flex-col"
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        {/* Top Header */}
        <div className="flex justify-between items-center p-6 text-white">
           <div className="w-10 h-10 rounded-full bg-[#00c6ad]"></div> {/* User Avatar Placeholder */}
           <button className="w-8 h-8 rounded-full bg-[#6a3593] flex items-center justify-center">
             <X size={20} />
           </button>
        </div>

        {/* Main Card */}
        <div className="px-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg relative z-10">
             <div className="flex justify-between items-start mb-2">
                <h2 className="text-[#591d87] text-2xl font-bold tracking-tight">¡Yapeaste!</h2>
                <div className="flex items-center gap-1 text-[#00c6ad] font-medium text-sm">
                   <Share2 size={16} /> COMPARTIR
                </div>
             </div>
             
             <div className="flex items-baseline gap-1 mb-1">
               <span className="text-2xl font-bold text-slate-800">S/</span>
               <span className="text-5xl font-bold text-slate-800">{cleanAmount}</span>
             </div>

             <h3 className="text-xl font-medium text-slate-900 mb-1">{receiver}</h3>
             
             <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                <span>📅 {date}</span>
                <span className="text-slate-300">|</span>
                <span>🕒 {time}</span>
             </div>

             {/* Security Code */}
             <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3 mb-6 border border-slate-100">
                <span className="text-xs text-slate-400 font-bold uppercase flex items-center gap-1">
                   Código de seguridad <div className="w-4 h-4 rounded-full border border-emerald-400 text-emerald-400 flex items-center justify-center text-[10px]">i</div>
                </span>
                <div className="flex gap-2">
                   {[3, 5, 8].map((n, i) => (
                      <div key={i} className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-slate-700">
                         {Math.floor(Math.random() * 9)}
                      </div>
                   ))}
                </div>
             </div>

             {/* Details Table */}
             <div className="space-y-3">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Datos de la transacción</p>
                
                <div className="flex justify-between text-sm">
                   <span className="text-slate-600">Nro. de celular</span>
                   <span className="text-slate-900 font-medium">*** *** {Math.floor(100 + Math.random() * 899)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                   <span className="text-slate-600">Destino</span>
                   <span className="text-slate-900 font-medium">Yape</span>
                </div>

                <div className="flex justify-between text-sm">
                   <span className="text-slate-600">Nro. de operación</span>
                   <span className="text-slate-900 font-medium">{operationNumber}</span>
                </div>
             </div>
          </div>
        </div>

        {/* Promo Banner */}
        <div className="px-4 mt-6">
           <div className="flex items-center gap-2 mb-3">
              <span className="text-white font-bold text-lg">Más en Yape</span>
              <span className="bg-[#fbbf24] text-[#591d87] text-[10px] font-bold px-2 py-0.5 rounded">Nuevo</span>
           </div>
           
           <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-lg overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#ffc700]"></div>
              <div className="pl-4 flex-1">
                 <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xs mb-2">M</div>
                 <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80" className="w-24 h-24 object-contain absolute bottom-[-10px] left-[40px] rotate-[-10deg]" alt="burger" />
              </div>
              <div className="flex-1 text-right pl-16">
                 <p className="text-xs text-slate-500 font-bold mb-1">% Cuarto de libra</p>
                 <p className="text-slate-900 font-bold text-sm leading-tight mb-2">con queso + papa regular</p>
                 <div className="inline-block bg-black text-white px-3 py-1 rounded-full text-xs font-bold">
                    A SOLO S/ 11.90
                 </div>
              </div>
           </div>
        </div>

      </div>
    );
  }

  // --- INTERBANK DESIGN ---
  if (variant === 'interbank') {
    return (
      <div 
        id={id} 
        className="w-[375px] bg-white overflow-hidden font-sans relative shadow-2xl mx-auto flex flex-col min-h-[700px]"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
         {/* Status Icon */}
         <div className="pt-16 pb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full border-4 border-[#ff7800] flex items-center justify-center">
               <Check size={40} className="text-[#ff7800]" strokeWidth={3} />
            </div>
         </div>

         <div className="text-center px-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">¡Operación exitosa!</h2>
            <p className="text-4xl font-medium text-[#003087] mb-4 tracking-tight">S/ {cleanAmount}</p>
            <p className="text-slate-400 text-sm">{date} - {time}</p>
         </div>

         {/* Actions */}
         <div className="flex justify-center gap-12 mt-8 mb-10">
            <div className="flex flex-col items-center gap-2 text-[#ff7800] cursor-pointer">
               <Download size={24} />
               <span className="font-medium text-sm">Descargar</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-[#ff7800] cursor-pointer">
               <Share2 size={24} />
               <span className="font-medium text-sm">Compartir</span>
            </div>
         </div>

         {/* Details */}
         <div className="px-8 space-y-6 flex-1">
             <div className="flex justify-between items-start">
                <span className="text-slate-500 text-sm">Enviado a</span>
                <div className="text-right">
                   <p className="text-slate-900 font-semibold">{receiver}</p>
                   <p className="text-slate-400 text-xs mt-0.5">****{Math.floor(1000 + Math.random() * 8999)}</p>
                   <p className="text-slate-400 text-xs">Moneda soles</p>
                </div>
             </div>
             
             <div className="h-px bg-slate-100"></div>

             <div className="flex justify-between items-start">
                <span className="text-slate-500 text-sm">Desde</span>
                <div className="text-right">
                   <p className="text-slate-900 font-semibold">{sender}</p>
                   <p className="text-slate-400 text-xs mt-0.5">****{Math.floor(1000 + Math.random() * 8999)}</p>
                </div>
             </div>

             <div className="h-px bg-slate-100"></div>

             <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Número de operación</span>
                <span className="text-slate-900 font-semibold">{operationNumber}</span>
             </div>
         </div>

         {/* Banner */}
         <div className="px-6 mt-8 mb-8">
            <div className="bg-[#003087] rounded-xl p-4 flex items-center justify-between text-white overflow-hidden relative">
               <div className="relative z-10 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-yellow-300">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <div>
                     <p className="font-bold text-sm">Protege tus tarjetas</p>
                     <p className="text-[10px] text-blue-200">Por solo S/ 13.99 al mes inc. IGV</p>
                  </div>
               </div>
               {/* Decorators */}
               <div className="absolute right-0 top-0 bottom-0 w-16 bg-blue-600/30 transform skew-x-12"></div>
            </div>
         </div>
         
         {/* Footer Button */}
         <div className="px-6 pb-8">
            <button className="w-full bg-[#ff7800] text-white font-bold py-4 rounded-full text-lg shadow-lg hover:bg-[#e66a00] transition-colors">
               Realizar otra transferencia
            </button>
            <button className="w-full text-[#ff7800] font-medium py-4 text-sm">
               Ir al inicio
            </button>
         </div>

      </div>
    );
  }

  // --- BCP DESIGN (DEFAULT) ---
  return (
    <div 
      id={id} 
      className="w-[375px] bg-[#f7f8fa] overflow-hidden font-sans relative shadow-2xl mx-auto"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
    >
      {/* Top Section - Blue */}
      <div className="bg-[#002a8d] text-white pt-8 pb-12 px-6 relative rounded-b-[2rem]">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-[#ff7800] rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-white/10">
            <Check size={32} strokeWidth={4} className="text-white" />
          </div>
          
          <h2 className="text-xl font-semibold tracking-tight mb-2">¡Transferencia exitosa!</h2>
          <p className="text-4xl font-light mb-1 tracking-tight">{amount}</p>
          <p className="text-white/70 text-xs font-medium">{date} - {time}</p>
        </div>

        <div className="flex justify-center gap-6 mt-8 text-sm font-semibold text-[#ff7800]">
            <div className="flex items-center gap-2 cursor-pointer bg-white px-5 py-2.5 rounded-full shadow-lg hover:bg-orange-50 transition-colors">
                <Download size={18} /> 
                <span className="pt-0.5">Descargar</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer bg-white px-5 py-2.5 rounded-full shadow-lg hover:bg-orange-50 transition-colors">
                <Share2 size={18} /> 
                <span className="pt-0.5">Compartir</span>
            </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="px-6 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5 border border-slate-100">
            
            <div className="flex justify-between items-start">
                <span className="text-slate-500 text-sm font-medium">Enviado a</span>
                <div className="text-right">
                    <p className="text-slate-900 font-semibold text-base">{receiver}</p>
                    <p className="text-slate-400 text-xs mt-0.5">****9494</p>
                    <p className="text-slate-400 text-xs">Moneda soles</p>
                </div>
            </div>
            
            <div className="border-t border-slate-100"></div>

            <div className="flex justify-between items-start">
                <span className="text-slate-500 text-sm font-medium">Desde</span>
                <div className="text-right">
                    <p className="text-slate-900 font-semibold text-base">{sender}</p>
                    <p className="text-slate-400 text-xs mt-0.5">****{Math.floor(1000 + Math.random() * 9000)}</p>
                </div>
            </div>

             <div className="border-t border-slate-100"></div>

            <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm font-medium">Número de operación</span>
                <span className="text-slate-900 font-bold tracking-wide">{operationNumber}</span>
            </div>
        </div>
      </div>

      {/* Ad Banner Fake */}
      <div className="p-6">
        <div className="bg-gradient-to-r from-[#0051e7] to-[#0034a7] rounded-xl p-4 flex items-center justify-between text-white shadow-lg relative overflow-hidden group cursor-pointer">
            <div className="absolute right-0 top-0 w-24 h-24 bg-white/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
            
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <div>
                    <p className="font-bold text-sm">Protege tus tarjetas</p>
                    <p className="text-[11px] opacity-80 font-medium">Por solo S/ 12.99 al mes inc IGV</p>
                </div>
            </div>
            <div className="bg-white/20 p-1 rounded-full">
              <ChevronRight size={16} />
            </div>
        </div>
      </div>

      <div className="text-center pb-8 pt-2">
         <button className="bg-[#ff7800] text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-orange-500/30 text-sm hover:bg-[#e66a00] transition-colors">
            Realiza otra transferencia
         </button>
      </div>

    </div>
  );
};

export default FakeReceipt;