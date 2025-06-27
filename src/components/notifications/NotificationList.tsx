
import React from "react";
import { Loader2 } from "lucide-react";
import { Notification } from "@/services/notificationService";
import { NotificationItem } from "./NotificationItem";

interface NotificationListProps {
  notifications: Notification[];
  isLoading: boolean;
  filterType: "all" | "unread" | "read";
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationList = ({ 
  notifications, 
  isLoading, 
  filterType, 
  onMarkAsRead, 
  onDelete 
}: NotificationListProps) => {
  // Filter notifications based on the tab
  const filteredNotifications = React.useMemo(() => {
    switch (filterType) {
      case "unread":
        return notifications.filter(n => !n.read);
      case "read":
        return notifications.filter(n => n.read);
      case "all":
      default:
        return notifications;
    }
  }, [notifications, filterType]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (filteredNotifications.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          {filterType === "all" ? "No notifications" : 
           filterType === "unread" ? "No unread notifications" : 
           "No read notifications"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredNotifications.map((notification) => (
        <NotificationItem 
          key={notification.id} 
          notification={notification} 
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
