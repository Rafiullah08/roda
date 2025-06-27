
import { supabase } from "@/integrations/supabase/client";
import { Notification, NotificationType } from "./types";

/**
 * Fetch notifications for a user
 */
export const fetchNotificationsFromDb = async (userId: string): Promise<Notification[]> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data.map(notification => ({
      id: notification.id,
      userId: notification.user_id,
      title: notification.title,
      message: notification.message,
      category: notification.category as NotificationType,
      read: notification.read,
      createdAt: notification.created_at,
      linkTo: notification.link_to
    }));
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

/**
 * Mark a notification as read
 */
export const markNotificationAsReadInDb = async (notificationId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return false;
  }
};

/**
 * Mark all notifications as read for a user
 */
export const markAllNotificationsAsReadInDb = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return false;
  }
};

/**
 * Delete a notification
 */
export const deleteNotificationFromDb = async (notificationId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error deleting notification:", error);
    return false;
  }
};

/**
 * Clear all notifications for a user
 */
export const clearAllNotificationsFromDb = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error clearing notifications:", error);
    return false;
  }
};

/**
 * Create a notification
 */
export const createNotificationInDb = async (
  userId: string,
  title: string,
  message: string, 
  category: NotificationType,
  linkTo?: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        title,
        message,
        category,
        read: false,
        link_to: linkTo
      });

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error creating notification:", error);
    return false;
  }
};
