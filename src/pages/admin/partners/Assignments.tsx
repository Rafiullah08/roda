
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServiceAssignmentMetrics, getAllPartners } from "@/services/partners";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ServiceAssignmentTable } from "@/components/admin/partners/assignments/ServiceAssignmentTable";
import { AssignmentConfigPanel } from "@/components/admin/partners/assignments/AssignmentConfigPanel";

const PartnerAssignmentsPage = () => {
  const [selectedAssignmentStrategy, setSelectedAssignmentStrategy] = useState('combined');
  
  // Fetch metrics for showing dashboard stats
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['service-assignment-metrics'],
    queryFn: getServiceAssignmentMetrics
  });

  // Fetch partners for assignment table
  const { data: partners } = useQuery({
    queryKey: ['partners'],
    queryFn: () => getAllPartners() 
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Partner Assignments</CardTitle>
            <CardDescription>
              Manage service assignments to approved partners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Assignment Strategy Configuration */}
              <AssignmentConfigPanel 
                selectedStrategy={selectedAssignmentStrategy} 
                onStrategyChange={setSelectedAssignmentStrategy} 
              />
              
              {/* Service Assignment Analytics */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Assignment Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-700">Total Assignments</h4>
                      <p className="text-2xl font-bold">{metricsLoading ? '...' : metrics?.totalAssignments || 0}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-green-700">Average Completion Time</h4>
                      <p className="text-2xl font-bold">{metricsLoading ? '...' : metrics?.avgCompletionTime || 'N/A'}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-purple-700">Partner Coverage</h4>
                      <p className="text-2xl font-bold">{metricsLoading ? '...' : metrics?.partnerCoverage || '0%'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Service Assignment Table */}
              <ServiceAssignmentTable />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PartnerAssignmentsPage;
