
import { supabase } from "@/integrations/supabase/client";
import { Partner } from "@/types/partner";
import { findUserByEmail, linkPartnerToUser, getCurrentUserForLinking } from "./partnerAccountLinkingService";

// Create a new partner with smart account linking
export const createPartner = async (partnerData: Omit<Partner, "id" | "created_at" | "updated_at">): Promise<Partner | null> => {
  try {
    console.log("Creating partner with smart linking:", partnerData);
    
    // First check if a partner with this email already exists
    const { data: existingPartner, error: checkError } = await supabase
      .from("partners")
      .select("id, contact_email, status")
      .eq("contact_email", partnerData.contact_email.toLowerCase())
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error("Error checking existing partner:", checkError);
      throw new Error("Database error while checking existing partners. Please try again.");
    }

    if (existingPartner) {
      console.log("Found existing partner with email:", existingPartner);
      throw new Error(`A partner account already exists with email ${partnerData.contact_email}. Status: ${existingPartner.status}`);
    }
    
    // Prepare final partner data with proper user_id handling
    let finalUserId = partnerData.user_id;
    
    // If no user_id provided (invited user), try to find existing user by email
    if (!finalUserId) {
      const existingUserId = await findUserByEmail(partnerData.contact_email);
      finalUserId = existingUserId;
    }
    
    const finalPartnerData = {
      ...partnerData,
      contact_email: partnerData.contact_email.toLowerCase(), // Normalize email
      user_id: finalUserId // This will be null if no existing user found
    };
    
    console.log("Final partner data with linking:", finalPartnerData);
    
    const { data, error } = await supabase
      .from("partners")
      .insert(finalPartnerData)
      .select()
      .single();

    if (error) {
      console.error("Database error creating partner:", error);
      
      // Handle specific database errors
      if (error.code === '23505') {
        if (error.message.includes('contact_email')) {
          throw new Error("A partner with this email already exists. Please use a different email.");
        }
        throw new Error("This partner information already exists. Please check your details.");
      } else if (error.code === '23503') {
        // Foreign key constraint violation - likely user_id doesn't exist
        console.log("Foreign key violation detected, retrying with null user_id");
        
        // Retry with null user_id
        const retryData = { ...finalPartnerData, user_id: null };
        const { data: retryResult, error: retryError } = await supabase
          .from("partners")
          .insert(retryData)
          .select()
          .single();
        
        if (retryError) {
          console.error("Retry also failed:", retryError);
          throw new Error("Failed to create partner profile. Please try again.");
        }
        
        console.log("✅ Partner created successfully on retry:", retryResult);
        return retryResult as Partner;
      } else if (error.code === '23514') {
        throw new Error("Invalid data format. Please check all required fields are filled correctly.");
      }
      
      throw new Error(`Database error: ${error.message}`);
    }

    console.log("✅ Partner successfully created with account linking:", data);
    return data as Partner;
  } catch (error) {
    console.error("Error in createPartner:", error);
    
    // Re-throw the error to maintain the original error message
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error("Failed to create partner profile. Please try again.");
  }
};

// Create partner for non-authenticated users (from lead conversion)
export const createPartnerFromLead = async (
  partnerData: Omit<Partner, "id" | "created_at" | "updated_at" | "user_id">,
  leadEmail: string
): Promise<Partner | null> => {
  try {
    console.log("Creating partner from lead with email:", leadEmail);
    
    // Check if there's an existing user with the lead's email
    const existingUserId = await findUserByEmail(leadEmail);
    
    const finalPartnerData = {
      ...partnerData,
      user_id: existingUserId // Will be null if no existing user found
    };
    
    console.log("Creating partner from lead with data:", finalPartnerData);
    
    const { data, error } = await supabase
      .from("partners")
      .insert(finalPartnerData)
      .select()
      .single();

    if (error) {
      console.error("Database error creating partner from lead:", error);
      throw error;
    }

    console.log("Partner successfully created from lead:", data);
    return data as Partner;
  } catch (error) {
    console.error("Error in createPartnerFromLead:", error);
    throw error;
  }
};

export const getPartnerByUserId = async (userId: string): Promise<Partner | null> => {
  try {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching partner by user ID:", error);
      throw error;
    }

    return data as Partner;
  } catch (error) {
    console.error("Error in getPartnerByUserId:", error);
    return null;
  }
};

export const getPartnerById = async (partnerId: string): Promise<Partner | null> => {
  try {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("id", partnerId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching partner by ID:", error);
      throw error;
    }

    return data as Partner;
  } catch (error) {
    console.error("Error in getPartnerById:", error);
    return null;
  }
};

export const updatePartner = async (partnerId: string, updates: Partial<Partner>): Promise<Partner | null> => {
  try {
    const { data, error } = await supabase
      .from("partners")
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq("id", partnerId)
      .select()
      .single();

    if (error) {
      console.error("Error updating partner:", error);
      throw error;
    }

    return data as Partner;
  } catch (error) {
    console.error("Error in updatePartner:", error);
    return null;
  }
};

export const getAllPartners = async (
  page = 1, 
  limit = 10, 
  status?: string
): Promise<{ partners: Partner[], count: number }> => {
  try {
    let query = supabase
      .from("partners")
      .select("*", { count: "exact" });
    
    if (status && status !== 'all') {
      query = query.eq("status", status);
    }
    
    query = query.order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);
    
    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching partners:", error);
      throw error;
    }

    return { 
      partners: data as Partner[], 
      count: count || 0 
    };
  } catch (error) {
    console.error("Error in getAllPartners:", error);
    return { partners: [], count: 0 };
  }
};
