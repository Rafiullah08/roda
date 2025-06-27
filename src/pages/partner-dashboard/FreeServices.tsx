
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PartnerDashboardLayout from '@/components/layout/PartnerDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ServiceList from '@/components/partner-dashboard/free-services/ServiceList';
import { useFreeServices } from '@/hooks/partner-dashboard/useFreeServices';

const FreeServicesPage = () => {
  const navigate = useNavigate();
  const {
    freeServices,
    isLoading,
    partnerServices,
    addingService,
    categoryMap,
    handleAddToPortfolio,
    isUUID
  } = useFreeServices();
  
  // Handle view service - navigate to service detail page
  const handleViewService = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <PartnerDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Free Services</h1>
            <p className="text-muted-foreground">
              Browse free services you can add to your portfolio
            </p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Available Free Services</CardTitle>
            <CardDescription>
              Add these services to your portfolio and start offering them to customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ServiceList
              freeServices={freeServices}
              isLoading={isLoading}
              partnerServices={partnerServices}
              addingService={addingService}
              categoryMap={categoryMap}
              handleViewService={handleViewService}
              handleAddToPortfolio={handleAddToPortfolio}
              isUUID={isUUID}
            />
          </CardContent>
        </Card>
      </div>
    </PartnerDashboardLayout>
  );
};

export default FreeServicesPage;
