
export type UserRole = 'customer' | 'officiant' | 'admin';

export type Religion = 'hindu' | 'muslim' | 'sikh' | 'christian';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  religion: Religion;
  profileImage?: string;
}

export interface Ceremony {
  id: string;
  name: string;
  religion: Religion;
  description: string;
  image: string;
  category: string;
}

export interface Officiant {
  id: string;
  name: string;
  religion: Religion;
  profileImage: string;
  experience: number;
  specialties: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  fee: number;
  currency: string;
  availability: 'online' | 'offline' | 'both';
  isVerified: boolean;
}

export interface Booking {
  id: string;
  customerId: string;
  officiantId: string;
  ceremonyId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
  currency: string;
  notes?: string;
}

export interface Transaction {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  date: string;
  type: 'payment' | 'refund';
}

export const RELIGION_COLORS = {
  hindu: '#FF6B35', // Orange
  muslim: '#22C55E', // Green
  christian: '#8B5CF6', // Purple
  sikh: '#EAB308', // Yellow
};

export const RELIGION_NAMES = {
  hindu: 'Hindu',
  muslim: 'Muslim',
  christian: 'Christian',
  sikh: 'Sikh',
};
