
import { Link, useLocation } from "react-router-dom";
import { usePartnerDashboard } from "@/contexts/PartnerDashboardContext";
import PartnerDashboardHeader from "@/components/partner-dashboard/PartnerDashboardHeader";

interface DashboardBreadcrumbProps {
  navigation: {
    name: string;
    href: string;
    icon: React.ElementType;
  }[];
}

const DashboardBreadcrumb = ({ navigation }: DashboardBreadcrumbProps) => {
  const location = useLocation();
  const { isPartner, mode } = usePartnerDashboard();

  return (
    <div className="px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2">
      {/* Partner Dashboard Toggle */}
      {isPartner && <PartnerDashboardHeader />}
      
      {/* Breadcrumb */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to={mode === 'partner' ? "/partner-dashboard" : "/dashboard"} className="text-gray-700 hover:text-purple-600">
              {mode === 'partner' ? "Partner Dashboard" : "Dashboard"}
            </Link>
          </li>
          {(mode === 'partner' ? location.pathname !== "/partner-dashboard" : location.pathname !== "/dashboard") && (
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">
                  {navigation.find((item) => item.href === location.pathname)?.name || ""}
                </span>
              </div>
            </li>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default DashboardBreadcrumb;
