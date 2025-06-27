
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getPartnerByUserId } from '@/services/partners';
import { Partner } from '@/types/partner';

type DashboardMode = 'buyer' | 'partner';

interface PartnerDashboardContextType {
  mode: DashboardMode;
  setMode: (mode: DashboardMode) => void;
  partner: Partner | null;
  isLoading: boolean;
  isPartner: boolean;
  refreshPartnerData: () => Promise<void>;
}

const PartnerDashboardContext = createContext<PartnerDashboardContextType | undefined>(undefined);

export const PartnerDashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  // Always default to 'buyer' mode for new users
  const [mode, setMode] = useState<DashboardMode>('buyer');
  const [partner, setPartner] = useState<Partner | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const fetchPartnerData = async () => {
    if (!user) {
      console.log('PartnerDashboardContext: No user, setting loading to false');
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      console.log('PartnerDashboardContext: Fetching partner data for user:', user.id, user.email);
      const partnerData = await getPartnerByUserId(user.id);
      console.log('PartnerDashboardContext: Partner data received:', partnerData);
      setPartner(partnerData);
      
      // Only set mode from localStorage if user is actually a partner
      if (partnerData) {
        console.log('PartnerDashboardContext: Partner found, checking stored mode');
        const storedMode = localStorage.getItem('dashboardMode') as DashboardMode;
        console.log('PartnerDashboardContext: Stored mode:', storedMode);
        if (storedMode === 'partner') {
          console.log('PartnerDashboardContext: Setting mode to partner from storage');
          setMode(storedMode);
        }
      } else {
        console.log('PartnerDashboardContext: No partner data found');
      }
    } catch (error) {
      console.error("PartnerDashboardContext: Error fetching partner data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerData();
  }, [user]);

  useEffect(() => {
    // Only store mode preference if user is actually a partner
    if (partner && mode === 'partner') {
      console.log('PartnerDashboardContext: Storing partner mode in localStorage');
      localStorage.setItem('dashboardMode', mode);
    } else if (mode === 'buyer') {
      // Remove stored mode if switching to buyer
      console.log('PartnerDashboardContext: Removing stored mode for buyer');
      localStorage.removeItem('dashboardMode');
    }
  }, [mode, partner]);

  const refreshPartnerData = async () => {
    console.log('PartnerDashboardContext: Refreshing partner data');
    await fetchPartnerData();
  };

  // User is considered a partner if they have a partner record (regardless of status for basic access)
  const isPartner = !!partner;

  console.log('PartnerDashboardContext: Current state:', {
    isPartner,
    partnerStatus: partner?.status,
    mode,
    userId: user?.id,
    userEmail: user?.email
  });

  return (
    <PartnerDashboardContext.Provider 
      value={{ 
        mode, 
        setMode, 
        partner, 
        isLoading, 
        isPartner,
        refreshPartnerData
      }}
    >
      {children}
    </PartnerDashboardContext.Provider>
  );
};

export const usePartnerDashboard = () => {
  const context = useContext(PartnerDashboardContext);
  if (context === undefined) {
    throw new Error('usePartnerDashboard must be used within a PartnerDashboardProvider');
  }
  return context;
};
