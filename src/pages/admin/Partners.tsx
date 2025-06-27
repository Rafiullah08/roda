
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/layout/AdminLayout";
import { UsersRound, ClipboardList, UserCheck, Inbox } from "lucide-react";

const PartnersPage = () => {
  const navigate = useNavigate();
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Partner Management</h1>
          <p className="text-gray-500">Manage partner applications, screening, and approvals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-all">
            <CardHeader>
              <CardTitle>Partner Leads</CardTitle>
              <CardDescription>Manage prospective partner leads from forms</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/admin/partners/leads")} 
                className="w-full"
                variant="outline"
              >
                <Inbox className="mr-2 h-4 w-4" />
                View Partner Leads
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all">
            <CardHeader>
              <CardTitle>Applications</CardTitle>
              <CardDescription>Review and manage partner applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/admin/partners/applications")} 
                className="w-full"
                variant="outline"
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                View Applications
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardHeader>
              <CardTitle>Partner Directory</CardTitle>
              <CardDescription>Browse and manage all partners</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/admin/partners/directory")} 
                className="w-full"
                variant="outline"
              >
                <UsersRound className="mr-2 h-4 w-4" />
                View Partners
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardHeader>
              <CardTitle>Service Assignments</CardTitle>
              <CardDescription>Manage partner service assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/admin/partners/assignments")} 
                className="w-full"
                variant="outline"
              >
                <UserCheck className="mr-2 h-4 w-4" />
                View Assignments
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PartnersPage;
