
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const RecommendedServices: React.FC = () => {
  const navigate = useNavigate();

  // No demo data - show empty state until real data is available
  const recommendedServices: any[] = [];

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Recommended Services</CardTitle>
        <CardDescription>Based on your purchase history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <p className="text-lg mb-2">No recommendations yet</p>
            <p className="text-sm">Recommendations will appear based on your purchase history</p>
          </div>
        </div>
        <Button 
          variant="link" 
          className="mt-4 text-purple-600" 
          onClick={() => navigate('/services')}
        >
          Explore all services
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecommendedServices;
