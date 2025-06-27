
import React from "react";
import { Service } from "@/types/service-management"; 
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceListProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export default function ServiceList({ services, onEdit, onDelete, onView }: ServiceListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "draft":
        return "bg-yellow-500";
      case "archived":
        return "bg-gray-500";
      case "inactive":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  // Sanitize and format price display for Pakistan Rupees
  const formatPrice = (price: number | null | undefined): string => {
    if (typeof price !== 'number' || isNaN(price)) return 'Rs. 0.00';
    return `Rs. ${Math.max(0, price).toFixed(2)}`;
  };

  // Format date safely
  const formatDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch (e) {
      return 'Invalid date';
    }
  };

  // Safely render title with XSS protection
  const safeRenderText = (text: string | null | undefined): string => {
    if (!text) return '';
    return text.replace(/[<>]/g, ''); // Simple sanitization
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Services List</h2>
        <Link to="/admin/service-management/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Service
          </Button>
        </Link>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Delivery</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(services) && services.length > 0 ? (
              services.map((service) => {
                // Validate service before rendering
                if (!service || !service.id) return null;
                
                return (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{safeRenderText(service.title)}</span>
                        <span className="text-xs text-gray-500">{service.service_type || 'Project'}</span>
                      </div>
                    </TableCell>
                    <TableCell>{safeRenderText(service.category) || '-'}</TableCell>
                    <TableCell>{formatPrice(service.price)}</TableCell>
                    <TableCell>{service.delivery_time || '3 days'}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(service.status)}>
                        {service.status || 'unknown'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link to={`/admin/service-management/edit/${service.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!service.id}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => typeof onEdit === 'function' && service && onEdit(service)}
                        disabled={!service.id}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => typeof onDelete === 'function' && service.id && onDelete(service.id)}
                        disabled={!service.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  No services found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
