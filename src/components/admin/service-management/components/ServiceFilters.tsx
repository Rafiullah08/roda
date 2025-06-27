
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/hooks/service-management";

interface ServiceFiltersProps {
  onStatusChange: (status: string) => void;
  onCategoryChange: (category: string) => void;
  onTypeChange: (type: string) => void;
  onSearchChange: (search: string) => void;
  statusFilter: string;
  categoryFilter: string;
  typeFilter: string;
  searchQuery: string;
}

const ServiceFilters = ({
  onStatusChange,
  onCategoryChange,
  onTypeChange,
  onSearchChange,
  statusFilter,
  categoryFilter,
  typeFilter,
  searchQuery
}: ServiceFiltersProps) => {
  const { data: categories = [] } = useCategories();
  
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="w-full md:w-1/4">
        <Input
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="w-full md:w-1/4">
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-1/4">
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-1/4">
        <Select value={typeFilter} onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="Project">Project</SelectItem>
            <SelectItem value="Task">Task</SelectItem>
            <SelectItem value="Prompt">Prompt</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ServiceFilters;
