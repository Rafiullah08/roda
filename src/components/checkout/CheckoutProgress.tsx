
import React from "react";
import { StepProgress, Step } from "@/components/ui/step-progress";
import { Card, CardContent } from "@/components/ui/card";

export type CheckoutStep = "service_details" | "billing_details" | "payment";

interface CheckoutProgressProps {
  currentStep: CheckoutStep;
}

const CheckoutProgress: React.FC<CheckoutProgressProps> = ({ currentStep }) => {
  const steps: Step[] = [
    {
      label: "Service Details",
      status: getStepStatus(currentStep, "service_details")
    },
    {
      label: "Billing Details",
      status: getStepStatus(currentStep, "billing_details")
    },
    {
      label: "Payment",
      status: getStepStatus(currentStep, "payment")
    }
  ];

  const currentStepIndex = getStepIndex(currentStep);

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <StepProgress
          steps={steps}
          currentStep={currentStepIndex}
          variant="horizontal"
        />
      </CardContent>
    </Card>
  );
};

const getStepStatus = (currentStep: CheckoutStep, step: CheckoutStep): "completed" | "current" | "upcoming" => {
  const steps = ["service_details", "billing_details", "payment"];
  const currentIndex = steps.indexOf(currentStep);
  const stepIndex = steps.indexOf(step);
  
  if (stepIndex < currentIndex) return "completed";
  if (stepIndex === currentIndex) return "current";
  return "upcoming";
};

const getStepIndex = (currentStep: CheckoutStep): number => {
  const steps = ["service_details", "billing_details", "payment"];
  return steps.indexOf(currentStep);
};

export default CheckoutProgress;
