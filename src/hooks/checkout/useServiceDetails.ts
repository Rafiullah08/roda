
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";

export function useServiceDetails(serviceId: string | null) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchService = async () => {
      if (!serviceId) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from("services")
          .select("*")
          .eq("id", serviceId)
          .single();
        
        if (fetchError) {
          throw new Error(`Error fetching service: ${fetchError.message}`);
        }
        
        setService(data as Service);
      } catch (err: any) {
        console.error("Service fetch error:", err);
        setError(err.message || "Failed to load service details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchService();
  }, [serviceId]);
  
  return { service, loading, error };
}
