
import React from "react";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AdminNavigation from "../navigation/AdminNavigation";

interface MobileMenuProps {
  openItems: Record<string, boolean>;
  toggleCollapsible: (title: string) => void;
  hasPermission: (permissions?: string[]) => boolean;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  openItems, 
  toggleCollapsible, 
  hasPermission, 
  onLogout
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle className="text-left">RODA Admin</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between h-full py-4">
          <AdminNavigation 
            openItems={openItems}
            toggleCollapsible={toggleCollapsible}
            hasPermission={hasPermission}
            isMobile={true}
          />
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
