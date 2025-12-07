export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pagos' | 'seguridad';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide icon
  iconName?: string; // String identifier for the icon
  features?: string[];
  category?: string;
}

export interface PricingPackage {
  id: string;
  pay: string;
  receive: string;
  highlight?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface BinInfo {
  bin: string;
  bank: string;
  brand: string;
  country: string;
  level: string;
  type: string;
}

export interface ReferenceItem {
  id: string;
  serviceId: string;
  imageUrl: string;
  description: string;
  date: string;
}