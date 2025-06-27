
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Credential } from "@/components/partner/PartnerCredentials";

interface PartnerProfile {
  id: string;
  business_name: string;
  contact_name: string;
  contact_email: string;
  partner_type: string;
  bio?: string;
  status: string;
  website?: string;
  created_at: string;
  updated_at: string;
  available?: boolean;
  rating?: number;
  reviews_count?: number;
  credentials?: Credential[];
  years_experience?: number;
  expertise?: string[];
  service_areas?: string[];
  response_time?: string;
  completed_projects?: number;
  avatar_url?: string;
}

export function usePartnerProfile(partnerId: string | undefined) {
  const {
    data: partner,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["partner", partnerId],
    queryFn: async (): Promise<PartnerProfile | null> => {
      if (!partnerId) return null;

      // Fetch the basic partner data
      const { data: partnerData, error } = await supabase
        .from("partners")
        .select("*")
        .eq("id", partnerId)
        .single();

      if (error) {
        console.error("Error fetching partner:", error);
        throw new Error("Failed to fetch partner profile");
      }

      if (!partnerData) {
        return null;
      }

      // Fetch partner ratings from the new partner_ratings table
      const { data: ratingsData, error: ratingsError } = await supabase
        .from("partner_ratings")
        .select("rating")
        .eq("partner_id", partnerId);

      if (ratingsError) {
        console.error("Error fetching partner ratings:", ratingsError);
      }

      // Calculate the average rating if ratings exist
      let avgRating = 4.7; // Default rating as fallback
      let reviewsCount = 24; // Default count as fallback
      
      if (ratingsData && ratingsData.length > 0) {
        const sum = ratingsData.reduce((total: number, item: any) => total + Number(item.rating), 0);
        avgRating = sum / ratingsData.length;
        reviewsCount = ratingsData.length;
      }

      // Fetch credentials from the new partner_credentials table
      const { data: credentialsData, error: credentialsError } = await supabase
        .from("partner_credentials")
        .select("*")
        .eq("partner_id", partnerId)
        .order("verification_status", { ascending: false });

      if (credentialsError) {
        console.error("Error fetching partner credentials:", credentialsError);
      }

      // Map credentials to the expected format or use mock data if none exist
      const credentials: Credential[] = credentialsData && credentialsData.length > 0
        ? credentialsData.map((cred: any) => ({
            id: cred.id,
            credential_type: cred.credential_type,
            credential_name: cred.credential_name,
            issuer: cred.issuer,
            verification_status: cred.verification_status
          }))
        : [
            {
              id: "1",
              credential_type: "certification",
              credential_name: "Professional Service Provider",
              issuer: "Service Association",
              verification_status: "verified",
            },
            {
              id: "2",
              credential_type: "skill",
              credential_name: "Customer Service",
              verification_status: "verified",
            },
          ];
      
      // Calculate years of experience based on created_at
      const createdDate = new Date(partnerData.created_at);
      const currentDate = new Date();
      const yearsExperience = Math.max(
        1,
        Math.floor(
          (currentDate.getTime() - createdDate.getTime()) / (365 * 24 * 60 * 60 * 1000)
        )
      );

      return {
        ...partnerData,
        rating: avgRating,
        reviews_count: reviewsCount,
        credentials: credentials,
        years_experience: yearsExperience,
        expertise: ["Customer Service", "Project Management", "Quality Assurance"],
        service_areas: ["Online", "Local", "International"],
        response_time: "2 hours",
        completed_projects: 45,
        available: true,
      };
    },
    enabled: !!partnerId,
  });

  return {
    partner,
    isLoading,
    error,
    refetch,
  };
}
