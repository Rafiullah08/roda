import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, Clock, Eye, Loader, RefreshCcw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import PurchaseDetails from "@/components/dashboard/purchases/PurchaseDetails";

interface Purchase {
  id: string;
  service: any;
  customer_name: string;
  customer_email: string;
  date: string;
  status: string;
  amount: number;
  updated_at: string;
}

const DashboardPurchase = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Check for success message from URL and refetch orders
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("order_success") === "true") {
      toast({
        title: "Order Successful",
        description: "Your order has been placed successfully!",
      });
      // Remove the query parameter from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
      
      // Refetch with a small delay to ensure the order is in the database
      setTimeout(() => {
        fetchOrders();
      }, 1000);
    } else {
      fetchOrders();
    }
  }, [location, user?.id]);

  // Fetch user's orders
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!user) {
        setError("You need to be logged in to view your purchases");
        setLoading(false);
        return;
      }

      console.log(`Fetching orders for user ID: ${user.id}`);

      let query = supabase
        .from("orders")
        .select(`
          id,
          service,
          service:services(*),
          customer_name,
          customer_email,
          created_at,
          updated_at,
          status,
          amount
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error: orderError } = await query;
      
      if (orderError) {
        console.error("Error fetching orders:", orderError);
        setError("Failed to fetch your orders");
        return;
      }

      console.log(`Found ${data?.length || 0} orders for this user`, data);

      const formattedPurchases = data.map((order: any) => {
        // Handle both cases where service might be a string or an object
        let serviceTitle = "Service data unavailable";
        let serviceProp = order.service;
        
        if (typeof serviceProp === 'object' && serviceProp !== null) {
          // Service is directly embedded
          serviceTitle = serviceProp.title || "Unnamed Service";
        } else if (order.services) {
          // Service comes from the services join
          serviceTitle = order.services.title || "Unnamed Service";
        }
        
        return {
          id: order.id,
          service: typeof order.service === 'object' ? order.service : 
                   order.services ? order.services : 
                   { title: serviceTitle },
          customer_name: order.customer_name,
          customer_email: order.customer_email,
          date: order.created_at,
          updated_at: order.updated_at,
          status: order.status,
          amount: order.amount,
        };
      });

      setPurchases(formattedPurchases);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Allow manual refresh of orders
  const handleRefresh = () => {
    fetchOrders();
  };

  const handleRefetch = () => {
    fetchOrders();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const handleViewDetails = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setIsDetailsOpen(true);
  };

  // Filter purchases by search query
  const filteredPurchases = searchQuery 
    ? purchases.filter(purchase => 
        (purchase.service?.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        purchase.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : purchases;

  return (
    <DashboardLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            My Purchases
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto" 
              onClick={handleRefresh} 
              title="Refresh orders"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </CardTitle>
          <div className="flex items-center gap-4">
            <select 
              className="px-2 py-1 border border-gray-300 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input
              type="text"
              placeholder="Search purchases..."
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-6">
              {error}
              <Button variant="outline" onClick={handleRefresh} className="ml-2">
                Try Again
              </Button>
            </div>
          ) : filteredPurchases.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPurchases.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell className="font-medium">#{purchase.id.substring(0, 6).toUpperCase()}</TableCell>
                      <TableCell className="max-w-[150px] md:max-w-none truncate">
                        {purchase.service?.title || "Service data unavailable"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(purchase.date)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(purchase.status)}>
                          {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {purchase.amount > 0 ? `Rs ${purchase.amount.toFixed(2)}` : "Free"}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(purchase)}
                          >
                            <Eye className="h-3 w-3 mr-1" /> View
                          </Button>
                          {purchase.status === "completed" && (
                            <Button variant="outline" size="sm">Review</Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 border rounded-lg">
              <p className="text-lg font-medium">No purchases found</p>
              <p className="text-muted-foreground mt-1">
                Your orders will appear here once you make a purchase.
              </p>
            </div>
          )}
          
          {filteredPurchases.length > 0 && (
            <div className="mt-4">
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
        </CardContent>
      </Card>

      {selectedPurchase && (
        <PurchaseDetails
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          purchase={selectedPurchase}
          onRefresh={handleRefetch}
        />
      )}
    </DashboardLayout>
  );
};

export default DashboardPurchase;
