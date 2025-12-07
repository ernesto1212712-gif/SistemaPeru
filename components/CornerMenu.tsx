import React, { useState } from 'react';
import { MoreVertical, Camera, LayoutGrid, X } from 'lucide-react';

interface CornerMenuProps {
  onOpenServices: () => void;
  onOpenReferences: () => void;
}

const CornerMenu: React.FC<CornerMenuProps> = ({ onOpenServices, onOpenReferences }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Menu Options */}
      <div 
        className={`absolute bottom-16 left-0 flex flex-col gap-3 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={() => {
            onOpenReferences();
            setIsOpen(false);
          }}
          className="flex items-center gap-3 bg-white text-slate-800 px-5 py-3 rounded-xl shadow-xl hover:bg-slate-50 border border-slate-100 min-w-[160px] font-medium"
        >
          <Camera size={20} className="text-emerald-600" />
          Referencias
        </button>
        
        <button
          onClick={() => {
            onOpenServices();
            setIsOpen(false);
          }}
          className="flex items-center gap-3 bg-white text-slate-800 px-5 py-3 rounded-xl shadow-xl hover:bg-slate-50 border border-slate-100 min-w-[160px] font-medium"
        >
          <LayoutGrid size={20} className="text-emerald-600" />
          Servicios
        </button>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-white text-slate-900 hover:bg-slate-50'
        } border border-slate-200`}
      >
        {isOpen ? <X size={24} /> : <MoreVertical size={24} />}
      </button>
    </div>
  );
};

export default CornerMenu;