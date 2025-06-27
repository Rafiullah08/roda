
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ReviewItem, { ReviewType } from './reviews/ReviewItem';

const ReviewsSection = () => {
  // Demo review data
  const demoReview: ReviewType = {
    id: 1,
    customerName: "Alex Johnson",
    serviceName: "Logo Design",
    date: "Apr 12, 2025",
    rating: 4,
    content: "Great work on our logo design! The partner was responsive and professional throughout the process. The final design perfectly captured our brand identity. Would definitely recommend their services.",
    read: false,
  };

  // Dummy function since we don't need to change state here
  const handleMarkAsRead = () => {};

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Recent Client Reviews</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
          className="text-purple-600"
        >
          <Link to="/partner-dashboard/reviews">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ReviewItem review={demoReview} onMarkAsRead={handleMarkAsRead} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewsSection;
