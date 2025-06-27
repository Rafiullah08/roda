
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface Step {
  label: string;
  description?: string;
  status: "completed" | "current" | "upcoming";
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  variant?: "horizontal" | "vertical";
  className?: string;
}

export function StepProgress({
  steps,
  currentStep,
  variant = "horizontal",
  className,
}: StepProgressProps) {
  const progressPercentage = ((currentStep) / (steps.length - 1)) * 100;
  
  return (
    <div className={cn("w-full", className)}>
      {variant === "horizontal" ? (
        <>
          <Progress value={progressPercentage} className="h-2 mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 text-xs text-center">
            {steps.map((step, index) => {
              const isActive = index <= currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <div key={index} className={`${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  <div className="flex justify-center mb-1">
                    {isCurrent ? (
                      <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                        <Clock className="h-3 w-3" />
                      </Badge>
                    ) : isActive ? (
                      <Badge variant="outline" className="h-5 w-5 rounded-full p-0 flex items-center justify-center border-primary bg-primary text-primary-foreground">
                        <Check className="h-3 w-3" />
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                        {index + 1}
                      </Badge>
                    )}
                  </div>
                  <span className={`capitalize ${isCurrent ? "font-medium" : ""} hidden sm:block`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isActive = index <= currentStep;
            const isCurrent = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="flex items-start">
                <div className={`mr-4 flex h-10 w-10 items-center justify-center rounded-full ${
                  isCurrent ? "bg-blue-100" : 
                  isCompleted ? "bg-green-100" : 
                  "bg-gray-100"
                }`}>
                  {isCurrent ? (
                    <Clock className="h-6 w-6 text-blue-600" />
                  ) : isCompleted ? (
                    <Check className="h-6 w-6 text-green-600" />
                  ) : (
                    <span className="h-6 w-6 flex items-center justify-center text-gray-400 font-medium">{index + 1}</span>
                  )}
                </div>
                <div>
                  <p className={`font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-sm text-gray-500">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
