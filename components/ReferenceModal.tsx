import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Trash2, ExternalLink, Upload, Smartphone, Download, Check, CreditCard } from 'lucide-react';
import { ReferenceItem, ServiceItem } from '../types';
import FakeReceipt from './FakeReceipt';
import { CASH_IMAGES } from '../constants';
import html2canvas from 'html2canvas';

interface ReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem | null;
  references: ReferenceItem[];
  isAdmin: boolean;
  onAddReference: (ref: ReferenceItem) => void;
  onDeleteReference: (id: string) => void;
}

const ReferenceModal: React.FC<ReferenceModalProps> = ({ 
  isOpen, 
  onClose, 
  service, 
  references, 
  isAdmin,
  onAddReference,
  onDeleteReference
}) => {
  // Navigation
  const [activeTab, setActiveTab] = useState<'gallery' | 'generator'>('gallery');

  // Upload State
  const [newDesc, setNewDesc] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generator State
  const [genData, setGenData] = useState({
    variant: 'bcp' as 'bcp' | 'yape' | 'interbank',
    amount: 'S/ 4,000.00',
    receiver: 'Castillo Flores Gabriel C.',
    sender: 'Cuenta Digital Soles',
    date: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short' }),
    time: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true }),
    operationNumber: Math.floor(10000000 + Math.random() * 90000000).toString()
  });
  const [selectedCashImg, setSelectedCashImg] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Set default tab based on admin status
  useEffect(() => {
    if (!isOpen) setActiveTab('gallery');
  }, [isOpen]);

  if (!isOpen) return null;

  const displayRefs = service 
    ? references.filter(r => r.serviceId === service.id)
    : references;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) return;
    addRef(previewUrl, newDesc || 'Referencia verificada');
    setPreviewUrl('');
    setNewDesc('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addRef = (imgUrl: string, desc: string) => {
    // If we are in "Global" view (service is null), default new refs to 's_transfers' as that's the most common use case
    const targetServiceId = service ? service.id : 's_transfers'; 
    onAddReference({
      id: Date.now().toString(),
      serviceId: targetServiceId,
      imageUrl: imgUrl,
      description: desc,
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleGenerateReceipt = async (action: 'download' | 'add') => {
    setIsGenerating(true);
    const element = document.getElementById('receipt-preview');
    if (element) {
      try {
        const canvas = await html2canvas(element, { 
            scale: 2,
            backgroundColor: null // transparent
        });
        const imgData = canvas.toDataURL('image/png');
        
        if (action === 'download') {
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `comprobante-${genData.variant}-${genData.operationNumber}.png`;
            link.click();
        } else {
            addRef(imgData, `Transferencia ${genData.variant.toUpperCase()} ${genData.amount}`);
            setActiveTab('gallery');
        }
      } catch (err) {
        console.error("Error generating receipt", err);
      }
    }
    setIsGenerating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 w-full max-w-6xl max-h-[95vh] rounded-2xl border border-slate-700 overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800 shrink-0">
          <div className="flex items-center gap-4">
             <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">SistemaPeru</span> {service ? service.title : 'Galería Global'}
                </h3>
                <p className="text-sm text-slate-400">Panel de Evidencias y Referencias</p>
             </div>
             
             {isAdmin && (
               <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700 ml-4">
                 <button 
                   onClick={() => setActiveTab('gallery')}
                   className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'gallery' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
                 >
                   Galería
                 </button>
                 <button 
                   onClick={() => setActiveTab('generator')}
                   className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'generator' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                 >
                   <Smartphone size={14} /> Generar Comprobante
                 </button>
               </div>
             )}
          </div>
          
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden flex flex-col bg-slate-900 relative">
          
          {activeTab === 'gallery' && (
            <div className="flex-1 overflow-y-auto p-6">
                 {displayRefs.length === 0 ? (
                    <div className="text-center py-20 text-slate-500">
                    <p>No hay referencias públicas cargadas.</p>
                    {isAdmin && <p className="text-emerald-400 mt-2">Sube una foto o genera un comprobante.</p>}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayRefs.map((ref) => (
                        <div key={ref.id} className="group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all">
                        <div className="aspect-[9/16] bg-slate-950 relative overflow-hidden">
                            <img 
                            src={ref.imageUrl} 
                            alt={ref.description} 
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                <span className="text-emerald-300 font-medium text-sm flex items-center gap-2">
                                    <ExternalLink size={14} /> Verificada
                                </span>
                            </div>
                        </div>
                        <div className="p-3">
                            <p className="text-white text-sm font-medium">{ref.description}</p>
                            <p className="text-slate-500 text-xs mt-1">{ref.date}</p>
                        </div>
                        {isAdmin && (
                            <button 
                            onClick={() => onDeleteReference(ref.id)}
                            className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                            >
                            <Trash2 size={16} />
                            </button>
                        )}
                        </div>
                    ))}
                    </div>
                )}
            </div>
          )}

          {activeTab === 'generator' && (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col lg:flex-row gap-8">
                  {/* Controls */}
                  <div className="w-full lg:w-[400px] shrink-0 space-y-5">
                      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 space-y-4">
                          <h4 className="text-emerald-400 font-bold text-sm uppercase flex items-center gap-2">
                             <CreditCard size={16} /> Tipo de Comprobante
                          </h4>
                          
                          <div className="grid grid-cols-3 gap-2">
                             <button
                               onClick={() => setGenData({...genData, variant: 'bcp'})}
                               className={`p-2 rounded-lg border text-sm font-bold transition-all ${genData.variant === 'bcp' ? 'bg-[#002a8d] border-[#ff7800] text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'}`}
                             >
                                BCP
                             </button>
                             <button
                               onClick={() => setGenData({...genData, variant: 'interbank'})}
                               className={`p-2 rounded-lg border text-sm font-bold transition-all ${genData.variant === 'interbank' ? 'bg-white border-[#003087] text-[#003087]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'}`}
                             >
                                Interbank
                             </button>
                             <button
                               onClick={() => setGenData({...genData, variant: 'yape'})}
                               className={`p-2 rounded-lg border text-sm font-bold transition-all ${genData.variant === 'yape' ? 'bg-[#7d00e8] border-[#00c6ad] text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'}`}
                             >
                                Yape
                             </button>
                          </div>
                      </div>

                      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 space-y-4">
                          <h4 className="text-emerald-400 font-bold text-sm uppercase">Datos</h4>
                          
                          <div>
                            <label className="text-xs text-slate-400">Monto</label>
                            <input 
                                type="text" 
                                value={genData.amount}
                                onChange={(e) => setGenData({...genData, amount: e.target.value})}
                                className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">Destinatario</label>
                            <input 
                                type="text" 
                                value={genData.receiver}
                                onChange={(e) => setGenData({...genData, receiver: e.target.value})}
                                className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm"
                            />
                          </div>
                          
                          {genData.variant !== 'yape' && (
                             <div>
                                <label className="text-xs text-slate-400">Remitente (Desde)</label>
                                <input 
                                    type="text" 
                                    value={genData.sender}
                                    onChange={(e) => setGenData({...genData, sender: e.target.value})}
                                    className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm"
                                />
                             </div>
                          )}

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs text-slate-400">Fecha</label>
                                <input 
                                    type="text" 
                                    value={genData.date}
                                    onChange={(e) => setGenData({...genData, date: e.target.value})}
                                    className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-400">Hora</label>
                                <input 
                                    type="text" 
                                    value={genData.time}
                                    onChange={(e) => setGenData({...genData, time: e.target.value})}
                                    className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm"
                                />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">Núm. Operación</label>
                            <input 
                                type="text" 
                                value={genData.operationNumber}
                                onChange={(e) => setGenData({...genData, operationNumber: e.target.value})}
                                className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm"
                            />
                          </div>
                      </div>

                      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 space-y-3">
                          <h4 className="text-emerald-400 font-bold text-sm uppercase">Fondo de Chat (Opcional)</h4>
                          <div className="grid grid-cols-4 gap-2">
                             <button 
                                onClick={() => setSelectedCashImg(null)}
                                className={`aspect-square rounded border flex items-center justify-center text-xs text-slate-400 ${!selectedCashImg ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-600'}`}
                             >
                                 Ninguno
                             </button>
                             {CASH_IMAGES.map((img, idx) => (
                                 <button
                                    key={idx}
                                    onClick={() => setSelectedCashImg(img)}
                                    className={`aspect-square rounded overflow-hidden border ${selectedCashImg === img ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-transparent'}`}
                                 >
                                     <img src={img} alt="cash" className="w-full h-full object-cover" />
                                 </button>
                             ))}
                          </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                          <button 
                            onClick={() => handleGenerateReceipt('download')}
                            disabled={isGenerating}
                            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium border border-slate-600 flex items-center justify-center gap-2"
                          >
                             <Download size={18} /> Descargar
                          </button>
                          <button 
                             onClick={() => handleGenerateReceipt('add')}
                             disabled={isGenerating}
                             className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/50"
                          >
                             {isGenerating ? 'Procesando...' : <><Plus size={18} /> Agregar a Galería</>}
                          </button>
                      </div>
                  </div>

                  {/* Preview Canvas */}
                  <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center p-8 overflow-y-auto">
                      {/* This wrapper is what gets captured by html2canvas */}
                      <div id="receipt-preview" className="relative bg-[#e5ddd5] shadow-2xl overflow-hidden min-w-[400px]">
                          {/* Chat Background simulation (WhatsApp style) */}
                          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")' }}></div>
                          
                          <div className="relative z-10 w-full min-h-[600px] flex flex-col p-4 gap-4 items-center">
                              {/* Fake Receipt Component */}
                              <div className="transform transition-transform">
                                <FakeReceipt 
                                    variant={genData.variant}
                                    amount={genData.amount}
                                    receiver={genData.receiver}
                                    sender={genData.sender}
                                    date={genData.date}
                                    time={genData.time}
                                    operationNumber={genData.operationNumber}
                                />
                              </div>

                              {/* Optional Cash Image Below */}
                              {selectedCashImg && (
                                  <div className="self-end max-w-[80%] rounded-lg overflow-hidden shadow-md border-4 border-[#dcf8c6]">
                                      <img src={selectedCashImg} alt="proof" className="w-full h-auto block" />
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
          )}
        </div>

        {/* Footer Upload (Only visible in Gallery mode) */}
        {isAdmin && activeTab === 'gallery' && (
          <div className="p-4 bg-slate-800 border-t border-slate-700 shrink-0">
            <h4 className="text-emerald-400 font-bold mb-3 text-sm uppercase tracking-wider">
              Subir Evidencia Manual
            </h4>
            <form onSubmit={handleAddUpload} className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1 w-full">
                <div className="relative">
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label 
                    htmlFor="file-upload"
                    className="flex items-center gap-2 w-full bg-slate-900 border border-slate-600 text-slate-300 rounded-lg px-4 py-2 text-sm cursor-pointer hover:border-emerald-500 transition-colors truncate"
                  >
                    <Upload size={16} />
                    {previewUrl ? 'Imagen seleccionada' : 'Seleccionar archivo...'}
                  </label>
                </div>
              </div>
              <div className="flex-1 w-full">
                <input 
                  type="text" 
                  placeholder="Descripción (Ej: Cliente satisfecho)" 
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2 text-sm focus:border-emerald-500 outline-none"
                />
              </div>
              <button 
                type="submit"
                disabled={!previewUrl}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed h-[38px]"
              >
                <Plus size={18} /> Subir
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferenceModal;