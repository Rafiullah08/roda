
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ServiceActionsResult } from './types';

export const useServiceActions = (serviceId: string | null): ServiceActionsResult => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const toggleBookmark = () => {
    setIsBookmarked(prev => !prev);
    
    toast({
      title: isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
      description: isBookmarked ? 'Service has been removed from your bookmarks' : 'Service has been added to your bookmarks',
    });
  };

  const handleBuyNow = () => {
    if (!serviceId) {
      toast({
        title: "Error",
        description: "Service not found",
        variant: "destructive",
      });
      return;
    }
    
    navigate(`/checkout?service=${serviceId}`);
  };

  const handleRequestQuote = () => {
    if (!serviceId) {
      toast({
        title: "Error",
        description: "Service not found",
        variant: "destructive",
      });
      return;
    }
    
    // Check if this is a free service request
    if (window.location.pathname.includes(`/services/${serviceId}`)) {
      const serviceElement = document.querySelector('.service-price-card');
      if (serviceElement && serviceElement.textContent?.includes('Free Service')) {
        navigate(`/free-service?service=${serviceId}`);
        return;
      }
    }
    
    navigate(`/quote-request?service=${serviceId}`);
  };

  return {
    isBookmarked,
    activeTab,
    toggleBookmark,
    setActiveTab,
    handleBuyNow,
    handleRequestQuote,
  };
};
