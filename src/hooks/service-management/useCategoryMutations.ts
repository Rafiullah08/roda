
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  createCategory, 
  createSubcategory,
  deleteCategory,
  deleteSubcategory
} from "@/services/serviceManagementService";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function useCategoryMutations() {
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

  const { mutateAsync: createCategoryMutation, isPending: isCreating } = useMutation({
    mutationFn: ({ name, description }: { name: string; description?: string }) => 
      createCategory(name, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Category created",
        description: "The category has been created successfully",
      });
    },
    onError: async (error: any) => {
      if (!(await handleAuthError(error))) {
        toast({
          title: "Error",
          description: `Failed to create category: ${error.message}`,
          variant: "destructive",
        });
      }
    },
  });

  const { mutateAsync: createSubcategoryMutation, isPending: isCreatingSubcategory } = useMutation({
    mutationFn: ({ name, categoryId, description }: { name: string; categoryId: string; description?: string }) => 
      createSubcategory(name, categoryId, description),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["subcategories", variables.categoryId] });
      toast({
        title: "Subcategory created",
        description: "The subcategory has been created successfully",
      });
    },
    onError: async (error: any) => {
      if (!(await handleAuthError(error))) {
        toast({
          title: "Error",
          description: `Failed to create subcategory: ${error.message}`,
          variant: "destructive",
        });
      }
    },
  });

  const { mutateAsync: deleteCategoryMutation, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Category deleted",
        description: "The category has been deleted successfully",
      });
    },
    onError: async (error: any) => {
      if (!(await handleAuthError(error))) {
        toast({
          title: "Error",
          description: `Failed to delete category: ${error.message}`,
          variant: "destructive",
        });
      }
    },
  });

  const { mutateAsync: deleteSubcategoryMutation, isPending: isDeletingSubcategory } = useMutation({
    mutationFn: (id: string) => deleteSubcategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Subcategory deleted",
        description: "The subcategory has been deleted successfully",
      });
    },
    onError: async (error: any) => {
      if (!(await handleAuthError(error))) {
        toast({
          title: "Error",
          description: `Failed to delete subcategory: ${error.message}`,
          variant: "destructive",
        });
      }
    },
  });

  return {
    createCategory: createCategoryMutation,
    createSubcategory: createSubcategoryMutation,
    deleteCategory: deleteCategoryMutation,
    deleteSubcategory: deleteSubcategoryMutation,
    isCreating,
    isCreatingSubcategory,
    isDeleting,
    isDeletingSubcategory
  };
}
