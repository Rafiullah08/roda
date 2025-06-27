import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  fetchNotifications,
  subscribeToNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearAllNotifications,
  Notification
} from "@/services/notifications";
import { 
  useMessaging,
  Message,
  Conversation
} from "@/services/messaging";
import { fetchActiveAnnouncementsForUser, Announcement } from "@/services/announcements";

export const useCommunicationSystem = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState({
    notifications: true,
    conversations: true,
    announcements: true
  });
  
  const userId = user?.id || '';
  const messaging = useMessaging(userId);
  
  // Initialize and fetch all communication data
  useEffect(() => {
    if (!userId) return;
    
    const loadNotifications = async () => {
      setIsLoading(prev => ({ ...prev, notifications: true }));
      const data = await fetchNotifications(userId);
      setNotifications(data);
      setIsLoading(prev => ({ ...prev, notifications: false }));
    };
    
    const loadConversations = async () => {
      setIsLoading(prev => ({ ...prev, conversations: true }));
      const data = await messaging.fetchConversations();
      setConversations(data);
      setIsLoading(prev => ({ ...prev, conversations: false }));
    };
    
    const loadAnnouncements = async () => {
      setIsLoading(prev => ({ ...prev, announcements: true }));
      const data = await fetchActiveAnnouncementsForUser(userId);
      setAnnouncements(data);
      setIsLoading(prev => ({ ...prev, announcements: false }));
    };
    
    loadNotifications();
    loadConversations();
    loadAnnouncements();
    
    // Subscribe to new notifications
    const unsubscribeNotifications = subscribeToNotifications(userId, (newNotification) => {
      setNotifications(prev => [newNotification, ...prev]);
    });
    
    // Subscribe to conversation updates
    const unsubscribeConversations = messaging.subscribeToConversations(userId, (conversationId) => {
      loadConversations();
    });
    
    return () => {
      unsubscribeNotifications();
      unsubscribeConversations();
    };
  }, [userId, messaging]);
  
  // Notification functions
  const handleMarkNotificationAsRead = async (notificationId: string) => {
    if (!userId) return;
    
    const success = await markNotificationAsRead(notificationId);
    if (success) {
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId ? { ...notification, read: true } : notification
        )
      );
    }
    return success;
  };
  
  const handleMarkAllNotificationsAsRead = async () => {
    if (!userId) return false;
    
    const success = await markAllNotificationsAsRead(userId);
    if (success) {
      setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    }
    return success;
  };
  
  const handleDeleteNotification = async (notificationId: string) => {
    if (!userId) return false;
    
    const success = await deleteNotification(notificationId);
    if (success) {
      setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
    }
    return success;
  };
  
  const handleClearAllNotifications = async () => {
    if (!userId) return false;
    
    const success = await clearAllNotifications(userId);
    if (success) {
      setNotifications([]);
    }
    return success;
  };
  
  // Get unread counts for UI elements
  const unreadCounts = {
    notifications: notifications.filter(n => !n.read).length,
    conversations: conversations.reduce((total, conv) => total + conv.unreadCount, 0),
    announcements: announcements.length
  };
  
  return {
    // Notification data and functions
    notifications,
    markNotificationAsRead: handleMarkNotificationAsRead,
    markAllNotificationsAsRead: handleMarkAllNotificationsAsRead,
    deleteNotification: handleDeleteNotification,
    clearAllNotifications: handleClearAllNotifications,
    
    // Messaging functions (delegating to the messaging hook)
    conversations,
    fetchMessages: messaging.fetchMessages,
    sendMessage: messaging.sendMessage,
    markMessagesAsRead: messaging.markMessagesAsRead,
    createConversation: messaging.createConversation,
    subscribeToMessages: messaging.subscribeToMessages,
    
    // Announcements
    announcements,
    
    // Loading states
    isLoading,
    
    // Unread counts for badges
    unreadCounts
  };
};
