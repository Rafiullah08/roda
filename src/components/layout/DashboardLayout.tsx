
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import { useNavigation } from "@/components/dashboard/useNavigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  const navigation = useNavigation();

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider defaultOpen={!isMobile}>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar navigation={navigation} />

          {/* Main Content */}
          <div className="flex-1">
            <DashboardHeader navigation={navigation} />
            
            {/* Breadcrumb and Partner Toggle */}
            <DashboardBreadcrumb navigation={navigation} />

            {/* Page Content */}
            <div className="p-4 sm:p-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
