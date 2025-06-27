
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Notification, NotificationType, formatNotificationTime } from "@/services/notificationService";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationItem = ({ notification, onMarkAsRead, onDelete }: NotificationItemProps) => {
  const getCategoryColor = (category: NotificationType) => {
    switch (category) {
      case "order":
        return "bg-blue-100 text-blue-800";
      case "payment":
        return "bg-green-100 text-green-800";
      case "message":
        return "bg-purple-100 text-purple-800";
      case "review":
        return "bg-yellow-100 text-yellow-800";
      case "promotion":
        return "bg-orange-100 text-orange-800";
      case "security":
        return "bg-red-100 text-red-800";
      case "announcement":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div 
      className={cn(
        "p-4 rounded-lg border transition-colors",
        notification.read ? "bg-white" : "bg-blue-50"
      )}
    >
      <div className="flex items-start justify-between">
        {notification.linkTo ? (
          <Link 
            to={notification.linkTo} 
            className="flex items-start space-x-3 flex-1 cursor-pointer"
          >
            <div className="w-2 h-2 mt-2 rounded-full flex-shrink-0" 
                 style={{ backgroundColor: notification.read ? '#e5e7eb' : '#3b82f6' }} />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <Badge className={getCategoryColor(notification.category)}>
                  {notification.category}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{formatNotificationTime(notification.createdAt)}</p>
            </div>
          </Link>
        ) : (
          <div className="flex items-start space-x-3 flex-1 cursor-pointer">
            <div className="w-2 h-2 mt-2 rounded-full flex-shrink-0" 
                 style={{ backgroundColor: notification.read ? '#e5e7eb' : '#3b82f6' }} />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <Badge className={getCategoryColor(notification.category)}>
                  {notification.category}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{formatNotificationTime(notification.createdAt)}</p>
            </div>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2 ml-4">
          {!notification.read && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onMarkAsRead(notification.id)}
              className="whitespace-nowrap"
            >
              Mark as read
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onDelete(notification.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
