
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const DashboardReviews = () => {
  const { user } = useAuth();
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyReviews = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('partner_ratings')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching reviews:", error);
          return;
        }
        
        setMyReviews(data || []);
      } catch (error) {
        console.error("Unexpected error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyReviews();
  }, [user]);

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>My Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="given">
            <TabsList className="mb-4">
              <TabsTrigger value="given">Reviews Given</TabsTrigger>
              <TabsTrigger value="received">Reviews Received</TabsTrigger>
            </TabsList>
            <TabsContent value="given">
              {loading ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="mt-4 text-muted-foreground">Loading your reviews...</p>
                </div>
              ) : myReviews.length > 0 ? (
                <div className="space-y-6">
                  {myReviews.map((review) => (
                    <div key={review.id} className="border border-gray-100 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{review.category || "Service Review"}</h3>
                          <p className="text-sm text-gray-500">Partner ID: {review.partner_id}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array(5).fill(0).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </div>
                      {review.review_text && (
                        <p className="mt-3">{review.review_text}</p>
                      )}
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
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
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-muted-foreground">
                    <p className="text-lg mb-2">No reviews given yet</p>
                    <p className="text-sm">Reviews you write for services will appear here</p>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="received">
              <div className="flex items-center justify-center py-12 text-gray-500">
                <div className="text-center">
                  <p className="text-lg mb-2">No reviews received yet</p>
                  <p className="text-sm">Reviews from your clients will appear here when you become a partner</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DashboardReviews;
