
import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { ServiceBreadcrumb } from "@/components/service-detail/ServiceBreadcrumb";
import { ServiceContentTabs } from "@/components/service-detail/ServiceContentTabs";
import { ServicePriceCard } from "@/components/service-detail/ServicePriceCard";
import { RelatedServices } from "@/components/service-detail/RelatedServices";
import { ServiceDetailSkeleton } from "@/components/service-detail/ServiceDetailSkeleton";
import { ServiceDetailError } from "@/components/service-detail/ServiceDetailError";
import { useServiceDetail } from "@/hooks/service/serviceDetail";
import { usePartnerDashboard } from "@/contexts/PartnerDashboardContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { useBookmarks } from "@/hooks/useBookmarks";
import { assignPartnerToService } from "@/services/partners";
import { supabase } from "@/integrations/supabase/client";
import { getGradient, getAbstractBackground } from "@/utils/colorGradients";
import { Bookmark, BookmarkPlus, Share2, Heart } from 'lucide-react';

const ServiceDetail = () => {
  const { id } = useParams();
  const { mode, partner } = usePartnerDashboard();
  const { user } = useAuth();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  
  const { 
    service, 
    relatedServices, 
    loading, 
    error, 
    activeTab,
    partnerAvailabilityStatus,
    setActiveTab,
    handleBuyNow,
    handleRequestQuote
  } = useServiceDetail(id);

  // Handle adding service to partner profile
  const handleAddService = async () => {
    // Check if partner exists before adding service
    if (!partner) {
      toast({
        title: "Action not allowed",
        description: "You need to create a partner profile first",
        variant: "destructive",
      });
      return;
    }
    
    // Special handling for free services - allow partners with pending status to add them
    const isFree = service?.is_free || false;
    
    // For free services, only restrict partners with rejected or suspended status
    if (isFree) {
      if (partner.status === 'rejected' || partner.status === 'suspended') {
        toast({
          title: "Cannot add service",
          description: `You cannot add services while your partner account is in ${partner.status} status`,
          variant: "destructive",
        });
        return;
      }
    } 
    // For paid services, maintain the original restrictions
    else if (partner.status === 'pending' || partner.status === 'screening' || partner.status === 'rejected' || partner.status === 'suspended') {
      toast({
        title: "Cannot add paid service",
        description: `You cannot add paid services while your partner account is in ${partner.status} status. Only free services can be added with pending status.`,
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Direct insertion into service_partner_assignments table using Supabase
      if (id && partner.id) {
        const { data, error } = await supabase
          .from('service_partner_assignments')
          .insert({
            partner_id: partner.id,
            service_id: id,
            status: 'available',
            commission_type: partner.partner_type
          })
          .select();
          
        if (error) {
          console.error("Error adding service to partner profile:", error);
          throw error;
        }
        
        toast({
          title: "Service added",
          description: isFree 
            ? "This free service has been added to your partner profile" 
            : "This service has been added to your partner profile",
        });
      }
    } catch (error) {
      console.error("Error adding service to partner profile:", error);
      toast({
        title: "Error adding service",
        description: "There was a problem adding this service to your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle toggle bookmark/favorite
  const handleToggleBookmark = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save this service.",
        variant: "destructive"
      });
      return;
    }
    
    if (service) {
      toggleBookmark(service.id, service.title);
    }
  };

  // Handle share functionality
  const handleShare = async () => {
    if (!service) return;
    
    const shareData = {
      title: service.title,
      text: service.description ? service.description.substring(0, 100) + '...' : 'Check out this service',
      url: window.location.href
    };

    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully",
          description: "Service has been shared",
        });
      } else {
        // Fallback to copying URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied",
          description: "Service link has been copied to clipboard",
        });
      }
    } catch (error) {
      // If sharing is cancelled or fails, try clipboard fallback
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied",
          description: "Service link has been copied to clipboard",
        });
      } catch (clipboardError) {
        toast({
          title: "Share failed",
          description: "Unable to share or copy link",
          variant: "destructive",
        });
      }
    }
  };

  // Show skeleton while loading
  if (loading) {
    return <ServiceDetailSkeleton />;
  }

  // Show error if service couldn't be loaded
  if (error || !service) {
    return <ServiceDetailError error={error} />;
  }

  const isPartnerMode = mode === 'partner';
  const isServiceBookmarked = id ? isBookmarked(id) : false;
  const gradient = getGradient(service.category, service.subcategory);
  const abstractBackground = getAbstractBackground(service.subcategory, service.category);

  return (
    <MainLayout>
      {/* Breadcrumbs */}
      <ServiceBreadcrumb 
        category={service.category} 
        subcategory={service.subcategory}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Service header with gradient background, and content */}
          <div className="lg:w-7/12">
            {/* Service header with gradient background and abstract background elements */}
            <div className={`rounded-lg bg-gradient-to-br ${gradient} p-6 mb-8 relative overflow-hidden ${abstractBackground}`}>
              {/* Title with proper container width and no overflow */}
              <h1 className="text-3xl font-bold mb-6 break-words text-white relative z-10">{service.title}</h1>
              
              {/* Service image if available */}
              {service.image_url && (
                <div className="overflow-hidden rounded-lg h-40 w-full relative z-10">
                  <img 
                    src={service.image_url} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&h=500";
                    }}
                  />
                </div>
              )}
              
              {/* Action buttons overlay */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button 
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  onClick={handleToggleBookmark}
                  aria-label={isServiceBookmarked ? 
                    (isPartnerMode ? "Remove from bookmarks" : "Remove from favorites") : 
                    (isPartnerMode ? "Add to bookmarks" : "Add to favorites")}
                >
                  {isPartnerMode ? (
                    isServiceBookmarked ? (
                      <Bookmark className="h-5 w-5 text-blue-600 fill-blue-600" />
                    ) : (
                      <BookmarkPlus className="h-5 w-5 text-gray-700" />
                    )
                  ) : (
                    // For buyers, show heart icon
                    <Heart className={`h-5 w-5 ${isServiceBookmarked ? "text-red-600 fill-red-600" : "text-gray-700"}`} />
                  )}
                </button>
                <button 
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  onClick={handleShare}
                  aria-label="Share service"
                >
                  <Share2 className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
            
            {/* Service content tabs */}
            <ServiceContentTabs
              description={service.description}
              serviceType={service.service_type}
              faqs={service.faqs || []}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          
          {/* Right column - Service Info and Pricing */}
          <div className="lg:w-5/12 mt-8 lg:mt-0">
            {/* Price card with rating moved to top */}
            <ServicePriceCard
              price={service.price}
              deliveryTime={service.delivery_time}
              features={Array.isArray(service.features) ? service.features : []}
              rating={service.rating || 0}
              reviewsCount={service.reviews_count || 0}
              onBuyNow={handleBuyNow}
              onRequestQuote={handleRequestQuote}
              onAddService={handleAddService}
              isPartnerMode={isPartnerMode}
              partnerAvailabilityStatus={partnerAvailabilityStatus}
              isFree={service.is_free}
              serviceLocation={service.service_location}
            />
          </div>
        </div>
        
        {/* Related services */}
        <RelatedServices services={relatedServices} />
      </div>
    </MainLayout>
  );
};

export default ServiceDetail;
