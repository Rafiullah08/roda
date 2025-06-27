
import React, { useMemo } from 'react';
import { Order } from '@/hooks/partner-dashboard/useOrders';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';
import { format, isPast, isToday, isTomorrow, addDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface UpcomingDeliveriesProps {
  orders?: Order[];
  isLoading: boolean;
  limit?: number;
}

const UpcomingDeliveries: React.FC<UpcomingDeliveriesProps> = ({ 
  orders = [], 
  isLoading,
  limit = 3
}) => {
  const navigate = useNavigate();
  
  const upcomingDeliveries = useMemo(() => {
    return orders
      .filter(order => 
        // Only include confirmed orders with delivery dates
        order.status === 'confirmed' && 
        order.delivery_date
      )
      .sort((a, b) => {
        // Sort by delivery date (ascending)
        const dateA = new Date(a.delivery_date || '');
        const dateB = new Date(b.delivery_date || '');
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, limit);
  }, [orders, limit]);
  
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array(2).fill(null).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (upcomingDeliveries.length === 0) {
    return (
      <div className="text-center p-4 border border-dashed rounded-lg">
        <p className="text-muted-foreground text-sm">No upcoming deliveries</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {upcomingDeliveries.map((order) => {
        const deliveryDate = order.delivery_date ? new Date(order.delivery_date) : null;
        const isOverdue = deliveryDate && isPast(deliveryDate) && !isToday(deliveryDate);
        const isDueToday = deliveryDate && isToday(deliveryDate);
        const isDueTomorrow = deliveryDate && isTomorrow(deliveryDate);
        const isDueSoon = deliveryDate && 
                          !isPast(deliveryDate) && 
                          !isToday(deliveryDate) && 
                          !isTomorrow(deliveryDate) && 
                          deliveryDate <= addDays(new Date(), 7);
        
        return (
          <div 
            key={order.id}
            className="flex items-start gap-3 p-3 border rounded-lg"
          >
            <div className={`
              p-2 rounded-full 
              ${isOverdue ? 'bg-red-100' : isDueToday ? 'bg-amber-100' : 'bg-blue-100'}
            `}>
              {isOverdue ? (
                <AlertTriangle className={`h-4 w-4 ${isOverdue ? 'text-red-600' : ''}`} />
              ) : (
                <Clock className={`h-4 w-4 ${isDueToday ? 'text-amber-600' : 'text-blue-600'}`} />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium line-clamp-1">
                  {order.service?.title || "Service delivery"}
                </h4>
                
                {isOverdue ? (
                  <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                    Overdue
                  </Badge>
                ) : isDueToday ? (
                  <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                    Today
                  </Badge>
                ) : isDueTomorrow ? (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    Tomorrow
                  </Badge>
                ) : isDueSoon ? (
                  <Badge variant="outline" className="text-xs">
                    Soon
                  </Badge>
                ) : null}
              </div>
              
              <div className="flex items-center gap-1 mt-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {deliveryDate ? format(deliveryDate, 'MMM d, yyyy') : 'No deadline'}
                </span>
              </div>
              
              <p className="text-xs text-muted-foreground mt-1">
                Customer: {order.customer_name}
              </p>
            </div>
          </div>
        );
      })}
      
      {upcomingDeliveries.length > 0 && (
        <div className="pt-2 text-center">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-xs"
            onClick={() => navigate('/partner-dashboard/orders')}
          >
            View all deliveries
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpcomingDeliveries;
