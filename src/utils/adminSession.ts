
import { AdminUser, AdminSession } from "@/types/admin";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

/**
 * Stores the admin user session in localStorage with expiration
 */
export function storeAdminSession(user: AdminUser): void {
  try {
    // Add session expiration (24 hours from now)
    const session: AdminSession = {
      user,
      expires_at: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 hours from now
    };
    
    localStorage.setItem("adminAuth", JSON.stringify(session));
  } catch (error) {
    console.error("Error storing admin session:", error);
  }
}

/**
 * Retrieves and validates the admin user session from localStorage
 */
export function getAdminSession(): AdminSession | null {
  try {
    const sessionData = localStorage.getItem("adminAuth");
    if (!sessionData) return null;
    
    const session = JSON.parse(sessionData) as AdminSession;
    
    // Check if session has expired
    if (session.expires_at && new Date().getTime() > session.expires_at) {
      localStorage.removeItem("adminAuth");
      return null;
    }
    
    return session;
  } catch (error) {
    console.error("Error retrieving admin session:", error);
    return null;
  }
}

/**
 * Clears the admin user session from localStorage
 */
export function clearAdminSession(): void {
  localStorage.removeItem("adminAuth");
}

/**
 * Validates the admin session and refreshes the token if needed
 * Returns true if session is valid, false otherwise
 */
export async function validateAdminSession(): Promise<boolean> {
  try {
    const session = getAdminSession();
    if (!session) return false;
    
    // Check if session is about to expire (less than 15 minutes left)
    const timeLeft = session.expires_at - new Date().getTime();
    if (timeLeft < 15 * 60 * 1000) {
      console.log("Admin session is about to expire, attempting to refresh");
      
      // Attempt to refresh by calling the admin auth endpoint
      const { data: { session: supabaseSession } } = await supabase.auth.getSession();
      
      // If Supabase has a valid session, use that to extend our admin session
      if (supabaseSession) {
        // Extend session by 24 hours
        session.expires_at = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem("adminAuth", JSON.stringify(session));
        return true;
      }
      
      // If Supabase doesn't have a valid session, clear our admin session
      clearAdminSession();
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error validating admin session:", error);
    return false;
  }
}

/**
 * Checks admin session and shows toast message if expired
 * Returns true if session is valid, false otherwise
 */
export async function checkAdminSessionWithFeedback(): Promise<boolean> {
  const isValid = await validateAdminSession();
  
  if (!isValid) {
    toast({
      title: "Session Expired",
      description: "Your session has expired. Please log in again.",
      variant: "destructive"
    });
  }
  
  return isValid;
}
