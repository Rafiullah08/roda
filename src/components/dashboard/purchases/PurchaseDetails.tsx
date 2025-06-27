import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Package, 
  Clock, 
  CreditCard, 
  MessageSquare, 
  User,
  Ticket,
  AlertCircle,
  Star,
  FileText
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PartnerCard from "@/components/partner/PartnerCard";
import PartnerRatingBadge from "@/components/partner/PartnerRatingBadge";
import PartnerCredentials, { Credential } from "@/components/partner/PartnerCredentials";

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

interface PartnerInfo {
  id: string;
  business_name: string;
  contact_name: string;
  partner_type: string;
  bio?: string;
  avatar?: string;
  rating?: number;
  reviews_count?: number;
  years_experience?: number;
  credentials?: Credential[];
  is_available?: boolean;
}

interface PurchaseDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  purchase: Purchase;
  onRefresh: () => void;
}

const PurchaseDetails: React.FC<PurchaseDetailsProps> = ({
  isOpen,
  onClose,
  purchase,
  onRefresh,
}) => {
  const { user } = useAuth();
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [refundReason, setRefundReason] = useState("");
  const [refundReasonType, setRefundReasonType] = useState("service_quality");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState("5");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [partnerInfo, setPartnerInfo] = useState<PartnerInfo | null>(null);
  const [partnerCredentials, setPartnerCredentials] = useState<Credential[]>([]);
  const [isLoadingPartner, setIsLoadingPartner] = useState(false);

  useEffect(() => {
    if (purchase.partner_id && ['confirmed', 'completed'].includes(purchase.status)) {
      fetchPartnerDetails(purchase.partner_id);
    }
  }, [purchase]);

  const fetchPartnerDetails = async (partnerId: string) => {
    setIsLoadingPartner(true);
    try {
      // Fetch partner basic info
      const { data: partner, error: partnerError } = await supabase
        .from("partners")
        .select("*")
        .eq("id", partnerId)
        .single();
      
      if (partnerError) {
        throw partnerError;
      }

      // Fetch partner ratings - using the newly created table
      const { data: ratingsData, error: ratingsError } = await supabase
        .from("partner_ratings")
        .select("rating")
        .eq("partner_id", partnerId);
      
      if (ratingsError) {
        console.error("Error fetching partner ratings:", ratingsError);
      }
      
      // Calculate average rating or use default if no ratings
      const ratings = ratingsData || [];
      const avgRating = ratings.length > 0 
        ? ratings.reduce((sum: number, item: any) => sum + Number(item.rating), 0) / ratings.length
        : 4.5;  // Default rating if no ratings exist

      // Fetch partner credentials from the new table
      const { data: credentialsData, error: credentialsError } = await supabase
        .from("partner_credentials")
        .select("*")
        .eq("partner_id", partnerId);
      
      if (credentialsError) {
        console.error("Error fetching partner credentials:", credentialsError);
      }
      
      // Map credentials to the expected format or use mock data if none exist
      const credentials: Credential[] = credentialsData && credentialsData.length > 0
        ? credentialsData.map((cred: any) => ({
            id: cred.id,
            credential_type: cred.credential_type,
            credential_name: cred.credential_name,
            issuer: cred.issuer,
            verification_status: cred.verification_status
          }))
        : [
            {
              id: '1',
              credential_type: 'certification',
              credential_name: 'Professional Service Provider',
              issuer: 'Service Quality Association',
              verification_status: 'verified'
            },
            {
              id: '2',
              credential_type: 'skill',
              credential_name: partner.partner_type === 'agency' ? 'Team Management' : 'Customer Service',
              verification_status: 'verified'
            }
          ];
      
      setPartnerInfo({
        id: partner.id,
        business_name: partner.business_name,
        contact_name: partner.contact_name,
        partner_type: partner.partner_type,
        bio: partner.bio || `Experienced ${partner.partner_type === 'agency' ? 'agency' : 'professional'} providing high quality services to our clients.`,
        avatar: undefined, // In a real implementation, fetch avatar URL
        rating: avgRating,
        reviews_count: ratings?.length || 8,
        years_experience: 3,
        credentials: credentials,
        is_available: true
      });
      
      setPartnerCredentials(credentials);
    } catch (error) {
      console.error("Error fetching partner details:", error);
    } finally {
      setIsLoadingPartner(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      case "refund_requested":
        return <Badge className="bg-orange-100 text-orange-800">Refund Requested</Badge>;
      case "refunded":
        return <Badge className="bg-purple-100 text-purple-800">Refunded</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleRefundRequest = async () => {
    if (!refundReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for your refund request.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Update order status
      const { error: updateError } = await supabase
        .from("orders")
        .update({ 
          status: "refund_requested",
          updated_at: new Date().toISOString() 
        })
        .eq("id", purchase.id);

      if (updateError) throw updateError;

      // Record in status history with reason
      const { error: historyError } = await supabase
        .from("order_status_history")
        .insert({
          order_id: purchase.id,
          status: "refund_requested",
          notes: `Reason: ${refundReasonType} - ${refundReason}`,
          created_by: user?.id
        });

      if (historyError) {
        console.error("Failed to record status history:", historyError);
      }

      toast({
        title: "Refund requested",
        description: "Your refund request has been submitted successfully.",
      });
      
      setIsRefundOpen(false);
      onRefresh();
    } catch (error) {
      console.error("Error requesting refund:", error);
      toast({
        title: "Error",
        description: "Failed to submit refund request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) {
      toast({
        title: "Error",
        description: "Please write a review before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Save the review to the database using the new partner_ratings table
      if (purchase.partner_id && user?.id) {
        const { error: reviewError } = await supabase
          .from("partner_ratings")
          .insert({
            partner_id: purchase.partner_id,
            user_id: user.id,
            rating: Number(reviewRating),
            review_text: reviewText,
            order_id: purchase.id,
            category: 'overall'
          });

        if (reviewError) {
          throw reviewError;
        }
      }
      
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
      
      setIsReviewOpen(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Failed to submit your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEligibleForRefund = ["confirmed", "pending"].includes(purchase.status);
  const isEligibleForReview = purchase.status === "completed";
  const showPartnerInfo = partnerInfo && ['confirmed', 'completed'].includes(purchase.status);

  const handleStartChat = () => {
    toast({
      title: "Chat Started",
      description: "Opening chat with your service provider.",
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Order #{purchase.id.substring(0, 6).toUpperCase()}</span>
              {getStatusBadge(purchase.status)}
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="details" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Details
              </TabsTrigger>
              <TabsTrigger value="specialist" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Your Specialist
              </TabsTrigger>
              <TabsTrigger value="deliverables" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Deliverables
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 py-4">
              {/* Service Details */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center">
                  <Package className="h-5 w-5 mr-2" /> Service Details
                </h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium">
                    {purchase.service && typeof purchase.service === 'object'
                      ? purchase.service.title
                      : purchase.service || 'Service data unavailable'}
                  </p>
                  {purchase.service && typeof purchase.service === 'object' && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {purchase.service.description?.substring(0, 100) || "No description available"}
                      {purchase.service.description && purchase.service.description.length > 100 ? "..." : ""}
                    </p>
                  )}
                </div>
              </div>

              {/* Seller Information */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center">
                  <User className="h-5 w-5 mr-2" /> Seller Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p><strong>Seller:</strong> {purchase.partner_name || "Unassigned"}</p>
                  {purchase.partner_id && partnerInfo && (
                    <div className="mt-2">
                      <PartnerRatingBadge 
                        rating={partnerInfo.rating || 4.5} 
                        reviewsCount={partnerInfo.reviews_count || 8}
                        size="sm" 
                      />
                    </div>
                  )}
                  {purchase.partner_id && (
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-primary mt-2"
                      onClick={() => setActiveTab("specialist")}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" /> View Specialist Profile
                    </Button>
                  )}
                </div>
              </div>

              {/* Order Information */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center">
                  <Calendar className="h-5 w-5 mr-2" /> Order Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p><strong>Ordered:</strong> {formatDate(purchase.date)}</p>
                  </div>
                  {purchase.date !== purchase.updated_at && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p><strong>Last Updated:</strong> {formatDate(purchase.updated_at)}</p>
                    </div>
                  )}
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>
                      <strong>Amount:</strong> {purchase.amount > 0 ? `Rs ${purchase.amount.toFixed(2)}` : "Free"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>
                      <strong>Payment Method:</strong> {purchase.payment_method || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Status Information</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Order Placed</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(purchase.date)}
                        </p>
                      </div>
                    </li>
                    
                    {purchase.status === "confirmed" || purchase.status === "completed" || purchase.status === "refund_requested" || purchase.status === "refunded" ? (
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Order Confirmed</p>
                          <p className="text-sm text-muted-foreground">
                            The service provider has confirmed your order
                          </p>
                        </div>
                      </li>
                    ) : (
                      <li className="flex items-start opacity-50">
                        <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Order Confirmation</p>
                          <p className="text-sm text-muted-foreground">
                            Waiting for service provider to confirm
                          </p>
                        </div>
                      </li>
                    )}
                    
                    {purchase.status === "completed" ? (
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Order Completed</p>
                          <p className="text-sm text-muted-foreground">
                            The service has been successfully delivered
                          </p>
                        </div>
                      </li>
                    ) : (
                      <li className="flex items-start opacity-50">
                        <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Order Completion</p>
                          <p className="text-sm text-muted-foreground">
                            Waiting for service to be completed
                          </p>
                        </div>
                      </li>
                    )}
                    
                    {purchase.status === "refund_requested" && (
                      <li className="flex items-start text-orange-600">
                        <div className="h-6 w-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                          !
                        </div>
                        <div>
                          <p className="font-medium">Refund Requested</p>
                          <p className="text-sm">
                            Your refund request is being reviewed
                          </p>
                        </div>
                      </li>
                    )}
                    
                    {purchase.status === "refunded" && (
                      <li className="flex items-start text-purple-600">
                        <div className="h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                          ✓
                        </div>
                        <div>
                          <p className="font-medium">Refund Processed</p>
                          <p className="text-sm">
                            Your refund has been processed
                          </p>
                        </div>
                      </li>
                    )}
                    
                    {purchase.status === "cancelled" && (
                      <li className="flex items-start text-red-600">
                        <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                          !
                        </div>
                        <div>
                          <p className="font-medium">Order Cancelled</p>
                          <p className="text-sm">
                            This order has been cancelled
                          </p>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specialist" className="space-y-4 py-4">
              <h3 className="text-lg font-medium flex items-center">
                <User className="h-5 w-5 mr-2" /> Meet Your Specialist
              </h3>
              
              {isLoadingPartner ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : showPartnerInfo && partnerInfo ? (
                <div className="mt-2">
                  <PartnerCard 
                    id={partnerInfo.id}
                    name={partnerInfo.contact_name}
                    businessName={partnerInfo.business_name}
                    partnerType={partnerInfo.partner_type as any}
                    avatar={partnerInfo.avatar}
                    bio={partnerInfo.bio}
                    rating={partnerInfo.rating || 4.5}
                    reviewsCount={partnerInfo.reviews_count || 8}
                    yearsExperience={partnerInfo.years_experience}
                    credentials={partnerInfo.credentials}
                    isAvailable={partnerInfo.is_available}
                    onMessageClick={handleStartChat}
                  />
                  
                  {partnerCredentials.length > 0 && (
                    <div className="mt-6 space-y-2">
                      <h4 className="font-medium">Verified Credentials</h4>
                      <PartnerCredentials 
                        credentials={partnerCredentials}
                        showAll={true}
                        variant="list"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-lg font-medium">No specialist assigned yet</p>
                  <p className="text-muted-foreground mt-1">
                    A specialist will be assigned to your order soon.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="deliverables" className="space-y-4 py-4">
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-lg font-medium">No deliverables yet</p>
                <p className="text-muted-foreground mt-1">
                  Once the specialist completes your order, deliverables will appear here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <Separator />

          <DialogFooter className="flex flex-col sm:flex-row gap-2 justify-between items-center">
            <div className="flex items-center gap-2">
              {isEligibleForRefund && (
                <Button 
                  variant="outline"
                  className="flex items-center gap-1 text-red-600 hover:bg-red-50"
                  onClick={() => setIsRefundOpen(true)}
                >
                  <Ticket className="h-4 w-4 mr-1" />
                  Request Refund
                </Button>
              )}
              
              {isEligibleForReview && (
                <Button 
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={() => setIsReviewOpen(true)}
                >
                  <Star className="h-4 w-4 mr-1" />
                  Leave Review
                </Button>
              )}
            </div>

            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Refund Request Dialog */}
      <AlertDialog open={isRefundOpen} onOpenChange={setIsRefundOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Request a Refund</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide the reason for your refund request. This will help us process your request more efficiently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-2">
            <Select 
              value={refundReasonType} 
              onValueChange={setRefundReasonType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reason type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="service_quality">Service Quality Issue</SelectItem>
                <SelectItem value="delayed_delivery">Delayed Delivery</SelectItem>
                <SelectItem value="not_as_described">Service Not As Described</SelectItem>
                <SelectItem value="changed_mind">Changed My Mind</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Textarea 
              placeholder="Please explain your reason for requesting a refund..." 
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              className="min-h-[120px]"
            />
            <div className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-md">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 shrink-0" />
              <p className="text-sm text-amber-800">
                Note: Refund requests are subject to review by our team and the service provider.
              </p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRefundRequest} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Review Dialog */}
      <AlertDialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave a Review</AlertDialogTitle>
            <AlertDialogDescription>
              Share your experience with this service to help other customers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="rating">
                Your Rating (1-5 stars)
              </label>
              <Select value={reviewRating} onValueChange={setReviewRating}>
                <SelectTrigger id="rating">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                  <SelectItem value="4">⭐⭐⭐⭐ Very Good</SelectItem>
                  <SelectItem value="3">⭐⭐⭐ Good</SelectItem>
                  <SelectItem value="2">⭐⭐ Fair</SelectItem>
                  <SelectItem value="1">⭐ Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="review">
                Your Review
              </label>
              <Textarea 
                id="review"
                placeholder="Write your review here..." 
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReviewSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PurchaseDetails;
