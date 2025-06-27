
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePartnerDashboard } from '@/contexts/PartnerDashboardContext';
import { toast } from "@/components/ui/use-toast";
import { 
  BookmarkItem, 
  fetchBookmarks, 
  addBookmark, 
  removeBookmark 
} from '@/services/bookmarks/bookmarksService';

export type { BookmarkItem };

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const { mode } = usePartnerDashboard();
  const userType = mode === 'partner' ? 'partner' : 'buyer';
  
  // Fetch bookmarks on component mount
  useEffect(() => {
    if (user) {
      refreshBookmarks();
    } else {
      setBookmarks([]);
      setIsLoading(false);
    }
  }, [user, mode]);

  // Function to refresh bookmarks data
  const refreshBookmarks = async () => {
    if (!user) {
      setBookmarks([]);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    try {
      const data = await fetchBookmarks(user.id, userType);
      setBookmarks(data);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to check if a service is bookmarked
  const isBookmarked = (serviceId: string): boolean => {
    return bookmarks.some(bookmark => bookmark.service_id === serviceId);
  };

  // Function to toggle bookmark status
  const toggleBookmark = async (serviceId: string, serviceName: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save services.",
        variant: "destructive"
      });
      return false;
    }

    try {
      const isCurrentlyBookmarked = isBookmarked(serviceId);
      
      if (isCurrentlyBookmarked) {
        // Delete the bookmark
        const success = await removeBookmark(user.id, serviceId, userType);
        
        if (success) {
          // Update local state
          setBookmarks(prev => prev.filter(bookmark => bookmark.service_id !== serviceId));
          
          toast({
            title: mode === 'partner' ? "Removed from bookmarks" : "Removed from favorites",
            description: `${serviceName} has been removed from your ${mode === 'partner' ? 'bookmarks' : 'favorites'}.`
          });
        }
      } else {
        // Add the bookmark
        const success = await addBookmark(user.id, serviceId, serviceName, userType);
        
        if (success) {
          // Refresh bookmarks from the database
          refreshBookmarks();
          
          toast({
            title: mode === 'partner' ? "Added to bookmarks" : "Added to favorites",
            description: `${serviceName} has been added to your ${mode === 'partner' ? 'bookmarks' : 'favorites'}.`
          });
        }
      }
      
      return true;
    } catch (error) {
      console.error('Unexpected error:', error);
      return false;
    }
  };

  return {
    bookmarks,
    isLoading,
    isBookmarked,
    toggleBookmark,
    refreshBookmarks
  };
}
