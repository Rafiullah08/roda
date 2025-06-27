
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServices, useServiceMutations } from "@/hooks/service-management";
import { Service } from "@/types/service";
import ServiceTable from "./components/ServiceTable";
import ServicesPagination from "./components/ServicesPagination";
import DeleteServiceDialog from "./components/DeleteServiceDialog";
import { toast } from "@/components/ui/use-toast";
import ServiceFilters from "./components/ServiceFilters";

const ServicesList = () => {
  const navigate = useNavigate();
  // Fetch services with categories
  const { data = [], isLoading, refetch, error } = useServices();
  const services = data as Service[]; // Type assertion for backwards compatibility
  
  const { deleteService, toggleServiceStatus, toggleServiceFeatured } = useServiceMutations();
  
  // Filter and search state
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filtered services state
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Delete confirmation state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

  // Apply filters and search
  useEffect(() => {
    if (services && services.length > 0) {
      let result = [...services];

      console.log("Filtering services:", result.length);
      console.log("Status filter:", statusFilter);
      console.log("Category filter:", categoryFilter);
      console.log("Type filter:", typeFilter);
      console.log("Search query:", searchQuery);
      
      // Apply status filter
      if (statusFilter) {
        result = result.filter(service => service.status === statusFilter);
      }
      
      // Debug categories before filtering
      console.log("Available categories in services:", 
        [...new Set(services.map(service => service.category))].filter(Boolean));
      
      // Apply category filter
      if (categoryFilter) {
        result = result.filter(service => {
          console.log(`Checking service ${service.id}: ${service.title} with category ${service.category} against filter ${categoryFilter}`);
          if (!service.category) return false;
          return service.category.toLowerCase() === categoryFilter.toLowerCase();
        });
      }
      
      // Apply type filter
      if (typeFilter) {
        result = result.filter(service => service.service_type === typeFilter);
      }
      
      // Apply search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        result = result.filter(service => 
          (service.title?.toLowerCase().includes(searchLower) || 
          service.description?.toLowerCase().includes(searchLower) ||
          service.category?.toLowerCase().includes(searchLower))
        );
      }
      
      console.log("Filtered services count:", result.length);
      setFilteredServices(result);
      
      // Reset to first page when filters change
      setCurrentPage(1);
    } else {
      setFilteredServices([]);
    }
  }, [searchQuery, statusFilter, categoryFilter, typeFilter, services]);

  // Fetch services on mount and when refetching
  useEffect(() => {
    refetch();
    console.log("Refetching services in ServicesList...");
  }, [refetch]);

  // Handle service deletion
  const handleDeleteClick = (service: Service) => {
    setServiceToDelete(service);
    setIsDeleteDialogOpen(true);
  };

  // Handle view service - redirecting to service detail page
  const handleViewService = (serviceId: string) => {
    if (!serviceId) {
      toast({
        title: "Error",
        description: "Invalid service ID",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Navigating to service detail page:", serviceId);
    navigate(`/services/${serviceId}`);
  };

  // Handle toggle service status
  const handleToggleStatus = (service: Service) => {
    if (!service || !service.id) {
      toast({
        title: "Error",
        description: "Invalid service data",
        variant: "destructive",
      });
      return;
    }
    
    toggleServiceStatus({
      id: service.id,
      currentStatus: service.status as 'active' | 'inactive' | 'draft' | 'archived'
    });
  };

  // Handle toggle featured status
  const handleToggleFeatured = (service: Service) => {
    if (!service || !service.id) {
      toast({
        title: "Error",
        description: "Invalid service data",
        variant: "destructive",
      });
      return;
    }
    
    toggleServiceFeatured({
      id: service.id,
      featured: !service.featured
    });
  };

  // Handle edit service
  const handleEditService = (serviceId: string) => {
    if (!serviceId) {
      toast({
        title: "Error",
        description: "Invalid service ID",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Navigating to edit service page:", serviceId);
    navigate(`/admin/service-management/edit/${serviceId}`);
  };

  const confirmDelete = () => {
    if (serviceToDelete && serviceToDelete.id) {
      deleteService(serviceToDelete.id);
    } else {
      toast({
        title: "Error",
        description: "Cannot delete service: Invalid service ID",
        variant: "destructive",
      });
    }
    setIsDeleteDialogOpen(false);
    setServiceToDelete(null);
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Services List</h2>
        <div className="flex gap-2 items-center">
          <div className="flex space-x-2">
            <Button onClick={() => navigate("/admin/service-management/create")}>
              Add New Service
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/admin/service-management/create-prompt")}
            >
              Create Prompt Service
            </Button>
          </div>
        </div>
      </div>

      <ServiceFilters
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        typeFilter={typeFilter}
        searchQuery={searchQuery}
        onStatusChange={setStatusFilter}
        onCategoryChange={setCategoryFilter}
        onTypeChange={setTypeFilter}
        onSearchChange={setSearchQuery}
      />

      <div>
        {error ? (
          <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-700">
            Error loading services. Please try refreshing the page.
          </div>
        ) : (
          <>
            <ServiceTable 
              services={currentItems} 
              onDeleteClick={handleDeleteClick}
              onToggleStatus={handleToggleStatus}
              onViewService={handleViewService}
              onToggleFeatured={handleToggleFeatured}
              onEditService={handleEditService}
            />
            
            {filteredServices.length > itemsPerPage && (
              <ServicesPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
            
            {filteredServices.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-md">
                <p className="text-gray-500">No services match your search</p>
                {(searchQuery || statusFilter || categoryFilter || typeFilter) && (
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("");
                      setCategoryFilter("");
                      setTypeFilter("");
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
      
      <DeleteServiceDialog
        isOpen={isDeleteDialogOpen}
        service={serviceToDelete}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirmDelete={confirmDelete}
      />
    </div>
  );
};

export default ServicesList;
