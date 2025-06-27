
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
import { AlertCircle, Clock, CreditCard, Eye, FileText, Loader, RefreshCcw, Search, Star, Ticket, User, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import PurchaseDetails from "@/components/dashboard/purchases/PurchaseDetails";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Purchase {
  id: string;
  service: any;
  customer_name: string;
  customer_email: string;
  date: string;
  status: string;
  amount: number;
  updated_at: string;
  partner_id?: string;
  partner_name?: string;
  payment_method?: string;
}

const DashboardPurchases = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

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
          amount,
          partner_id,
          partners:partner_id(business_name, contact_name),
          payments(payment_method, status)
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
          serviceTitle = serviceProp.title || "Unnamed Service";
        } else if (order.services) {
          serviceTitle = order.services.title || "Unnamed Service";
        }

        // Extract partner information if available
        let partnerName = "Unassigned";
        if (order.partners) {
          partnerName = order.partners.business_name || order.partners.contact_name || "Unnamed Partner";
        }

        // Extract payment method if available
        let paymentMethod = "Not specified";
        if (order.payments && order.payments.length > 0) {
          paymentMethod = order.payments[0].payment_method || "Not specified";
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
          partner_id: order.partner_id,
          partner_name: partnerName,
          payment_method: paymentMethod
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
      case "refund_requested":
        return "bg-orange-100 text-orange-800";
      case "refunded":
        return "bg-purple-100 text-purple-800";
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

  const requestRefund = (purchaseId: string) => {
    // Will be implemented in the details modal
    console.log("Requesting refund for purchase:", purchaseId);
  };

  const leaveReview = (purchaseId: string) => {
    // Will be implemented in the details modal
    console.log("Leaving review for purchase:", purchaseId);
  };

  // Filter purchases by search query and payment method
  const filteredPurchases = purchases
    .filter(purchase => 
      searchQuery 
        ? (purchase.service?.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          purchase.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (purchase.partner_name || "").toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .filter(purchase => 
      paymentFilter !== "all" 
        ? purchase.payment_method?.toLowerCase() === paymentFilter.toLowerCase()
        : true
    );

  // Pagination logic
  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);
  const currentPageData = filteredPurchases.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <DashboardLayout>
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by ID, service or seller..."
                className="pl-8 w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="refund_requested">Refund Requested</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Payment Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-6">
              <AlertCircle className="h-8 w-8 mx-auto mb-2" />
              {error}
              <Button variant="outline" onClick={handleRefresh} className="mt-2">
                Try Again
              </Button>
            </div>
          ) : currentPageData.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]"><FileText className="h-4 w-4" /> ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead className="hidden md:table-cell"><User className="h-4 w-4 mr-1" /> Seller</TableHead>
                    <TableHead className="hidden md:table-cell"><Calendar className="h-4 w-4 mr-1" /> Purchase On</TableHead>
                    <TableHead><CreditCard className="h-4 w-4 mr-1" /> Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPageData.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell className="font-medium">#{purchase.id.substring(0, 6).toUpperCase()}</TableCell>
                      <TableCell className="max-w-[150px] md:max-w-none truncate">
                        {purchase.service?.title || "Service data unavailable"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {purchase.partner_name || "Unassigned"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(purchase.date)}</TableCell>
                      <TableCell>
                        <span className="text-xs text-gray-500">{purchase.payment_method}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(purchase.status)}>
                          {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1).replace('_', ' ')}
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
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => leaveReview(purchase.id)}
                            >
                              <Star className="h-3 w-3 mr-1" /> Review
                            </Button>
                          )}
                          {["confirmed", "pending"].includes(purchase.status) && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => requestRefund(purchase.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Ticket className="h-3 w-3 mr-1" /> Cancel
                            </Button>
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
          
          {filteredPurchases.length > itemsPerPage && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                      className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
                    <PaginationItem key={i} className="hidden sm:inline-flex">
                      <PaginationLink 
                        onClick={() => setPage(i + 1)}
                        isActive={page === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {totalPages > 5 && page > 3 && (
                    <PaginationItem className="hidden sm:inline-flex">
                      <span className="flex h-9 w-9 items-center justify-center">...</span>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                      className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
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
          onRefresh={fetchOrders}
        />
      )}
    </DashboardLayout>
  );
};

export default DashboardPurchases;
