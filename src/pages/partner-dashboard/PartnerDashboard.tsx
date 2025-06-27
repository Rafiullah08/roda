
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PartnerDashboardLayout from '@/components/layout/PartnerDashboardLayout';
import { usePartnerDashboard } from '@/contexts/PartnerDashboardContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowUp, 
  ArrowDown, 
  Clock, 
  CircleDollarSign, 
  Package, 
  RefreshCcw, 
  AlertTriangle, 
  BarChart2, 
  Calendar, 
  Users, 
  TrendingUp,
  FileText,
  MessageSquare
} from 'lucide-react';
import { useOrders, Order } from '@/hooks/partner-dashboard/useOrders';
import OrderStatusBadge from '@/components/partner-dashboard/orders/OrderStatusBadge';
import PartnerMetricsOverview from '@/components/partner-dashboard/dashboard/PartnerMetricsOverview';
import RecentOrdersList from '@/components/partner-dashboard/dashboard/RecentOrdersList';
import FinancialOverview from '@/components/partner-dashboard/dashboard/FinancialOverview';
import UpcomingDeliveries from '@/components/partner-dashboard/dashboard/UpcomingDeliveries';
import ClientInteractions from '@/components/partner-dashboard/dashboard/ClientInteractions';
import NotRegisteredPartner from '@/components/partner-dashboard/NotRegisteredPartner';
import RequiredActionsCard from '@/components/partner-dashboard/RequiredActionsCard';
import ApplicationTimeline from '@/components/partner-dashboard/ApplicationTimeline';

const PartnerDashboard = () => {
  const { partner, mode } = usePartnerDashboard();
  const navigate = useNavigate();
  const { orders, isLoading, refetch } = useOrders();
  
  // Redirect to buyer dashboard if the user has switched to buyer mode
  useEffect(() => {
    if (mode === 'buyer') {
      navigate('/dashboard', { replace: true });
    }
  }, [mode, navigate]);
  
  if (!partner) {
    return (
      <PartnerDashboardLayout>
        <NotRegisteredPartner />
      </PartnerDashboardLayout>
    );
  }
  
  return (
    <PartnerDashboardLayout>
      <div className="space-y-6 p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Partner Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {partner.business_name || partner.contact_name}! Here's an overview of your business.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refetch()}
              className="flex items-center gap-1"
            >
              <RefreshCcw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            
            <Button 
              size="sm"
              onClick={() => navigate('/partner-dashboard/orders')}
              className="flex items-center gap-1"
            >
              <Package className="h-4 w-4 mr-1" />
              Manage Orders
            </Button>
          </div>
        </div>
        
        {/* Application Timeline - Only show if not approved */}
        {partner.status !== 'approved' && <ApplicationTimeline partner={partner} />}
        
        {/* Required Actions Card - Only shown for partners in specific statuses */}
        {['screening', 'service_selection', 'trial_period'].includes(partner.status) && (
          <RequiredActionsCard partner={partner} />
        )}
        
        {/* Metrics Overview Cards */}
        <PartnerMetricsOverview orders={orders} isLoading={isLoading} />
        
        <div className="space-y-6">
          {/* Financial Overview - Full width now */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription className="hidden sm:block">Monthly earnings summary</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/partner-dashboard/finance')}
              >
                <CircleDollarSign className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <FinancialOverview orders={orders} isLoading={isLoading} monthsToShow={4} />
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Orders and Upcoming Deliveries side by side with equal height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest customer orders</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-88px)] overflow-auto">
              <RecentOrdersList orders={orders} isLoading={isLoading} />
            </CardContent>
          </Card>
          
          {/* Upcoming Deliveries */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Upcoming Deliveries</CardTitle>
              <CardDescription>Your next deadlines</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-88px)] overflow-auto">
              <UpcomingDeliveries orders={orders} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>

        {/* Client Interactions - Full width with two cards per row */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Client Interactions</CardTitle>
            <CardDescription>Overview of your client engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <ClientInteractions />
          </CardContent>
        </Card>
      </div>
    </PartnerDashboardLayout>
  );
};

export default PartnerDashboard;
