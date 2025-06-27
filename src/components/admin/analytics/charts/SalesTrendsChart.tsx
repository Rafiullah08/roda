
import React from "react";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface SalesTrendsChartProps {
  data?: any[];
  isLoading: boolean;
  height?: number;
}

const SalesTrendsChart: React.FC<SalesTrendsChartProps> = ({
  data = [],
  isLoading,
  height = 300,
}) => {
  // If we're loading or data is missing, show a skeleton
  if (isLoading || !data || data.length === 0) {
    return <Skeleton className={`w-full h-[${height}px]`} />;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorRevenue)"
        />
        <Area
          type="monotone"
          dataKey="orders"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorOrders)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesTrendsChart;
