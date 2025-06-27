
import React from 'react';
import { Order } from '@/hooks/partner-dashboard/useOrders';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, MessageSquare, FileText } from 'lucide-react';
import OrderStatusBadge from '@/components/partner-dashboard/orders/OrderStatusBadge';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RecentOrdersListProps {
  orders?: Order[];
  isLoading: boolean;
  limit?: number;
}

const RecentOrdersList: React.FC<RecentOrdersListProps> = ({ 
  orders = [], 
  isLoading,
  limit = 5
}) => {
  const navigate = useNavigate();
  
  const sortedOrders = React.useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);
  }, [orders, limit]);

  const activeOrders = React.useMemo(() => {
    return sortedOrders.filter(order => 
      order.status === 'confirmed' || order.status === 'pending'
    );
  }, [sortedOrders]);

  const completedOrders = React.useMemo(() => {
    return sortedOrders.filter(order => 
      order.status === 'completed'
    );
  }, [sortedOrders]);
  
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array(3).fill(null).map((_, i) => (
          <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    );
  }
  
  if (!sortedOrders.length) {
    return (
      <div className="text-center p-6 border border-dashed rounded-lg">
        <p className="text-muted-foreground">No orders yet</p>
        <Button 
          variant="link" 
          className="mt-2"
          onClick={() => navigate('/partner-dashboard/orders')}
        >
          View all orders
        </Button>
      </div>
    );
  }

  const OrderList = ({ orders }: { orders: Order[] }) => {
    if (orders.length === 0) {
      return (
        <div className="text-center p-4">
          <p className="text-muted-foreground">No orders in this category</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {orders.map((order) => (
          <div 
            key={order.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium truncate max-w-[200px] sm:max-w-none">
                  {order.service?.title || "Service"}
                </h4>
                <OrderStatusBadge status={order.status} />
                {order.priority === 'high' && (
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                    High Priority
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">
                  Customer: {order.customer_name}
                </p>
                <span className="text-xs text-muted-foreground">•</span>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-3 mt-2 sm:mt-0">
              <span className="font-medium">
                {order.service && typeof order.service === 'object' && order.service.is_free
                  ? "Free"
                  : `Rs. ${order.amount?.toFixed(2) || '0.00'}`}
              </span>
              <div className="flex items-center gap-1">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 text-blue-600"
                  onClick={() => navigate('/partner-dashboard/messages')}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="sr-only">Message</span>
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 text-purple-600"
                  onClick={() => navigate('/partner-dashboard/deliverables')}
                >
                  <FileText className="h-4 w-4" />
                  <span className="sr-only">Deliverable</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="flex items-center gap-1"
                  onClick={() => navigate(`/partner-dashboard/orders?id=${order.id}`)}
                >
                  <ExternalLink className="h-3 w-3" />
                  <span className="text-xs">View</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <OrderList orders={sortedOrders} />
        </TabsContent>
        
        <TabsContent value="active">
          <OrderList orders={activeOrders} />
        </TabsContent>
        
        <TabsContent value="completed">
          <OrderList orders={completedOrders} />
        </TabsContent>
      </Tabs>
      
      <div className="pt-2 text-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/partner-dashboard/orders')}
        >
          View all orders
        </Button>
      </div>
    </div>
  );
};

export default RecentOrdersList;
