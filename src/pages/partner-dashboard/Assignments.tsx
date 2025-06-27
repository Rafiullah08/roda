
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import PartnerDashboardLayout from '@/components/layout/PartnerDashboardLayout';
import { usePartnerDashboard } from '@/contexts/PartnerDashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Calendar, Clock, RefreshCcw, User } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface OrderData {
  id: string;
  customer_name: string;
  customer_email?: string;
  status: string;
  created_at: string;
}

interface AssignmentData {
  id: string;
  status: string;
  assigned_date: string | null;
  completion_date: string | null;
  service_id: string;
  services: {
    id: string;
    title: string;
    description: string | null;
    price: number;
    category: string | null;
    is_free: boolean;
  } | null;
  orders: OrderData[] | null;
}

const AssignmentsPage = () => {
  const { partner } = usePartnerDashboard();

  // Fetch service assignments for this partner
  const { 
    data: assignments, 
    isLoading, 
    refetch 
  } = useQuery({
    queryKey: ['service-assignments', partner?.id],
    queryFn: async () => {
      if (!partner) return [];
      
      try {
        console.log(`Fetching assignments for partner ID: ${partner.id}`);
        
        const { data, error } = await supabase
          .from("service_partner_assignments")
          .select(`
            id,
            status,
            assigned_date,
            completion_date,
            service_id,
            services (
              id,
              title,
              description,
              price,
              category,
              is_free
            ),
            orders:orders (
              id,
              customer_name,
              customer_email,
              status,
              created_at
            )
          `)
          .eq("partner_id", partner.id)
          .eq("status", "assigned");
          
        if (error) {
          console.error("Error fetching partner assignments:", error);
          throw error;
        }
        
        // Convert data to match our interface - handle null orders properly
        const assignmentData: AssignmentData[] = data.map((item: any) => ({
          ...item,
          orders: Array.isArray(item.orders) ? item.orders : null
        }));
        
        console.log(`Found ${assignmentData.length} assignments`);
        return assignmentData;
      } catch (error) {
        console.error("Error in fetchAssignments:", error);
        toast({
          title: "Error",
          description: "Failed to load assignments. Please try again.",
          variant: "destructive"
        });
        return [];
      }
    },
    enabled: !!partner,
  });

  useEffect(() => {
    // Refresh assignments data when component mounts
    if (partner) {
      refetch();
    }
  }, [partner]);

  const handleRefresh = () => {
    refetch();
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), 'PPP');
  };

  // Helper function to safely access customer name
  const getCustomerName = (orders: OrderData[] | null) => {
    if (!orders || orders.length === 0) {
      return "Not assigned to order";
    }
    return orders[0]?.customer_name || "Unknown customer";
  };

  const handleCompleteAssignment = async (assignmentId: string) => {
    try {
      // Update the assignment status to completed
      const { error } = await supabase
        .from("service_partner_assignments")
        .update({
          status: "completed",
          completion_date: new Date().toISOString()
        })
        .eq("id", assignmentId);
        
      if (error) {
        throw error;
      }
      
      // Show success message
      toast({
        title: "Assignment Completed",
        description: "The assignment has been marked as completed.",
      });
      
      // Refresh assignments list
      refetch();
    } catch (error) {
      console.error("Error completing assignment:", error);
      toast({
        title: "Error",
        description: "Failed to complete assignment. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <PartnerDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
            <p className="text-muted-foreground">
              View and manage your current service assignments
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="flex items-center gap-1"
          >
            <RefreshCcw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Current Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <p>Loading assignments...</p>
              </div>
            ) : assignments && assignments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Assigned Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.services?.title || "Unknown Service"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          {getCustomerName(item.orders)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {formatDate(item.assigned_date)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500">
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCompleteAssignment(item.id)}
                        >
                          Mark as Completed
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No assignments found</h3>
                <p className="text-muted-foreground mt-2">
                  You don't have any current service assignments.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Completed Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No completed assignments yet</h3>
              <p className="text-muted-foreground mt-2">
                Your completed assignments will appear here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PartnerDashboardLayout>
  );
};

export default AssignmentsPage;
