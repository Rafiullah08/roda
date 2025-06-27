
import React from "react";
import DashboardLayout from "./DashboardLayout";
import { usePartnerDashboard } from "@/contexts/PartnerDashboardContext";
import { Partner } from "@/types/partner";
import StatusBadge from "@/components/admin/partners/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StepProgress, Step } from "@/components/ui/step-progress";

const PartnerDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const { partner } = usePartnerDashboard();
  
  if (!partner) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Only show application status header if partner is not yet fully approved */}
        {partner.status !== 'approved' && <PartnerStatusHeader partner={partner} />}
        {children}
      </div>
    </DashboardLayout>
  );
};

const PartnerStatusHeader: React.FC<{ partner: Partner }> = ({ partner }) => {
  const steps: Step[] = [
    {
      label: "Application Submitted",
      status: "completed"
    },
    {
      label: "Screening",
      status: getStepStatus(partner.status, "screening")
    },
    {
      label: "Service Selection",
      status: getStepStatus(partner.status, "service_selection")
    },
    {
      label: "Trial Period",
      status: getStepStatus(partner.status, "trial_period")
    },
    {
      label: "Approved",
      status: getStepStatus(partner.status, "approved")
    }
  ];
  
  const currentStepIndex = getCurrentStepIndex(partner.status);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Partner Application Status</CardTitle>
          <StatusBadge status={partner.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <StepProgress 
          steps={steps}
          currentStep={currentStepIndex}
          variant="horizontal"
        />
      </CardContent>
    </Card>
  );
};

// Helper functions
const getStepStatus = (currentStatus: string, stepStatus: string): "completed" | "current" | "upcoming" => {
  const statuses = ['pending', 'screening', 'service_selection', 'trial_period', 'approved'];
  const currentIndex = statuses.indexOf(currentStatus);
  const stepIndex = statuses.indexOf(stepStatus);
  
  if (currentIndex > stepIndex) return "completed";
  if (currentIndex === stepIndex) return "current";
  return "upcoming";
};

const getCurrentStepIndex = (status: string): number => {
  const statuses = ['pending', 'screening', 'service_selection', 'trial_period', 'approved'];
  return Math.max(0, statuses.indexOf(status));
};

export default PartnerDashboardLayout;
