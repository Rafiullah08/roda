
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface NotificationHeaderProps {
  unreadCount: number;
  totalCount: number;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export const NotificationHeader = ({ 
  unreadCount, 
  totalCount, 
  onMarkAllAsRead, 
  onClearAll 
}: NotificationHeaderProps) => {
  return (
    <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
      <CardTitle>Notifications</CardTitle>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onMarkAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onClearAll}
          disabled={totalCount === 0}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          Clear all
        </Button>
      </div>
    </CardHeader>
  );
};
