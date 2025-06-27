
import React from "react";
import { useLocation } from "react-router-dom";
import UserMenu from "../user/UserMenu";
import { AdminUser } from "@/types/admin";

interface AdminHeaderProps {
  user: AdminUser;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ user, onLogout }) => {
  const location = useLocation();

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case "/admin/dashboard":
        return "Dashboard";
      case "/admin/users":
        return "Team Members";
      case "/admin/users/invite":
        return "Invite User";
      case "/admin/roles":
        return "Role Management";
      case "/admin/services":
      case "/admin/service-management":
        return "Services";
      case "/admin/partners":
      case "/admin/partners/applications":
        return "Partner Applications";
      case "/admin/partners/directory":
        return "Partner Directory";
      case "/admin/partners/assignments":
        return "Service Assignments";
      case "/admin/payments":
        return "Payments";
      case "/admin/support":
        return "Support";
      case "/admin/settings":
        return "Settings";
      default:
        if (pathname.startsWith("/admin/partners/applications/")) {
          return "Application Details";
        } else if (pathname.startsWith("/admin/partners/directory/")) {
          return "Partner Details";
        } else if (pathname.startsWith("/admin/service-management/edit/")) {
          return "Edit Service";
        } else if (pathname.startsWith("/admin/service-management/create")) {
          return "Create Service";
        }
        return "Admin Dashboard";
    }
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-4 py-4 md:px-6">
        <h1 className="text-lg md:text-xl font-semibold text-gray-900">
          {getPageTitle(location.pathname)}
        </h1>
        
        <div className="flex items-center">
          <UserMenu user={user} onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
