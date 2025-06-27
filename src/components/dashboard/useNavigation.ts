
import { Home, User, CreditCard, Settings, FileText, Bell, Heart, MessageSquare, Users, Star, CheckSquare, Briefcase, BookOpen, Package, ListChecks, Bookmark } from 'lucide-react';
import { usePartnerDashboard } from '@/contexts/PartnerDashboardContext';

export function useNavigation() {
  const { mode, isPartner } = usePartnerDashboard();
  
  // Common navigation for all users
  const commonNavigation = [
    {
      name: "Dashboard",
      href: mode === 'partner' ? "/partner-dashboard" : "/dashboard",
      icon: Home,
    },
    {
      name: "Profile",
      href: mode === 'partner' ? "/partner-dashboard/profile" : "/dashboard/profile",
      icon: User,
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
    }
  ];
  
  // Buyer-specific navigation
  const buyerNavigation = [
    {
      name: "Purchases",
      href: "/dashboard/purchases",
      icon: CreditCard,
    },
    {
      name: "Favorites",
      href: "/dashboard/favourites",
      icon: Heart,
    },
    {
      name: "Reviews",
      href: "/dashboard/reviews",
      icon: Star,
    },
    {
      name: "Transactions",
      href: "/dashboard/transactions",
      icon: FileText,
    }
  ];
  
  // Partner-specific navigation
  const partnerNavigation = [
    {
      name: "My Services",
      href: "/partner-dashboard/my-services",
      icon: Briefcase,
    },
    {
      name: "Free Services",
      href: "/partner-dashboard/free-services",
      icon: BookOpen,
    },
    {
      name: "Orders",
      href: "/partner-dashboard/orders",
      icon: Package,
    },
    {
      name: "Assignments",
      href: "/partner-dashboard/assignments",
      icon: ListChecks,
    },
    {
      name: "Bookmarks",
      href: "/partner-dashboard/bookmarks",
      icon: Bookmark,
    },
    {
      name: "Reviews",
      href: "/partner-dashboard/reviews",
      icon: Star,
    }
  ];

  // Return the appropriate navigation based on user mode
  return [
    ...commonNavigation,
    ...(mode === 'partner' ? partnerNavigation : buyerNavigation)
  ];
}
