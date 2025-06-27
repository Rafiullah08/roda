
import { supabase } from "@/integrations/supabase/client";
import { PartnerExpertise } from "@/types/partner";

// Get partner expertise
export const getPartnerExpertise = async (partnerId: string): Promise<PartnerExpertise[]> => {
  const { data, error } = await supabase
    .from("partner_expertise")
    .select(`
      *,
      service_categories!inner(name),
      service_subcategories(name)
    `)
    .eq("partner_id", partnerId);

  if (error) {
    console.error("Error fetching partner expertise:", error);
    return [];
  }

  // Transform the data to match our type
  return data.map(item => ({
    ...item,
    category_name: item.service_categories?.name,
    subcategory_name: item.service_subcategories?.name,
  })) as PartnerExpertise[];
};

// Add partner expertise
export const addPartnerExpertise = async (expertise: Omit<PartnerExpertise, "id" | "category_name" | "subcategory_name">): Promise<PartnerExpertise | null> => {
  const { data, error } = await supabase
    .from("partner_expertise")
    .insert(expertise)
    .select()
    .single();

  if (error) {
    console.error("Error adding partner expertise:", error);
    return null;
  }

  return data as PartnerExpertise;
};

// Update partner expertise
export const updatePartnerExpertise = async (expertiseId: string, updates: Partial<PartnerExpertise>): Promise<PartnerExpertise | null> => {
  const { data, error } = await supabase
    .from("partner_expertise")
    .update(updates)
    .eq("id", expertiseId)
    .select()
    .single();

  if (error) {
    console.error("Error updating partner expertise:", error);
    return null;
  }

  return data as PartnerExpertise;
};

// Delete partner expertise
export const deletePartnerExpertise = async (expertiseId: string): Promise<boolean> => {
  const { error } = await supabase
    .from("partner_expertise")
    .delete()
    .eq("id", expertiseId);

  if (error) {
    console.error("Error deleting partner expertise:", error);
    return false;
  }

  return true;
};
