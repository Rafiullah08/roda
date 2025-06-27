
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const DashboardSearchBar = () => {
  const isMobile = useIsMobile();
  const [mobileSearch, setMobileSearch] = useState(false);

  if (isMobile) {
    return (
      <>
        <Button 
          size="icon" 
          variant="ghost" 
          onClick={() => setMobileSearch(!mobileSearch)}
          className="relative md:hidden"
        >
          {mobileSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
        </Button>
        
        <div className={cn(
          "relative",
          !mobileSearch && "hidden",
          mobileSearch && "absolute top-16 left-4 right-4 z-50"
        )}>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </>
    );
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
    </div>
  );
};
