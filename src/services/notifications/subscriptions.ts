
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Notification, NotificationType } from "./types";

/**
 * Subscribe to new notifications for a user
 */
export const subscribeToNotificationsFromDb = (userId: string, onNewNotification: (notification: Notification) => void) => {
  const channel = supabase
    .channel(`notifications:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      },
      (payload) => {
        if (payload.new) {
          const newNotification = {
            id: payload.new.id,
            userId: payload.new.user_id,
            title: payload.new.title,
            message: payload.new.message,
            category: payload.new.category as NotificationType,
            read: payload.new.read,
            createdAt: payload.new.created_at,
            linkTo: payload.new.link_to
          };
          
          onNewNotification(newNotification);
          
          toast({
            title: newNotification.title,
            description: newNotification.message,
          });
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
