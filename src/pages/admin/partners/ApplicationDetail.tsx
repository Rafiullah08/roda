
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { getPartnerApplication, reviewApplication } from "@/services/partners/partnerApplicationService";
import { getPartnerById, updatePartner } from "@/services/partners/partnerProfileService";
import { PartnerApplication, Partner } from "@/types/partner";

// Imported Components
import LoadingState from "@/components/admin/partners/LoadingState";
import NotFoundState from "@/components/admin/partners/NotFoundState";
import ApplicationHeader from "@/components/admin/partners/application/ApplicationHeader";
import ApplicationDetailsTab from "@/components/admin/partners/application/ApplicationDetailsTab";
import ApplicationReviewTab from "@/components/admin/partners/application/ApplicationReviewTab";
import ApplicationApprovalActions from "@/components/admin/partners/application/ApplicationApprovalActions";

const PartnerApplicationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<PartnerApplication | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [activeTab, setActiveTab] = useState("application");

  useEffect(() => {
    if (!id) return;
    
    const loadApplicationData = async () => {
      setLoading(true);
      try {
        console.log("Loading application with ID:", id);
        
        // Load application data with partner details
        const applicationData = await getPartnerApplication(id);
        if (applicationData) {
          console.log("Application data loaded:", applicationData);
          setApplication(applicationData);
          
          // Extract partner data from the joined result
          if (applicationData.partners) {
            setPartner(applicationData.partners as Partner);
          } else {
            // Fallback: try to load partner data separately if join didn't work
            const partnerData = await getPartnerById(applicationData.partner_id);
            setPartner(partnerData);
          }
        } else {
          console.error("Application not found with ID:", id);
          toast({
            title: "Application not found",
            description: "Could not find the application with the provided ID.",
            variant: "destructive",
          });
          navigate("/admin/partners/applications");
        }
      } catch (error) {
        console.error("Error loading application data:", error);
        toast({
          title: "Error loading application",
          description: "An error occurred while loading the application data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadApplicationData();
  }, [id, navigate]);

  const handleStatusUpdate = async () => {
    // Reload the application data after status update
    if (id) {
      try {
        const applicationData = await getPartnerApplication(id);
        if (applicationData) {
          setApplication(applicationData);
          if (applicationData.partners) {
            setPartner(applicationData.partners as Partner);
          }
        }
      } catch (error) {
        console.error("Error reloading application data:", error);
      }
    }
  };

  const handleReconsiderApplication = async () => {
    if (!application || !id) return;
    
    try {
      setIsUpdating(true);
      
      // Update application status to under_review
      await reviewApplication(id, {
        status: "under_review",
        adminNotes: "Application reconsidered for review",
      });
      
      // Reload the data
      await handleStatusUpdate();
      
      toast({
        title: "Application reconsidered",
        description: "The application status has been updated to under review.",
      });
    } catch (error) {
      console.error("Error reconsidering application:", error);
      toast({
        title: "Error",
        description: "Failed to reconsider the application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const renderActionButtons = () => {
    if (!application || !partner) return null;
    
    // Only show action buttons for submitted or under_review applications
    if (application.status !== 'submitted' && application.status !== 'under_review') {
      return null;
    }
    
    return (
      <ApplicationApprovalActions
        application={application}
        partner={partner}
        adminNotes={adminNotes}
        rejectionReason={rejectionReason}
        onStatusUpdate={handleStatusUpdate}
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
      />
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <LoadingState message="Loading application details..." />
      </AdminLayout>
    );
  }

  if (!application || !partner) {
    return (
      <AdminLayout>
        <NotFoundState
          title="Application Not Found"
          description="The application with the specified ID could not be found."
          backLink="/admin/partners/applications"
          backLinkText="Back to Applications"
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <ApplicationHeader
          application={application}
          partner={partner}
          renderActionButtons={renderActionButtons}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="application">Application Details</TabsTrigger>
            <TabsTrigger value="review">Review Information</TabsTrigger>
          </TabsList>
          
          <TabsContent value="application" className="space-y-6">
            <ApplicationDetailsTab application={application} />
          </TabsContent>
          
          <TabsContent value="review" className="space-y-6">
            <ApplicationReviewTab
              application={application}
              partner={partner}
              adminNotes={adminNotes}
              setAdminNotes={setAdminNotes}
              rejectionReason={rejectionReason}
              setRejectionReason={setRejectionReason}
              renderActionButtons={renderActionButtons}
              handleReconsiderApplication={handleReconsiderApplication}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default PartnerApplicationDetailPage;
