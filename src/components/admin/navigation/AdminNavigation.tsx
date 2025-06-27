
import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  ShieldCheck,
  Package, 
  CreditCard, 
  MessageSquare,
  UserCheck,
  User,
  FileBarChart,
  Bell,
  Mail,
  Inbox
} from "lucide-react";
import NavItem, { NavItemProps } from "./NavItem";

interface AdminNavigationProps {
  openItems: Record<string, boolean>;
  toggleCollapsible: (title: string) => void;
  hasPermission: (permissions?: string[]) => boolean;
  isMobile?: boolean;
}

// Helper function to conditionally join class names
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const getNavigationItems = (): Omit<NavItemProps, 'isOpen' | 'toggleCollapsible' | 'isMobile' | 'hasPermission'>[] => [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: FileBarChart,
    permissions: ["manage_analytics"],
  },
  {
    title: "User Management",
    href: "#",
    icon: Users,
    permissions: ["manage_users"],
    children: [
      {
        title: "Team Members",
        href: "/admin/users",
        permissions: ["manage_users"],
      },
      {
        title: "Invite User",
        href: "/admin/users/invite",
        permissions: ["manage_users"],
      },
      {
        title: "Buyer Profiles",
        href: "/admin/buyers",
        permissions: ["manage_users"],
      },
    ]
  },
  {
    title: "Role Management",
    href: "/admin/roles",
    icon: ShieldCheck,
    permissions: ["manage_roles"],
  },
  {
    title: "Services",
    href: "#",
    icon: Package,
    permissions: ["manage_services"],
    children: [
      {
        title: "Services List",
        href: "/admin/service-management",
        permissions: ["manage_services"],
      },
      {
        title: "Create Service",
        href: "/admin/service-management/create",
        permissions: ["manage_services"],
      },
      {
        title: "Create Prompt Service",
        href: "/admin/service-management/create-prompt",
        permissions: ["manage_services"],
      }
    ]
  },
  {
    title: "Partners",
    href: "#",
    icon: UserCheck,
    permissions: ["manage_partners"],
    children: [
      {
        title: "Partner Leads",
        href: "/admin/partners/leads",
        permissions: ["manage_partners"],
      },
      {
        title: "Partner Applications",
        href: "/admin/partners/applications",
        permissions: ["manage_partners"],
      },
      {
        title: "Partner Directory",
        href: "/admin/partners/directory",
        permissions: ["manage_partners"],
      },
      {
        title: "Service Assignments",
        href: "/admin/partners/assignments",
        permissions: ["manage_partners"],
      },
      {
        title: "Partner Monitoring",
        href: "/admin/partners/monitoring",
        permissions: ["manage_partners"],
      }
    ]
  },
  {
    title: "Email",
    href: "#",
    icon: Mail,
    permissions: ["manage_communications"],
    children: [
      {
        title: "Templates",
        href: "/admin/email/templates",
        permissions: ["manage_communications"],
      },
      {
        title: "Email Logs",
        href: "/admin/email/logs",
        permissions: ["manage_communications"],
      },
      {
        title: "Settings",
        href: "/admin/email/settings",
        permissions: ["manage_communications"],
      }
    ]
  },
  {
    title: "Newsletters",
    href: "/admin/newsletters",
    icon: Inbox,
    permissions: ["manage_communications"],
  },
  {
    title: "Announcements",
    href: "/admin/announcements",
    icon: Bell,
    permissions: ["manage_communications"],
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
    permissions: ["manage_payments"],
  },
  {
    title: "Support",
    href: "/admin/support",
    icon: MessageSquare,
    permissions: ["manage_support"],
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    permissions: ["manage_settings"],
  },
];

const AdminNavigation: React.FC<AdminNavigationProps> = ({ 
  openItems, 
  toggleCollapsible, 
  hasPermission,
  isMobile = false
}) => {
  const navigationItems = getNavigationItems();
  
  return (
    <nav className={cn("flex-1 space-y-1", isMobile ? "" : "")}>
      {navigationItems.map((item) => {
        // Skip items user doesn't have permission for
        if (!hasPermission(item.permissions)) return null;
        
        return (
          <NavItem 
            key={item.title}
            {...item} 
            isOpen={openItems[item.title]} 
            toggleCollapsible={toggleCollapsible}
            isMobile={isMobile}
            hasPermission={hasPermission}
          />
        );
      })}
    </nav>
  );
};

export default AdminNavigation;
