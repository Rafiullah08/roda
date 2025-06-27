
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  fetchNotifications, 
  markAllNotificationsAsRead, 
  subscribeToNotifications,
  Notification,
  formatNotificationTime,
  NotificationType
} from "@/services/notificationService";
import { toast } from "@/hooks/use-toast";

export const NotificationsPopover = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
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

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const markAllAsRead = async () => {
    if (!user) return;
    
    const success = await markAllNotificationsAsRead(user.id);
    if (success) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast({
        title: "Notifications marked as read",
        description: "All notifications have been marked as read."
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to mark notifications as read. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const getCategoryIcon = (category: NotificationType) => {
    switch (category) {
      case "order":
        return "📦"; 
      case "payment":
        return "💰";
      case "message":
        return "💬";
      case "review":
        return "⭐";
      case "promotion":
        return "🎉";
      case "security":
        return "🔒";
      case "announcement":
        return "📢";
      default:
        return "🔔";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {unreadNotifications > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
              {unreadNotifications}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadNotifications > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={markAllAsRead}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-72 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No notifications</div>
          ) : (
            <>
              {notifications.slice(0, 5).map((notification) => {
                return (
                  <div key={notification.id} className={cn(
                    "flex items-start p-3 hover:bg-gray-50 cursor-pointer",
                    notification.read ? "bg-white" : "bg-blue-50"
                  )}>
                    <div className="mr-3 text-xl">{getCategoryIcon(notification.category)}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatNotificationTime(notification.createdAt)}</p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        {notifications.length > 5 && (
          <div className="p-2 border-t text-center">
            <Button
              variant="ghost" 
              size="sm"
              asChild
              className="w-full text-sm text-gray-600 hover:text-gray-900"
            >
              <Link to="/dashboard/notifications">
                View all notifications
              </Link>
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
