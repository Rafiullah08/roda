
import { format } from "date-fns";

/**
 * Format the notification time for display
 */
export const formatNotificationTime = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return format(date, 'MMM dd, yyyy');
  } catch (error) {
    console.error("Error formatting notification time:", error);
    return 'Unknown time';
  }
};
