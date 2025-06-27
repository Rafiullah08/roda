
import React, { useState, useEffect } from "react";
import PartnerDashboardLayout from "@/components/layout/PartnerDashboardLayout";
import OrdersHeader from "@/components/partner-dashboard/orders/OrdersHeader";
import OrdersTable from "@/components/partner-dashboard/orders/OrdersTable";
import EmptyOrdersState from "@/components/partner-dashboard/orders/EmptyOrdersState";
import LoadingState from "@/components/partner-dashboard/orders/LoadingState";
import ErrorState from "@/components/partner-dashboard/orders/ErrorState";
import { useOrders, OrderStatusType, OrderSortType, OrderViewType } from "@/hooks/partner-dashboard/useOrders";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Orders = () => {
  const { 
    orders, 
    isLoading, 
    error, 
    statusFilter, 
    setStatusFilter, 
    sortBy,
    setSortBy,
    viewType,
    setViewType,
    refetch,
    updateOrderStatus
  } = useOrders();
  
  const [activeTab, setActiveTab] = useState<OrderStatusType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Automatically refresh orders when component mounts
  useEffect(() => {
    refetch();
  }, []);

  const handleRefresh = () => {
    refetch();
  };

  // Filter orders based on active tab
  const filteredOrders = React.useMemo(() => {
    if (!orders) return [];
    
    // First filter by tab status
    let result = activeTab === "all" 
      ? orders 
      : orders.filter(order => order.status === activeTab);
    
    // Then filter by search query if present
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.customer_name.toLowerCase().includes(query) ||
        order.customer_email.toLowerCase().includes(query) ||
        (typeof order.service === 'object' && order.service?.title?.toLowerCase().includes(query)) ||
        (typeof order.service === 'string' && order.service.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [orders, activeTab, searchQuery]);

  return (
    <PartnerDashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Order Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage your customer orders and deliverables
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="flex items-center gap-1"
          >
            <RefreshCcw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as OrderStatusType)} className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <OrdersHeader 
              statusFilter={statusFilter}
              onFilterChange={setStatusFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewType={viewType}
              onViewChange={setViewType}
              onSearch={setSearchQuery}
            />
          </div>

          <TabsContent value={activeTab} className="mt-4">
            {isLoading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState />
            ) : filteredOrders.length > 0 ? (
              <OrdersTable 
                orders={filteredOrders}
                onRefresh={handleRefresh}
                onStatusChange={updateOrderStatus}
              />
            ) : (
              <EmptyOrdersState />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PartnerDashboardLayout>
  );
};

export default Orders;
