
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Service } from "@/types/service";
import { ServiceCard } from "./ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ServiceGridProps {
  filteredServices: Service[];
  isLoading: boolean;
  clearFilters: () => void;
}

type SortOption = "recommended" | "price-low" | "price-high" | "rating" | "newest";

export const ServiceGrid = ({ filteredServices, isLoading, clearFilters }: ServiceGridProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  
  console.log("ServiceGrid received services:", filteredServices.length);
  
  const sortedServices = useMemo(() => {
    if (!filteredServices || filteredServices.length === 0) return [];
    
    const servicesCopy = [...filteredServices];
    
    switch (sortBy) {
      case "price-low":
        return servicesCopy.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price-high":
        return servicesCopy.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "rating":
        return servicesCopy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "newest":
        return servicesCopy.sort((a, b) => {
          const dateA = new Date(a.created_at || 0).getTime();
          const dateB = new Date(b.created_at || 0).getTime();
          return dateB - dateA;
        });
      case "recommended":
      default:
        // For recommended, we can sort by a combination of rating and popularity
        return servicesCopy.sort((a, b) => {
          const scoreA = (a.rating || 0) * 0.7 + (a.featured ? 1 : 0) * 0.3;
          const scoreB = (b.rating || 0) * 0.7 + (b.featured ? 1 : 0) * 0.3;
          return scoreB - scoreA;
        });
    }
  }, [filteredServices, sortBy]);
  
  return (
    <div className="md:w-3/4">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {filteredServices.length} services found
        </p>
        <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="flex flex-col gap-2">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      ) : sortedServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600 mb-4">No services found matching your criteria</p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
};
