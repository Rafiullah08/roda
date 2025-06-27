
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TemplateFiltersProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  children: React.ReactNode;
}

const TemplateFilters: React.FC<TemplateFiltersProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  children
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <TabsList className="mb-4 sm:mb-0">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <div className="flex w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="ml-2">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Filter by Type</DropdownMenuItem>
              <DropdownMenuItem>Filter by Date</DropdownMenuItem>
              <DropdownMenuItem>Reset Filters</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {children}
    </Tabs>
  );
};

export default TemplateFilters;
