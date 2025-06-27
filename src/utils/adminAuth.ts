
import { loginAdmin, createAdmin, getAdminUserById } from "@/services/admin";
import { storeAdminSession, getAdminSession, clearAdminSession } from "@/utils/adminSession";
import { validatePassword } from "@/utils/validation";

// Export the AdminUser type with 'export type' to fix the TypeScript error
export type { AdminUser } from "@/types/admin";

// Define additional types for service management
export type ServicePermission = 
  | 'service:view' 
  | 'service:create' 
  | 'service:edit' 
  | 'service:delete'
  | 'category:view'
  | 'category:create'
  | 'category:edit'
  | 'category:delete';

// Helper function to check if admin has specific permission
export const hasPermission = (permissions: string[], permission: ServicePermission): boolean => {
  return permissions.includes(permission) || permissions.includes('admin:all');
};

// Re-export everything else for backward compatibility
export {
  loginAdmin,
  createAdmin,
  getAdminUserById,
  storeAdminSession,
  getAdminSession,
  clearAdminSession,
  validatePassword
};
