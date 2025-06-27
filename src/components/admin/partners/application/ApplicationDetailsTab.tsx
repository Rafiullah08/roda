
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PartnerApplication } from "@/types/partner";

interface ApplicationDetailsTabProps {
  application: PartnerApplication;
}

const ApplicationDetailsTab = ({ application }: ApplicationDetailsTabProps) => {
  return (
    <div className="space-y-6">
      {/* Business Details */}
      {application.business_details && (
        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(application.business_details).map(([key, value]) => {
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
              <div className="mt-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Business Address</h4>
                <div className="p-4 bg-gray-50 rounded-md">
                  <p>{application.business_details.address.street}</p>
                  <p>
                    {application.business_details.address.city}, {application.business_details.address.state} {application.business_details.address.zip}
                  </p>
                  <p>{application.business_details.address.country}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Experience & Qualifications */}
      <Card>
        <CardHeader>
          <CardTitle>Experience & Qualifications</CardTitle>
        </CardHeader>
        <CardContent>
          {application.experience && (
            <div className="mb-6">
              <h3 className="text-base font-medium mb-2">Experience</h3>
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="whitespace-pre-line">{application.experience}</p>
              </div>
            </div>
          )}
          
          {application.qualifications && (
            <div>
              <h3 className="text-base font-medium mb-2">Qualifications</h3>
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="whitespace-pre-line">{application.qualifications}</p>
              </div>
            </div>
          )}
          
          {(!application.experience && !application.qualifications) && (
            <p className="text-muted-foreground text-center py-4">
              No experience or qualifications information provided.
            </p>
          )}
        </CardContent>
      </Card>
      
      {/* Portfolio */}
      {application.portfolio_links && application.portfolio_links.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {application.portfolio_links.map((link, index) => (
                <li key={index} className="flex items-center">
                  <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline break-all"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApplicationDetailsTab;
