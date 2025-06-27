
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface Buyer {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  last_sign_in_at?: string;
  profile?: {
    business_name: string;
    owner_name?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    business_type?: string;
    website?: string;
  }
}

export interface BuyerDetails extends Buyer {
  orders?: any[];
  reviews?: any[];
  activity?: any[];
  notes?: any[];
}

// Get all buyers (users) with pagination
export const getBuyers = async (
  page = 1,
  limit = 10,
  search = ""
): Promise<{ buyers: Buyer[], count: number }> => {
  try {
    // First, get user IDs from auth.users
    const { data: authUsers, error: authError, count } = await supabase
      .from("profiles")
      .select("id, business_name, owner_name, phone, created_at", { count: "exact" })
      .ilike(search ? "business_name" : "id", search ? `%${search}%` : "%")
      .range((page - 1) * limit, page * limit - 1);

    if (authError) {
      console.error("Error fetching buyers:", authError);
      return { buyers: [], count: 0 };
    }

    // Format the data to match our Buyer interface
    const buyers = authUsers.map(profile => ({
      id: profile.id,
      email: "", // We can't get email directly from the profiles table
      name: profile.owner_name || "",
      created_at: profile.created_at,
      profile: {
        business_name: profile.business_name,
        owner_name: profile.owner_name,
        phone: profile.phone
      }
    })) as Buyer[];

    return {
      buyers,
      count: count || 0
    };
  } catch (error) {
    console.error("Error in getBuyers:", error);
    toast({
      title: "Error",
      description: "Failed to fetch buyers. Please try again.",
      variant: "destructive"
    });
    return { buyers: [], count: 0 };
  }
};

// Get detailed buyer information by ID
export const getBuyerById = async (buyerId: string): Promise<BuyerDetails | null> => {
  try {
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", buyerId)
      .single();

    if (profileError) {
      console.error("Error fetching buyer profile:", profileError);
      return null;
    }

    // Get user's orders
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", buyerId)
      .order("created_at", { ascending: false });

    if (ordersError) {
      console.error("Error fetching buyer orders:", ordersError);
    }

    // Get user's reviews
    const { data: reviews, error: reviewsError } = await supabase
      .from("partner_ratings")
      .select("*")
      .eq("user_id", buyerId)
      .order("created_at", { ascending: false });

    if (reviewsError) {
      console.error("Error fetching buyer reviews:", reviewsError);
    }

    // Format orders with Pakistani Rupees
    const formattedOrders = orders?.map(order => ({
      ...order,
      amount: order.amount // Keep as number, format when displaying
    })) || [];

    // Construct the buyer details
    const buyerDetails: BuyerDetails = {
      id: buyerId,
      email: "", // We don't have direct access to the auth email
      name: profile?.owner_name || "",
      created_at: profile?.created_at || new Date().toISOString(),
      profile: {
        business_name: profile?.business_name || "",
        owner_name: profile?.owner_name || "",
        phone: profile?.phone || "",
        address: profile?.address || "",
        city: profile?.city || "",
        state: profile?.state || "",
        zip_code: profile?.zip_code || "",
        business_type: profile?.business_type || "",
        website: profile?.website || ""
      },
      orders: formattedOrders,
      reviews: reviews || [],
      activity: [], // Would need to implement activity tracking
      notes: [] // Would need to implement admin notes
    };

    return buyerDetails;
  } catch (error) {
    console.error("Error in getBuyerById:", error);
    toast({
      title: "Error",
      description: "Failed to fetch buyer details. Please try again.",
      variant: "destructive"
    });
    return null;
  }
};

// Update buyer profile
export const updateBuyerProfile = async (
  buyerId: string, 
  updates: Partial<BuyerDetails['profile']>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", buyerId);

    if (error) {
      console.error("Error updating buyer profile:", error);
      toast({
        title: "Error",
        description: "Failed to update buyer profile. Please try again.",
        variant: "destructive"
      });
      return false;
    }

    toast({
      title: "Success",
      description: "Buyer profile updated successfully."
    });
    return true;
  } catch (error) {
    console.error("Error in updateBuyerProfile:", error);
    toast({
      title: "Error",
      description: "Failed to update buyer profile. Please try again.",
      variant: "destructive"
    });
    return false;
  }
};

// Add admin note to buyer
// This would require a new table for admin notes
export const addBuyerNote = async (
  buyerId: string,
  note: string,
  adminId: string
): Promise<boolean> => {
  // Placeholder for future implementation
  console.log("Adding note for buyer", buyerId, "by admin", adminId, ":", note);
  return true;
};
