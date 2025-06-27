
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Partner } from "@/types/partner";
import StatusBadge from "../StatusBadge";
import PartnerStatusManager from "../PartnerStatusManager";
import { Badge } from "@/components/ui/badge";

interface PartnerHeaderProps {
  partner: Partner;
  onStatusChange: () => void;
}

const PartnerHeader = ({ partner, onStatusChange }: PartnerHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/admin/partners/directory">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Partners
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold">{partner.business_name}</h1>
                <Badge className={partner.partner_type === 'agency' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}>
                  {partner.partner_type === 'agency' ? 'Agency Partner' : 'Personal Partner'}
                </Badge>
              </div>
              <p className="text-gray-500">
                {partner.contact_name} • {partner.contact_email}{partner.contact_phone ? ` • ${partner.contact_phone}` : ''}
                {partner.website && (
                  <>
                    {" • "}
                    <a 
                      href={partner.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline"
                    >
                      Website
                    </a>
                  </>
                )}
              </p>
              {partner.partner_type === 'agency' && partner.employee_count && (
                <p className="text-sm text-gray-500 mt-1">
                  {partner.employee_count} {partner.employee_count === 1 ? 'Employee' : 'Employees'}
                </p>
              )}
            </div>
            
            <div className="flex flex-col items-end">
              <PartnerStatusManager partner={partner} onStatusChange={onStatusChange} />
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-500">Commission Rate:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {partner.partner_type === 'agency' ? '70%' : '50%'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PartnerHeader;
