
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { getServices } from "@/utils/service"; 
import { ServicesHeader } from "@/components/services/ServicesHeader";
import { ServicesContent } from "./ServicesContent";
import { useServiceFilters } from "@/hooks/services/useServiceFilters";
import { useQuery } from "@tanstack/react-query";
import { useCategories } from "@/hooks/service-management";
import { toast } from "@/components/ui/use-toast";

const Services = () => {
  const [searchParams] = useSearchParams();
  const urlSearchTerm = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "";

  // Use React Query to fetch services with caching and auto-refetching
  const { data: allServices = [], isLoading, error, refetch } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        console.log("Fetching services in Services page");
        const services = await getServices();
        console.log("Services fetched in Services page:", services);
        return services;
      } catch (error) {
        console.error("Failed to fetch services:", error);
        toast({
          title: "Error fetching services",
          description: "Could not load services. Please try again later.",
          variant: "destructive"
        });
        return [];
      }
    },
    // Reduce stale time to ensure we get fresh data more frequently
    staleTime: 60000, // 1 minute in milliseconds
    refetchOnMount: true
  });

  // Fetch categories
  const { categories: serviceCategories, isLoading: isCategoriesLoading } = useCategories();
  const [categories, setCategories] = useState<Array<{ id: number; name: string; count: number }>>([]);

  // Process categories
  useEffect(() => {
    if (serviceCategories && serviceCategories.length > 0) {
      // Generate category objects for UI with actual counts
      const categoryList = serviceCategories.map((cat) => ({
        id: parseInt(cat.id.slice(0, 8), 16),
        name: cat.name,
        count: allServices.filter(service => 
          service.category === cat.name && service.status === 'active'
        ).length
      }));
      
      setCategories(categoryList);
    } else if (!isCategoriesLoading) {
      // If categories are loaded but empty, provide some defaults
      setCategories([
        { id: 1, name: "Graphic Design", count: 24 },
        { id: 2, name: "Web Development", count: 18 },
        { id: 3, name: "Digital Marketing", count: 12 },
        { id: 4, name: "Content Writing", count: 16 },
        { id: 5, name: "Video Editing", count: 9 }
      ]);
    }
  }, [serviceCategories, allServices, isCategoriesLoading]);

  // Use the custom hook for filter logic
  const {
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
  } = useServiceFilters(allServices);

  // Set search term from URL parameter when component mounts
  useEffect(() => {
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [urlSearchTerm, setSearchTerm]);

  // Set category filter from URL parameter when component mounts
  useEffect(() => {
    if (urlCategory && !selectedCategories.includes(urlCategory)) {
      console.log("Setting category filter from URL:", urlCategory);
      toggleCategory(urlCategory);
    }
  }, [urlCategory, selectedCategories, toggleCategory]);

  // Trigger a refetch when the component mounts
  useEffect(() => {
    console.log("Refetching services and categories data");
    refetch();
  }, [refetch]);

  return (
    <MainLayout>
      {/* Page Header */}
      <ServicesHeader />

      {/* Search and Filters Content */}
      <ServicesContent 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        isMobileFilterOpen={isMobileFilterOpen}
        setIsMobileFilterOpen={setIsMobileFilterOpen}
        categories={categories}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        priceRangeMinMax={priceRangeMinMax}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        showFreeOnly={showFreeOnly}
        setShowFreeOnly={setShowFreeOnly}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        clearFilters={clearFilters}
        filteredServices={filteredServices}
        isLoading={isLoading || isCategoriesLoading}
        error={error}
      />
    </MainLayout>
  );
};

export default Services;
