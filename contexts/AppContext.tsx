
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, Religion, User, Booking, Transaction } from '@/types';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  selectedRole: UserRole | null;
  setSelectedRole: (role: UserRole | null) => void;
  selectedReligion: Religion | null;
  setSelectedReligion: (religion: Religion | null) => void;
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  addBooking: (booking: Booking) => void;
  addTransaction: (transaction: Transaction) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedReligion, setSelectedReligion] = useState<Religion | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addBooking = (booking: Booking) => {
    setBookings(prev => [...prev, booking]);
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const value: AppContextType = {
    currentUser,
    setCurrentUser,
    selectedRole,
    setSelectedRole,
    selectedReligion,
    setSelectedReligion,
    bookings,
    setBookings,
    transactions,
    setTransactions,
    addBooking,
    addTransaction,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
