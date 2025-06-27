
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { NotificationHeader } from "@/components/notifications/NotificationHeader";
import { NotificationTabs } from "@/components/notifications/NotificationTabs";

const DashboardNotifications = () => {
  const { user } = useAuth();
  const { 
    notifications, 
    isLoading, 
    unreadCount,
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    clearAllNotifications 
  } = useNotifications();

  if (!user) {
    return (
      <DashboardLayout>
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <p>Please log in to view your notifications.</p>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <NotificationHeader 
            unreadCount={unreadCount}
            totalCount={notifications.length}
            onMarkAllAsRead={markAllAsRead}
            onClearAll={clearAllNotifications}
          />
          <CardContent>
            <NotificationTabs 
              notifications={notifications}
              isLoading={isLoading}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardNotifications;
