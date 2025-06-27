
import { supabase } from "@/integrations/supabase/client";

/**
 * Deletes a service from the database
 */
export const deleteService = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};
