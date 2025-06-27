
import React from 'react';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";

interface ServiceBreadcrumbProps {
  category: string | null;
  subcategory: string | null;
}

export const ServiceBreadcrumb: React.FC<ServiceBreadcrumbProps> = ({ category, subcategory }) => {
  return (
    <div className="bg-gray-50 py-3 border-b">
      <div className="container mx-auto px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/services">Services</BreadcrumbLink>
            </BreadcrumbItem>
            {category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/services?category=${encodeURIComponent(category)}`}>
                    {category}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            {subcategory && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{subcategory}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};
