
import { Service } from '@/types/service';

export interface ServiceDataResult {
  service: Service | null;
  loading: boolean;
  error: string | null;
  partnerAvailabilityStatus: PartnerAvailabilityStatus;
}

export interface RelatedServicesResult {
  relatedServices: Service[];
  loading: boolean;
  error: string | null;
}

export interface ServiceActionsResult {
  isBookmarked: boolean;
  activeTab: string;
  toggleBookmark: () => void;
  setActiveTab: (tab: string) => void;
  handleBuyNow: () => void;
  handleRequestQuote: () => void;
}

export interface UseServiceDetailResult {
  service: Service | null;
  relatedServices: Service[];
  loading: boolean;
  error: string | null;
  activeTab: string;
  partnerAvailabilityStatus: PartnerAvailabilityStatus;
  setActiveTab: (tab: string) => void;
  handleBuyNow: () => void;
  handleRequestQuote: () => void;
}

export type PartnerAvailabilityStatus = 'available' | 'busy' | 'none';
