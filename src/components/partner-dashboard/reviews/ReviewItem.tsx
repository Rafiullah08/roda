
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ReviewType = {
  id: number;
  customerName: string;
  serviceName: string;
  date: string;
  rating: number;
  content: string;
  read: boolean;
};

interface ReviewItemProps {
  review: ReviewType;
  onMarkAsRead: (id: number) => void;
}

const ReviewItem = ({ review, onMarkAsRead }: ReviewItemProps) => {
  return (
    <div 
      className={cn(
        "p-4 rounded-lg border transition-colors",
        review.read ? "bg-white" : "bg-blue-50"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="w-2 h-2 mt-2 rounded-full flex-shrink-0" 
               style={{ backgroundColor: review.read ? '#e5e7eb' : '#3b82f6' }} />
          <div className="flex-1">
            <div className="flex flex-wrap justify-between items-start mb-2">
              <h4 className="font-medium text-sm mb-1">{review.customerName}</h4>
              <div className="flex items-center gap-1">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{review.content}</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Service: {review.serviceName}</p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
              {!review.read && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onMarkAsRead(review.id)}
                  className="whitespace-nowrap"
                >
                  Mark as read
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
