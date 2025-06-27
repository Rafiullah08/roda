
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import ServiceHeader from "@/components/admin/service/ServiceHeader";
import ServiceContent from "@/components/admin/service/ServiceContent";
import { EditServiceDialog } from "@/components/admin/service/EditServiceDialog";
import DeleteServiceDialog from "@/components/admin/service/DeleteServiceDialog";
import { useServices, useServiceMutations } from "@/hooks/service-management";
import { Service } from "@/types/service";

const ServicesPage = () => {
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [serviceToDelete, setServiceToDelete] = React.useState<string | null>(null);
  const [currentService, setCurrentService] = React.useState<Service | null>(null);

  const { data: services = [], isLoading, isError } = useServices();
  const {
    createService,
    updateService,
    deleteService,
    toggleServiceStatus,
    isCreating,
    isUpdating,
    isDeleting,
  } = useServiceMutations();

  const handleCreateService = (data: Omit<Service, "id" | "created_at" | "updated_at">) => {
    createService(data, {
      onSuccess: () => {
        setIsAddDialogOpen(false);
        // Redirect to service management page where services are properly displayed
        navigate("/admin/service-management");
      }
    });
  };

  const handleUpdateService = (data: Partial<Service>) => {
    if (currentService) {
      updateService({ id: currentService.id, data }, {
        onSuccess: () => {
          setIsEditDialogOpen(false);
          // Redirect to service management page where services are properly displayed
          navigate("/admin/service-management");
        }
      });
    }
  };

  const handleDeleteService = (id: string) => {
    deleteService(id, {
      onSuccess: () => {
        setServiceToDelete(null);
        // Redirect to service management page where services are properly displayed
        navigate("/admin/service-management");
      }
    });
  };

  const handleEditService = (service: Service) => {
    setCurrentService(service);
    setIsEditDialogOpen(true);
  };

  const handleViewService = (serviceId: string) => {
    // Handle view service logic here
    const service = services.find(s => s.id === serviceId);
    if (service) {
      console.log("View service:", service);
      // Redirect to service detail page
      navigate(`/admin/service-management/edit/${serviceId}`);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <ServiceHeader
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
          handleCreateService={handleCreateService}
          isCreating={isCreating}
        />

        <ServiceContent
          isLoading={isLoading}
          isError={isError}
          services={services}
          onEdit={handleEditService}
          onDelete={(id) => setServiceToDelete(id)}
          onView={handleViewService}
        />

        <EditServiceDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          currentService={currentService}
          onSubmit={handleUpdateService}
          isSubmitting={isUpdating}
        />

        <DeleteServiceDialog
          serviceId={serviceToDelete}
          onOpenChange={() => setServiceToDelete(null)}
          onDelete={() => serviceToDelete && handleDeleteService(serviceToDelete)}
        />
      </div>
    </AdminLayout>
  );
};

export default ServicesPage;
