
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Order } from "@/hooks/partner-dashboard/useOrders";
import { 
  Calendar,
  User,
  Package,
  Map,
  CreditCard,
  Clock,
  FileText,
  MessageSquare,
  ListChecks,
  Clipboard
} from "lucide-react";
import AddOrderNote from "./AddOrderNote";
import OrderNotesList from "./OrderNotesList";
import UploadDeliverable from "./UploadDeliverable";
import DeliverablesList from "./DeliverablesList";

interface OrderDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onStatusChange: (orderId: string, newStatus: string) => Promise<void>;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  isOpen,
  onClose,
  order,
  onStatusChange,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [refreshNotes, setRefreshNotes] = useState(0);
  const [refreshDeliverables, setRefreshDeliverables] = useState(0);
  
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string | undefined) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline" className="bg-red-100 text-red-800">High Priority</Badge>;
      case "normal":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Normal</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Low Priority</Badge>;
      default:
        return null;
    }
  };

  const handleNoteAdded = () => {
    setRefreshNotes(prev => prev + 1);
  };
  
  const handleDeliverableUploaded = () => {
    setRefreshDeliverables(prev => prev + 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Order #{order.id.substring(0, 6).toUpperCase()}</span>
            <div className="flex items-center gap-2">
              {getPriorityBadge(order.priority)}
              {getStatusBadge(order.status)}
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Clipboard className="h-4 w-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="deliverables" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Deliverables
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              Notes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 py-4">
            {/* Service Details */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center">
                <Package className="h-5 w-5 mr-2" /> Service Details
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium">
                  {order.service && typeof order.service === 'object'
                    ? order.service.title
                    : order.service || 'Service data unavailable'}
                </p>
                {order.service && typeof order.service === 'object' && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {order.service.description?.substring(0, 100) || "No description available"}
                    {order.service.description && order.service.description.length > 100 ? "..." : ""}
                  </p>
                )}
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center">
                <User className="h-5 w-5 mr-2" /> Customer Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p><strong>Name:</strong> {order.customer_name}</p>
                <p><strong>Email:</strong> {order.customer_email}</p>
              </div>
            </div>

            {/* Order Information */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center">
                <Calendar className="h-5 w-5 mr-2" /> Order Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p><strong>Created:</strong> {formatDate(order.created_at)}</p>
                </div>
                {order.delivery_date && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p><strong>Expected Delivery:</strong> {formatDate(order.delivery_date)}</p>
                  </div>
                )}
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p><strong>Amount:</strong> {
                    order.service && typeof order.service === 'object' && order.service.is_free
                      ? "Free"
                      : `Rs ${order.amount.toFixed(2)}`
                  }</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="deliverables" className="space-y-4 py-4">
            <h3 className="text-lg font-medium">Upload Deliverable</h3>
            <UploadDeliverable 
              orderId={order.id} 
              onDeliverableUploaded={handleDeliverableUploaded}
            />
            
            <Separator className="my-6" />
            
            <h3 className="text-lg font-medium">Uploaded Deliverables</h3>
            <DeliverablesList 
              orderId={order.id}
              refresh={refreshDeliverables}
            />
          </TabsContent>
          
          <TabsContent value="notes" className="space-y-4 py-4">
            <h3 className="text-lg font-medium">Add Note</h3>
            <AddOrderNote 
              orderId={order.id}
              onNoteAdded={handleNoteAdded}
            />
            
            <Separator className="my-6" />
            
            <h3 className="text-lg font-medium">Order Notes</h3>
            <OrderNotesList 
              orderId={order.id}
              refresh={refreshNotes}
            />
          </TabsContent>
        </Tabs>
        
        <Separator />

        <DialogFooter className="flex items-center justify-between">
          <div className="flex gap-2">
            {order.status === "pending" && (
              <Button variant="default" onClick={() => onStatusChange(order.id, "confirmed")}>
                Confirm Order
              </Button>
            )}

            {order.status === "confirmed" && (
              <Button variant="default" onClick={() => onStatusChange(order.id, "completed")}>
                Mark as Completed
              </Button>
            )}

            {(order.status === "pending" || order.status === "confirmed") && (
              <Button 
                variant="outline" 
                onClick={() => onStatusChange(order.id, "cancelled")}
              >
                Cancel Order
              </Button>
            )}
          </div>

          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
