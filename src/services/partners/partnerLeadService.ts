
import { supabase } from "@/integrations/supabase/client";

export interface PartnerLead {
  id: string;
  full_name: string;
  email: string;
  skills: string;
  status: string;
  created_at: string;
  notes?: string;
  converted_to_application: boolean;
  converted_at?: string;
  converted_by?: string;
}

// Get all partner leads
export const getAllPartnerLeads = async (): Promise<PartnerLead[]> => {
  try {
    const { data, error } = await supabase
      .from("partner_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching partner leads:", error);
      throw error;
    }

    return data as PartnerLead[];
  } catch (error) {
    console.error("Error in getAllPartnerLeads:", error);
    throw error;
  }
};

// Alias for compatibility
export const getPartnerLeads = async () => {
  const leads = await getAllPartnerLeads();
  return { leads };
};

// Create a new partner lead
export const createPartnerLead = async (leadData: Omit<PartnerLead, "id" | "created_at">): Promise<PartnerLead> => {
  try {
    const { data, error } = await supabase
      .from("partner_leads")
      .insert(leadData)
      .select()
      .single();

    if (error) {
      console.error("Error creating partner lead:", error);
      throw error;
    }

    return data as PartnerLead;
  } catch (error) {
    console.error("Error in createPartnerLead:", error);
    throw error;
  }
};

// Update partner lead
export const updatePartnerLead = async (id: string, updates: Partial<PartnerLead>): Promise<PartnerLead | null> => {
  try {
    const { data, error } = await supabase
      .from("partner_leads")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating partner lead:", error);
      throw error;
    }

    return data as PartnerLead;
  } catch (error) {
    console.error("Error in updatePartnerLead:", error);
    throw error;
  }
};

// Convert lead to application - SIMPLIFIED VERSION
export const convertLeadToApplication = async (leadId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log("Converting lead to application:", leadId);
    
    // First, get the lead data
    const { data: leadData, error: leadError } = await supabase
      .from("partner_leads")
      .select("*")
      .eq("id", leadId)
      .single();

    if (leadError || !leadData) {
      console.error("Error fetching lead data:", leadError);
      throw new Error("Lead not found");
    }

    // Update the lead status to converted
    const { data, error } = await supabase
      .from("partner_leads")
      .update({
        converted_to_application: true,
        converted_at: new Date().toISOString(),
        status: "invited"
      })
      .eq("id", leadId)
      .select()
      .single();

    if (error) {
      console.error("Error updating lead:", error);
      throw error;
    }

    console.log("Lead updated successfully:", data);
    
    // Call the edge function to send invitation email
    const { error: emailError } = await supabase.functions.invoke('send-partner-invitation', {
      body: {
        recipientEmail: leadData.email,
        recipientName: leadData.full_name,
        skills: leadData.skills,
        leadId: leadData.id
      }
    });

    if (emailError) {
      console.error("Error sending invitation email:", emailError);
      // Don't throw here - the lead was successfully converted, just email failed
      return { 
        success: true, 
        error: "Lead converted but email sending failed. Please contact the partner manually." 
      };
    }

    console.log("Invitation email sent successfully");
    return { success: true };
    
  } catch (error) {
    console.error("Error in convertLeadToApplication:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};
