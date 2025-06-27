
import React from "react";
import { Service } from "@/types/service";
import { Card, CardContent } from "@/components/ui/card";
import ServiceList from "./ServiceList";

interface ServiceContentProps {
  isLoading: boolean;
  isError: boolean;
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export default function ServiceContent({
  isLoading,
  isError,
  services,
  onEdit,
  onDelete,
  onView,
}: ServiceContentProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">Loading services...</p>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-red-500">Error loading services</p>
          </div>
        ) : (
          <ServiceList
            services={services || []}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        )}
      </CardContent>
    </Card>
  );
}
