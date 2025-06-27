
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";
import { convertSupabaseToService } from "./serviceHelpers";

export async function updateService(id: string, serviceData: Partial<Service>): Promise<Service> {
  console.log(`Updating service ID: ${id} with data:`, serviceData);

  // Input validation
  if (!id || typeof id !== 'string') {
    throw new Error("Invalid service ID");
  }
  
  // Prepare update data
  const updateData: any = {};
  
  if (serviceData.title !== undefined) updateData.title = serviceData.title;
  if (serviceData.description !== undefined) updateData.description = serviceData.description;
  if (serviceData.price !== undefined) updateData.price = serviceData.price;
  if (serviceData.category !== undefined) updateData.category = serviceData.category;
  if (serviceData.subcategory !== undefined) updateData.subcategory = serviceData.subcategory;
  if (serviceData.status !== undefined) updateData.status = serviceData.status;
  if (serviceData.image_url !== undefined) updateData.image_url = serviceData.image_url;
  if (serviceData.features !== undefined) updateData.features = serviceData.features;
  if (serviceData.delivery_time !== undefined) updateData.delivery_time = serviceData.delivery_time;
  if (serviceData.service_type !== undefined) updateData.service_type = serviceData.service_type;
  if (serviceData.featured !== undefined) updateData.featured = serviceData.featured;
  
  if (serviceData.faqs !== undefined) {
    // Format FAQs properly
    updateData.faqs = Array.isArray(serviceData.faqs)
      ? serviceData.faqs.map(faq => ({
          question: faq.question || "",
          answer: faq.answer || ""
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

  console.log("Service updated successfully:", data);

  // Use the helper to convert the data to Service type
  return convertSupabaseToService(data);
}
