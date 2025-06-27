
import { useState, useMemo, useCallback } from 'react';
import { Service } from '@/types/service';

export const useServiceFilters = (services: Service[]) => {
  // Calculate dynamic price range based on actual service prices
  const priceRangeMinMax = useMemo(() => {
    if (!services || services.length === 0) {
      return { min: 0, max: 100000 };
    }
    
    const prices = services.map(service => service.price || 0);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    // Add some padding to the max price for better UX
    const paddedMax = Math.ceil(maxPrice * 1.1);
    
    console.log("Dynamic price range calculated:", { min: minPrice, max: paddedMax });
    return { min: Math.max(0, minPrice), max: paddedMax };
  }, [services]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([priceRangeMinMax.min, priceRangeMinMax.max]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Update price range when services change
  useMemo(() => {
    setPriceRange([priceRangeMinMax.min, priceRangeMinMax.max]);
  }, [priceRangeMinMax.min, priceRangeMinMax.max]);

  const toggleCategory = useCallback((category: string) => {
    console.log("Toggling category:", category);
    setSelectedCategories(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
      console.log("New selected categories:", newCategories);
      return newCategories;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange([priceRangeMinMax.min, priceRangeMinMax.max]);
    setSelectedRating(null);
    setSelectedType(null);
    setShowFreeOnly(false);
    setSelectedLocation(null);
  }, [priceRangeMinMax.min, priceRangeMinMax.max]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by filteredServices useMemo
  }, []);

  const filteredServices = useMemo(() => {
    if (!services || services.length === 0) {
      console.log("No services available for filtering");
      return [];
    }

    console.log("Filtering services with criteria:", {
      searchTerm,
      selectedCategories,
      priceRange,
      selectedRating,
      selectedType,
      showFreeOnly,
      selectedLocation
    });

    let filtered = services.filter(service => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          service.title?.toLowerCase().includes(searchLower) ||
          service.description?.toLowerCase().includes(searchLower) ||
          service.category?.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategories.length > 0) {
        const matchesCategory = selectedCategories.some(category => 
          service.category === category
        );
        console.log(`Service "${service.title}" category "${service.category}" matches selected categories:`, matchesCategory);
        if (!matchesCategory) return false;
      }

      // Price range filter
      const servicePrice = service.price || 0;
      if (servicePrice < priceRange[0] || servicePrice > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (selectedRating !== null && service.rating < selectedRating) {
        return false;
      }

      // Service type filter
      if (selectedType && service.service_type !== selectedType) {
        return false;
      }

      // Free only filter
      if (showFreeOnly && !service.is_free) {
        return false;
      }

      // Location filter
      if (selectedLocation && service.service_location !== selectedLocation) {
        return false;
      }

      return true;
    });

    console.log(`Filtered ${filtered.length} services from ${services.length} total`);
    return filtered;
  }, [services, searchTerm, selectedCategories, priceRange, selectedRating, selectedType, showFreeOnly, selectedLocation]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategories,
    priceRange,
    setPriceRange,
    priceRangeMinMax,
    selectedRating,
    setSelectedRating,
    selectedType,
    setSelectedType,
    showFreeOnly,
    setShowFreeOnly,
    selectedLocation,
    setSelectedLocation,
    filteredServices,
    isMobileFilterOpen,
    setIsMobileFilterOpen,
    toggleCategory,
    handleSearch,
    clearFilters,
  };
};
