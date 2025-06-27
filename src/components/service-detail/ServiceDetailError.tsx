
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import { AlertOctagon } from "lucide-react";

interface ServiceDetailErrorProps {
  error: string | null;
}

export const ServiceDetailError: React.FC<ServiceDetailErrorProps> = ({ error }) => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <AlertOctagon className="h-16 w-16 text-red-500" />
          <h1 className="text-2xl font-bold">Service not found</h1>
          <p className="text-gray-600 mt-2 max-w-md mx-auto">{error || "The requested service could not be loaded. Please try again or check back later."}</p>
          <Link to="/services">
            <Button className="mt-6">Back to Services</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};
