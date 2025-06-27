
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, Info } from "lucide-react";
import { Partner, PartnerApplication, PartnerApplicationTabProps } from "@/types/partner";
import StatusBadge from "../StatusBadge";
import DateFormatter from "../DateFormatter";
import { getPartnerApplication } from "@/services/partners";

const PartnerApplicationTab = ({ partner }: PartnerApplicationTabProps) => {
  const [application, setApplication] = useState<PartnerApplication | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchApplication = async () => {
      setLoading(true);
      try {
        const applicationData = await getPartnerApplication(partner.id);
        setApplication(applicationData);
      } catch (error) {
        console.error("Error fetching partner application:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [partner.id]);

  const renderActionButtons = () => {
    return (
      <>
        <Button variant="default" className="mr-2">Approve</Button>
        <Button variant="destructive">Reject</Button>
      </>
    );
  };

  if (loading) {
    return <div className="text-center py-4">Loading application data...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partner Application</CardTitle>
        <CardDescription>Application details and review information</CardDescription>
      </CardHeader>
      <CardContent>
        {application ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h3 className="font-semibold">Application Status: <StatusBadge status={application.status} /></h3>
                <p className="text-sm text-muted-foreground">
                  Submitted on <DateFormatter dateString={application.application_date} />
                  {application.review_date && ` • Reviewed on `}
                  {application.review_date && <DateFormatter dateString={application.review_date} />}
                </p>
                
                {application.rejection_reason && application.status === "rejected" && (
                  <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <h4 className="text-sm font-medium text-red-800">Rejection Reason:</h4>
                    <p className="text-sm text-red-700">{application.rejection_reason}</p>
                  </div>
                )}
                
                {application.admin_notes && (
                  <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <h4 className="text-sm font-medium text-gray-800">Admin Notes:</h4>
                    <p className="text-sm text-gray-700">{application.admin_notes}</p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {partner.status === "pending" && renderActionButtons()}
                <Button variant="outline" asChild>
                  <Link to={`/admin/partners/applications/${application.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Full Application
                  </Link>
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Business Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {application.business_details && Object.entries(application.business_details).map(([key, value]) => {
                  if (key === 'address') return null; // Handle address separately
                  if (typeof value === 'object') return null; // Skip nested objects
                  
                  return (
                    <div key={key}>
                      <h4 className="text-sm font-medium text-muted-foreground capitalize">
                        {key.replace(/_/g, ' ')}
                      </h4>
                      <p className="text-base">
                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value || 'Not provided'}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              {application.business_details?.address && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Business Address</h4>
                  <p className="text-base">
                    {application.business_details.address.street}, {application.business_details.address.city}, {application.business_details.address.state} {application.business_details.address.zip}, {application.business_details.address.country}
                  </p>
                </div>
              )}
              
              {application.experience && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Experience</h4>
                  <p className="text-base whitespace-pre-line">{application.experience}</p>
                </div>
              )}
              
              {application.qualifications && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Qualifications</h4>
                  <p className="text-base whitespace-pre-line">{application.qualifications}</p>
                </div>
              )}
              
              {application.portfolio_links && application.portfolio_links.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Portfolio Links</h4>
                  <ul className="list-disc pl-5 mt-1">
                    {application.portfolio_links.map((link, index) => (
                      <li key={index}>
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Application Found</h3>
            <p className="text-muted-foreground">
              This partner does not have an application on file.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PartnerApplicationTab;
