
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, subDays } from "date-fns";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";
import { FileBarChart } from "lucide-react";
import { 
  SalesTrendsChart,
  ServiceCategoryChart,
  BuyerActivityChart,
  PartnerPerformanceChart 
} from "@/components/admin/analytics/charts";
import AnalyticsHeader from "@/components/admin/analytics/AnalyticsHeader";
import KpiCards from "@/components/admin/analytics/KpiCards";
import ExportReportButton from "@/components/admin/analytics/ExportReportButton";
import { fetchAnalyticsData } from "@/services/admin/analyticsService";
import { DateRangePicker } from "@/components/admin/analytics/DateRangePicker";

const AdminAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date()
  });

  // Ensure we have valid dates for the API call
  const from = dateRange.from || subDays(new Date(), 30);
  const to = dateRange.to || new Date();

  // Fetch analytics data based on date range
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['analytics', from, to],
    queryFn: () => fetchAnalyticsData(from, to)
  });

  // Wrapper function to handle DateRange updates while ensuring "to" is always set
  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AnalyticsHeader 
          dateRange={dateRange} 
          onDateRangeChange={handleDateRangeChange} 
        />
        
        <KpiCards data={analyticsData} isLoading={isLoading} />
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="overview">Platform Overview</TabsTrigger>
              <TabsTrigger value="services">Service Analytics</TabsTrigger>
              <TabsTrigger value="partners">Partner Performance</TabsTrigger>
              <TabsTrigger value="buyers">Buyer Behavior</TabsTrigger>
            </TabsList>
            
            <ExportReportButton reportType={activeTab} dateRange={dateRange} />
          </div>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Sales Trends</h3>
                <SalesTrendsChart data={analyticsData?.salesTrends} isLoading={isLoading} />
              </Card>
              
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Service Categories</h3>
                <ServiceCategoryChart data={analyticsData?.categoryData} isLoading={isLoading} />
              </Card>
            </div>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Platform Growth</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">New Users</h4>
                  <BuyerActivityChart data={analyticsData?.newUsers} isLoading={isLoading} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">New Partners</h4>
                  <PartnerPerformanceChart data={analyticsData?.newPartners} isLoading={isLoading} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Revenue</h4>
                  <SalesTrendsChart data={analyticsData?.revenue} isLoading={isLoading} />
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="services" className="space-y-6">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Service Performance</h3>
              <ServiceCategoryChart 
                data={analyticsData?.servicePerformance} 
                isLoading={isLoading}
                showLegend={true}
                height={400} 
              />
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Top Performing Services</h3>
              {/* Table component for top services will go here */}
            </Card>
          </TabsContent>
          
          <TabsContent value="partners" className="space-y-6">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Partner Performance</h3>
              <PartnerPerformanceChart 
                data={analyticsData?.partnerPerformance} 
                isLoading={isLoading}
                showLegend={true}
                height={400} 
              />
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Top Partners</h3>
              {/* Table component for top partners will go here */}
            </Card>
          </TabsContent>
          
          <TabsContent value="buyers" className="space-y-6">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Buyer Activity</h3>
              <BuyerActivityChart 
                data={analyticsData?.buyerActivity} 
                isLoading={isLoading}
                height={400} 
              />
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Purchase Patterns</h3>
              {/* Purchase patterns chart will go here */}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalyticsDashboard;
