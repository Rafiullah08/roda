
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ConvertLeadDialog } from "@/components/admin/partners/leads/ConvertLeadDialog";
import { getPartnerLeads, type PartnerLead } from "@/services/partners/partnerLeadService";
import { formatDistanceToNow } from "date-fns";
import { UserCheck, Mail, Clock, Users } from "lucide-react";

const PartnerLeadsPage = () => {
  const [leads, setLeads] = useState<PartnerLead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [convertDialogOpen, setConvertDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<PartnerLead | null>(null);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const { leads } = await getPartnerLeads();
      setLeads(leads);
    } catch (error) {
      console.error("Error fetching partner leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConvertLead = (lead: PartnerLead) => {
    setSelectedLead(lead);
    setConvertDialogOpen(true);
  };

  const handleConversionSuccess = () => {
    loadLeads(); // Reload leads to show updated status
  };

  const getStatusBadge = (lead: PartnerLead) => {
    if (lead.converted_to_application) {
      return <Badge className="bg-green-100 text-green-800">Invited</Badge>;
    }

    const colors: Record<string, string> = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    };

    return (
      <Badge className={colors[lead.status] || "bg-gray-100 text-gray-800"}>
        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
      </Badge>
    );
  };

  const canConvertLead = (lead: PartnerLead) => {
    return !lead.converted_to_application && lead.status !== 'rejected';
  };

  // Calculate stats
  const totalLeads = leads.length;
  const newLeads = leads.filter(lead => lead.status === 'new').length;
  const convertedLeads = leads.filter(lead => lead.converted_to_application).length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Partner Leads</h1>
          <p className="text-gray-500">Manage prospective partner applications and convert qualified leads</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold">{totalLeads}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">New Leads</p>
                  <p className="text-2xl font-bold">{newLeads}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Invited</p>
                  <p className="text-2xl font-bold">{convertedLeads}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold">{conversionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Partner Leads</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center">Loading partner leads...</div>
            ) : leads.length === 0 ? (
              <div className="p-8 text-center">No partner leads found</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.full_name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.skills}</TableCell>
                      <TableCell>{getStatusBadge(lead)}</TableCell>
                      <TableCell>
                        {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        {canConvertLead(lead) ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleConvertLead(lead)}
                            className="flex items-center gap-1"
                          >
                            <UserCheck className="h-4 w-4" />
                            Convert
                          </Button>
                        ) : lead.converted_to_application ? (
                          <span className="text-sm text-green-600 font-medium">
                            ✓ Invited
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <ConvertLeadDialog
          isOpen={convertDialogOpen}
          onClose={() => setConvertDialogOpen(false)}
          lead={selectedLead}
          onSuccess={handleConversionSuccess}
        />
      </div>
    </AdminLayout>
  );
};

export default PartnerLeadsPage;
