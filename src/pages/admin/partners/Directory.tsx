import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPartners } from "@/services/partners/partnerProfileService";
import { Partner } from "@/types/partner";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, UserCheck, UserX, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const PartnerDirectoryPage = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadPartners();
  }, []);
  
  const loadPartners = async () => {
    setLoading(true);
    try {
      const { partners: partnersList } = await getAllPartners();
      setPartners(partnersList);
    } catch (error) {
      console.error("Error fetching partners:", error);
      toast({
        title: "Error loading partners",
        description: "Could not load partner directory. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      case "suspended":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle>Partner Directory</CardTitle>
          <CardDescription>
            Manage service provider partners in your network
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading partners...</p>
            </div>
          ) : partners.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No partners found</h3>
              <p className="text-gray-500">
                There are currently no partners in the system.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <Card key={partner.id} className="overflow-hidden">
                  <div className={`h-2 w-full ${
                    partner.status === "approved" ? "bg-green-500" :
                    partner.status === "pending" ? "bg-blue-500" :
                    partner.status === "suspended" ? "bg-amber-500" :
                    "bg-red-500"
                  }`} />
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{partner.business_name}</h3>
                        <p className="text-sm text-gray-500">{partner.contact_name}</p>
                      </div>
                      {getStatusBadge(partner.status)}
                    </div>
                    
                    <div className="space-y-2 mb-4 text-sm">
                      <p><span className="font-medium">Email:</span> {partner.contact_email}</p>
                      {partner.contact_phone && (
                        <p><span className="font-medium">Phone:</span> {partner.contact_phone}</p>
                      )}
                      {partner.website && (
                        <p><span className="font-medium">Website:</span> {partner.website}</p>
                      )}
                      <p><span className="font-medium">Joined:</span> {partner.created_at ? format(new Date(partner.created_at), "MMM d, yyyy") : "N/A"}</p>
                    </div>
                    
                    {partner.bio && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{partner.bio}</p>
                    )}
                    
                    <div className="flex gap-2 justify-end">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        asChild
                      >
                        <Link to={`/admin/partners/directory/${partner.id}`}>
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default PartnerDirectoryPage;
