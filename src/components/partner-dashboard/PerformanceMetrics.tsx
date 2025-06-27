
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Partner } from '@/types/partner';

interface PerformanceMetricsProps {
  partner: Partner;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ partner }) => {
  if (!['trial_period', 'approved'].includes(partner.status)) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart className="mr-2 h-5 w-5" />
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Completion Rate</span>
            <span className="font-medium">100%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Average Rating</span>
            <span className="font-medium">N/A</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">On-time Delivery</span>
            <span className="font-medium">100%</span>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link to="/partner-dashboard/metrics">View Full Report</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
