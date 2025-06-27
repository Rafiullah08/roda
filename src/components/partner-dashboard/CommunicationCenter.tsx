
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommunicationCenter: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          Communication Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          No new messages. We'll notify you here when there are updates about your application or services.
        </p>
        <Button variant="outline" size="sm" className="w-full">
          Contact Support
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommunicationCenter;
