
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Order } from '@/hooks/partner-dashboard/useOrders';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Check, CircleX, Loader, Info } from 'lucide-react';

interface OrdersOverviewProps {
  orders?: Order[];
  isLoading: boolean;
}

const COLORS = {
  pending: '#FBBF24', // Amber
  confirmed: '#3B82F6', // Blue
  completed: '#10B981', // Green
  cancelled: '#EF4444', // Red
};

const OrdersOverview: React.FC<OrdersOverviewProps> = ({ orders = [], isLoading }) => {
  const chartData = useMemo(() => {
    const statusCounts = {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    };
    
    // Count orders by status
    orders.forEach(order => {
      if (order.status in statusCounts) {
        statusCounts[order.status as keyof typeof statusCounts]++;
      }
    });
    
    // Convert to chart data format
    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
      color: COLORS[status as keyof typeof COLORS],
    }));
  }, [orders]);
  
  // Calculate percentage for each status
  const total = orders.length || 1; // Avoid division by zero
  const percentages = useMemo(() => {
    return {
      pending: (chartData.find(item => item.name === 'Pending')?.value || 0) / total * 100,
      confirmed: (chartData.find(item => item.name === 'Confirmed')?.value || 0) / total * 100,
      completed: (chartData.find(item => item.name === 'Completed')?.value || 0) / total * 100,
      cancelled: (chartData.find(item => item.name === 'Cancelled')?.value || 0) / total * 100,
    };
  }, [chartData, total]);
  
  if (isLoading) {
    return <Skeleton className="h-[200px] w-full" />;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Chart and Cards Section (Left side) */}
      <div className="md:col-span-8">
        <div className="grid grid-cols-1 gap-6">
          {/* Chart Section */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius="45%"
                  outerRadius="70%"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value} orders`, 'Count']}
                  contentStyle={{ borderRadius: '8px', padding: '8px', border: '1px solid #e2e8f0' }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Status Cards Section - Top Row */}
          <div className="grid grid-cols-2 gap-4">
            <OrderStatusCard 
              count={chartData.find(item => item.name === 'Pending')?.value || 0} 
              color={COLORS.pending} 
              icon={<Loader className="h-4 w-4" />}
              percentage={percentages.pending}
            />
            <OrderStatusCard 
              count={chartData.find(item => item.name === 'Confirmed')?.value || 0} 
              color={COLORS.confirmed} 
              icon={<Check className="h-4 w-4" />}
              percentage={percentages.confirmed}
            />
          </div>
          
          {/* Status Cards Section - Bottom Row */}
          <div className="grid grid-cols-2 gap-4">
            <OrderStatusCard 
              count={chartData.find(item => item.name === 'Completed')?.value || 0}  
              color={COLORS.completed} 
              icon={<Check className="h-4 w-4" />}
              percentage={percentages.completed}
            />
            <OrderStatusCard 
              count={chartData.find(item => item.name === 'Cancelled')?.value || 0} 
              color={COLORS.cancelled}
              icon={<CircleX className="h-4 w-4" />}
              percentage={percentages.cancelled} 
            />
          </div>
        </div>
      </div>

      {/* Order Insights Card (Right side) */}
      <div className="md:col-span-4">
        <Card className="h-full">
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                <Info className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h4 className="text-base font-medium mb-3">Order Insights</h4>
                <p className="text-sm text-muted-foreground">
                  {percentages.completed > 70 ? 
                    "Great job! Your completion rate is excellent." : 
                    "Focus on completing your pending orders to improve your metrics."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Card component for status items
const OrderStatusCard = ({ 
  count,
  color,
  icon,
  percentage
}: { 
  count: number;
  color: string;
  icon: React.ReactNode;
  percentage: number;
}) => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="p-1.5 rounded-full" style={{ backgroundColor: `${color}20` }}>
            {icon}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-xl font-bold">{count} orders</span>
          <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}% of total</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersOverview;
