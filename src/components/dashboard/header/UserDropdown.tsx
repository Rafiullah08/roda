
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar";
import { usePartnerDashboard } from "@/contexts/PartnerDashboardContext";
import AccountSwitcher from "./AccountSwitcher";

export const UserDropdown = () => {
  const { user, logout } = useAuth();
  const { mode } = usePartnerDashboard();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <UserAvatar imageUrl={user?.avatar_url} name={user?.name} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-white shadow-lg border">
        <DropdownMenuLabel className="bg-gray-50">
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
            <p className="text-xs font-medium text-primary">
              Current mode: {mode === 'partner' ? 'Partner' : 'Buyer'}
            </p>
          </div>
        </DropdownMenuLabel>
        
        {/* Account Switcher */}
        <AccountSwitcher />
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
          <User className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
