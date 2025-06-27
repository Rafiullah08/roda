
import { SearchBar } from "@/components/services/SearchBar";
import { FilterToggle } from "@/components/services/FilterToggle";
import { MobileFilters } from "@/components/services/MobileFilters";
import { DesktopFilters } from "@/components/services/DesktopFilters";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { Service } from "@/types/service";
import { AlertCircle } from "lucide-react";

interface ServicesContentProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isMobileFilterOpen: boolean;
  setIsMobileFilterOpen: (value: boolean) => void;
  categories: Array<{ id: number; name: string; count: number }>;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  priceRangeMinMax: { min: number; max: number };
  selectedRating: number | null;
  setSelectedRating: (rating: number | null) => void;
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  showFreeOnly: boolean;
  setShowFreeOnly: (value: boolean) => void;
  selectedLocation: string | null;
  setSelectedLocation: (location: string | null) => void;
  clearFilters: () => void;
  filteredServices: Service[];
  isLoading: boolean;
  error: any;
}

export function ServicesContent({
  searchTerm,
  setSearchTerm,
  handleSearch,
  isMobileFilterOpen,
  setIsMobileFilterOpen,
  categories,
  selectedCategories,
  toggleCategory,
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
  clearFilters,
  filteredServices,
  isLoading,
  error
}: ServicesContentProps) {
  return (
    <>
      {/* Search and Filters */}
      <div className="bg-gray-50 py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                handleSearch={handleSearch} 
              />
            </div>
            <FilterToggle 
              isMobileFilterOpen={isMobileFilterOpen}
              setIsMobileFilterOpen={setIsMobileFilterOpen}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <DesktopFilters 
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
          />

          {/* Filters - Mobile */}
          {isMobileFilterOpen && (
            <MobileFilters 
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
              setIsMobileFilterOpen={setIsMobileFilterOpen}
            />
          )}

          {/* Services Grid */}
          {error ? (
            <div className="md:w-3/4 p-6 bg-red-50 rounded-lg border border-red-200 flex items-center gap-3">
              <AlertCircle className="text-red-500" />
              <div>
                <h3 className="font-medium text-red-800">Error loading services</h3>
                <p className="text-sm text-red-600">Please try refreshing the page.</p>
              </div>
            </div>
          ) : (
            <ServiceGrid 
              filteredServices={filteredServices}
              isLoading={isLoading}
              clearFilters={clearFilters}
            />
          )}
        </div>
      </div>
    </>
  );
}
