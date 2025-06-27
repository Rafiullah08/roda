
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import DateFormatter from "../DateFormatter";
import StatusBadge from "../StatusBadge";
import { CheckCircle } from "lucide-react";
import { PartnerApplication, Partner } from "@/types/partner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ApplicationReviewTabProps {
  application: PartnerApplication;
  partner: Partner;
  adminNotes: string;
  setAdminNotes: (value: string) => void;
  rejectionReason: string;
  setRejectionReason: (value: string) => void;
  renderActionButtons: () => React.ReactNode;
  handleReconsiderApplication?: () => Promise<void>;
}

const ApplicationReviewTab = ({
  application,
  partner,
  adminNotes,
  setAdminNotes,
  rejectionReason,
  setRejectionReason,
  renderActionButtons,
  handleReconsiderApplication
}: ApplicationReviewTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review Information</CardTitle>
        </CardHeader>
        <CardContent>
          {application.status === 'submitted' || application.status === 'under_review' ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
                <p className="text-blue-700">
                  This application is pending review. Use the buttons at the top of the page to approve or reject this application.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label htmlFor="review-notes" className="text-sm font-medium block mb-2">
                    Admin Notes
                  </label>
                  <Textarea
                    id="review-notes"
                    placeholder="Enter notes about this application"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="h-24"
                  />
                </div>
                
                <div>
                  <label htmlFor="review-rejection" className="text-sm font-medium block mb-2">
                    Rejection Reason (if rejecting)
                  </label>
                  <Textarea
                    id="review-rejection"
                    placeholder="Enter reason for rejection"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="h-24"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-4">
                {renderActionButtons()}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Review Status</h3>
                  <p className="text-sm text-muted-foreground">
                    Reviewed on <DateFormatter dateString={application.review_date} />
                  </p>
                </div>
                <div>
                  <StatusBadge status={application.status} />
                </div>
              </div>
              
              <Separator />
              
              {application.status === 'rejected' && application.rejection_reason && (
                <div>
                  <h3 className="font-medium mb-2">Rejection Reason</h3>
                  <div className="p-4 bg-red-50 border border-red-100 rounded-md">
                    <p className="text-red-700">{application.rejection_reason}</p>
                  </div>
                </div>
              )}
              
              {application.admin_notes && (
                <div>
                  <h3 className="font-medium mb-2">Admin Notes</h3>
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-md">
                    <p>{application.admin_notes}</p>
                  </div>
                </div>
              )}
              
              {application.status === 'rejected' && handleReconsiderApplication && (
                <div className="mt-6 flex justify-end">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="border-green-500 text-green-700">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Reconsider Application
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Reconsider Application</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will set the application status back to "under review" so you can approve it later.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleReconsiderApplication}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Partner Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Business Name</h4>
              <p>{partner.business_name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Contact Name</h4>
              <p>{partner.contact_name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Contact Email</h4>
              <p>{partner.contact_email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Contact Phone</h4>
              <p>{partner.contact_phone || "Not provided"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Website</h4>
              <p>
                {partner.website ? (
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {partner.website}
                  </a>
                ) : (
                  "Not provided"
                )}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Partner Status</h4>
              <p><StatusBadge status={partner.status} /></p>
            </div>
          </div>
          
          <div className="mt-6">
            <Button asChild variant="outline">
              <Link to={`/admin/partners/directory/${partner.id}`}>
                View Partner Profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationReviewTab;
