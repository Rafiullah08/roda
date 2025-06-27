
import { supabase } from "@/integrations/supabase/client";
import { AdminUser } from "@/types/admin";
import { validatePassword } from "@/utils/validation";

/**
 * Creates a new admin user
 */
export async function createAdmin(
  email: string, 
  password: string, 
  name: string, 
  role: string = "admin",
  permissions: string[] = []
): Promise<AdminUser | null> {
  try {
    // Input validation
    if (!email || !password || !name) {
      throw new Error("Email, password, and name are required");
    }
    
    // Sanitize inputs
    email = email.trim().toLowerCase();
    name = name.trim();
    
    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.message);
    }
    
    // This would need to handle password hashing - in a production app, this would be handled by a backend service
    // For now we'll just mock this functionality since it depends on bcrypt which should be server-side
    console.log("Creating admin user:", { email, name, role });
    
    const { data, error } = await supabase
      .from("admin_users")
      .insert({
        email,
        password_hash: "hashed_password_would_go_here", // Server will handle actual hashing
        name,
        role,
        permissions
      })
      .select()
      .single();

    if (error) {
      console.error("Admin creation error:", error);
      return null;
    }

    // Convert permissions from JSONB to string array
    let parsedPermissions: string[] = [];
    
    if (data.permissions) {
      if (Array.isArray(data.permissions)) {
        parsedPermissions = data.permissions.map(item => String(item));
      } else if (typeof data.permissions === 'object') {
        parsedPermissions = Object.values(data.permissions).map(item => String(item));
      }
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      permissions: parsedPermissions,
    };
  } catch (error) {
    console.error("Admin creation error:", error);
    return null;
  }
}

/**
 * Retrieves admin user data by ID
 */
export async function getAdminUserById(id: string): Promise<AdminUser | null> {
  try {
    if (!id) {
      console.error("Admin ID is required");
      return null;
    }
    
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Get admin user error:", error);
      return null;
    }

    // Convert permissions from JSONB to string array
    let parsedPermissions: string[] = [];
    
    if (data.permissions) {
      if (Array.isArray(data.permissions)) {
        parsedPermissions = data.permissions.map(item => String(item));
      } else if (typeof data.permissions === 'object') {
        parsedPermissions = Object.values(data.permissions).map(item => String(item));
      }
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      permissions: parsedPermissions,
    };
  } catch (error) {
    console.error("Get admin user error:", error);
    return null;
  }
}
