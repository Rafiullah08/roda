
import React from 'react';
import { ReviewType } from './ReviewItem';
import ReviewItem from './ReviewItem';

interface ReviewListProps {
  reviews: ReviewType[];
  onMarkAsRead: (id: number) => void;
  emptyMessage: string;
}

const ReviewList = ({ reviews, onMarkAsRead, emptyMessage }: ReviewListProps) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewItem 
          key={review.id} 
          review={review} 
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
};

export default ReviewList;
