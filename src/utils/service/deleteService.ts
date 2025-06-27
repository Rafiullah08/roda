
import { supabase } from "@/integrations/supabase/client";

export async function deleteService(id: string): Promise<boolean> {
  // Input validation
  if (!id || typeof id !== 'string') {
    throw new Error("Invalid service ID");
  }

  // Sanitize the input
  id = id.trim();

  // Check if the user has permission to delete this service
  const { error: checkError } = await supabase
    .from("services")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (checkError) {
    console.error("Permission error or service not found:", checkError);
    throw new Error("You don't have permission to delete this service or it doesn't exist");
  }

  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting service:", error);
    throw error;
  }

  return true;
}
