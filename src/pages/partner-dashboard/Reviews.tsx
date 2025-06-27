
import React from 'react';
import PartnerDashboardLayout from '@/components/layout/PartnerDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useReviews from '@/components/partner-dashboard/reviews/useReviews';
import ReviewFilters from '@/components/partner-dashboard/reviews/ReviewFilters';

const PartnerReviews = () => {
  const { reviews, markAsRead, markAllAsRead, unreadCount, sortOption, handleSortChange } = useReviews();

  return (
    <PartnerDashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <CardTitle>Client Reviews</CardTitle>
              <CardDescription>See what your clients are saying about your services</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark all as read
            </Button>
          </CardHeader>
          <CardContent>
            <ReviewFilters 
              reviews={reviews} 
              onMarkAsRead={markAsRead}
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
          </CardContent>
        </Card>
      </div>
    </PartnerDashboardLayout>
  );
};

export default PartnerReviews;
