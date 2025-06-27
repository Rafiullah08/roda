
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Package, Calendar, MessageSquare, Star } from 'lucide-react';

// Sample data for quick access
const quickAccessItems = [
  {
    id: 1,
    title: 'Active Orders',
    icon: Package,
    color: 'bg-blue-100 text-blue-600',
    count: 5,
    action: 'View Orders',
    path: '/dashboard/purchases'
  },
  {
    id: 2,
    title: 'Upcoming Deliveries',
    icon: Calendar,
    color: 'bg-purple-100 text-purple-600',
    count: 3,
    action: 'Schedule',
    path: '/dashboard/purchases?filter=upcoming'
  },
  {
    id: 3,
    title: 'Pending Reviews',
    icon: Star,
    color: 'bg-amber-100 text-amber-600',
    count: 2,
    action: 'Write Reviews',
    path: '/dashboard/reviews?filter=pending'
  },
  {
    id: 4,
    title: 'Unread Messages',
    icon: MessageSquare,
    color: 'bg-green-100 text-green-600',
    count: 7,
    action: 'Read Messages',
    path: '/dashboard/messages'
  },
];

const QuickAccessCards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickAccessItems.map((item) => (
        <Card key={item.id} className="w-full">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className={`p-2 rounded-full ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-2xl font-bold">{item.count}</span>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium text-sm">{item.title}</h3>
            <Button 
              variant="link" 
              className="p-0 mt-2 h-auto text-purple-600" 
              onClick={() => navigate(item.path)}
            >
              {item.action}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickAccessCards;
