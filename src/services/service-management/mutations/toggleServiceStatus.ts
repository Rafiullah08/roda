
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";
import { transformServiceData } from "../utils/serviceTransformers";

/**
 * Toggles the status of a service
 */
export const toggleServiceStatus = async (
  id: string, 
  currentStatus: 'active' | 'inactive' | 'draft' | 'archived'
): Promise<Service> => {
  try {
    // Simplified toggle logic - if active then make inactive, otherwise make active
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    const { data, error } = await supabase
      .from("services")
      .update({ status: newStatus })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error toggling service status:", error);
      throw error;
    }

    return transformServiceData(data);
  } catch (error) {
    console.error("Error in toggleServiceStatus:", error);
    throw error;
  }
};
