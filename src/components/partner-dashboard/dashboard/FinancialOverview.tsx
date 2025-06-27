
import React, { useMemo, useState } from 'react';
import { Order } from '@/hooks/partner-dashboard/useOrders';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { format, startOfMonth, subMonths, eachMonthOfInterval } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown, CircleDollarSign } from 'lucide-react';

interface FinancialOverviewProps {
  orders?: Order[];
  isLoading: boolean;
  monthsToShow?: number;
}

const FinancialOverview: React.FC<FinancialOverviewProps> = ({ 
  orders = [], 
  isLoading,
  monthsToShow = 6 
}) => {
  const [activeTab, setActiveTab] = useState('earnings');
  
  const chartData = useMemo(() => {
    // Create an array of the last few months
    const endDate = new Date();
    const startDate = subMonths(startOfMonth(endDate), monthsToShow - 1);
    
    const months = eachMonthOfInterval({
      start: startDate,
      end: endDate
    }).map(date => ({
      monthKey: format(date, 'yyyy-MM'),
      month: format(date, 'MMM'),
      totalEarnings: 0,
      completedOrders: 0,
      freeServices: 0,
      paidServices: 0
    }));
    
    // Calculate earnings per month
    orders.forEach(order => {
      if (order.created_at) {
        const orderDate = new Date(order.created_at);
        const monthKey = format(orderDate, 'yyyy-MM');
        const monthData = months.find(m => m.monthKey === monthKey);
        
        if (monthData) {
          if (order.status === 'completed') {
            monthData.totalEarnings += order.amount || 0;
            monthData.completedOrders += 1;
          }
          
          // Check if it's a free service
          if (order.service && typeof order.service === 'object' && order.service.is_free) {
            monthData.freeServices += 1;
          } else {
            monthData.paidServices += 1;
          }
        }
      }
    });
    
    return months;
  }, [orders, monthsToShow]);
  
  // Calculate total and average earnings
  const totalEarnings = chartData.reduce((sum, month) => sum + month.totalEarnings, 0);
  const averageMonthlyEarnings = totalEarnings / monthsToShow;
  
  // Calculate month over month growth
  const thisMonth = chartData[chartData.length - 1]?.totalEarnings || 0;
  const lastMonth = chartData[chartData.length - 2]?.totalEarnings || 0;
  const growthRate = lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0;
  const isPositiveGrowth = growthRate >= 0;
  
  // Calculate completed order counts
  const totalCompletedOrders = chartData.reduce((sum, month) => sum + month.completedOrders, 0);
  const totalFreeServices = chartData.reduce((sum, month) => sum + month.freeServices, 0);
  const totalPaidServices = chartData.reduce((sum, month) => sum + month.paidServices, 0);
  
  if (isLoading) {
    return <Skeleton className="h-[200px] w-full" />;
  }
  
  return (
    <div className="w-full">
      <Tabs defaultValue="earnings" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full flex justify-center sm:justify-start mb-2">
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="earnings" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <div className="flex items-center gap-2">
                <CircleDollarSign className="h-4 w-4 text-green-600" />
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">Rs. {totalEarnings.toFixed(2)}</p>
              </div>
              <p className="text-xs text-muted-foreground">Last {monthsToShow} months</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Monthly Average</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold">Rs. {averageMonthlyEarnings.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">Per month</p>
            </div>
            
            <div className={`${isPositiveGrowth ? 'bg-green-50' : 'bg-red-50'} rounded-lg p-4`}>
              <p className="text-sm text-muted-foreground">Month over Month</p>
              <div className="flex items-center gap-2">
                {isPositiveGrowth ? (
                  <ArrowUp className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-600" />
                )}
                <p className={`text-lg sm:text-xl lg:text-2xl font-bold ${isPositiveGrowth ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(growthRate).toFixed(1)}%
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                {isPositiveGrowth ? 'Increase' : 'Decrease'} from last month
              </p>
            </div>
          </div>
          
          <div className="w-full" style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                  width={60}
                  tickFormatter={(value) => `Rs. ${value}`}
                />
                <Tooltip 
                  formatter={(value: number) => [`Rs. ${value.toFixed(2)}`, 'Earnings']}
                  contentStyle={{ borderRadius: '8px', padding: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="totalEarnings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Completed Orders</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold">{totalCompletedOrders}</p>
              <p className="text-xs text-muted-foreground">Last {monthsToShow} months</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Paid Services</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold">{totalPaidServices}</p>
              <p className="text-xs text-muted-foreground">{((totalPaidServices / (totalPaidServices + totalFreeServices || 1)) * 100).toFixed(0)}% of total</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Free Services</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold">{totalFreeServices}</p>
              <p className="text-xs text-muted-foreground">{((totalFreeServices / (totalPaidServices + totalFreeServices || 1)) * 100).toFixed(0)}% of total</p>
            </div>
          </div>
          
          <div className="w-full" style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  yAxisId="left"
                  tick={{ fontSize: 10 }}
                  width={30}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 10 }}
                  width={30}
                />
                <Tooltip />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="paidServices" 
                  stroke="#3b82f6" 
                  name="Paid Services"
                  strokeWidth={2}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="freeServices" 
                  stroke="#10b981" 
                  name="Free Services"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="forecast" className="space-y-6">
          <div className="flex flex-col items-center py-6">
            <div className="text-center px-4 py-4 max-w-md mx-auto">
              <CircleDollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Earnings Forecast</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-[400px]">
                Based on your current orders and growth rate, your estimated earnings for next month are:
              </p>
              <p className="text-3xl font-bold text-green-600">
                Rs. {(thisMonth * (1 + (growthRate / 100))).toFixed(2)}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialOverview;
