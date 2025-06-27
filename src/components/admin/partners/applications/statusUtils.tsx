
import React from "react";
import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string): React.ReactNode => {
  switch (status) {
    case "submitted":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Submitted</Badge>;
    case "under_review":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Under Review</Badge>;
    case "approved":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
    case "rejected":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
