
import { supabase } from "@/integrations/supabase/client";
import { AdminUser } from "@/types/admin";
import { validatePassword } from "@/utils/validation";

/**
 * Authenticates an admin user with email and password
 */
export async function loginAdmin(email: string, password: string): Promise<AdminUser | null> {
  try {
    // Input validation
    if (!email || !password) {
      console.error("Email and password are required");
      return null;
    }
    
    // Sanitize inputs
    email = email.trim().toLowerCase();
    
    // Special case for demo login
    const isDemoLogin = email === "admin@example.com" && password.trim() === "Admin@123!";
    
    console.log("Attempting admin login for:", email, isDemoLogin ? "(demo account)" : "");

    try {
      // Call the admin-auth edge function
      console.log("Calling admin-auth edge function");
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { email, password: password.trim() }
      });

      if (error) {
        console.error("Edge function error:", error);
        
        // If this is the demo account and edge function fails, use fallback
        if (isDemoLogin) {
          console.log("Using fallback authentication for demo account");
          return useFallbackAuthForDemo(email);
        }
        
        return null;
      }

      if (!data.success) {
        console.error("Authentication failed:", data.error);
        
        // If this is the demo account and edge function authentication fails, use fallback
        if (isDemoLogin) {
          console.log("Using fallback authentication for demo account");
          return useFallbackAuthForDemo(email);
        }
        
        return null;
      }

      console.log("Admin login successful");
      return data.data as AdminUser;
      
    } catch (edgeFunctionError) {
      console.error("Edge function call failed:", edgeFunctionError);
      
      // If this is the demo account and edge function fails completely, use fallback
      if (isDemoLogin) {
        console.log("Using fallback authentication for demo account after edge function failure");
        return useFallbackAuthForDemo(email);
      }
      
      return null;
    }
    
  } catch (error) {
    console.error("Admin login error:", error);
    return null;
  }
}

/**
 * Fallback authentication for demo account when edge function fails
 * This is ONLY used for the demo account and should not be used in production
 */
function useFallbackAuthForDemo(email: string): AdminUser | null {
  if (email !== "admin@example.com") return null;
  
  // Return a hardcoded admin user for demo purposes
  return {
    id: "demo-admin-id",
    email: "admin@example.com",
    name: "Demo Admin",
    role: "admin",
    permissions: ["all"]
  };
}
