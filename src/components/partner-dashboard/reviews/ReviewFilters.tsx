
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ReviewType } from './ReviewItem';
import ReviewList from './ReviewList';
import ReviewSort, { SortOption } from './ReviewSort';

interface ReviewFiltersProps {
  reviews: ReviewType[];
  onMarkAsRead: (id: number) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const ReviewFilters = ({ reviews, onMarkAsRead, sortOption, onSortChange }: ReviewFiltersProps) => {
  const unreadCount = reviews.filter(r => !r.read).length;
  
  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="all">
            All
            {reviews.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {reviews.length}
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
          <TabsTrigger value="highest">
            Highest Rated
          </TabsTrigger>
        </TabsList>
        
        <ReviewSort 
          currentSort={sortOption} 
          onSortChange={onSortChange} 
        />
      </div>

      <TabsContent value="all">
        <ReviewList 
          reviews={reviews} 
          onMarkAsRead={onMarkAsRead}
          emptyMessage="No reviews yet"
        />
      </TabsContent>

      <TabsContent value="unread">
        <ReviewList 
          reviews={reviews.filter(r => !r.read)} 
          onMarkAsRead={onMarkAsRead}
          emptyMessage="No unread reviews"
        />
      </TabsContent>

      <TabsContent value="highest">
        <ReviewList 
          reviews={[...reviews].sort((a, b) => b.rating - a.rating)} 
          onMarkAsRead={onMarkAsRead}
          emptyMessage="No reviews yet"
        />
      </TabsContent>
    </Tabs>
  );
};

export default ReviewFilters;
