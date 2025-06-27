
import React from 'react';
import { MessageSquare, Star, Bell, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const ClientInteractions: React.FC = () => {
  const navigate = useNavigate();
  
  // This component would normally fetch real data from an API
  // For now we'll use mock data
  const interactions = {
    unreadMessages: 3,
    pendingReviews: 2,
    notifications: 5,
    urgentRequests: 1
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Unread Messages</p>
            <p className="text-xs text-muted-foreground">From clients</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-blue-600"
          onClick={() => navigate('/partner-dashboard/messages')}
        >
          {interactions.unreadMessages} {interactions.unreadMessages > 0 && 
            <Badge variant="outline" className="ml-2 bg-blue-100">New</Badge>
          }
        </Button>
      </div>
      
      <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 p-2 rounded-full">
            <Star className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Pending Reviews</p>
            <p className="text-xs text-muted-foreground">Awaiting feedback</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-amber-600"
          onClick={() => navigate('/partner-dashboard/reviews')}
        >
          {interactions.pendingReviews}
        </Button>
      </div>
      
      <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-full">
            <Bell className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Notifications</p>
            <p className="text-xs text-muted-foreground">System alerts</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-purple-600"
          onClick={() => navigate('/partner-dashboard/notifications')}
        >
          {interactions.notifications}
        </Button>
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-full">
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Urgent Requests</p>
            <p className="text-xs text-muted-foreground">Needs immediate attention</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-red-600"
          onClick={() => navigate('/partner-dashboard/orders?priority=high')}
        >
          {interactions.urgentRequests}
        </Button>
      </div>
    </div>
  );
};

export default ClientInteractions;
