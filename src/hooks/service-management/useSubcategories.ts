
import { useQuery } from "@tanstack/react-query";
import { fetchSubcategories } from "@/services/serviceManagementService";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function useSubcategories(categoryId?: string) {
  const navigate = useNavigate();
  
  const result = useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: async () => {
      try {
        return await fetchSubcategories(categoryId);
      } catch (error: any) {
        // Check if the error is related to JWT
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
            return [];
          } else {
            // Retry fetching after token refresh
            return await fetchSubcategories(categoryId);
          }
        }
        throw error;
      }
    },
    enabled: !!categoryId,
  });

  return {
    subcategories: result.data || [],
    isLoading: result.isLoading,
    error: result.error,
    data: result.data || [],
    refetch: result.refetch
  };
}
