
import React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminNavigation from "../navigation/AdminNavigation";

interface AdminSidebarProps {
  openItems: Record<string, boolean>;
  toggleCollapsible: (title: string) => void;
  hasPermission: (permissions?: string[]) => boolean;
  onLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  openItems, 
  toggleCollapsible, 
  hasPermission, 
  onLogout 
}) => {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r bg-white">
        <div className="flex items-center flex-shrink-0 px-4">
          <Link to="/admin/dashboard" className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">RODA Admin</h1>
          </Link>
        </div>
        <div className="flex flex-col flex-grow px-4 mt-5">
          <AdminNavigation 
            openItems={openItems}
            toggleCollapsible={toggleCollapsible}
            hasPermission={hasPermission}
          />
        </div>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
