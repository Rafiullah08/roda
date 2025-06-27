
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import StatusBadge from "../StatusBadge";
import DateFormatter from "../DateFormatter";
import { ArrowLeft } from "lucide-react";
import { PartnerApplication, Partner } from "@/types/partner";

interface ApplicationHeaderProps {
  application: PartnerApplication;
  partner: Partner;
  renderActionButtons: () => React.ReactNode;
}

const ApplicationHeader = ({ application, partner, renderActionButtons }: ApplicationHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/admin/partners/applications">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Applications
          </Link>
        </Button>
        
        <div className="flex items-center space-x-2">
          {renderActionButtons()}
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>{partner.business_name}</CardTitle>
              <CardDescription>
                {partner.contact_name} • {partner.contact_email}
              </CardDescription>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <StatusBadge status={application.status} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Submitted on <DateFormatter dateString={application.application_date} />
                {application.review_date && ` • Reviewed on `}
                {application.review_date && <DateFormatter dateString={application.review_date} />}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default ApplicationHeader;
