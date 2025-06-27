
import React from "react";
import { Badge } from "@/components/ui/badge";

interface OrderStatusBadgeProps {
  status: string;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="bg-amber-100 text-amber-800">Pending</Badge>;
    case "confirmed":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800">Confirmed</Badge>;
    case "completed":
      return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
    case "cancelled":
      return <Badge variant="outline" className="bg-red-100 text-red-800">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default OrderStatusBadge;
