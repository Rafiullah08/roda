
import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface PartnerPerformanceChartProps {
  data?: any[];
  isLoading: boolean;
  showLegend?: boolean;
  height?: number;
}

const PartnerPerformanceChart: React.FC<PartnerPerformanceChartProps> = ({
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
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        {showLegend && <Legend />}
        <Bar yAxisId="left" dataKey="revenue" barSize={20} fill="#413ea0" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="rating"
          stroke="#ff7300"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default PartnerPerformanceChart;
