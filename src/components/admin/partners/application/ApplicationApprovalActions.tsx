
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Mail, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { reviewApplication } from "@/services/partners/partnerApplicationService";
import { updatePartnerStatus } from "@/services/partners/partnerStatusService";
import { sendPartnerStatusEmail } from "@/services/partners/partnerNotificationService";
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

interface ApplicationApprovalActionsProps {
  application: PartnerApplication;
  partner: Partner;
  adminNotes: string;
  rejectionReason: string;
  onStatusUpdate: () => void;
  isUpdating?: boolean;
  setIsUpdating: (updating: boolean) => void;
}

const ApplicationApprovalActions = ({
  application,
  partner,
  adminNotes,
  rejectionReason,
  onStatusUpdate,
  isUpdating = false,
  setIsUpdating,
}: ApplicationApprovalActionsProps) => {
  const [emailSending, setEmailSending] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [actionCompleted, setActionCompleted] = useState<'approved' | 'rejected' | null>(null);

  const handleApproval = async () => {
    setIsUpdating(true);
    setEmailError(null);
    setEmailSending(true);
    
    try {
      console.log("=== APPROVAL PROCESS START ===");
      console.log("Application ID:", application.id);
      console.log("Partner email:", partner.contact_email);
      
      // Update application status
      await reviewApplication(application.id, {
        status: "approved",
        adminNotes,
      });

      // Update partner status to approved
      await updatePartnerStatus(partner.id, "approved");

      console.log("Database updates completed, sending approval email...");

      // Send approval email
      try {
        await sendPartnerStatusEmail({
          partnerEmail: partner.contact_email,
          partnerName: partner.contact_name,
          businessName: partner.business_name,
          status: 'approved'
        });
        
        console.log("✅ Approval email sent successfully");
        setActionCompleted('approved');
        toast({
          title: "Application approved",
          description: "Partner application has been approved and notification email sent successfully",
        });
      } catch (emailError) {
        console.error("❌ Failed to send approval email:", emailError);
        setEmailError(emailError.message || "Failed to send email");
        toast({
          title: "Application approved",
          description: "Application approved successfully, but failed to send email notification. Please check logs.",
          variant: "destructive",
        });
      }

      onStatusUpdate();
    } catch (error) {
      console.error("Error approving application:", error);
      toast({
        title: "Error approving application",
        description: error.message || "An error occurred while approving the application",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
      setEmailSending(false);
    }
  };

  const handleRejection = async () => {
    // Enhanced validation
    if (!rejectionReason || !rejectionReason.trim()) {
      console.error("Rejection attempted without reason");
      toast({
        title: "Rejection reason required",
        description: "Please provide a reason for rejecting this application",
        variant: "destructive",
      });
      return;
    }

    const trimmedReason = rejectionReason.trim();
    if (trimmedReason.length < 10) {
      toast({
        title: "Rejection reason too short",
        description: "Please provide a more detailed reason (at least 10 characters)",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    setEmailError(null);
    setEmailSending(true);
    
    try {
      console.log("=== REJECTION PROCESS START ===");
      console.log("Application ID:", application.id);
      console.log("Partner email:", partner.contact_email);
      console.log("Rejection reason:", trimmedReason);
      
      // Update application status
      await reviewApplication(application.id, {
        status: "rejected",
        adminNotes,
        rejectionReason: trimmedReason,
      });

      // Update partner status to rejected
      await updatePartnerStatus(partner.id, "rejected");

      console.log("Database updates completed, sending rejection email...");

      // Send rejection email
      try {
        const emailData = {
          partnerEmail: partner.contact_email,
          partnerName: partner.contact_name,
          businessName: partner.business_name,
          status: 'rejected' as const,
          rejectionReason: trimmedReason
        };
        
        console.log("Sending rejection email with data:", emailData);
        
        await sendPartnerStatusEmail(emailData);
        
        console.log("✅ Rejection email sent successfully");
        setActionCompleted('rejected');
        toast({
          title: "Application rejected",
          description: "Partner application has been rejected and notification email sent successfully",
        });
      } catch (emailError) {
        console.error("❌ Failed to send rejection email:", emailError);
        setEmailError(emailError.message || "Failed to send email");
        toast({
          title: "Application rejected",
          description: "Application rejected successfully, but failed to send email notification. Please check logs.",
          variant: "destructive",
        });
      }

      onStatusUpdate();
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast({
        title: "Error rejecting application",
        description: error.message || "An error occurred while rejecting the application",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
      setEmailSending(false);
    }
  };

  // Check if already processed or completed in this session
  const isApproved = application.status === 'approved' || actionCompleted === 'approved';
  const isRejected = application.status === 'rejected' || actionCompleted === 'rejected';
  const isProcessed = isApproved || isRejected;

  // Don't show action buttons if already processed
  if (isProcessed) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            {isApproved ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-700 font-medium">Application Approved</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-700 font-medium">Application Rejected</span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {isApproved 
              ? "The partner has been approved and can now access the partner dashboard."
              : "The partner application has been rejected and they have been notified."
            }
          </p>
        </div>
      </div>
    );
  }

  // Only show buttons for submitted or under_review applications
  if (application.status !== 'submitted' && application.status !== 'under_review') {
    return null;
  }

  const isRejectionDisabled = !rejectionReason || !rejectionReason.trim() || rejectionReason.trim().length < 10;

  return (
    <div className="space-y-4">
      {emailError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-red-800">Email sending failed</h4>
            <p className="text-sm text-red-700 mt-1">{emailError}</p>
            <p className="text-xs text-red-600 mt-2">
              Check the console logs and edge function logs for more details.
            </p>
          </div>
        </div>
      )}
      
      <div className="flex space-x-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="default" 
              className="bg-green-600 hover:bg-green-700 flex-1"
              disabled={isUpdating || emailSending}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              {emailSending && !isRejected ? "Sending Email..." : "Approve & Send Email"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Approve Partner Application</AlertDialogTitle>
              <AlertDialogDescription>
                This will approve the partner application and automatically send an approval email to {partner.contact_email}.
                The partner will be able to access the partner dashboard immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleApproval}
                className="bg-green-600 hover:bg-green-700"
                disabled={isUpdating || emailSending}
              >
                <Mail className="mr-2 h-4 w-4" />
                Approve & Send Email
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="destructive" 
              className="flex-1"
              disabled={isUpdating || emailSending || isRejectionDisabled}
              title={isRejectionDisabled ? "Please provide a detailed rejection reason (at least 10 characters)" : ""}
            >
              <XCircle className="mr-2 h-4 w-4" />
              {emailSending && !isApproved ? "Sending Email..." : "Reject & Send Email"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reject Partner Application</AlertDialogTitle>
              <AlertDialogDescription>
                This will reject the partner application and automatically send a rejection email to {partner.contact_email} 
                with the reason you provided. This action cannot be undone, but the partner can apply again in the future.
                <br /><br />
                <strong>Current rejection reason:</strong> {rejectionReason || "No reason provided"}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleRejection}
                className="bg-red-600 hover:bg-red-700"
                disabled={isUpdating || emailSending || isRejectionDisabled}
              >
                <Mail className="mr-2 h-4 w-4" />
                Reject & Send Email
              </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ApplicationApprovalActions;
