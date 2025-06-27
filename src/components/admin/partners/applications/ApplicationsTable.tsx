
import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, RefreshCw } from "lucide-react";
import { PartnerApplication } from "@/types/partner";

interface ApplicationsTableProps {
  applications: Array<PartnerApplication & {partners?: any}>;
  loading: boolean;
  getStatusBadge: (status: string) => React.ReactNode;
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  loading,
  getStatusBadge,
}) => {
  if (loading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application ID</TableHead>
              <TableHead>Business Name</TableHead>
              <TableHead>Contact Name</TableHead>
              <TableHead>Contact Email</TableHead>
              <TableHead>Partner Type</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <div className="flex items-center justify-center">
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Loading applications...
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application ID</TableHead>
              <TableHead>Business Name</TableHead>
              <TableHead>Contact Name</TableHead>
              <TableHead>Contact Email</TableHead>
              <TableHead>Partner Type</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <div className="flex flex-col items-center space-y-2">
                  <ClipboardList className="h-8 w-8 text-gray-400" />
                  <p className="text-gray-500">No applications found</p>
                  <p className="text-sm text-gray-400">
                    Applications will appear here once partners submit them
                  </p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Application ID</TableHead>
            <TableHead>Business Name</TableHead>
            <TableHead>Contact Name</TableHead>
            <TableHead>Contact Email</TableHead>
            <TableHead>Partner Type</TableHead>
            <TableHead>Submitted Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-mono text-xs">
                {application.id.slice(-8)}
              </TableCell>
              <TableCell className="font-medium">
                {application.partners?.business_name || 
                 application.business_details?.business_name || 
                 "N/A"}
              </TableCell>
              <TableCell>
                {application.partners?.contact_name || 
                 application.business_details?.contact_name || 
                 "N/A"}
              </TableCell>
              <TableCell>
                {application.partners?.contact_email || 
                 application.business_details?.contact_email || 
                 "N/A"}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {application.partners?.partner_type || "Unknown"}
                </Badge>
              </TableCell>
              <TableCell>
                {application.application_date
                  ? format(new Date(application.application_date), "MMM d, yyyy")
                  : "N/A"}
              </TableCell>
              <TableCell>
                {getStatusBadge(application.status)}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="flex items-center gap-1"
                >
                  <Link to={`/admin/partners/applications/${application.id}`}>
                    <ClipboardList className="h-4 w-4" />
                    <span>Review</span>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
