
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StepProgress, Step } from '@/components/ui/step-progress';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { PartnerStatus } from '@/types/partner';

type ApplicationStatus = 'submitted' | 'under_review' | 'approved' | 'rejected';

interface PartnerApplicationProgressProps {
  application: {
    id: string;
    status: ApplicationStatus;
    application_date: string;
    review_date?: string;
    rejection_reason?: string;
    partner: {
      id: string;
      status: PartnerStatus;
      business_name: string;
    };
  };
}

const PartnerApplicationProgress: React.FC<PartnerApplicationProgressProps> = ({ application }) => {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'under_review':
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Check if application or partner is rejected
  const isRejected = application.status === 'rejected' || application.partner.status === 'rejected';
  const isApproved = application.status === 'approved' && application.partner.status === 'approved';

  // Show rejection card for rejected applications
  if (isRejected) {
    return (
      <Card className="border-red-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              {getStatusIcon('rejected')}
              Partner Application Status
            </CardTitle>
            <Badge className={getStatusColor('rejected')}>
              Rejected
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800 mb-2">
              Unfortunately, your partner application has been rejected.
            </p>
            {application.rejection_reason && (
              <p className="text-sm text-red-700">
                <strong>Reason:</strong> {application.rejection_reason}
              </p>
            )}
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/become-partner')}
          >
            Apply Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Show approved card for approved applications
  if (isApproved) {
    return (
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              {getStatusIcon('approved')}
              Partner Application Status
            </CardTitle>
            <Badge className={getStatusColor('approved')}>
              Approved
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Business Name: <span className="font-medium">{application.partner.business_name}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Applied: <span className="font-medium">
                {new Date(application.application_date).toLocaleDateString()}
              </span>
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 mb-2">
              Congratulations! Your partner application has been approved.
            </p>
            <p className="text-sm text-green-700">
              You can now access the partner dashboard and start managing your services.
            </p>
          </div>
          
          <Button 
            className="w-full"
            onClick={() => navigate('/partner-dashboard')}
          >
            Access Partner Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Show progress for pending/in-review applications
  const getStepStatus = (currentStatus: string, stepStatus: string): "completed" | "current" | "upcoming" => {
    const statuses = ['submitted', 'under_review', 'approved'];
    const currentIndex = statuses.indexOf(currentStatus);
    const stepIndex = statuses.indexOf(stepStatus);
    
    if (currentIndex > stepIndex) return "completed";
    if (currentIndex === stepIndex) return "current";
    return "upcoming";
  };

  const steps: Step[] = [
    {
      label: "Application Submitted",
      status: getStepStatus(application.status, "submitted")
    },
    {
      label: "Under Review",
      status: getStepStatus(application.status, "under_review")
    },
    {
      label: "Approved",
      status: getStepStatus(application.status, "approved")
    }
  ];

  const getCurrentStepIndex = (status: string): number => {
    const statuses = ['submitted', 'under_review', 'approved'];
    return Math.max(0, statuses.indexOf(status));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            {getStatusIcon(application.status)}
            Partner Application Status
          </CardTitle>
          <Badge className={getStatusColor(application.status)}>
            {application.status.charAt(0).toUpperCase() + application.status.slice(1).replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Business Name: <span className="font-medium">{application.partner.business_name}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Applied: <span className="font-medium">
              {new Date(application.application_date).toLocaleDateString()}
            </span>
          </p>
        </div>

        <StepProgress 
          steps={steps}
          currentStep={getCurrentStepIndex(application.status)}
          variant="horizontal"
        />

        <div className="pt-2">
          {application.status === 'submitted' && (
            <p className="text-sm text-muted-foreground">
              Your application is queued for review. We'll notify you once the review process begins.
            </p>
          )}
          {application.status === 'under_review' && (
            <p className="text-sm text-muted-foreground">
              Our team is currently reviewing your application. We'll get back to you within 2-3 business days.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerApplicationProgress;
