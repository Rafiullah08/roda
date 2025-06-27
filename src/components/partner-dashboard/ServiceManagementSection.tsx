
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Partner } from '@/types/partner';

interface ServiceManagementSectionProps {
  partner: Partner;
}

const ServiceManagementSection: React.FC<ServiceManagementSectionProps> = ({ partner }) => {
  const showServiceManagement = ['service_selection', 'trial_period', 'approved'].includes(partner.status);
  
  if (!showServiceManagement) {
    return null;
  }

  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Service Management</CardTitle>
        </CardHeader>
        <CardContent>
          {partner.status === 'service_selection' && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 mb-4">
                You need to select services you want to offer as a partner.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button asChild>
                  <Link to="/partner-dashboard/services">Select Services</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/partner-dashboard/free-services">Browse Free Services</Link>
                </Button>
              </div>
            </div>
          )}
          
          {partner.status === 'trial_period' && (
            <div className="space-y-4">
              <h3 className="font-medium">Trial Services</h3>
              <p className="text-sm text-gray-500">
                Complete these trial services to become a fully approved partner.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/partner-dashboard/trials">View Trial Services</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/partner-dashboard/my-services">My Services</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/partner-dashboard/free-services">Browse Free Services</Link>
                </Button>
              </div>
            </div>
          )}
          
          {partner.status === 'approved' && (
            <div className="space-y-4">
              <h3 className="font-medium">Your Services</h3>
              <p className="text-sm text-gray-500">
                Manage your services and view assignments.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/partner-dashboard/my-services">My Services</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/partner-dashboard/free-services">Browse Free Services</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/partner-dashboard/assignments">Assignments</Link>
                </Button>
              </div>
            </div>
          )}
          
          {/* Add a section for pending status partners to browse free services */}
          {partner.status === 'pending' && (
            <div className="space-y-4">
              <h3 className="font-medium">Free Services Available</h3>
              <p className="text-sm text-gray-500">
                While your application is pending, you can browse and add free services to your portfolio.
              </p>
              <Button asChild>
                <Link to="/partner-dashboard/free-services">Browse Free Services</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceManagementSection;
