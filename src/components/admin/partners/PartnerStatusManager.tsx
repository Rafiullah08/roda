
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { updatePartnerStatus } from "@/services/partners/partnerStatusService";
import { Partner, PartnerStatus } from "@/types/partner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from "./StatusBadge";
import { AlertCircle } from "lucide-react";

interface PartnerStatusManagerProps {
  partner: Partner;
  onStatusChange: () => void;
}

const PartnerStatusManager = ({ partner, onStatusChange }: PartnerStatusManagerProps) => {
  const [status, setStatus] = useState<PartnerStatus>(partner.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = (newStatus: PartnerStatus) => {
    setStatus(newStatus);
  };

  const handleSubmit = async () => {
    if (status === partner.status) {
      toast({
        title: "No changes",
        description: "Partner status is already set to " + status,
      });
      return;
    }

    setIsUpdating(true);
    try {
      await updatePartnerStatus(partner.id, status);
      toast({
        title: "Status updated",
        description: `Partner status has been updated to ${status}`,
      });
      onStatusChange();
    } catch (error) {
      console.error("Error updating partner status:", error);
      toast({
        title: "Error updating status",
        description: "An error occurred while updating the partner status.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border space-y-4">
      <h3 className="font-medium">Partner Status</h3>
      
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-sm text-gray-500">Current status:</span>
        <StatusBadge status={partner.status} />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <Select value={status} onValueChange={(value) => handleStatusChange(value as PartnerStatus)}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="screening">Screening</SelectItem>
            <SelectItem value="service_selection">Service Selection</SelectItem>
            <SelectItem value="trial_period">Trial Period</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          onClick={handleSubmit} 
          disabled={isUpdating || status === partner.status}
          className="w-full sm:w-auto"
        >
          Update Status
        </Button>
      </div>

      {(status === "rejected" || status === "suspended") && (
        <div className="flex items-start mt-2 p-3 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
          <AlertCircle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium">Important Notice</p>
            <p>
              {status === "rejected" ? (
                "Rejecting a partner will prevent them from accessing the platform. You should provide a reason for rejection."
              ) : (
                "Suspending a partner will temporarily restrict their access to the platform while maintaining their profile and history."
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerStatusManager;
