
import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Download, Eye, Filter } from "lucide-react";

const EmailLogsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Mock data for email logs
  const emailLogs = [
    {
      id: "1",
      recipient: "john.doe@example.com",
      subject: "Welcome to Our Platform",
      template: "Welcome Email",
      status: "delivered",
      sentAt: "2025-05-13T10:30:00Z"
    },
    {
      id: "2",
      recipient: "jane.smith@example.com",
      subject: "Your Account Has Been Created",
      template: "Account Creation",
      status: "delivered",
      sentAt: "2025-05-12T14:45:00Z"
    },
    {
      id: "3",
      recipient: "robert.johnson@example.com",
      subject: "Password Reset Request",
      template: "Password Reset",
      status: "failed",
      sentAt: "2025-05-11T09:15:00Z"
    },
    {
      id: "4",
      recipient: "sarah.williams@example.com",
      subject: "Your Order #12345 Has Been Confirmed",
      template: "Order Confirmation",
      status: "delivered",
      sentAt: "2025-05-10T16:20:00Z"
    },
    {
      id: "5",
      recipient: "michael.brown@example.com",
      subject: "Your Partner Application Has Been Approved",
      template: "Partner Approval",
      status: "bounced",
      sentAt: "2025-05-09T13:10:00Z"
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "bounced":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredLogs = emailLogs.filter(log => {
    const matchesSearch = 
      log.recipient.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.template.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Email Logs</h1>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">538</div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.7%</div>
              <p className="text-xs text-muted-foreground mt-1">+0.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Failed Emails</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground mt-1">-3 from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Email History</CardTitle>
            <CardDescription>
              A log of all emails sent from your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by recipient or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex w-full sm:w-auto space-x-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="bounced">Bounced</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date Range
                </Button>
              </div>
            </div>

            <div className="rounded-md border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-start p-3 font-medium text-gray-500">Recipient</th>
                    <th className="text-start p-3 font-medium text-gray-500 hidden md:table-cell">Subject</th>
                    <th className="text-start p-3 font-medium text-gray-500 hidden lg:table-cell">Template</th>
                    <th className="text-start p-3 font-medium text-gray-500">Status</th>
                    <th className="text-start p-3 font-medium text-gray-500 hidden md:table-cell">Sent At</th>
                    <th className="text-end p-3 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="border-t">
                        <td className="p-3 truncate max-w-[150px]">{log.recipient}</td>
                        <td className="p-3 hidden md:table-cell truncate max-w-[200px]">{log.subject}</td>
                        <td className="p-3 hidden lg:table-cell">{log.template}</td>
                        <td className="p-3">
                          <span className={`inline-block rounded-full px-2 py-1 text-xs ${getStatusBadgeColor(log.status)}`}>
                            {log.status}
                          </span>
                        </td>
                        <td className="p-3 hidden md:table-cell">{formatDate(log.sentAt)}</td>
                        <td className="p-3 text-end">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-3 text-center text-sm text-gray-500">
                        No email logs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EmailLogsPage;
