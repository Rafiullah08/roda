
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Notification } from "@/services/notificationService";
import { NotificationList } from "./NotificationList";

interface NotificationTabsProps {
  notifications: Notification[];
  isLoading: boolean;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationTabs = ({ 
  notifications, 
  isLoading, 
  onMarkAsRead, 
  onDelete 
}: NotificationTabsProps) => {
  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.length - unreadCount;
  
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="all">
          All
          {notifications.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {notifications.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="unread">
          Unread
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="read">
          Read
          {readCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {readCount}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <NotificationList 
          notifications={notifications} 
          isLoading={isLoading}
          filterType="all"
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      </TabsContent>

      <TabsContent value="unread">
        <NotificationList 
          notifications={notifications} 
          isLoading={isLoading}
          filterType="unread"
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      </TabsContent>

      <TabsContent value="read">
        <NotificationList 
          notifications={notifications} 
          isLoading={isLoading}
          filterType="read"
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      </TabsContent>
    </Tabs>
  );
};
