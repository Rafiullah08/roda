
import React from 'react';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Service } from '@/types/service';

interface ServiceDetailCardProps {
  service: Service | null;
}

const ServiceDetailCard = ({ service }: ServiceDetailCardProps) => {
  if (!service) return null;
  
  // Format price display
  const formatPrice = (price: number | undefined, isFree?: boolean): string => {
    if (isFree) return "Free";
    if (!price && price !== 0) return "Price on request";
    return `Rs. ${Math.round(price).toLocaleString()}`;
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Service Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {service.image_url && (
          <div className="overflow-hidden rounded-md border mb-4">
            <img 
              src={service.image_url} 
              alt={service.title} 
              className="w-full h-48 object-cover"
            />
          </div>
        )}
        
        <div>
          <h3 className="text-xl font-semibold">{service.title}</h3>
          {!service.is_free && (
            <p className="mt-2 text-lg font-medium text-blue-700">{formatPrice(service.price, service.is_free)}</p>
          )}
          {service.is_free && (
            <Badge className="mt-2 bg-blue-500">Free Service</Badge>
          )}
        </div>
        
        <div className="text-muted-foreground">
          {service.description && (
            <div className="mb-4 line-clamp-4">{service.description}</div>
          )}
          
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="h-4 w-4" />
            <span>Delivery: {service.delivery_time || "Standard"}</span>
          </div>
          
          {Array.isArray(service.features) && service.features.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">What's included:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceDetailCard;
