
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/hooks/partner-dashboard/useOrders";
import OrderDetailsDialog from "./OrderDetailsDialog";
import OrderTableRow from "./OrderTableRow";

interface OrdersTableProps {
  orders: Order[];
  onRefresh: () => void;
  onStatusChange: (orderId: string, status: string) => Promise<void>;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onRefresh, onStatusChange }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };
  
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await onStatusChange(orderId, newStatus);
      onRefresh(); // Refresh the orders list
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <OrderTableRow 
              key={order.id} 
              order={order}
              onViewDetails={handleViewDetails}
              onStatusChange={handleStatusChange}
            />
          ))}
        </TableBody>
      </Table>

      {selectedOrder && (
        <OrderDetailsDialog 
          isOpen={isDetailsOpen} 
          onClose={() => setIsDetailsOpen(false)}
          order={selectedOrder}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default OrdersTable;
