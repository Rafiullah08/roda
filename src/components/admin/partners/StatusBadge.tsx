
import React from "react";
import { Badge } from "@/components/ui/badge";

type StatusType = 
  | 'submitted' 
  | 'under_review' 
  | 'approved' 
  | 'rejected' 
  | 'pending' 
  | 'suspended'
  | 'screening'
  | 'service_selection'
  | 'trial_period';

interface StatusBadgeProps {
  status: StatusType | string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case "submitted":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Submitted</Badge>;
    case "under_review":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Under Review</Badge>;
    case "approved":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
    case "rejected":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
    case "pending":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Pending</Badge>;
    case "suspended":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Suspended</Badge>;
    case "screening":
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Screening</Badge>;
    case "service_selection":
      return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Service Selection</Badge>;
    case "trial_period":
      return <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">Trial Period</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default StatusBadge;
