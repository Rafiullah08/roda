
import React from 'react';
import { Service } from "@/types/service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Eye, PlusCircle } from 'lucide-react';

interface ServiceListProps {
  freeServices: Service[] | undefined;
  isLoading: boolean;
  partnerServices: string[];
  addingService: string | null;
  categoryMap: Record<string, string>;
  handleViewService: (serviceId: string) => void;
  handleAddToPortfolio: (serviceId: string) => void;
  isUUID: (str: string) => boolean;
}

const ServiceList: React.FC<ServiceListProps> = ({
  freeServices,
  isLoading,
  partnerServices,
  addingService,
  categoryMap,
  handleViewService,
  handleAddToPortfolio,
  isUUID
}) => {
  // Get displayed category name (resolve UUID if needed)
  const getDisplayCategory = (service: Service) => {
    if (!service.category) return "Uncategorized";
    
    // If category is a UUID and we have it in our map, show the name
    if (isUUID(service.category) && categoryMap[service.category]) {
      return categoryMap[service.category];
    }
    
    // If it's not a UUID or not in our map, return the category value or subcategory
    return service.category || service.subcategory || "Uncategorized";
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <p>Loading services...</p>
      </div>
    );
  }

  if (!freeServices || freeServices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No free services available</h3>
        <p className="text-muted-foreground mt-2">
          There are currently no free services available to add to your portfolio.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {freeServices.map((service) => (
          <TableRow key={service.id}>
            <TableCell className="font-medium">{service.title}</TableCell>
            <TableCell>{getDisplayCategory(service)}</TableCell>
            <TableCell className="max-w-xs">
              <div className="line-clamp-2 text-sm text-muted-foreground">
                {service.description || "No description available."}
              </div>
            </TableCell>
            <TableCell className="text-center">
              {partnerServices.includes(service.id) ? (
                <Badge className="bg-green-500">Added</Badge>
              ) : (
                <Badge className="bg-blue-500">Free</Badge>
              )}
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleViewService(service.id)}
              >
                <Eye className="h-4 w-4 mr-1" /> View
              </Button>
              
              {!partnerServices.includes(service.id) && (
                <Button 
                  size="sm"
                  onClick={() => handleAddToPortfolio(service.id)}
                  disabled={addingService === service.id}
                >
                  {addingService === service.id ? (
                    <>Loading...</>
                  ) : (
                    <>
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add
                    </>
                  )}
                </Button>
              )}
              
              {partnerServices.includes(service.id) && (
                <Button variant="ghost" size="sm" disabled>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Added
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ServiceList;
