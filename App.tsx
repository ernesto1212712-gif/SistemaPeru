import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import PricingTable from './components/PricingTable';
import FAQ from './components/FAQ';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';
import ReferenceModal from './components/ReferenceModal';
import AdminLogin from './components/AdminLogin';
import CornerMenu from './components/CornerMenu';
import ProductEditor from './components/ProductEditor';
import { LayoutGrid, Menu, X, UserCheck, Phone, Send } from 'lucide-react';
import { ServiceItem, ReferenceItem, PricingPackage } from './types';
import { INITIAL_REFERENCES, SERVICES_DATA, PACKAGES_DATA, ICON_MAP } from './constants';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Data State
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);
  const [packages, setPackages] = useState<PricingPackage[]>(PACKAGES_DATA);
  const [references, setReferences] = useState<ReferenceItem[]>(INITIAL_REFERENCES);

  // Admin & Modals State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRefModal, setShowRefModal] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Editor State
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'service' | 'package'>('service');
  const [editingItem, setEditingItem] = useState<ServiceItem | PricingPackage | null>(null);

  // Admin Shortcut Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Alt + 2
      if (e.altKey && e.key === '2') {
        setShowLogin(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowLogin(false);
  };

  // Scroll Handler
  const handleScrollTo = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reference Handlers
  const handleViewReferences = (service: ServiceItem) => {
    setSelectedService(service);
    setShowRefModal(true);
  };

  const handleViewAllReferences = () => {
    setSelectedService(null);
    setShowRefModal(true);
  };

  const handleViewTransferReferences = () => {
    // Mock service for Transferencias to filter by 's_transfers' ID
    const transferService: ServiceItem = {
      id: 's_transfers',
      title: 'Transferencias Bancarias',
      description: 'Transferencias',
      icon: null
    };
    setSelectedService(transferService);
    setShowRefModal(true);
  };

  const handleAddReference = (ref: ReferenceItem) => {
    setReferences(prev => [ref, ...prev]);
  };

  const handleDeleteReference = (id: string) => {
    setReferences(prev => prev.filter(r => r.id !== id));
  };

  // Service CRUD Handlers
  const openServiceEditor = (service: ServiceItem | null) => {
    setEditorMode('service');
    setEditingItem(service);
    setEditorOpen(true);
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este servicio?')) {
      setServices(prev => prev.filter(s => s.id !== id));
    }
  };

  // Package CRUD Handlers
  const openPackageEditor = (pkg: PricingPackage | null) => {
    setEditorMode('package');
    setEditingItem(pkg);
    setEditorOpen(true);
  };

  const handleDeletePackage = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este paquete?')) {
      setPackages(prev => prev.filter(p => p.id !== id));
    }
  };

  // Generic Save Handler for Editor
  const handleSaveProduct = (data: any) => {
    if (editorMode === 'service') {
      const newService = { ...data };
      // Map icon name back to component
      if (newService.iconName && ICON_MAP[newService.iconName]) {
        newService.icon = ICON_MAP[newService.iconName];
      }
      
      if (editingItem) {
        // Edit existing
        setServices(prev => prev.map(s => s.id === editingItem.id ? { ...newService, id: s.id } : s));
      } else {
        // Add new
        setServices(prev => [...prev, { ...newService, id: Date.now().toString() }]);
      }
    } else {
      // Package
      if (editingItem) {
         setPackages(prev => prev.map(p => p.id === editingItem.id ? { ...data, id: p.id } : p));
      } else {
         setPackages(prev => [...prev, { ...data, id: Date.now().toString() }]);
      }
    }
    setEditorOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-white cursor-pointer" onClick={() => handleScrollTo('top')}>
            <div className="bg-emerald-600 text-white p-1.5 rounded-lg shadow-lg shadow-emerald-500/20">
              <LayoutGrid size={20} />
            </div>
            <span>SistemaPeru</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <button onClick={() => handleScrollTo('top')} className="hover:text-emerald-400 transition-colors">Inicio</button>
            <button onClick={() => handleScrollTo('services')} className="hover:text-emerald-400 transition-colors">Servicios</button>
            <button onClick={() => handleScrollTo('pricing')} className="hover:text-emerald-400 transition-colors">Paquetes</button>
            <button onClick={() => handleScrollTo('faq')} className="hover:text-emerald-400 transition-colors">FAQ</button>
            {isAdmin && (
              <span className="flex items-center gap-1 text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
                <UserCheck size={12} /> ADMIN ACTIVO
              </span>
            )}
            <div className="flex items-center gap-2 ml-2">
              <a 
                href="https://t.me/SistemaPeruOfical" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#0088cc] text-white px-4 py-2 rounded-lg hover:bg-[#0077b5] transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <Send size={16} /> <span className="hidden lg:inline">Telegram</span>
              </a>
              <a 
                href="https://wa.me/51939544566" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#128c7e] transition-colors flex items-center gap-2 shadow-lg shadow-green-500/20"
              >
                <Phone size={16} /> <span className="hidden lg:inline">WhatsApp</span>
              </a>
            </div>
          </nav>

          <button 
            className="md:hidden p-2 text-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 absolute w-full px-4 py-4 shadow-xl flex flex-col gap-4 animate-fade-in-down">
            <button className="block w-full text-left py-2 text-slate-300 hover:text-emerald-400" onClick={() => handleScrollTo('top')}>Inicio</button>
            <button className="block w-full text-left py-2 text-slate-300 hover:text-emerald-400" onClick={() => handleScrollTo('services')}>Servicios</button>
            <button className="block w-full text-left py-2 text-slate-300 hover:text-emerald-400" onClick={() => handleScrollTo('pricing')}>Paquetes</button>
            <button className="block w-full text-left py-2 text-slate-300 hover:text-emerald-400" onClick={() => handleScrollTo('faq')}>FAQ</button>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <a href="https://t.me/SistemaPeruOfical" target="_blank" rel="noreferrer" className="bg-[#0088cc] text-white py-3 rounded-lg text-center flex items-center justify-center gap-2">
                <Send size={18} /> Telegram
              </a>
              <a href="https://wa.me/51939544566" target="_blank" rel="noreferrer" className="bg-[#25D366] text-white py-3 rounded-lg text-center flex items-center justify-center gap-2">
                <Phone size={18} /> WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        <Hero />
        
        <ServicesGrid 
          services={services}
          isAdmin={isAdmin}
          onViewReferences={handleViewReferences} 
          onEdit={openServiceEditor}
          onDelete={handleDeleteService}
          onAdd={() => openServiceEditor(null)}
        />
        
        <PricingTable 
          packages={packages}
          isAdmin={isAdmin}
          onEdit={openPackageEditor}
          onDelete={handleDeletePackage}
          onAdd={() => openPackageEditor(null)}
          onViewReferences={handleViewTransferReferences}
        />
        
        <FAQ />
      </main>

      <Footer onAdminClick={() => setShowLogin(true)} isAdmin={isAdmin} />
      <ChatWidget />
      
      <CornerMenu 
        onOpenServices={() => handleScrollTo('services')} 
        onOpenReferences={handleViewAllReferences} 
      />

      {/* Admin Login Modal */}
      {showLogin && (
        <AdminLogin 
          onLogin={handleAdminLogin} 
          onClose={() => setShowLogin(false)} 
        />
      )}

      {/* Reference Gallery Modal */}
      {showRefModal && (
        <ReferenceModal 
          isOpen={showRefModal}
          onClose={() => setShowRefModal(false)}
          service={selectedService}
          references={references}
          isAdmin={isAdmin}
          onAddReference={handleAddReference}
          onDeleteReference={handleDeleteReference}
        />
      )}

      {/* Product Editor Modal (Services & Packages) */}
      {editorOpen && (
        <ProductEditor 
          isOpen={editorOpen}
          onClose={() => setEditorOpen(false)}
          mode={editorMode}
          initialData={editingItem}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default App;