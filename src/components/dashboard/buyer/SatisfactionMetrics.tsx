
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Clock, CheckSquare } from 'lucide-react';

const SatisfactionMetrics: React.FC = () => {
  // Remove demo data - show empty state until real data is available
  const metrics = [
    {
      name: 'Average Rating',
      value: '--',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-700',
      description: 'Your average rating for services'
    },
    {
      name: 'On-Time Delivery',
      value: '--',
      icon: Clock,
      color: 'bg-green-100 text-green-700',
      description: 'Services delivered on schedule'
    },
    {
      name: 'Satisfaction Rate',
      value: '--',
      icon: CheckSquare,
      color: 'bg-blue-100 text-blue-700',
      description: 'Purchases meeting expectations'
    }
  ];

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Satisfaction Metrics</CardTitle>
        <CardDescription>Quality indicators from your purchases</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center p-4 rounded-lg bg-white border">
              <div className={`p-3 rounded-full mb-2 ${metric.color}`}>
                <metric.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold">{metric.value}</div>
              <div className="text-sm font-medium mt-1">{metric.name}</div>
              <div className="text-xs text-gray-500 mt-1 text-center">{metric.description}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Metrics will be calculated based on your order history and reviews</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SatisfactionMetrics;
