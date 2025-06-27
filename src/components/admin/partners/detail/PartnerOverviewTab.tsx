
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Partner, PartnerExpertise, PartnerApplication, PartnerOverviewTabProps } from "@/types/partner";
import StatusBadge from "../StatusBadge";
import DateFormatter from "../DateFormatter";
import { getPartnerExpertise } from "@/services/partners";
import { getPartnerApplication } from "@/services/partners";
import { getPartnerAssignments } from "@/services/partners";

const PartnerOverviewTab = ({ partner }: PartnerOverviewTabProps) => {
  const [expertise, setExpertise] = useState<PartnerExpertise[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [application, setApplication] = useState<PartnerApplication | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [expertiseData, assignmentsData, applicationData] = await Promise.all([
          getPartnerExpertise(partner.id),
          getPartnerAssignments(partner.id),
          getPartnerApplication(partner.id)
        ]);
        
        setExpertise(expertiseData || []);
        setAssignments(assignmentsData || []);
        setApplication(applicationData);
      } catch (error) {
        console.error("Error fetching partner overview data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [partner.id]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Basic information about the partner.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Business Name</h4>
              <p className="text-base">{partner.business_name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Contact Name</h4>
              <p className="text-base">{partner.contact_name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
              <p className="text-base">{partner.contact_email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
              <p className="text-base">{partner.contact_phone || "Not provided"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Website</h4>
              <p className="text-base">
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
              <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
              <p className="text-base"><StatusBadge status={partner.status} /></p>
            </div>
          </div>

          {partner.bio && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-muted-foreground">Bio</h4>
              <p className="text-base mt-1">{partner.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Activity Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expertise?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Areas of specialization</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Service Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Total assigned services</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-md font-bold">
              {application ? <StatusBadge status={application.status} /> : "No application"}
            </div>
            <p className="text-xs text-muted-foreground">
              {application 
                ? `Last updated: ${application.review_date ? 
                    <DateFormatter dateString={application.review_date} /> : 
                    <DateFormatter dateString={application.application_date || ""} />}` 
                : "No application submitted"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerOverviewTab;
