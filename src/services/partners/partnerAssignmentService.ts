
import { supabase } from "@/integrations/supabase/client";
import { ServicePartnerAssignment } from "@/types/partner";
import { getPartnerById } from "./partnerProfileService";

// Get partner assignments
export const getPartnerAssignments = async (partnerId: string): Promise<ServicePartnerAssignment[]> => {
  const { data, error } = await supabase
    .from("service_partner_assignments")
    .select(`
      *,
      services!inner(title)
    `)
    .eq("partner_id", partnerId);

  if (error) {
    console.error("Error fetching partner assignments:", error);
    return [];
  }

  // Transform the data to match our type
  return data.map(item => ({
    ...item,
    service_title: item.services?.title,
  })) as ServicePartnerAssignment[];
};

// Get service assignments
export const getServiceAssignments = async (serviceId: string): Promise<ServicePartnerAssignment[]> => {
  const { data, error } = await supabase
    .from("service_partner_assignments")
    .select(`
      *,
      partners!inner(business_name, contact_name, partner_type)
    `)
    .eq("service_id", serviceId);

  if (error) {
    console.error("Error fetching service assignments:", error);
    return [];
  }

  return data as unknown as ServicePartnerAssignment[];
};

// Assign partner to service
export const assignPartnerToService = async (
  partnerId: string, 
  serviceId: string
): Promise<ServicePartnerAssignment | null> => {
  try {
    // First get partner to determine commission type
    const partner = await getPartnerById(partnerId);
    
    if (!partner) {
      console.error("Partner not found");
      return null;
    }

    // Insert directly into the service_partner_assignments table
    const { data, error } = await supabase
      .from("service_partner_assignments")
      .insert({
        partner_id: partnerId,
        service_id: serviceId,
        status: "available",
        commission_type: partner.partner_type,
        assigned_date: new Date().toISOString()
      })
      .select();

    if (error) {
      console.error("Error assigning partner to service:", error);
      throw error;
    }

    return data[0] as ServicePartnerAssignment;
  } catch (error) {
    console.error("Error in assignPartnerToService:", error);
    return null;
  }
};

// Update assignment
export const updateAssignment = async (assignmentId: string, updates: Partial<ServicePartnerAssignment>): Promise<ServicePartnerAssignment | null> => {
  const { data, error } = await supabase
    .from("service_partner_assignments")
    .update(updates)
    .eq("id", assignmentId)
    .select()
    .single();

  if (error) {
    console.error("Error updating assignment:", error);
    return null;
  }

  return data as ServicePartnerAssignment;
};

// Complete assignment
export const completeAssignment = async (assignmentId: string): Promise<ServicePartnerAssignment | null> => {
  const { data, error } = await supabase
    .from("service_partner_assignments")
    .update({
      status: 'completed',
      completion_date: new Date().toISOString()
    })
    .eq("id", assignmentId)
    .select()
    .single();

  if (error) {
    console.error("Error completing assignment:", error);
    return null;
  }

  return data as ServicePartnerAssignment;
};
