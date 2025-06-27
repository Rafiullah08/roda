
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";
import { PartnerAvailabilityStatus, ServiceDataResult } from './types';

export function useServiceData(id: string | undefined): ServiceDataResult {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [partnerAvailabilityStatus, setPartnerAvailabilityStatus] = useState<PartnerAvailabilityStatus>('available');

  // Fetch service details
  useEffect(() => {
    const fetchServiceDetails = async () => {
      setLoading(true);
      try {
        if (!id) return;

        // First, fetch the service
        const { data: serviceData, error: serviceError } = await supabase
          .from("services")
          .select("*")
          .eq("id", id)
          .single();

        if (serviceError) {
          console.error("Error fetching service:", serviceError);
          setError(serviceError.message);
          setLoading(false);
          return;
        }

        // Then, fetch the category name if a category ID is available
        let categoryName = serviceData.category;
        if (serviceData.category && typeof serviceData.category === 'string' && serviceData.category.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          const { data: categoryData } = await supabase
            .from("service_categories")
            .select("name")
            .eq("id", serviceData.category)
            .single();
            
          if (categoryData) {
            categoryName = categoryData.name;
          }
        }

        // Get subcategory value directly from the service data
        const subcategoryName = serviceData.subcategory || null;

        // Process features and FAQs
        const features = Array.isArray(serviceData.features) ? serviceData.features : [];
        
        let faqs: Array<{question: string; answer: string}> = [];
        if (Array.isArray(serviceData.faqs)) {
          faqs = serviceData.faqs.map(faq => {
            let question = "";
            let answer = "";
            
            if (typeof faq === 'object' && faq !== null) {
              question = (faq as any).question || "";
              answer = (faq as any).answer || "";
            }
            
            return { question, answer };
          });
        }
        
        // Process the service data
        const processedService = {
          ...serviceData,
          category: categoryName,
          subcategory: subcategoryName,
          features,
          faqs,
          // Set default values if not available
          rating: serviceData.rating || 4.8,
          reviews_count: serviceData.reviews_count || 12
        } as Service;
        
        setService(processedService);
        
        // Check partner availability status for the service
        const { data: partnerAssignments, error: partnerError } = await supabase
          .from("service_partner_assignments")
          .select("status, partner_id")
          .eq("service_id", id);

        if (!partnerError && partnerAssignments) {
          if (partnerAssignments.length === 0) {
            // For free services with no partners, we'll show a "Get Quote" button
            // For paid services with no partners, we'll show the same
            setPartnerAvailabilityStatus('none');
          } else {
            // Check if any partners are available
            const availablePartners = partnerAssignments.filter(
              assignment => assignment.status === 'available'
            );
            
            if (availablePartners.length > 0) {
              setPartnerAvailabilityStatus('available');
            } else {
              setPartnerAvailabilityStatus('busy');
            }
          }
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  return {
    service,
    loading,
    error,
    partnerAvailabilityStatus
  };
}
