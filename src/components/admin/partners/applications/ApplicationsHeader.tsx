
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, RefreshCw } from "lucide-react";

interface ApplicationsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
  onRefresh: () => void;
  loading: boolean;
}

export const ApplicationsHeader: React.FC<ApplicationsHeaderProps> = ({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  onRefresh,
  loading,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search applications..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <Select
          value={filter}
          onValueChange={(value) => {
            onFilterChange(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Applications</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button 
        variant="outline" 
        className="ml-auto"
        onClick={onRefresh}
        disabled={loading}
      >
        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        Refresh
      </Button>
    </div>
  );
};
