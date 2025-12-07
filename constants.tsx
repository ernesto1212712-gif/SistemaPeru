import { FAQItem, ServiceItem, PricingPackage, ReferenceItem } from './types';
import { 
  ShieldCheck, 
  Globe, 
  CreditCard, 
  Zap, 
  GraduationCap, 
  ShoppingBag, 
  FileText, 
  RefreshCcw,
  Plane,
  Smartphone,
  Siren,
  Ticket,
  Database,
  Car,
  Lock,
  Wifi,
  Key,
  DollarSign,
  Briefcase
} from 'lucide-react';
import React from 'react';

export const BANK_LOGOS = [
  { name: 'BCP', color: '#002a8d', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Banco_de_Cr%C3%A9dito_del_Per%C3%BA_logo.svg/2560px-Banco_de_Cr%C3%A9dito_del_Per%C3%BA_logo.svg.png' },
  { name: 'BBVA', color: '#004481', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/BBVA_2019.svg/1200px-BBVA_2019.svg.png' },
  { name: 'Interbank', color: '#009739', url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Interbank_logo.png' },
  { name: 'Scotiabank', color: '#ec111a', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Scotiabank_logo.svg/2560px-Scotiabank_logo.svg.png' },
  { name: 'Yape', color: '#7d00e8', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Yape_text_app_icon.png/640px-Yape_text_app_icon.png' },
  { name: 'Plin', color: '#00c7b1', url: 'https://seeklogo.com/images/P/plin-logo-9CA387D095-seeklogo.com.png' }
];

// Map for the editor to select icons
export const ICON_MAP: Record<string, any> = {
  Smartphone,
  GraduationCap,
  Siren,
  Database,
  Car,
  Ticket,
  CreditCard,
  ShieldCheck,
  Globe,
  Zap,
  ShoppingBag,
  FileText,
  RefreshCcw,
  Plane,
  Wifi,
  Key,
  DollarSign,
  Briefcase
};

export const CASH_IMAGES = [
  'https://images.unsplash.com/photo-1621981386629-6433060189d5?auto=format&fit=crop&q=80&w=400', // Soles/Money pile
  'https://images.unsplash.com/photo-1593672715438-d88a70629afd?auto=format&fit=crop&q=80&w=400', // Hand holding money
  'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=400', // Money spread
  'https://images.unsplash.com/photo-1559589689-577aabd1db4f?auto=format&fit=crop&q=80&w=400', // Cash close up
  'https://images.unsplash.com/photo-1518183214770-9cffbec72538?auto=format&fit=crop&q=80&w=400', // More money
  'https://images.unsplash.com/photo-1579621970563-ebec7560eb3e?auto=format&fit=crop&q=80&w=400'  // Money jar/hand
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: '1',
    category: 'pagos',
    question: '¿Cómo funciona el cambio de notas universitario?',
    answer: 'Ingresamos directamente al sistema de MINEDU o de la universidad privada/nacional. La modificación es permanente y figura en el historial oficial.'
  },
  {
    id: '2',
    category: 'general',
    question: '¿Qué garantía tengo en transferencias?',
    answer: 'El tiempo de entrega es de 10 minutos máximo. Contamos con cientos de referencias verificables. Si el dinero no llega, se reembolsa.'
  },
  {
    id: '3',
    category: 'seguridad',
    question: '¿Es seguro el borrado de Antecedentes/RQ?',
    answer: 'Sí, eliminamos registros del sistema policial y judicial. El borrado es total y permite libre tránsito.'
  },
  {
    id: '4',
    category: 'pagos',
    question: '¿Cómo funcionan los billetes G5?',
    answer: 'Son reproducciones de alta calidad (G5) indistinguibles al tacto y vista, pasan pruebas básicas. Se envían por courier o entrega personal según coordinación.'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 's_hack_social',
    title: 'Hacking & Redes Sociales',
    description: 'Recuperación y acceso a cuentas. Clonación de WhatsApp, Facebook, Instagram, TikTok, Gmail.',
    icon: Smartphone,
    iconName: 'Smartphone',
    features: ['WhatsApp / Telegram', 'Redes Sociales', 'Verificación 2 pasos']
  },
  {
    id: 's_academic',
    title: 'Trámites Académicos (Todo Perú)',
    description: 'Cambio de notas en sistema, Títulos Universitarios, Certificados de Estudios, Bachiller.',
    icon: GraduationCap,
    iconName: 'GraduationCap',
    features: ['Todas las Universidades', 'Directo a MINEDU/SUNEDU', 'Secundaria Completa']
  },
  {
    id: 's_legal',
    title: 'Limpieza Legal y Policial',
    description: 'Borrado de RQ (Requisitorias), Antecedentes Policiales/Penales, Denuncias. Limpieza total.',
    icon: Siren,
    iconName: 'Siren',
    features: ['Borrado de RQ', 'Limpieza de Denuncias', 'Eliminación de Puntos']
  },
  {
    id: 's_finance',
    title: 'Servicios Financieros & Infocorp',
    description: 'Limpieza de deudas en Infocorp (Verde), Reportes Sentinel, Préstamos inmediatos.',
    icon: Database,
    iconName: 'Database',
    features: ['Borrado Infocorp', 'Deuda en Cero', 'Tarjetas CC con Saldo']
  },
  {
    id: 's_transport',
    title: 'Trámites Vehiculares',
    description: 'Licencias de conducir (físicas/electrónicas), SOAT La Positiva con descuento, Papeletas.',
    icon: Car,
    iconName: 'Car',
    features: ['Licencias MTC', 'Baja de Papeletas', 'Cambio de Datos Vehículo']
  },
  {
    id: 's_discount',
    title: 'Pagos y Descuentos 50%',
    description: 'Pagamos tus deudas y gustos a mitad de precio. Luz, Agua, Universidades, Cineplanet.',
    icon: Ticket,
    iconName: 'Ticket',
    features: ['Recibos Servicios', 'Vuelos / Bus', 'Entradas Cineplanet']
  },
  {
    id: 's_money',
    title: 'Venta de Billetes G5',
    description: 'Billetes de alta calidad (G5). Pasan filtros básicos. Disponibles en 10, 20, 50, 100, 200.',
    icon: CreditCard,
    iconName: 'CreditCard',
    features: ['Alta Calidad', 'Envíos Nacionales', 'Indetectables']
  }
];

export const PACKAGES_DATA: PricingPackage[] = [
  { id: 'p1', pay: 'S/ 150', receive: 'S/ 3,500' },
  { id: 'p2', pay: 'S/ 200', receive: 'S/ 4,000' },
  { id: 'p3', pay: 'S/ 300', receive: 'S/ 4,700', highlight: true },
  { id: 'p4', pay: 'S/ 450', receive: 'S/ 5,250' },
  { id: 'p5', pay: 'S/ 600', receive: 'S/ 7,000' },
  { id: 'p6', pay: 'S/ 1000', receive: 'S/ 12,000', highlight: true },
];

// Initial dummy references
export const INITIAL_REFERENCES: ReferenceItem[] = [
  { id: 'r1', serviceId: 's_academic', imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600', description: 'Título registrado en sistema', date: '2024-02-15' },
  { id: 'r2', serviceId: 's_money', imageUrl: 'https://images.unsplash.com/photo-1621981386629-6433060189d5?auto=format&fit=crop&q=80&w=600', description: 'Envío de G5 recibido', date: '2024-02-20' },
  { id: 'r3', serviceId: 's_transfers', imageUrl: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=400', description: 'Transferencia S/ 4,000 Completada', date: '2024-02-24' },
  { id: 'r4', serviceId: 's_transfers', imageUrl: 'https://images.unsplash.com/photo-1559589689-577aabd1db4f?auto=format&fit=crop&q=80&w=400', description: 'Retiro exitoso BCP', date: '2024-02-25' },
  { id: 'r5', serviceId: 's_hack_social', imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600', description: 'Acceso a cuenta recuperado', date: '2024-02-22' },
  { id: 'r6', serviceId: 's_finance', imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=600', description: 'Reporte Infocorp en Verde', date: '2024-02-25' },
];