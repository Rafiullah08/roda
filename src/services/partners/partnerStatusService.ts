
import { supabase } from "@/integrations/supabase/client";
import { Partner, PartnerStatus } from "@/types/partner";
import { updatePartner } from "./partnerProfileService";

// Update partner status
export const updatePartnerStatus = async (partnerId: string, newStatus: PartnerStatus): Promise<Partner | null> => {
  return updatePartner(partnerId, { status: newStatus });
};
