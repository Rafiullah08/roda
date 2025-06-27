import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { usePartnerDashboard } from "@/contexts/PartnerDashboardContext";
import { toast } from "@/components/ui/use-toast";

export interface Order {
  id: string;
  service: any;
  customer_name: string;
  customer_email: string;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  service_id?: string;
  delivery_date?: string;
  priority?: string;
  partner_id?: string;
}

export type OrderStatusType = "all" | "pending" | "confirmed" | "completed" | "cancelled";
export type OrderSortType = "newest" | "delivery" | "amount";
export type OrderViewType = "all" | "free" | "paid";

export function useOrders() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<OrderSortType>("newest");
  const [viewType, setViewType] = useState<OrderViewType>("all");
  const { partner } = usePartnerDashboard();

  // Fetch orders for the current partner
  const { 
    data: orders, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ["partnerOrders", statusFilter, sortBy, viewType, partner?.id],
    queryFn: async () => {
      if (!partner || !partner.id) {
        console.log("Partner information not available");
        return [];
      }

      console.log(`Fetching orders for partner ID: ${partner.id}`);

      try {
        // First approach: Fetch orders directly assigned to the partner
        let query = supabase
          .from("orders")
          .select(`*, service:services(*)`)
          .eq("partner_id", partner.id);

        // Apply status filter if provided
        if (statusFilter) {
          query = query.eq("status", statusFilter);
        }
        
        // Apply view type filter
        if (viewType === "free") {
          query = query.eq("service.is_free", true);
        } else if (viewType === "paid") {
          query = query.eq("service.is_free", false);
        }

        // Apply sorting
        if (sortBy === "newest") {
          query = query.order("created_at", { ascending: false });
        } else if (sortBy === "delivery") {
          query = query.order("delivery_date", { ascending: true });
        } else if (sortBy === "amount") {
          query = query.order("amount", { ascending: false });
        }

        const { data: directOrders, error: directError } = await query;
        
        if (directError) {
          console.error("Error fetching direct orders:", directError);
          // Continue to try the second approach
        }

        // Second approach: Get orders via service assignments
        const { data: assignments, error: assignmentsError } = await supabase
          .from("service_partner_assignments")
          .select("service_id")
          .eq("partner_id", partner.id)
          .in("status", ["assigned", "available", "completed"]);

        if (assignmentsError) {
          console.error("Error fetching partner assignments:", assignmentsError);
          throw new Error("Failed to fetch assignments");
        }

        if (!assignments || assignments.length === 0) {
          console.log("No service assignments found for this partner");
          return directOrders || [];
        }

        // Extract service IDs from assignments
        const serviceIds = assignments.map(a => a.service_id);
        console.log(`Found ${serviceIds.length} assigned services`);

        // Get orders for these services
        let servicesQuery = supabase
          .from("orders")
          .select(`*, service:services(*)`);
          
        // Use the in clause only if we have service IDs
        if (serviceIds.length > 0) {
          servicesQuery = servicesQuery.in("service_id", serviceIds);
        }

        if (statusFilter) {
          servicesQuery = servicesQuery.eq("status", statusFilter);
        }
        
        // Apply view type filter
        if (viewType === "free") {
          servicesQuery = servicesQuery.eq("service.is_free", true);
        } else if (viewType === "paid") {
          servicesQuery = servicesQuery.eq("service.is_free", false);
        }

        // Apply sorting
        if (sortBy === "newest") {
          servicesQuery = servicesQuery.order("created_at", { ascending: false });
        } else if (sortBy === "delivery") {
          servicesQuery = servicesQuery.order("delivery_date", { ascending: true });
        } else if (sortBy === "amount") {
          servicesQuery = servicesQuery.order("amount", { ascending: false });
        }

        const { data: serviceOrders, error: serviceOrdersError } = await servicesQuery;
        
        if (serviceOrdersError) {
          console.error("Error fetching orders by service:", serviceOrdersError);
          throw new Error("Failed to fetch orders");
        }
        
        console.log(`Found ${serviceOrders?.length || 0} orders for assigned services`);
        
        // Combine and deduplicate orders from both approaches
        const allOrders = [...(directOrders || [])];
        
        if (serviceOrders) {
          // Add orders from services if they're not already included
          serviceOrders.forEach(order => {
            if (!allOrders.some(o => o.id === order.id)) {
              allOrders.push(order);
            }
          });
        }
        
        console.log(`Total combined orders: ${allOrders.length}`);
        return allOrders as Order[];
      } catch (error) {
        console.error("Error in useOrders:", error);
        toast({
          title: "Error",
          description: "Failed to load orders. Please try again.",
          variant: "destructive"
        });
        return [];
      }
    },
    enabled: !!partner?.id,
  });

  // Update order status
  const updateOrderStatus = async (orderId: string, newStatus: string): Promise<void> => {
    try {
      // Update order status
      const { error: updateError } = await supabase
        .from("orders")
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString() 
        })
        .eq("id", orderId);

      if (updateError) throw updateError;

      // Record in status history
      const { error: historyError } = await supabase
        .from("order_status_history")
        .insert({
          order_id: orderId,
          status: newStatus,
          created_by: partner?.id
        });

      if (historyError) {
        console.error("Failed to record status history:", historyError);
      }

      toast({
        title: "Status updated",
        description: `Order status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      });
      throw error; // Re-throw to allow the caller to handle it
    }
  };

  return {
    orders,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    viewType,
    setViewType,
    refetch,
    updateOrderStatus
  };
}
