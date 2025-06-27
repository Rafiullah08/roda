
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export interface NavItemProps {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  permissions?: string[];
  children?: Omit<NavItemProps, 'hasPermission'>[];
  isOpen?: boolean;
  toggleCollapsible?: (title: string) => void;
  isMobile?: boolean;
  hasPermission: (permissions?: string[]) => boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  title,
  href,
  icon: Icon,
  children,
  isOpen,
  toggleCollapsible,
  isMobile = false,
  hasPermission
}) => {
  const location = useLocation();

  if (children) {
    return (
      <Collapsible
        key={title}
        open={isOpen}
        onOpenChange={() => toggleCollapsible && toggleCollapsible(title)}
        className={cn("w-full", isMobile ? "py-2" : "")}
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost" 
            className={cn(
              "w-full justify-between",
              isMobile ? "px-4" : "px-2"
            )}
          >
            <span className="flex items-center">
              {Icon && <Icon className="h-4 w-4 mr-2" />}
              {title}
            </span>
            <ChevronDown 
              className={cn(
                "h-4 w-4 transition-transform",
                isOpen ? "transform rotate-180" : ""
              )} 
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6 space-y-1">
          {children.map((child) => {
            if (!hasPermission(child.permissions)) return null;
            
            return (
              <Link 
                key={child.title} 
                to={child.href}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    location.pathname === child.href ? "bg-accent text-accent-foreground" : "",
                    isMobile ? "px-4" : "px-2"
                  )}
                >
                  {child.title}
                </Button>
              </Link>
            );
          })}
        </CollapsibleContent>
      </Collapsible>
    );
  }
  
  return (
    <Link key={title} to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start",
          location.pathname === href ? "bg-accent text-accent-foreground" : "",
          isMobile ? "py-2 px-4" : "px-2"
        )}
      >
        {Icon && <Icon className="h-4 w-4 mr-2" />}
        {title}
      </Button>
    </Link>
  );
};

export default NavItem;
