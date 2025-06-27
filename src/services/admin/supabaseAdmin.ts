
import { supabase } from '@/integrations/supabase/client'

// Use the standard supabase client for admin operations
export const supabaseAdmin = supabase

// Get a valid admin user ID for operations
export const getAdminUserId = async (): Promise<string | null> => {
  try {
    console.log("=== Getting admin user ID ===");
    
    // Try to get an existing admin user from the admin_users table
    const { data: existingAdmin, error: queryError } = await supabaseAdmin
      .from('admin_users')
      .select('id')
      .limit(1)
      .maybeSingle();

    if (queryError) {
      console.log("Query error (this is normal if table is empty):", queryError.message);
    }

    if (existingAdmin && existingAdmin.id) {
      console.log("Found existing admin user:", existingAdmin.id);
      return existingAdmin.id;
    }

    // Return null if no admin user exists - this will allow the operation to proceed without foreign key constraints
    console.log("No admin user found, proceeding without admin tracking");
    return null;

  } catch (error) {
    console.error("Error in getAdminUserId:", error);
    
    // Return null to allow operations to proceed
    console.log("Using null admin ID to avoid foreign key constraints");
    return null;
  }
};
