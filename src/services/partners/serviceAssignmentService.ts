
import { supabase } from "@/integrations/supabase/client";
import { ServicePartnerAssignment } from "@/types/partner";

// Get assignment metrics for the dashboard
export const getServiceAssignmentMetrics = async (): Promise<any> => {
  // In a real implementation, this would calculate metrics from the database
  // For now we return placeholder data
  return {
    totalAssignments: 42,
    avgCompletionTime: "2.5 days",
    partnerCoverage: "78%",
    assignmentSuccessRate: 93
  };
};

// Get a summary of services and their assignment data for the table
export const getServiceAssignmentSummary = async (): Promise<any[]> => {
  const { data, error } = await supabase
    .from("services")
    .select(`
      id, 
      title, 
      category,
      service_partner_assignments (id)
    `);

  if (error) {
    console.error("Error fetching service assignment summary:", error);
    return [];
  }

  // Transform the data to include partner count
  return data.map(service => ({
    id: service.id,
    service_title: service.title,
    category: service.category,
    partner_count: service.service_partner_assignments ? service.service_partner_assignments.length : 0,
    assignment_strategy: 'combined' // Default strategy, in real implementation would come from DB
  }));
};

// Get partners filtered by expertise that matches the service category
export const getPartnersByExpertise = async (category: string): Promise<any[]> => {
  if (!category) return [];

  const { data, error } = await supabase
    .from("partners")
    .select(`
      id, 
      business_name, 
      contact_email, 
      partner_type, 
      status,
      partner_expertise(category_id)
    `)
    .eq("status", "approved");

  if (error) {
    console.error("Error fetching partners by expertise:", error);
    return [];
  }

  // We'd filter by category expertise in a real implementation
  // For now, return all approved partners
  return data.map(partner => ({
    ...partner,
    rating: (Math.random() * 5).toFixed(1) // Mock rating for display purposes
  }));
};

// Update the assignment strategy setting
export const updateAssignmentStrategy = async (strategy: string): Promise<boolean> => {
  // In a real implementation, this would update a settings table
  // For now we just return success
  return true;
};

// Implement the Combined Partner Selection Algorithm
export async function selectPartnerForService(serviceId: string): Promise<string | null> {
  // Get all partners who can provide this service
  const { data: assignedPartners, error } = await supabase
    .from("service_partner_assignments")
    .select(`
      partner_id,
      partners!inner(
        id, 
        status
      )
    `)
    .eq("service_id", serviceId)
    .eq("status", "available");
    
  if (error || !assignedPartners || assignedPartners.length === 0) {
    console.error("Error finding partners for service:", error);
    return null;
  }

  // Filter for approved partners only
  const availablePartners = assignedPartners.filter(
    p => p.partners && p.partners.status === 'approved'
  );
  
  if (availablePartners.length === 0) return null;
  
  // In a real implementation, we would use our algorithm here to select the best partner
  // For now, we'll use a simple logic of selecting a random partner from the available ones
  const randomIndex = Math.floor(Math.random() * availablePartners.length);
  return availablePartners[randomIndex].partner_id;
}

// Assign a service when a customer makes an order
export async function assignServiceToPartner(
  orderId: string, 
  serviceId: string
): Promise<boolean> {
  try {
    // Step 1: Find the best partner for this service
    const selectedPartnerId = await selectPartnerForService(serviceId);
    
    if (!selectedPartnerId) {
      console.error("No eligible partner found for service:", serviceId);
      return false;
    }
    
    // Step 2: Update the order with the assigned partner
    const { error } = await supabase
      .from("orders")
      .update({
        status: "assigned",
        assignment_date: new Date().toISOString()
      })
      .eq("id", orderId);
      
    if (error) {
      console.error("Error assigning partner to order:", error);
      return false;
    }
    
    // Step 3: Update the partner assignment status
    const { error: assignmentError } = await supabase
      .from("service_partner_assignments")
      .update({ 
        status: "assigned"
      })
      .eq("service_id", serviceId)
      .eq("partner_id", selectedPartnerId);
    
    if (assignmentError) {
      console.error("Error updating assignment status:", assignmentError);
      // We should handle this rollback in a transaction in a real implementation
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in assignServiceToPartner:", error);
    return false;
  }
}

// Update the partners service exports
export * from "./partnerAssignmentService";
