
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";

interface OrderActionsDropdownProps {
  orderId: string;
  status: string;
  onStatusChange: (orderId: string, status: string) => Promise<void>;
}

const OrderActionsDropdown: React.FC<OrderActionsDropdownProps> = ({ 
  orderId, 
  status, 
  onStatusChange 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {status === "pending" && (
          <DropdownMenuItem 
            onClick={() => onStatusChange(orderId, "confirmed")}
            className="flex items-center"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Confirm Order
          </DropdownMenuItem>
        )}
        {status === "confirmed" && (
          <DropdownMenuItem 
            onClick={() => onStatusChange(orderId, "completed")}
            className="flex items-center"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark as Completed
          </DropdownMenuItem>
        )}
        {(status === "pending" || status === "confirmed") && (
          <DropdownMenuItem 
            onClick={() => onStatusChange(orderId, "cancelled")}
            className="flex items-center text-red-600"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Cancel Order
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderActionsDropdown;
