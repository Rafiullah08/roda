
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { usePartnerDashboard } from '@/contexts/PartnerDashboardContext';
import { Service } from "@/types/service";
import { toast } from '@/components/ui/use-toast';

// Helper function to check if string is a UUID
const isUUID = (str: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return typeof str === 'string' && uuidRegex.test(str);
};

export function useFreeServices() {
  const { partner } = usePartnerDashboard();
  const [addingService, setAddingService] = useState<string | null>(null);
  const [partnerServices, setPartnerServices] = useState<string[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  // Fetch category names to map category IDs to names
  useEffect(() => {
    const fetchCategories = async () => {
      const { data: categories, error } = await supabase
        .from("service_categories")
        .select("id, name");
        
      if (error) {
        console.error("Error fetching categories:", error);
        return;
      }
      
      const categoryMapping: Record<string, string> = {};
      categories.forEach(category => {
        categoryMapping[category.id] = category.name;
      });
      
      setCategoryMap(categoryMapping);
    };
    
    fetchCategories();
  }, []);

  // Fetch all free services regardless of partner assignment
  const { data: freeServices, isLoading, refetch } = useQuery({
    queryKey: ['free-services'],
    queryFn: async () => {
      // Fetch all services with is_free = true
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_free", true)
        .eq("status", "active");

      if (error) {
        console.error("Error fetching free services:", error);
        throw error;
      }

      return data as Service[];
    },
  });

  // Fetch services that this partner already has in their portfolio
  useEffect(() => {
    const fetchPartnerServices = async () => {
      if (!partner) return;
      
      const { data, error } = await supabase
        .from("service_partner_assignments")
        .select("service_id")
        .eq("partner_id", partner.id);
        
      if (error) {
        console.error("Error fetching partner services:", error);
        return;
      }
      
      setPartnerServices(data.map(item => item.service_id));
    };
    
    fetchPartnerServices();
  }, [partner]);

  const handleAddToPortfolio = async (serviceId: string) => {
    if (!partner) {
      toast({
        title: "Error",
        description: "You must be logged in as a partner to add services.",
        variant: "destructive"
      });
      return;
    }
    
    setAddingService(serviceId);
    
    try {
      // First check if this service is already in the partner's portfolio
      const { data: existingAssignment, error: checkError } = await supabase
        .from("service_partner_assignments")
        .select("id")
        .eq("partner_id", partner.id)
        .eq("service_id", serviceId)
        .maybeSingle();
      
      if (checkError) {
        console.error("Error checking existing assignment:", checkError);
        throw checkError;
      }
      
      // If service is already assigned, show a message and exit
      if (existingAssignment) {
        toast({
          title: "Already Added",
          description: "This service is already in your portfolio.",
          variant: "default"
        });
        setAddingService(null);
        return;
      }
      
      // If not already assigned, proceed with adding the service
      const { data, error } = await supabase
        .from("service_partner_assignments")
        .insert({
          partner_id: partner.id,
          service_id: serviceId,
          status: "available",
          commission_type: partner.partner_type
        })
        .select();
        
      if (error) {
        toast({
          title: "Error",
          description: "Failed to add service to your portfolio.",
          variant: "destructive"
        });
        console.error("Error adding service to portfolio:", error);
        return;
      }
      
      // Update local state
      setPartnerServices([...partnerServices, serviceId]);
      
      // Invalidate queries to trigger data refresh
      queryClient.invalidateQueries({ queryKey: ['my-services', partner.id] });
      
      toast({
        title: "Success",
        description: "Service added to your portfolio successfully.",
        variant: "default"
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setAddingService(null);
    }
  };

  return {
    freeServices,
    isLoading,
    partnerServices,
    addingService,
    categoryMap,
    handleAddToPortfolio,
    refetch,
    isUUID
  };
}
