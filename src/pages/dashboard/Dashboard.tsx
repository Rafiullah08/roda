import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePartnerDashboard } from "@/contexts/PartnerDashboardContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useBuyerPartnerApplication } from "@/hooks/useBuyerPartnerApplication";

// Import Button from the UI components
import { Button } from "@/components/ui/button";

// Import new dashboard components
import SpendingOverview from "@/components/dashboard/buyer/SpendingOverview";
import CategoryBreakdown from "@/components/dashboard/buyer/CategoryBreakdown";
import SatisfactionMetrics from "@/components/dashboard/buyer/SatisfactionMetrics";
import QuickAccessCards from "@/components/dashboard/buyer/QuickAccessCards";
import RecommendedServices from "@/components/dashboard/buyer/RecommendedServices";
import PartnerApplicationProgress from "@/components/dashboard/buyer/PartnerApplicationProgress";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const { isPartner, mode } = usePartnerDashboard();
  const { application, isLoading: appLoading, hasApplication, isApplicationInProgress } = useBuyerPartnerApplication();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('Dashboard state:', {
    hasApplication,
    isApplicationInProgress,
    application,
    appLoading
  });

  // Redirect to the partner dashboard if the user is a partner and in partner mode
  useEffect(() => {
    if (isPartner && mode === 'partner') {
      navigate('/partner-dashboard', { replace: true });
    }
  }, [isPartner, mode, navigate]);

  // Fetch recent orders for the user
  useEffect(() => {
    const fetchRecentOrders = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        console.log("Fetching orders for user ID:", user.id);
        
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (error) {
          console.error("Error fetching recent orders:", error);
          return;
        }
        
        if (data) {
          // Transform the data to match the expected format
          const formattedOrders = data.map(order => ({
            id: order.id,
            service: order.service,
            seller: order.partner_id ? "Assigned Partner" : "Unassigned",
            date: new Date(order.created_at).toISOString().split('T')[0],
            status: order.status,
            amount: `Rs. ${order.amount}`,
          }));
          
          setRecentOrders(formattedOrders);
        }
      } catch (error) {
        console.error("Unexpected error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
      case "completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Welcome to your Dashboard</h1>
          <p className="text-muted-foreground">Here's an overview of your activity and purchases.</p>
        </div>

        {/* Partner Application Progress - Show if user has an application */}
        {!appLoading && hasApplication && application && (
          <PartnerApplicationProgress application={application} />
        )}

        {/* Quick Access Cards */}
        <QuickAccessCards />

        {/* Spending Overview and Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpendingOverview />
          <CategoryBreakdown />
        </div>

        {/* Satisfaction Metrics */}
        <SatisfactionMetrics />

        {/* Recent Orders Table */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold">Recent Purchases</h2>
            <input
              type="text"
              placeholder="Search orders..."
              className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-auto"
            />
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading your orders...</p>
              </div>
            ) : recentOrders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead className="hidden md:table-cell">Seller</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id} className="cursor-pointer" onClick={() => navigate(`/dashboard/purchases?order=${order.id}`)}>
                      <TableCell className="font-medium">{`ORD-${order.id.slice(0, 4)}`}</TableCell>
                      <TableCell className="max-w-[150px] md:max-w-none truncate">{order.service}</TableCell>
                      <TableCell className="hidden md:table-cell">{order.seller}</TableCell>
                      <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{order.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-10">
                <div className="text-muted-foreground">
                  <p className="text-lg mb-2">No orders yet</p>
                  <p className="text-sm">Start exploring our services to place your first order</p>
                </div>
                <Button 
                  className="mt-4"
                  onClick={() => navigate('/services')}
                >
                  Browse Services
                </Button>
              </div>
            )}
          </div>
          {recentOrders.length > 0 && (
            <div className="mt-4 flex justify-between items-center">
              <Button 
                variant="link" 
                className="text-purple-600" 
                onClick={() => navigate('/dashboard/purchases')}
              >
                View all purchases
              </Button>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem className="hidden sm:inline-flex">
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>

        {/* Recommended Services */}
        <RecommendedServices />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
