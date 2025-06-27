
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, FileText, ListCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Partner } from '@/types/partner';

interface RequiredActionsCardProps {
  partner: Partner;
}

const RequiredActionsCard: React.FC<RequiredActionsCardProps> = ({ partner }) => {
  // Do not display for approved partners
  if (!['screening', 'service_selection', 'trial_period'].includes(partner.status)) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />
          Required Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {partner.status === 'screening' && (
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-yellow-500 mr-3" />
                <div>
                  <p className="font-medium">Upload Required Documents</p>
                  <p className="text-sm text-gray-600">Business license, ID proof, tax registration, etc.</p>
                </div>
              </div>
              <Button size="sm" asChild>
                <Link to="/dashboard/profile">Upload</Link>
              </Button>
            </div>
          )}
          
          {partner.status === 'service_selection' && (
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <ListCheck className="h-5 w-5 text-yellow-500 mr-3" />
                <div>
                  <p className="font-medium">Select Services</p>
                  <p className="text-sm text-gray-600">Choose services you want to offer</p>
                </div>
              </div>
              <Button size="sm" asChild>
                <Link to="/partner-dashboard/services">Select</Link>
              </Button>
            </div>
          )}
          
          {partner.status === 'trial_period' && (
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-yellow-500 mr-3" />
                <div>
                  <p className="font-medium">Complete Trial Services</p>
                  <p className="text-sm text-gray-600">Complete assigned trial services</p>
                </div>
              </div>
              <Button size="sm" asChild>
                <Link to="/partner-dashboard/trials">View</Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RequiredActionsCard;
