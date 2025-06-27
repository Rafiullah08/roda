
import { supabase } from "@/integrations/supabase/client";
import { TrialService } from "@/types/partner";
import { updatePartner } from "./partnerProfileService";

// Get partner trial services
export const getPartnerTrialServices = async (partnerId: string): Promise<TrialService[]> => {
  const { data, error } = await supabase
    .from("trial_services")
    .select(`
      *,
      services(title, description, price)
    `)
    .eq("partner_id", partnerId);

  if (error) {
    console.error("Error fetching trial services:", error);
    return [];
  }

  return data as unknown as TrialService[];
};

// Assign a trial service to a partner
export const assignTrialService = async (
  partnerId: string,
  serviceId: string
): Promise<TrialService | null> => {
  const { data, error } = await supabase
    .from("trial_services")
    .insert({
      partner_id: partnerId,
      service_id: serviceId,
      status: "assigned",
      assigned_date: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error("Error assigning trial service:", error);
    return null;
  }

  return data as TrialService;
};

// Complete a trial service
export const completeTrialService = async (
  trialId: string,
  rating: {
    quality_rating: number;
    on_time_delivery: boolean;
    response_rating: number;
    customer_feedback?: string;
  }
): Promise<TrialService | null> => {
  const { data, error } = await supabase
    .from("trial_services")
    .update({
      ...rating,
      status: "completed",
      completion_date: new Date().toISOString()
    })
    .eq("id", trialId)
    .select()
    .single();

  if (error) {
    console.error("Error completing trial service:", error);
    return null;
  }
  
  // Check if partner has completed 3 trials successfully
  const trialService = data as TrialService;
  const completedTrials = await getCompletedTrialCount(trialService.partner_id);
  
  // If 3 trials completed, update partner status
  if (completedTrials >= 3) {
    await updatePartner(trialService.partner_id, { status: "approved" });
  }

  return trialService;
};

// Fail a trial service
export const failTrialService = async (
  trialId: string,
  feedback: string
): Promise<TrialService | null> => {
  const { data, error } = await supabase
    .from("trial_services")
    .update({
      status: "failed",
      customer_feedback: feedback,
      completion_date: new Date().toISOString()
    })
    .eq("id", trialId)
    .select()
    .single();

  if (error) {
    console.error("Error failing trial service:", error);
    return null;
  }

  return data as TrialService;
};

// Get count of completed trials
export const getCompletedTrialCount = async (partnerId: string): Promise<number> => {
  const { count, error } = await supabase
    .from("trial_services")
    .select("*", { count: "exact" })
    .eq("partner_id", partnerId)
    .eq("status", "completed");

  if (error) {
    console.error("Error counting completed trials:", error);
    return 0;
  }

  return count || 0;
};
