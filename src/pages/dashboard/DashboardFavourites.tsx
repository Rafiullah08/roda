
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useBookmarks, BookmarkItem } from "@/hooks/useBookmarks";
import { Skeleton } from "@/components/ui/skeleton";
import { useServiceData } from "@/hooks/service/useServiceData";
import { Service } from "@/types/service";
import { Heart } from "lucide-react";

const DashboardFavourites = () => {
  const navigate = useNavigate();
  const { bookmarks, isLoading, toggleBookmark, refreshBookmarks } = useBookmarks();
  const { services } = useServiceData();
  const [favoriteServices, setFavoriteServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Get all categories from services
  const categories = services
    ? Array.from(new Set(services.map(service => service.category)))
    : [];

  // Filter bookmarked services
  useEffect(() => {
    if (services && services.length > 0 && bookmarks && bookmarks.length > 0) {
      const bookmarkedServiceIds = bookmarks.map(bookmark => bookmark.service_id);
      const filteredServices = services.filter(service => bookmarkedServiceIds.includes(service.id));
      setFavoriteServices(filteredServices);
    } else {
      setFavoriteServices([]);
    }
  }, [services, bookmarks]);

  // Apply filters
  const filteredFavorites = favoriteServices.filter(service => {
    const matchesSearch = searchTerm === "" || 
      service.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || 
      service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredFavorites.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredFavorites.length / itemsPerPage);

  const handleRemoveFavorite = (serviceId: string, serviceName: string) => {
    toggleBookmark(serviceId, serviceName);
  };

  const handleViewService = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  const LoadingState = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 border border-gray-100 rounded-lg">
          <Skeleton className="h-32 w-full mb-3" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-3" />
          <div className="mt-3 flex items-center justify-between">
            <div>
              <Skeleton className="h-5 w-16 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-12">
      <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium">No favorites yet</h3>
      <p className="text-gray-500 mb-6">Browse services and add them to your favorites</p>
      <Button onClick={() => navigate('/services')}>Browse Services</Button>
    </div>
  );

  return (
    <DashboardLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Favorites</CardTitle>
          <div className="flex items-center gap-4">
            <select 
              className="px-2 py-1 border border-gray-300 rounded-md"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search favorites..."
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingState />
          ) : currentItems.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentItems.map((service) => (
                <div 
                  key={service.id} 
                  className="p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="relative h-32 bg-gray-100 rounded-md mb-3 flex items-center justify-center text-gray-400">
                      {service.image_url ? (
                        <img 
                          src={service.image_url} 
                          alt={service.title} 
                          className="h-full w-full object-cover rounded-md"
                        />
                      ) : (
                        "Service Image"
                      )}
                      <button 
                        className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100"
                        onClick={() => handleRemoveFavorite(service.id, service.title)}
                      >
                        <Heart className="h-4 w-4 text-red-600 fill-red-600" />
                      </button>
                    </div>
                    <h3 className="font-medium text-lg">{service.title}</h3>
                    <p className="text-gray-500 text-sm">{service.category}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Rs. {service.price}</p>
                        <p className="text-sm text-gray-600">Delivery: {service.delivery_time}</p>
                      </div>
                      <div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleViewService(service.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i} className="hidden sm:inline-flex">
                      <PaginationLink 
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DashboardFavourites;
