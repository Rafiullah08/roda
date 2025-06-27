
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { createService, updateService, deleteService } from "@/utils/service";
import { Service } from "@/types/service";
import { checkAdminSessionWithFeedback } from "@/utils/adminSession";
import { useNavigate } from "react-router-dom";

export function useServiceMutations() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Helper function to validate session before operations
  const validateSessionBeforeOperation = async () => {
    const isValid = await checkAdminSessionWithFeedback();
    if (!isValid) {
      navigate("/admin/login");
      throw new Error("Session expired");
    }
    return true;
  };

  const createMutation = useMutation({
    mutationFn: async (service: Omit<Service, "id" | "created_at" | "updated_at" | "created_by" | "rating" | "reviews_count">) => {
      await validateSessionBeforeOperation();
      return createService(service);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Service created",
        description: "The service has been created successfully.",
      });
    },
    onError: (error: any) => {
      if (error.message === "Session expired") return;
      
      toast({
        title: "Error",
        description: error.message || "Failed to create the service.",
        variant: "destructive",
      });
      console.error("Create service error:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, service }: { id: string; service: Partial<Service> }) => {
      await validateSessionBeforeOperation();
      return updateService(id, service);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Service updated",
        description: "The service has been updated successfully.",
      });
    },
    onError: (error: any) => {
      if (error.message === "Session expired") return;
      
      toast({
        title: "Error",
        description: error.message || "Failed to update the service.",
        variant: "destructive",
      });
      console.error("Update service error:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await validateSessionBeforeOperation();
      return deleteService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Service deleted",
        description: "The service has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      if (error.message === "Session expired") return;
      
      toast({
        title: "Error",
        description: error.message || "Failed to delete the service.",
        variant: "destructive",
      });
      console.error("Delete service error:", error);
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation
  };
}
