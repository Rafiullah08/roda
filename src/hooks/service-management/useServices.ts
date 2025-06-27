
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "@/services/service-management";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";

export function useServices() {
  const navigate = useNavigate();

  const result = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        const services = await fetchServices();
        return services;
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
            return await fetchServices();
          }
        }
        throw error;
      }
    },
  });

  // Add services property for backwards compatibility
  return {
    ...result,
    services: result.data || [],
    refetch: result.refetch
  };
}
