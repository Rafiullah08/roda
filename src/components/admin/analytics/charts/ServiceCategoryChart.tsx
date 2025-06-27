
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface ServiceCategoryChartProps {
  data?: any[];
  isLoading: boolean;
  showLegend?: boolean;
  height?: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const ServiceCategoryChart: React.FC<ServiceCategoryChartProps> = ({
  data = [],
  isLoading,
  showLegend = false,
  height = 300,
}) => {
  // If we're loading or data is missing, show a skeleton
  if (isLoading || !data || data.length === 0) {
    return <Skeleton className={`w-full h-[${height}px]`} />;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        {showLegend && <Legend />}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ServiceCategoryChart;
