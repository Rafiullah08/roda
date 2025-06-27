
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface BuyerActivityChartProps {
  data?: any[];
  isLoading: boolean;
  height?: number;
}

const BuyerActivityChart: React.FC<BuyerActivityChartProps> = ({
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
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="newUsers" name="New Users" fill="#8884d8" />
        <Bar dataKey="activeUsers" name="Active Users" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BuyerActivityChart;
