
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import MainLayout from "@/components/layout/MainLayout";

export const ServiceDetailSkeleton: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-6">
          <Skeleton className="h-6 w-64" />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-7/12">
            {/* Title skeleton */}
            <div className="pr-0 lg:pr-6">
              <Skeleton className="h-10 w-3/4 mb-6" />
            </div>
            
            {/* Image skeleton */}
            <Skeleton className="h-[160px] w-full rounded-lg" />
            
            {/* Tabs skeleton */}
            <div className="mt-8">
              <div className="flex gap-2 mb-6">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
              
              {/* Content skeleton */}
              <Skeleton className="h-[200px] w-full" />
            </div>
          </div>
          
          <div className="lg:w-5/12">
            {/* Price card skeleton */}
            <div className="sticky top-8">
              {/* Price box skeleton - PKR format */}
              <Skeleton className="h-16 w-full rounded-lg mb-6" />
              
              {/* Rating skeleton */}
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-36 ml-2" />
              </div>
              
              {/* Features skeleton */}
              <Skeleton className="h-[350px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
