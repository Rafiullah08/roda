
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";
import { transformServiceData } from "../utils/serviceTransformers";

/**
 * Updates an existing service in the database
 */
export const updateService = async (id: string, serviceData: Partial<Service>): Promise<Service> => {
  // Prepare the data for Supabase
  const updateData: any = {};
  
  if (serviceData.title !== undefined) updateData.title = serviceData.title;
  if (serviceData.description !== undefined) updateData.description = serviceData.description;
  if (serviceData.price !== undefined) updateData.price = serviceData.price;
  if (serviceData.status !== undefined) updateData.status = serviceData.status;
  if (serviceData.category !== undefined && typeof serviceData.category === 'string') {
    // Check if the category is a UUID (likely category ID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(serviceData.category)) {
      updateData.category = serviceData.category;
    } else {
      // Try to find the category ID by name
      const { data: categoryData } = await supabase
        .from("service_categories")
        .select("id")
        .eq("name", serviceData.category)
        .single();
      
      if (categoryData) {
        updateData.category = categoryData.id;
      }
    }
  }
  if (serviceData.subcategory !== undefined) {
    updateData.subcategory = serviceData.subcategory; // Store subcategory directly
  }
  if (serviceData.features !== undefined) updateData.features = serviceData.features;
  if (serviceData.image_url !== undefined) updateData.image_url = serviceData.image_url;
  if (serviceData.service_type !== undefined) updateData.service_type = serviceData.service_type;
  if (serviceData.delivery_time !== undefined) updateData.delivery_time = serviceData.delivery_time;
  if (serviceData.service_location !== undefined) updateData.service_location = serviceData.service_location;
  if (serviceData.is_free !== undefined) updateData.is_free = serviceData.is_free;
  if (serviceData.faqs !== undefined) {
    // Ensure faqs is in the correct format
    updateData.faqs = Array.isArray(serviceData.faqs) 
      ? serviceData.faqs.map(faq => ({
          question: faq.question,
          answer: faq.answer
        }))
      : [];
  }
  
  const { data, error } = await supabase
    .from("services")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating service:", error);
    throw error;
  }

  return transformServiceData(data);
};
