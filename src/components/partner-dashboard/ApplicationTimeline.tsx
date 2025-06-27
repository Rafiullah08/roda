
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle } from 'lucide-react';
import { Partner } from '@/types/partner';

interface ApplicationTimelineProps {
  partner: Partner;
}

const ApplicationTimeline: React.FC<ApplicationTimelineProps> = ({ partner }) => {
  // Don't render for approved partners
  if (partner.status === 'approved') {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Application Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Application Submitted</p>
              <p className="text-sm text-gray-500">Your application has been received</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className={`mr-4 flex h-10 w-10 items-center justify-center rounded-full ${
              partner.status === 'pending' ? 'bg-blue-100' : 'bg-green-100'
            }`}>
              {partner.status === 'pending' ? (
                <Clock className="h-6 w-6 text-blue-600" />
              ) : (
                <CheckCircle className="h-6 w-6 text-green-600" />
              )}
            </div>
            <div>
              <p className="font-medium">Initial Review</p>
              <p className="text-sm text-gray-500">
                {partner.status === 'pending' ? 'In progress' : 'Completed'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className={`mr-4 flex h-10 w-10 items-center justify-center rounded-full ${
              partner.status === 'screening' ? 'bg-blue-100' : 
              ['service_selection', 'trial_period', 'approved'].includes(partner.status) ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {partner.status === 'screening' ? (
                <Clock className="h-6 w-6 text-blue-600" />
              ) : ['service_selection', 'trial_period', 'approved'].includes(partner.status) ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <span className="h-6 w-6 flex items-center justify-center text-gray-400 font-medium">3</span>
              )}
            </div>
            <div>
              <p className="font-medium">Document Screening</p>
              <p className="text-sm text-gray-500">
                {partner.status === 'screening' ? 'In progress' : 
                 ['service_selection', 'trial_period', 'approved'].includes(partner.status) ? 'Completed' : 'Pending'}
              </p>
            </div>
          </div>
          
          {/* Continue with other timeline items based on status */}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationTimeline;
