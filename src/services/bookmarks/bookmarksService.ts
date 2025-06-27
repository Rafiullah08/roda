
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export type BookmarkItem = {
  id: string;
  service_id: string;
  service_name: string;
  user_id: string;
  created_at: string;
  user_type: 'buyer' | 'partner';
};

/**
 * Fetches all bookmarks for the current user based on user type
 */
export const fetchBookmarks = async (userId: string | undefined, userType: 'buyer' | 'partner'): Promise<BookmarkItem[]> => {
  if (!userId) return [];
  
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .eq('user_type', userType);
    
    if (error) {
      console.error('Error fetching bookmarks:', error);
      toast({
        title: "Failed to load saved services",
        description: "There was an error loading your saved services.",
        variant: "destructive"
      });
      return [];
    }
    
    return data as BookmarkItem[];
  } catch (error) {
    console.error('Unexpected error in fetchBookmarks:', error);
    return [];
  }
};

/**
 * Checks if a service is already bookmarked by the same user but with a different user type
 */
export const checkOtherTypeBookmark = async (
  userId: string,
  serviceId: string,
  currentUserType: 'buyer' | 'partner'
): Promise<boolean> => {
  try {
    const otherUserType = currentUserType === 'buyer' ? 'partner' : 'buyer';
    
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .eq('service_id', serviceId)
      .eq('user_type', otherUserType)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No data found, which is fine
        return false;
      }
      console.error('Error checking other bookmark type:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Unexpected error in checkOtherTypeBookmark:', error);
    return false;
  }
};

/**
 * Adds a bookmark for the current user
 */
export const addBookmark = async (
  userId: string, 
  serviceId: string, 
  serviceName: string,
  userType: 'buyer' | 'partner'
): Promise<boolean> => {
  try {
    // First, check if this service is already bookmarked by the same user but with different user type
    const isBookmarkedAsOtherType = await checkOtherTypeBookmark(userId, serviceId, userType);
    
    if (isBookmarkedAsOtherType) {
      const otherType = userType === 'buyer' ? 'partner' : 'buyer';
      toast({
        title: `Already saved as ${otherType}`,
        description: `You have already saved this service as a ${otherType}.`,
        variant: "default"
      });
      return false;
    }
    
    const { error } = await supabase
      .from('bookmarks')
      .insert({
        user_id: userId,
        service_id: serviceId,
        service_name: serviceName,
        user_type: userType
      });
      
    if (error) {
      console.error('Error adding bookmark:', error);
      toast({
        title: "Failed to save service",
        description: "There was an error adding this service to your saved list.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error in addBookmark:', error);
    return false;
  }
};

/**
 * Removes a bookmark for the current user
 */
export const removeBookmark = async (
  userId: string, 
  serviceId: string,
  userType: 'buyer' | 'partner'
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('service_id', serviceId)
      .eq('user_type', userType);
      
    if (error) {
      console.error('Error removing bookmark:', error);
      toast({
        title: "Failed to remove service",
        description: "There was an error removing this service from your saved list.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error in removeBookmark:', error);
    return false;
  }
};
