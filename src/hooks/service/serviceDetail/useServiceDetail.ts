
import { useState } from 'react';
import { useServiceData } from './useServiceData';
import { useRelatedServices } from './useRelatedServices';
import { useServiceActions } from './useServiceActions';
import { UseServiceDetailResult } from './types';

export function useServiceDetail(id: string | undefined): UseServiceDetailResult {
  const { service, loading, error, partnerAvailabilityStatus } = useServiceData(id);
  const { relatedServices } = useRelatedServices(id, service?.category || null);
  const { handleBuyNow, handleRequestQuote } = useServiceActions(id);
  
  // Remove the isBookmarked state as it's now managed through the useBookmarks hook
  const [activeTab, setActiveTab] = useState("description");

  return {
    service,
    relatedServices,
    loading,
    error,
    activeTab,
    partnerAvailabilityStatus,
    setActiveTab,
    handleBuyNow,
    handleRequestQuote
  };
}
