
import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Package, 
  CircleDollarSign, 
  AlertTriangle, 
  CheckCircle, 
  ArrowUp, 
  ArrowDown, 
  TrendingUp
} from 'lucide-react';
import { Order } from '@/hooks/partner-dashboard/useOrders';
import { Skeleton } from '@/components/ui/skeleton';

interface PartnerMetricsOverviewProps {
  orders?: Order[];
  isLoading: boolean;
}

const PartnerMetricsOverview: React.FC<PartnerMetricsOverviewProps> = ({ 
  orders = [], 
  isLoading 
}) => {
  const metrics = useMemo(() => {
    if (!orders.length) {
      return {
        activeOrders: 0,
        totalEarnings: 0,
        refundRate: 0,
        completionRate: 0,
      };
    }
    
    // Calculate active orders
    const activeOrders = orders.filter(order => 
      order.status === 'confirmed' || order.status === 'pending'
    ).length;
    
    // Calculate total earnings
    const totalEarnings = orders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + (order.amount || 0), 0);
      
    // Calculate refund rate (assuming cancelled after confirmation might be a refund)
    const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;
    const totalOrders = orders.length;
    const refundRate = totalOrders > 0 ? (cancelledOrders / totalOrders) * 100 : 0;
    
    // Calculate completion rate
    const completedOrders = orders.filter(order => order.status === 'completed').length;
    const completionRate = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;
    
    return {
      activeOrders,
      totalEarnings,
      refundRate,
      completionRate,
    };
  }, [orders]);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Active Orders */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Package className="h-5 w-5 text-blue-700" />
              </div>
              <span className="text-sm font-medium">Active Orders</span>
            </div>
            <div className="bg-green-50 px-2 py-1 rounded-full flex items-center space-x-1">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-xs font-medium text-green-600">12%</span>
            </div>
          </div>
          
          {isLoading ? (
            <Skeleton className="h-8 w-16 mt-2" />
          ) : (
            <div className="mt-3">
              <p className="text-2xl font-bold">{metrics.activeOrders}</p>
              <p className="text-xs text-muted-foreground mt-1">From {orders.length} total orders</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Total Earnings */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 p-2 rounded-full">
                <CircleDollarSign className="h-5 w-5 text-green-700" />
              </div>
              <span className="text-sm font-medium">Total Earnings</span>
            </div>
            <div className="bg-green-50 px-2 py-1 rounded-full flex items-center space-x-1">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-xs font-medium text-green-600">8%</span>
            </div>
          </div>
          
          {isLoading ? (
            <Skeleton className="h-8 w-20 mt-2" />
          ) : (
            <div className="mt-3">
              <p className="text-2xl font-bold">Rs. {metrics.totalEarnings.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Refund Rate */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-700" />
              </div>
              <span className="text-sm font-medium">Refund Rate</span>
            </div>
            <div className="bg-red-50 px-2 py-1 rounded-full flex items-center space-x-1">
              <ArrowDown className="h-3 w-3 text-red-600" />
              <span className="text-xs font-medium text-red-600">2%</span>
            </div>
          </div>
          
          {isLoading ? (
            <Skeleton className="h-8 w-16 mt-2" />
          ) : (
            <div className="mt-3">
              <p className="text-2xl font-bold">{metrics.refundRate.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground mt-1">Lower is better</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Completion Rate */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-purple-100 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-purple-700" />
              </div>
              <span className="text-sm font-medium">Completion Rate</span>
            </div>
            <div className="bg-green-50 px-2 py-1 rounded-full flex items-center space-x-1">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-xs font-medium text-green-600">5%</span>
            </div>
          </div>
          
          {isLoading ? (
            <Skeleton className="h-8 w-16 mt-2" />
          ) : (
            <div className="mt-3">
              <p className="text-2xl font-bold">{metrics.completionRate.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground mt-1">Higher is better</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerMetricsOverview;
