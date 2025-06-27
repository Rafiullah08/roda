
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import PartnerDashboardLayout from '@/components/layout/PartnerDashboardLayout';
import { usePartnerDashboard } from '@/contexts/PartnerDashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MyServicesPage = () => {
  const { partner } = usePartnerDashboard();

  // Fetch services that this partner has in their portfolio
  const { data: myServices, isLoading } = useQuery({
    queryKey: ['my-services', partner?.id],
    queryFn: async () => {
      if (!partner) return [];
      
      const { data, error } = await supabase
        .from("service_partner_assignments")
        .select(`
          id,
          service_id,
          status,
          created_at,
          services (
            id,
            title,
            description,
            price,
            category,
            status,
            is_free
          )
        `)
        .eq("partner_id", partner.id);
        
      if (error) {
        console.error("Error fetching partner services:", error);
        throw error;
      }
      
      return data;
    },
    enabled: !!partner,
  });

  return (
    <PartnerDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Services</h1>
            <p className="text-muted-foreground">
              Services in your portfolio that you can provide to customers
            </p>
          </div>
          <Button asChild>
            <Link to="/partner-dashboard/free-services">Browse Free Services</Link>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>My Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <p>Loading services...</p>
              </div>
            ) : myServices && myServices.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myServices.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.services?.title || "Unknown Service"}
                      </TableCell>
                      <TableCell>
                        {item.services?.category || "Uncategorized"}
                      </TableCell>
                      <TableCell>
                        {item.services?.is_free ? (
                          <Badge className="bg-blue-500">Free</Badge>
                        ) : (
                          `Rs ${item.services?.price.toLocaleString() || 0}`
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={item.status === 'available' ? 'bg-green-500' : 'bg-yellow-500'}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/services/${item.services?.id || ""}`}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No services in your portfolio</h3>
                <p className="text-muted-foreground mt-2 mb-6">
                  You haven't added any services to your portfolio yet.
                </p>
                <Button asChild>
                  <Link to="/partner-dashboard/free-services">Browse Free Services</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PartnerDashboardLayout>
  );
};

export default MyServicesPage;
