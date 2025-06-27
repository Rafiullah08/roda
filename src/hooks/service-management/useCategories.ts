
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/serviceManagementService";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function useCategories() {
  const navigate = useNavigate();
  
  const result = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const data = await fetchCategories();
        console.log("Categories fetched:", data);
        return data;
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
            if (window.location.pathname.includes('/admin')) {
              navigate("/admin/login");
            }
            return [];
          } else {
            // Retry fetching after token refresh
            return await fetchCategories();
          }
        }
        
        console.error("Error fetching categories:", error);
        // Don't show error toast for public pages to avoid disrupting user experience
        if (window.location.pathname.includes('/admin')) {
          toast({
            title: "Error",
            description: "Failed to load categories. Please try again.",
            variant: "destructive",
          });
        }
        return [];
      }
    },
    // Make sure to refetch periodically and when component is focused
    refetchOnWindowFocus: true,
    refetchInterval: 300000, // Refetch every 5 minutes
    staleTime: 60000, // Consider data stale after 1 minute
  });

  return {
    categories: result.data || [],
    isLoading: result.isLoading,
    error: result.error,
    data: result.data || [],
    refetch: result.refetch
  };
}
