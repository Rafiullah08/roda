
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Service } from "@/types/service";
import { Eye, Trash2, ToggleLeft, ToggleRight, Star, Edit } from "lucide-react";

interface ServiceTableProps {
  services: Service[];
  onDeleteClick: (service: Service) => void;
  onToggleStatus: (service: Service) => void;
  onViewService: (serviceId: string) => void;
  onToggleFeatured: (service: Service) => void;
  onEditService: (serviceId: string) => void;
}

const ServiceTable = ({ 
  services, 
  onDeleteClick, 
  onToggleStatus, 
  onViewService,
  onToggleFeatured,
  onEditService
}: ServiceTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Inactive</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Draft</Badge>;
      case 'archived':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Archived</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{status}</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "Free";
    return `Rs. ${Math.round(price).toLocaleString()}`;
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                No services found
              </TableCell>
            </TableRow>
          ) : (
            services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell>{service.category || "Uncategorized"}</TableCell>
                <TableCell>{formatPrice(service.price)}</TableCell>
                <TableCell>{service.service_type || "Project"}</TableCell>
                <TableCell>{getStatusBadge(service.status as string)}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleFeatured(service)}
                    className={service.featured ? "text-yellow-500" : "text-gray-400"}
                  >
                    <Star className={`h-5 w-5 ${service.featured ? "fill-yellow-500" : ""}`} />
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onViewService(service.id)}
                      title="View Service"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEditService(service.id)}
                      title="Edit Service"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onToggleStatus(service)}
                      title={service.status === 'active' ? "Deactivate Service" : "Activate Service"}
                    >
                      {service.status === 'active' ? (
                        <ToggleRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ToggleLeft className="h-4 w-4 text-red-600" />
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onDeleteClick(service)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Service"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServiceTable;
