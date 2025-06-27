
import { supabase } from "@/integrations/supabase/client";
import { format, subDays, parseISO, startOfDay, endOfDay } from "date-fns";
import { DateRange } from "react-day-picker";

// Fetch analytics data based on date range
export const fetchAnalyticsData = async (fromDate: Date, toDate: Date) => {
  try {
    // Format dates for queries
    const fromDateStr = format(startOfDay(fromDate), "yyyy-MM-dd'T'HH:mm:ss");
    const toDateStr = format(endOfDay(toDate), "yyyy-MM-dd'T'HH:mm:ss");
    
    // For comparison (previous period)
    const daysDiff = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
    const prevFromDate = subDays(fromDate, daysDiff);
    const prevToDate = fromDate;
    
    // Get total orders and revenue
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('id, amount, created_at')
      .gte('created_at', fromDateStr)
      .lte('created_at', toDateStr);
    
    if (ordersError) throw new Error(ordersError.message);
    
    // Get previous period orders for comparison
    const { data: prevOrdersData, error: prevOrdersError } = await supabase
      .from('orders')
      .select('id, amount')
      .gte('created_at', format(prevFromDate, "yyyy-MM-dd'T'HH:mm:ss"))
      .lte('created_at', format(prevToDate, "yyyy-MM-dd'T'HH:mm:ss"));
    
    if (prevOrdersError) throw new Error(prevOrdersError.message);
    
    // Get active buyers
    const { data: buyersData, error: buyersError } = await supabase
      .from('profiles')
      .select('id, created_at');
    
    if (buyersError) throw new Error(buyersError.message);
    
    const activeUsers = buyersData.filter(buyer => {
      const createdAt = parseISO(buyer.created_at);
      return createdAt >= fromDate && createdAt <= toDate;
    });
    
    // Get partner ratings
    const { data: ratingsData, error: ratingsError } = await supabase
      .from('partner_ratings')
      .select('rating, created_at')
      .gte('created_at', fromDateStr)
      .lte('created_at', toDateStr);
    
    if (ratingsError) throw new Error(ratingsError.message);
    
    // Calculate metrics
    const totalOrders = ordersData.length;
    const totalRevenue = ordersData.reduce((sum, order) => sum + Number(order.amount), 0);
    const prevTotalOrders = prevOrdersData.length;
    const prevTotalRevenue = prevOrdersData.reduce((sum, order) => sum + Number(order.amount), 0);
    
    const ordersChange = prevTotalOrders === 0 
      ? 100 
      : Math.round(((totalOrders - prevTotalOrders) / prevTotalOrders) * 100);
    
    const revenueChange = prevTotalRevenue === 0 
      ? 100 
      : Math.round(((totalRevenue - prevTotalRevenue) / prevTotalRevenue) * 100);
    
    const activeBuyers = activeUsers.length;
    const prevActiveBuyers = buyersData.filter(buyer => {
      const createdAt = parseISO(buyer.created_at);
      return createdAt >= prevFromDate && createdAt < fromDate;
    }).length;
    
    const buyersChange = prevActiveBuyers === 0 
      ? 100 
      : Math.round(((activeBuyers - prevActiveBuyers) / prevActiveBuyers) * 100);
    
    const avgRating = ratingsData.length > 0
      ? Number((ratingsData.reduce((sum, rating) => sum + Number(rating.rating), 0) / ratingsData.length).toFixed(1))
      : 0;
    
    // Group orders by date for trends
    const salesByDate = {};
    ordersData.forEach(order => {
      const date = format(parseISO(order.created_at), 'yyyy-MM-dd');
      if (!salesByDate[date]) {
        salesByDate[date] = { 
          date: format(parseISO(order.created_at), 'MMM dd'),
          revenue: 0,
          orders: 0
        };
      }
      salesByDate[date].revenue += Number(order.amount);
      salesByDate[date].orders += 1;
    });
    
    const salesTrends = Object.values(salesByDate);
    
    // Mock data for demonstration - in a real app, these would come from actual database queries
    const categoryData = [
      { name: 'Web Development', value: 40 },
      { name: 'Design', value: 25 },
      { name: 'Marketing', value: 15 },
      { name: 'Business', value: 10 },
      { name: 'Other', value: 10 },
    ];
    
    // Mock data for service performance (previously missing)
    const servicePerformance = [
      { name: 'Website Design', value: 35 },
      { name: 'Mobile App Dev', value: 25 },
      { name: 'SEO Services', value: 15 },
      { name: 'Content Writing', value: 12 },
      { name: 'Logo Design', value: 8 },
      { name: 'Video Editing', value: 5 },
    ];
    
    const partnerPerformance = [
      { name: 'Partner A', revenue: 4000, rating: 4.8 },
      { name: 'Partner B', revenue: 3000, rating: 4.2 },
      { name: 'Partner C', revenue: 5000, rating: 4.9 },
      { name: 'Partner D', revenue: 2500, rating: 3.8 },
      { name: 'Partner E', revenue: 1500, rating: 4.5 },
    ];
    
    const buyerActivity = [
      { name: 'Week 1', newUsers: 40, activeUsers: 25 },
      { name: 'Week 2', newUsers: 30, activeUsers: 28 },
      { name: 'Week 3', newUsers: 45, activeUsers: 32 },
      { name: 'Week 4', newUsers: 50, activeUsers: 35 },
    ];
    
    // Mock data for platform growth metrics (previously missing)
    const newUsers = [
      { name: 'Jan', value: 30 },
      { name: 'Feb', value: 40 },
      { name: 'Mar', value: 35 },
      { name: 'Apr', value: 50 },
      { name: 'May', value: 65 },
      { name: 'Jun', value: 75 },
    ];
    
    const newPartners = [
      { name: 'Jan', value: 5 },
      { name: 'Feb', value: 8 },
      { name: 'Mar', value: 12 },
      { name: 'Apr', value: 15 },
      { name: 'May', value: 18 },
      { name: 'Jun', value: 22 },
    ];
    
    const revenue = [
      { name: 'Jan', value: 10000 },
      { name: 'Feb', value: 15000 },
      { name: 'Mar', value: 12000 },
      { name: 'Apr', value: 18000 },
      { name: 'May', value: 22000 },
      { name: 'Jun', value: 28000 },
    ];
    
    return {
      totalOrders,
      totalRevenue,
      ordersChange,
      revenueChange,
      activeBuyers,
      buyersChange,
      avgRating,
      ratingChange: 0, // This would need comparison with previous period
      salesTrends,
      categoryData,
      servicePerformance, // Added the missing property
      partnerPerformance,
      buyerActivity,
      newUsers, // Added the missing property
      newPartners, // Added the missing property
      revenue, // Added the missing property
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw error;
  }
};

// Export analytics data based on type and format
export const exportAnalyticsData = async (
  reportType: string,
  dateRange: DateRange,
  format: "csv" | "pdf"
) => {
  if (!dateRange.from || !dateRange.to) {
    throw new Error("Valid date range required for export");
  }
  
  try {
    // In a real implementation, this would generate and download a file
    // For demonstration, we'll just simulate a delay and then "succeed"
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would actually build the CSV or PDF file based on the reportType and dateRange
    // Then trigger a file download
    
    console.log(`Exporting ${reportType} report as ${format} from ${dateRange.from} to ${dateRange.to}`);
    return true;
  } catch (error) {
    console.error("Error exporting analytics data:", error);
    throw error;
  }
};
