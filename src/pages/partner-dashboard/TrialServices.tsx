
import React, { useState, useEffect } from 'react';
import PartnerDashboardLayout from '@/components/layout/PartnerDashboardLayout';
import { usePartnerDashboard } from '@/contexts/PartnerDashboardContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { Clock, Calendar, Check, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { TrialService, TrialStatus } from '@/types/partner';
import { getPartnerTrialServices } from '@/services/partners';

const TrialServicesPage = () => {
  const { partner } = usePartnerDashboard();
  const [trialServices, setTrialServices] = useState<TrialService[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTrialServices = async () => {
      if (partner) {
        try {
          setLoading(true);
          const services = await getPartnerTrialServices(partner.id);
          setTrialServices(services);
        } catch (error) {
          console.error("Error fetching trial services:", error);
          toast({
            title: "Error",
            description: "Failed to load trial services. Please try again.",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchTrialServices();
  }, [partner]);
  
  if (!partner) {
    return (
      <PartnerDashboardLayout>
        <div className="alert alert-warning">
          You need to be registered as a partner to access this page.
        </div>
      </PartnerDashboardLayout>
    );
  }
  
  if (partner.status !== 'trial_period' && partner.status !== 'approved') {
    return (
      <PartnerDashboardLayout>
        <Card>
          <CardHeader>
            <CardTitle>Trial Services</CardTitle>
            <CardDescription>
              This section is only available during the trial period stage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-yellow-50 rounded-lg text-yellow-800">
              <p>Your application has not yet reached the trial period stage.</p>
              <p className="mt-2">
                {partner.status === 'pending' && "Your application is currently under initial review."}
                {partner.status === 'screening' && "Please complete the document screening stage first."}
                {partner.status === 'service_selection' && "Please select services you want to offer first."}
              </p>
            </div>
          </CardContent>
        </Card>
      </PartnerDashboardLayout>
    );
  }
  
  // For approved partners, show their completed trial services
  const isApproved = partner.status === 'approved';
  
  // Calculate progress
  const completedTrials = trialServices.filter(service => service.status === 'completed').length;
  const totalTrials = trialServices.length;
  const progressPercentage = totalTrials > 0 ? (completedTrials / totalTrials) * 100 : 0;
  
  return (
    <PartnerDashboardLayout>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Trial Services</CardTitle>
          <CardDescription>
            {isApproved 
              ? "You have successfully completed your trial services and been approved as a partner."
              : "Complete these trial services to become a fully approved partner. You need to successfully complete at least 3 trials."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm font-medium">Progress:</span>{' '}
                <span className="text-sm">{completedTrials} of {totalTrials} completed</span>
              </div>
              <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          {isApproved && (
            <div className="p-4 bg-green-50 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="font-medium text-green-700">Trial Period Completed</p>
                <p className="text-sm text-green-600">
                  You have successfully completed your trial period and are now a fully approved partner.
                </p>
              </div>
            </div>
          )}
          
          {!isApproved && !loading && trialServices.length === 0 && (
            <div className="p-4 bg-blue-50 rounded-lg flex items-center">
              <AlertTriangle className="h-5 w-5 text-blue-500 mr-3" />
              <p className="text-blue-700">
                No trial services have been assigned yet. Our team will assign you trial services shortly.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="p-8 flex justify-center">
              <p>Loading trial services...</p>
            </CardContent>
          </Card>
        ) : (
          trialServices.map((service) => (
            <TrialServiceCard 
              key={service.id} 
              service={service} 
              isApproved={isApproved}
            />
          ))
        )}
      </div>
    </PartnerDashboardLayout>
  );
};

interface TrialServiceCardProps {
  service: TrialService;
  isApproved: boolean;
}

const TrialServiceCard = ({ service, isApproved }: TrialServiceCardProps) => {
  const getStatusBadge = (status: TrialStatus) => {
    switch (status) {
      case 'assigned':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Assigned</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const handleStartService = () => {
    toast({
      title: "Service Started",
      description: "You have started working on this trial service."
    });
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{service.services?.title || 'Service'}</CardTitle>
          {getStatusBadge(service.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-gray-600">{service.services?.description || 'No description available'}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Assigned Date</p>
                <p className="font-medium">{formatDate(service.assigned_date)}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Completion Date</p>
                <p className="font-medium">{formatDate(service.completion_date)}</p>
              </div>
            </div>
          </div>
          
          {service.customer_feedback && (
            <div className="p-3 bg-gray-50 rounded-md mt-3">
              <p className="text-sm font-medium mb-1">Customer Feedback:</p>
              <p className="text-sm">{service.customer_feedback}</p>
            </div>
          )}
          
          {service.status === 'completed' && (
            <div className="p-3 bg-green-50 rounded-md flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-green-700">Successfully Completed</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Quality Rating</p>
                    <p className="text-sm font-medium">{service.quality_rating}/5</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">On-time Delivery</p>
                    <p className="text-sm font-medium">{service.on_time_delivery ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Response Rating</p>
                    <p className="text-sm font-medium">{service.response_rating}/5</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {service.status === 'failed' && (
            <div className="p-3 bg-red-50 rounded-md flex items-start">
              <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-red-700">Service Failed</p>
                <p className="text-sm text-red-600 mt-1">
                  {service.customer_feedback || 'No feedback provided'}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      {!isApproved && service.status === 'assigned' && (
        <CardFooter className="pt-0">
          <Button onClick={handleStartService}>Start Working on Service</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default TrialServicesPage;
