
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { getPartnerById } from "@/services/partners";
import { Partner } from "@/types/partner";
import PartnerHeader from "@/components/admin/partners/detail/PartnerHeader";
import PartnerDetailTabs from "@/components/admin/partners/detail/PartnerDetailTabs";
import LoadingState from "@/components/admin/partners/LoadingState";
import NotFoundState from "@/components/admin/partners/NotFoundState";
import { toast } from "@/hooks/use-toast";

const PartnerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPartner = async () => {
    setLoading(true);
    try {
      if (id) {
        const partnerData = await getPartnerById(id);
        setPartner(partnerData);
      }
    } catch (error) {
      console.error("Error fetching partner:", error);
      toast({
        title: "Error",
        description: "Failed to load partner details. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartner();
  }, [id]);

  const handleStatusChange = () => {
    fetchPartner();
  };

  if (loading) {
    return (
      <AdminLayout>
        <LoadingState message="Loading partner details..." />
      </AdminLayout>
    );
  }

  if (!partner) {
    return (
      <AdminLayout>
        <NotFoundState
          title="Partner Not Found"
          description="The partner you're looking for doesn't exist or you don't have permission to view it."
          backLink="/admin/partners/directory"
          backLinkText="Back to Partners Directory"
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PartnerHeader 
          partner={partner}
          onStatusChange={handleStatusChange}
        />
        
        <PartnerDetailTabs 
          partner={partner}
          onStatusChange={handleStatusChange}
        />
      </div>
    </AdminLayout>
  );
};

export default PartnerDetailPage;
