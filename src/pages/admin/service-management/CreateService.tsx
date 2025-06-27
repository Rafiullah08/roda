
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import AdminLayout from "@/components/layout/AdminLayout";
import { useServiceMutations } from "@/hooks/service-management";
import ServiceForm from "@/components/admin/service-management/ServiceForm";
import { useEffect, useState } from "react";
import { checkAdminSessionWithFeedback } from "@/utils/adminSession";
import { useQueryClient } from "@tanstack/react-query";

const CreateServicePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { createService, isCreating } = useServiceMutations();
  const [sessionChecked, setSessionChecked] = useState(false);

  // Check authentication status on page load
  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await checkAdminSessionWithFeedback();
      if (!isValid) {
        navigate("/admin/login");
        return;
      }
      setSessionChecked(true);
    };

    checkAuth();
  }, [navigate]);

  const handleCreateService = async (data: any) => {
    try {
      console.log("Form submission data:", data); // Debug: log form data
      
      // Revalidate session before form submission
      const isValid = await checkAdminSessionWithFeedback();
      if (!isValid) {
        navigate("/admin/login");
        return;
      }
      
      // Transform "none" value back to null for subcategory
      const subcategory = data.subcategory === "none" ? null : data.subcategory;
      
      // Convert price to number
      const serviceData = {
        ...data,
        price: parseFloat(data.price),
        subcategory: subcategory,
        service_location: data.service_location || 'online',
        is_free: data.is_free || false,
        status: data.status || 'active' // Ensure status is set
      };
      
      console.log("Processed service data:", serviceData); // Debug: log processed data

      await createService(serviceData);
      
      // Success message and navigation handled by the mutation
      toast({
        title: "Service created",
        description: "The service has been created successfully",
      });
      
      // Invalidate both services queries to ensure lists are refreshed
      queryClient.invalidateQueries({ queryKey: ["services"] });
      
      // Navigate back to the service management page
      navigate("/admin/service-management");
    } catch (error: any) {
      console.error("Service creation error details:", error); // Debug: log error details
      
      toast({
        title: "Error",
        description: `Failed to create service: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  // Don't render form until session is checked
  if (!sessionChecked) return (
    <AdminLayout>
      <div className="flex justify-center items-center p-10">
        <div className="text-center">
          <p>Validating your session...</p>
        </div>
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="space-y-6 p-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold">Create New Service</h1>
          <p className="text-muted-foreground">
            Add a new service to your catalog.
          </p>
        </div>
        
        <div className="border rounded-lg p-6 bg-card">
          <ServiceForm
            onSubmit={handleCreateService}
            isSubmitting={isCreating}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateServicePage;
