
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";
import { transformServiceData, isUUID } from "../utils/serviceTransformers";

/**
 * Fetches a single service by ID from the database
 */
export const getServiceById = async (id: string): Promise<Service | null> => {
  try {
    // Input validation
    if (!id || typeof id !== 'string') {
      throw new Error("Invalid service ID");
    }

    // Sanitize the input
    id = id.trim();

    console.log(`Fetching service with ID: ${id}`);
    
    // First, fetch the service
    const { data: serviceData, error: serviceError } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single();

    if (serviceError) {
      console.error("Error fetching service:", serviceError);
      throw serviceError;
    }

    if (!serviceData) return null;

    console.log("Service fetched successfully:", serviceData);

    // Then, if the category is a UUID, fetch its name
    let categoryName = serviceData.category;
    if (serviceData.category && isUUID(serviceData.category)) {
      const { data: categoryData } = await supabase
        .from("service_categories")
        .select("name")
        .eq("id", serviceData.category)
        .single();
        
      if (categoryData) {
        categoryName = categoryData.name;
      }
    }

    // Return transformed service data
    return transformServiceData({
      ...serviceData,
      category: categoryName
    });
  } catch (error) {
    console.error("Error in getServiceById:", error);
    throw error;
  }
};
