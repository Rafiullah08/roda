
import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  CreditCard, 
  Star 
} from "lucide-react";

interface KpiCardsProps {
  data?: any;
  isLoading: boolean;
}

const KpiCards: React.FC<KpiCardsProps> = ({ data, isLoading }) => {
  const kpis = [
    {
      title: "Total Revenue",
      value: data?.totalRevenue || 0,
      change: data?.revenueChange || 0,
      prefix: "Rs. ",
      icon: CreditCard,
    },
    {
      title: "Total Orders",
      value: data?.totalOrders || 0,
      change: data?.ordersChange || 0,
      icon: Package,
    },
    {
      title: "Active Buyers",
      value: data?.activeBuyers || 0,
      change: data?.buyersChange || 0,
      icon: Users,
    },
    {
      title: "Avg. Rating",
      value: data?.avgRating || 0,
      change: data?.ratingChange || 0,
      suffix: "/5",
      icon: Star,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-4 w-[100px] mb-2" />
            <Skeleton className="h-8 w-[120px] mb-4" />
            <Skeleton className="h-4 w-[80px]" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => {
        const isPositiveChange = kpi.change >= 0;
        const TrendIcon = isPositiveChange ? TrendingUp : TrendingDown;
        const trendColor = isPositiveChange ? "text-green-500" : "text-red-500";

        return (
          <Card key={index} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {kpi.title}
                </p>
                <h3 className="text-2xl font-bold">
                  {kpi.prefix || ""}{kpi.value.toLocaleString()}{kpi.suffix || ""}
                </h3>
                <div className={`flex items-center mt-2 ${trendColor}`}>
                  <TrendIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">
                    {isPositiveChange ? "+" : ""}{kpi.change}%
                  </span>
                </div>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <kpi.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default KpiCards;
