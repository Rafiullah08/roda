
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit, Search } from "lucide-react";
import { getServiceAssignmentSummary } from "@/services/partners";
import { PartnerSelectorDialog } from "./PartnerSelectorDialog";

export const ServiceAssignmentTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  
  const { data: serviceAssignments = [], isLoading } = useQuery({
    queryKey: ['service-assignments'],
    queryFn: getServiceAssignmentSummary
  });

  const filteredAssignments = serviceAssignments.filter((item: any) =>
    item.service_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignPartners = (service: any) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Service Assignments</h3>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search services..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Partners</TableHead>
              <TableHead>Assignment Strategy</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">Loading assignment data...</TableCell>
              </TableRow>
            ) : filteredAssignments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  {searchTerm ? "No services match your search" : "No service assignments found"}
                </TableCell>
              </TableRow>
            ) : (
              filteredAssignments.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.service_title}</TableCell>
                  <TableCell>{item.category || 'Uncategorized'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline">{item.partner_count || 0}</Badge>
                      <span className="text-sm text-gray-500">partners</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      item.assignment_strategy === 'combined' ? 'default' :
                      item.assignment_strategy === 'rating-based' ? 'secondary' : 'outline'
                    }>
                      {item.assignment_strategy === 'combined' ? 'Combined' : 
                       item.assignment_strategy === 'rating-based' ? 'Rating Based' : 'Round Robin'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAssignPartners(item)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Partner selection dialog */}
      <PartnerSelectorDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        service={selectedService}
      />
    </div>
  );
};
