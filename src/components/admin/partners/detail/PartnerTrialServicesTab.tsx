
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getPartnerTrialServices, assignTrialService } from "@/services/partnerService";
import { fetchServices } from "@/services/service-management";
import { TrialService, PartnerTrialServicesTabProps } from "@/types/partner";
import { Service } from "@/types/service-management";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, Clock, Play } from "lucide-react";

const PartnerTrialServicesTab = ({ partner, onStatusChange }: PartnerTrialServicesTabProps) => {
  const [trialServices, setTrialServices] = useState<TrialService[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAssigning, setIsAssigning] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [trialData, servicesData] = await Promise.all([
          getPartnerTrialServices(partner.id),
          fetchServices()
        ]);
        setTrialServices(trialData);
        setServices(servicesData);
      } catch (error) {
        console.error("Error loading trial services:", error);
        toast({
          title: "Error",
          description: "Failed to load trial services",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [partner.id]);

  const handleAssignTrial = async () => {
    if (!selectedService) {
      toast({
        title: "Error",
        description: "Please select a service",
        variant: "destructive"
      });
      return;
    }

    setIsAssigning(true);
    try {
      const result = await assignTrialService(partner.id, selectedService);
      if (result) {
        toast({
          title: "Success",
          description: "Trial service assigned successfully"
        });
        setTrialServices([...trialServices, result]);
        setSelectedService("");
        onStatusChange();
      }
    } catch (error) {
      console.error("Error assigning trial service:", error);
      toast({
        title: "Error",
        description: "Failed to assign trial service",
        variant: "destructive"
      });
    } finally {
      setIsAssigning(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "in_progress":
        return <Play className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Assigned</Badge>;
    }
  };

  const canAssignMore = trialServices.length < 3 || 
    trialServices.some(trial => trial.status === "failed");

  const completedTrials = trialServices.filter(trial => trial.status === "completed").length;

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg border">
        <h2 className="text-lg font-semibold mb-2">Trial Services</h2>
        <div className="text-sm text-gray-600 mb-4">
          <p>Partners must complete 3 trial services successfully to be fully approved.</p>
          <p className="font-medium mt-2">
            Status: {completedTrials}/3 trials completed
          </p>
        </div>

        {canAssignMore && partner.status !== "approved" && (
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Assign New Trial</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select 
                value={selectedService} 
                onValueChange={setSelectedService}
                disabled={isAssigning}
              >
                <SelectTrigger className="w-full sm:w-[250px]">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={handleAssignTrial} 
                disabled={!selectedService || isAssigning}
              >
                Assign Trial
              </Button>
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading trial services...</div>
      ) : trialServices.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-500">No trial services assigned yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {trialServices.map((trial) => (
            <Card key={trial.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {trial.services?.title || "Unknown Service"}
                    </CardTitle>
                    <CardDescription>
                      Assigned: {new Date(trial.assigned_date || "").toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(trial.status)}
                    {getStatusBadge(trial.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {trial.completion_date && (
                    <div className="text-sm">
                      <span className="font-medium">Completed:</span>{" "}
                      {new Date(trial.completion_date).toLocaleDateString()}
                    </div>
                  )}
                  
                  {trial.status === "completed" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-xs text-gray-500">Quality Rating</div>
                        <div className="font-medium">{trial.quality_rating}/5</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-xs text-gray-500">On-time Delivery</div>
                        <div className="font-medium">{trial.on_time_delivery ? "Yes" : "No"}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-xs text-gray-500">Response Rating</div>
                        <div className="font-medium">{trial.response_rating}/5</div>
                      </div>
                    </div>
                  )}

                  {trial.customer_feedback && (
                    <div className="mt-4 text-sm">
                      <div className="font-medium mb-1">Customer Feedback:</div>
                      <div className="bg-gray-50 p-3 rounded text-gray-700">
                        {trial.customer_feedback}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnerTrialServicesTab;
