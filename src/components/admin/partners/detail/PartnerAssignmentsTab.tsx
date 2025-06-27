
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Clock } from "lucide-react";
import { Partner, ServicePartnerAssignment, PartnerAssignmentsTabProps } from "@/types/partner";
import { getPartnerAssignments } from "@/services/partners";
import DateFormatter from "../DateFormatter";

const PartnerAssignmentsTab = ({ partner }: PartnerAssignmentsTabProps) => {
  const [assignments, setAssignments] = useState<ServicePartnerAssignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const assignmentsData = await getPartnerAssignments(partner.id);
        setAssignments(assignmentsData || []);
      } catch (error) {
        console.error("Error fetching partner assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [partner.id]);

  if (loading) {
    return <div className="text-center py-4">Loading assignments data...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Assignments</CardTitle>
        <CardDescription>Services assigned to this partner</CardDescription>
      </CardHeader>
      <CardContent>
        {assignments.length > 0 ? (
          <div className="space-y-4">
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Date</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{assignment.service_title || "Unknown Service"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                        <Badge variant={assignment.status === 'completed' ? 'default' : 'outline'} className={
                          assignment.status === 'assigned' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          assignment.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' :
                          'bg-blue-50 text-blue-700 border-blue-200'
                        }>
                          {assignment.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <DateFormatter dateString={assignment.assigned_date} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{assignment.commission_rate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Service Assignments</h3>
            <p className="text-muted-foreground">
              This partner has not been assigned to any services yet.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Manage Assignments
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PartnerAssignmentsTab;
