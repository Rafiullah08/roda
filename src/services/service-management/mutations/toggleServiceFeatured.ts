
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";
import { transformServiceData } from "../utils/serviceTransformers";

/**
 * Toggles the featured status of a service
 */
export const toggleServiceFeatured = async (
  id: string, 
  featured: boolean
): Promise<Service> => {
  try {
    const { data, error } = await supabase
      .from("services")
      .update({ featured: featured })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error toggling service featured status:", error);
      throw error;
    }

    return transformServiceData(data);
  } catch (error) {
    console.error("Error in toggleServiceFeatured:", error);
    throw error;
  }
};
