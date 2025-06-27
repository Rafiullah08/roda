
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ArrowUpDown, ListFilter, Search } from "lucide-react";
import { OrderStatusType, OrderSortType, OrderViewType } from "@/hooks/partner-dashboard/useOrders";

interface OrdersHeaderProps {
  statusFilter: string | null;
  onFilterChange: (status: string | null) => void;
  sortBy: OrderSortType;
  onSortChange: (sort: OrderSortType) => void;
  viewType: OrderViewType;
  onViewChange: (view: OrderViewType) => void;
  onSearch: (query: string) => void;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({ 
  statusFilter, 
  onFilterChange,
  sortBy,
  onSortChange,
  viewType,
  onViewChange,
  onSearch
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Input 
            placeholder="Search orders..." 
            className="pl-8"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Search
            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <Select
            value={statusFilter || "all"}
            onValueChange={(value) => onFilterChange(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={sortBy}
            onValueChange={(value) => onSortChange(value as OrderSortType)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="delivery">Upcoming Delivery</SelectItem>
              <SelectItem value="amount">Highest Value</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant={viewType === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => onViewChange("all")}
          >
            All Orders
          </Button>
          <Button 
            variant={viewType === "free" ? "default" : "outline"} 
            size="sm"
            onClick={() => onViewChange("free")}
          >
            Free Orders
          </Button>
          <Button 
            variant={viewType === "paid" ? "default" : "outline"} 
            size="sm"
            onClick={() => onViewChange("paid")}
          >
            Paid Orders
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="recent"
            checked={false}
          />
          <label
            htmlFor="recent"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Recent Only
          </label>
        </div>
      </div>
    </div>
  );
};

export default OrdersHeader;
