
import { supabase } from "@/integrations/supabase/client";

export interface AccountLinkingResult {
  success: boolean;
  linkedUserId?: string;
  error?: string;
}

// Check if a user exists with the given email and return their ID
export const findUserByEmail = async (email: string): Promise<string | null> => {
  try {
    console.log("Checking for existing user with email:", email);
    
    // Check if there's a user profile with this email
    // Note: We can't directly query auth.users, so we check the profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("owner_name", email.toLowerCase()) // Assuming owner_name stores the email
      .maybeSingle();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error("Error checking user profile:", profileError);
      return null;
    }

    if (profile) {
      console.log("Found existing user profile:", profile);
      return profile.id;
    }

    // Also check if there's already a partner with this email to avoid duplicates
    const { data: existingPartner, error: partnerError } = await supabase
      .from("partners")
      .select("user_id, contact_email")
      .eq("contact_email", email.toLowerCase())
      .maybeSingle();

    if (partnerError && partnerError.code !== 'PGRST116') {
      console.error("Error checking existing partner:", partnerError);
      return null;
    }

    if (existingPartner && existingPartner.user_id) {
      console.log("Found existing partner with user_id:", existingPartner);
      return existingPartner.user_id;
    }

    console.log("No existing user found with email:", email);
    return null;
  } catch (error) {
    console.error("Error in findUserByEmail:", error);
    return null;
  }
};

// Link a partner record to an existing user account
export const linkPartnerToUser = async (
  partnerId: string, 
  userId: string
): Promise<AccountLinkingResult> => {
  try {
    console.log("Linking partner to user:", { partnerId, userId });
    
    const { data, error } = await supabase
      .from("partners")
      .update({ user_id: userId })
      .eq("id", partnerId)
      .select()
      .single();

    if (error) {
      console.error("Error linking partner to user:", error);
      return { success: false, error: error.message };
    }

    console.log("Successfully linked partner to user:", data);
    return { success: true, linkedUserId: userId };
  } catch (error) {
    console.error("Error in linkPartnerToUser:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
};

// Get current user and check if they can be linked to a partner
export const getCurrentUserForLinking = async (): Promise<string | null> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      console.log("No authenticated user found");
      return null;
    }

    return user.id;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};
