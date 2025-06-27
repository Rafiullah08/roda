
import { useAuth } from "@/contexts/AuthContext";
import { DashboardSearchBar } from "./header/SearchBar";
import { NotificationsPopover } from "./header/NotificationsPopover";
import { MessagesButton } from "./header/MessagesButton";
import { UserDropdown } from "./header/UserDropdown";
import { PageTitle } from "./header/PageTitle";
import { usePartnerDashboard } from "@/contexts/PartnerDashboardContext";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  navigation: {
    name: string;
    href: string;
    icon: React.ElementType;
  }[];
}

const DashboardHeader = ({ navigation }: DashboardHeaderProps) => {
  const { user } = useAuth();
  const { mode, setMode, isPartner } = usePartnerDashboard();
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="flex justify-between items-center px-4 sm:px-6 py-4">
        <div className="flex items-center gap-4">
          <PageTitle navigation={navigation} />
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <DashboardSearchBar />
          <NotificationsPopover />
          <MessagesButton />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
