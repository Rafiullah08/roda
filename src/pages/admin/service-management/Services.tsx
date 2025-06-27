
import ServicesList from "@/components/admin/service-management/ServicesList";
import AdminLayout from "@/components/layout/AdminLayout";
import { useEffect } from "react";
import { useServices } from "@/hooks/service-management";
import { useNavigate } from "react-router-dom";

const ServicesPage = () => {
  const { refetch } = useServices();
  const navigate = useNavigate();

  // Refetch services when component mounts
  useEffect(() => {
    console.log("Services page mounted, refetching services");
    refetch();
  }, [refetch]);

  // Handle navigation from this page to ensure View button works correctly
  useEffect(() => {
    // Add event listener for custom navigation events
    const handleCustomNavigation = (event: CustomEvent) => {
      if (event.detail && event.detail.serviceId) {
        // Fix: Navigate to the correct detail page in public area
        navigate(`/services/${event.detail.serviceId}`);
      }
    };

    window.addEventListener('service-view' as any, handleCustomNavigation as any);
    return () => {
      window.removeEventListener('service-view' as any, handleCustomNavigation as any);
    };
  }, [navigate]);

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-bold">Service Management</h1>
          <p className="text-muted-foreground">
            Manage your services, categories, and pricing.
          </p>
        </div>
        
        <div className="border rounded-lg p-6 bg-card">
          <ServicesList />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ServicesPage;
