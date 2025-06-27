
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  navigation: {
    name: string;
    href: string;
    icon: React.ElementType;
  }[];
}

const DashboardSidebar = ({ navigation }: DashboardSidebarProps) => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/lovable-uploads/cac4af9e-934a-4265-832b-bbcdee7fecdd.png"
            alt="Logo"
            className="h-8 w-auto"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <div className="flex items-center justify-center py-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.avatar_url || ""} alt={user?.name || "User"} />
            <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.href}
                    tooltip={item.name}
                  >
                    <Link to={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
