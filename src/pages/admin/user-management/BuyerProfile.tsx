import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { ArrowLeft, User, Package, Activity, FileText, MessageCircle } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { BuyerDetails, getBuyerById, updateBuyerProfile } from "@/services/admin/buyerManagementService";

const profileFormSchema = z.object({
  business_name: z.string().min(1, "Business name is required"),
  owner_name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  business_type: z.string().optional(),
  website: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const BuyerProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [buyer, setBuyer] = useState<BuyerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      business_name: "",
      owner_name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      business_type: "",
      website: ""
    }
  });

  useEffect(() => {
    const fetchBuyerDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const buyerData = await getBuyerById(id);
        if (buyerData) {
          setBuyer(buyerData);
          // Populate form with profile data
          form.reset({
            business_name: buyerData.profile?.business_name || "",
            owner_name: buyerData.profile?.owner_name || "",
            phone: buyerData.profile?.phone || "",
            address: buyerData.profile?.address || "",
            city: buyerData.profile?.city || "",
            state: buyerData.profile?.state || "",
            zip_code: buyerData.profile?.zip_code || "",
            business_type: buyerData.profile?.business_type || "",
            website: buyerData.profile?.website || ""
          });
        }
      } catch (error) {
        console.error("Error fetching buyer details:", error);
        toast({
          title: "Error",
          description: "Failed to load buyer profile",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerDetails();
  }, [id]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!id) return;
    
    try {
      const success = await updateBuyerProfile(id, values);
      if (success) {
        // Refresh buyer data
        const updatedBuyer = await getBuyerById(id);
        if (updatedBuyer) {
          setBuyer(updatedBuyer);
        }
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating buyer profile:", error);
      toast({
        title: "Error",
        description: "Failed to update buyer profile",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            <p className="mt-4">Loading buyer profile...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!buyer) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-xl font-semibold">Buyer not found</h2>
          <p className="text-muted-foreground mb-4">The requested buyer profile could not be found</p>
          <Button asChild>
            <Link to="/admin/buyers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Buyers
            </Link>
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <Link to="/admin/buyers">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-2xl font-bold">{buyer.profile?.business_name || "Buyer Profile"}</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              {buyer.profile?.owner_name ? `Contact: ${buyer.profile.owner_name}` : "No contact name provided"}
            </p>
          </div>
          
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center">
              <Package className="mr-2 h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center">
              <MessageCircle className="mr-2 h-4 w-4" />
              Admin Notes
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Content */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Buyer Information</CardTitle>
                <CardDescription>
                  View and manage the buyer's profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="business_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="owner_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="business_type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Type</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-4">
                        <h3 className="font-medium mb-2">Address Information</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="zip_code"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Business Name</p>
                          <p>{buyer.profile?.business_name || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Contact Name</p>
                          <p>{buyer.profile?.owner_name || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Phone</p>
                          <p>{buyer.profile?.phone || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Business Type</p>
                          <p>{buyer.profile?.business_type || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Website</p>
                          <p>
                            {buyer.profile?.website ? (
                              <a 
                                href={buyer.profile.website.startsWith('http') ? buyer.profile.website : `https://${buyer.profile.website}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {buyer.profile.website}
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Account Created</p>
                          <p>{buyer.created_at ? format(new Date(buyer.created_at), 'MMMM d, yyyy') : "N/A"}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Address Information</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Address</p>
                          <p>{buyer.profile?.address || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">City</p>
                          <p>{buyer.profile?.city || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">State</p>
                          <p>{buyer.profile?.state || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Zip Code</p>
                          <p>{buyer.profile?.zip_code || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Content */}
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  View all orders placed by this buyer
                </CardDescription>
              </CardHeader>
              <CardContent>
                {buyer.orders && buyer.orders.length > 0 ? (
                  <div className="space-y-4">
                    {buyer.orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{order.service}</h4>
                            <p className="text-sm text-muted-foreground">
                              Order ID: {order.id.substring(0, 8)}...
                            </p>
                            <p className="text-sm">
                              Placed on {format(new Date(order.created_at), 'MMMM d, yyyy')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">Rs. {order.amount.toLocaleString()}</p>
                            <Badge
                              variant={
                                order.status === 'completed' ? 'default' :
                                order.status === 'pending' ? 'secondary' :
                                order.status === 'cancelled' ? 'destructive' : 
                                'outline'
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <p>No orders found for this buyer</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Content */}
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>
                  Track buyer activity across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10 text-muted-foreground">
                  <p>Activity tracking will be implemented in a future update</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Content */}
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
                <CardDescription>
                  Reviews submitted by this buyer
                </CardDescription>
              </CardHeader>
              <CardContent>
                {buyer.reviews && buyer.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {buyer.reviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={`text-sm ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}>
                                  ★
                                </span>
                              ))}
                              <span className="ml-2 text-sm font-medium">{review.rating.toFixed(1)}/5</span>
                            </div>
                            <p className="mt-2">{review.review_text || "No text review provided"}</p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Posted on {format(new Date(review.created_at), 'MMMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <p>No reviews submitted by this buyer</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Notes Content */}
          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Admin Notes</CardTitle>
                <CardDescription>
                  Internal notes about this buyer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea placeholder="Add a new note about this buyer..." />
                  <Button>Add Note</Button>

                  <div className="mt-6 space-y-4">
                    <div className="text-center py-10 text-muted-foreground">
                      <p>No admin notes yet</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default BuyerProfilePage;
