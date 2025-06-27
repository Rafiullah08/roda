import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { AdminUser, getAdminSession, clearAdminSession } from "@/utils/adminAuth";
import AdminSidebar from "../admin/sidebar/AdminSidebar";
import MobileMenu from "../admin/sidebar/MobileMenu";
import AdminHeader from "../admin/header/AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in with session expiry check
    const session = getAdminSession();
    if (!session || !session.user) {
      navigate("/admin/login");
      return;
    }
    
    setUser(session.user);
    
    // Set up periodic session check (every 5 minutes)
    const intervalId = setInterval(() => {
      const currentSession = getAdminSession();
      if (!currentSession || !currentSession.user) {
        clearInterval(intervalId);
        toast({
          title: "Session expired",
          description: "Your session has expired. Please log in again.",
          variant: "destructive"
        });
        navigate("/admin/login");
      }
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleLogout = () => {
    clearAdminSession();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/admin/login");
  };

  const toggleCollapsible = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const hasPermission = (requiredPermissions?: string[]) => {
    if (!requiredPermissions || requiredPermissions.length === 0) return true;
    if (!user || !user.permissions) return false;
    
    // If user is admin, grant all permissions
    if (user.role === 'admin') return true;
    
    // Otherwise check specific permissions
    return requiredPermissions.some(permission => 
      user.permissions.includes(permission)
    );
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <AdminSidebar 
        openItems={openItems}
        toggleCollapsible={toggleCollapsible}
        hasPermission={hasPermission}
        onLogout={handleLogout}
      />

      {/* Mobile menu */}
      <MobileMenu 
        openItems={openItems}
        toggleCollapsible={toggleCollapsible}
        hasPermission={hasPermission}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader user={user} onLogout={handleLogout} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
