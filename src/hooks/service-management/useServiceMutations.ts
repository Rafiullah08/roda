
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  createService, 
  deleteService, 
  toggleServiceStatus, 
  updateService,
  toggleServiceFeatured
} from "@/services/service-management";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function useServiceMutations() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const handleAuthError = async (error: any) => {
    if (error.message?.includes("JWT expired")) {
      // Try to refresh the session
      const { error: refreshError } = await supabase.auth.refreshSession();
      
      if (refreshError) {
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
          variant: "destructive",
        });
        navigate("/admin/login");
        return true; // Error was handled
      }
    }
    return false; // Error was not an auth error
  };

  const { mutateAsync: createServiceMutation, isPending: isCreating } = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Success",
        description: "Service created successfully",
      });
      // Navigate back to the service management page after successful creation
      navigate("/admin/service-management");
    },
    onError: async (error: any) => {
      console.error("Service creation error:", error);
      if (!(await handleAuthError(error))) {
        toast({
          title: "Error",
          description: `Failed to create service: ${error.message}`,
          variant: "destructive",
        });
      }
    },
  });

  const { mutateAsync: updateServiceMutation, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Success",
        description: "Service updated successfully",
      });
      // Navigate back to the service management page after successful update
      navigate("/admin/service-management");
    },
    onError: async (error: any) => {
      console.error("Service update error:", error);
      if (!(await handleAuthError(error))) {
        toast({
          title: "Error",
          description: `Failed to update service: ${error.message}`,
          variant: "destructive",
        });
      }
    },
  });

  const { mutateAsync: deleteServiceMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
    },
    onError: async (error: any) => {
      console.error("Service deletion error:", error);
      if (!(await handleAuthError(error))) {
        toast({
          title: "Error",
          description: `Failed to delete service: ${error.message}`,
          variant: "destructive",
        });
      }
    },
  });

  const { mutateAsync: toggleServiceStatusMutation, isPending: isTogglingStatus } = useMutation({
    mutationFn: ({ id, currentStatus }: { id: string; currentStatus: 'active' | 'inactive' | 'draft' | 'archived' }) => 
      toggleServiceStatus(id, currentStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Success",
        description: "Service status updated successfully",
      });
    },
    onError: async (error: any) => {
      console.error("Service status toggle error:", error);
      if (!(await handleAuthError(error))) {
        toast({
          title: "Error",
          description: `Failed to update service status: ${error.message}`,
          variant: "destructive",
        });
      }
    },
  });

  const { mutateAsync: toggleServiceFeaturedMutation, isPending: isTogglingFeatured } = useMutation({
    mutationFn: ({ id, featured }: { id: string; featured: boolean }) => 
      toggleServiceFeatured(id, featured),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["featuredServices"] });
      toast({
        title: "Success",
        description: "Service featured status updated successfully",
      });
    },
    onError: async (error: any) => {
      console.error("Service featured toggle error:", error);
      if (!(await handleAuthError(error))) {
        toast({
          title: "Error",
          description: `Failed to update featured status: ${error.message}`,
          variant: "destructive",
        });
      }
    },
  });

  return {
    createService: createServiceMutation,
    updateService: updateServiceMutation,
    deleteService: deleteServiceMutation,
    toggleServiceStatus: toggleServiceStatusMutation,
    toggleServiceFeatured: toggleServiceFeaturedMutation,
    isCreating,
    isUpdating,
    isDeleting,
    isTogglingStatus,
    isTogglingFeatured,
  };
}
