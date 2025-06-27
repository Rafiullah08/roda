
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Order } from "@/hooks/partner-dashboard/useOrders";
import { MessageSquare, FileText } from "lucide-react";
import { format } from "date-fns";
import OrderStatusBadge from "./OrderStatusBadge";
import DeliveryStatusBadge from "./DeliveryStatusBadge";
import OrderActionsDropdown from "./OrderActionsDropdown";

interface OrderTableRowProps {
  order: Order;
  onViewDetails: (order: Order) => void;
  onStatusChange: (orderId: string, status: string) => Promise<void>;
}

const OrderTableRow: React.FC<OrderTableRowProps> = ({ 
  order, 
  onViewDetails,
  onStatusChange 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="font-medium">
        #{order.id.substring(0, 6).toUpperCase()}
      </TableCell>
      <TableCell>
        {order.service && typeof order.service === 'object' 
          ? order.service.title 
          : order.service || 'Service data unavailable'}
      </TableCell>
      <TableCell>
        <div className="font-medium">{order.customer_name}</div>
        <div className="text-xs text-muted-foreground">
          {order.customer_email}
        </div>
      </TableCell>
      <TableCell>
        <div className="text-xs">Created: {formatDate(order.created_at)}</div>
        {order.delivery_date && (
          <div className="text-xs flex items-center gap-1 mt-1">
            Delivery: {format(new Date(order.delivery_date), 'MMM d, yyyy')}
            <DeliveryStatusBadge deliveryDate={order.delivery_date} />
          </div>
        )}
      </TableCell>
      <TableCell>
        {order.service && typeof order.service === 'object' && order.service.is_free 
          ? "Free" 
          : `Rs ${order.amount.toFixed(2)}`}
      </TableCell>
      <TableCell><OrderStatusBadge status={order.status} /></TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onViewDetails(order)}
            className="h-8 w-8"
          >
            <FileText className="h-4 w-4" />
            <span className="sr-only">View Details</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">Message</span>
          </Button>
          <OrderActionsDropdown
            orderId={order.id}
            status={order.status}
            onStatusChange={onStatusChange}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default OrderTableRow;
