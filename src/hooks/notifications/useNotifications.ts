
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  fetchNotifications, 
  markNotificationAsRead, 
  deleteNotification, 
  clearAllNotifications,
  subscribeToNotifications,
  markAllNotificationsAsRead,
  Notification,
} from "@/services/notificationService";
import { toast } from "@/hooks/use-toast";

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load notifications on component mount
  useEffect(() => {
    if (!user) return;

    // Initial fetch of notifications
    const loadNotifications = async () => {
      setIsLoading(true);
      const data = await fetchNotifications(user.id);
      setNotifications(data);
      setIsLoading(false);
    };

    loadNotifications();

    // Subscribe to new notifications
    const unsubscribe = subscribeToNotifications(user.id, (newNotification) => {
      setNotifications(prev => [newNotification, ...prev]);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  // Mark a notification as read
  const handleMarkAsRead = async (id: string) => {
    if (!user) return;
    
    const success = await markNotificationAsRead(id);
    if (success) {
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } else {
      toast({
        title: "Error",
        description: "Failed to mark notification as read. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    if (!user) return;
    
    const success = await markAllNotificationsAsRead(user.id);
    if (success) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast({
        title: "Success",
        description: "All notifications marked as read."
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to mark all as read. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Delete a notification
  const handleDeleteNotification = async (id: string) => {
    if (!user) return;
    
    const success = await deleteNotification(id);
    if (success) {
      setNotifications(prev => prev.filter(n => n.id !== id));
      toast({
        title: "Notification deleted",
        description: "The notification has been removed."
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete notification. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Clear all notifications
  const handleClearAllNotifications = async () => {
    if (!user) return;
    
    const success = await clearAllNotifications(user.id);
    if (success) {
      setNotifications([]);
      toast({
        title: "Notifications cleared",
        description: "All notifications have been removed."
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to clear notifications. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    isLoading,
    unreadCount,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    deleteNotification: handleDeleteNotification,
    clearAllNotifications: handleClearAllNotifications
  };
};
