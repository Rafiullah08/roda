
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";
import { convertSupabaseToService } from "./serviceHelpers";

export async function createService(serviceData: Partial<Service>): Promise<Service> {
  console.log("Creating service with data:", serviceData);

  // Prepare data for insertion
  const dataToInsert = {
    title: serviceData.title || "Untitled Service",
    description: serviceData.description || null,
    price: serviceData.price || 0,
    category: serviceData.category || null,
    subcategory: serviceData.subcategory || null,
    status: serviceData.status || 'draft',
    image_url: serviceData.image_url || null,
    features: Array.isArray(serviceData.features) ? serviceData.features : [],
    delivery_time: serviceData.delivery_time || "3 days",
    service_type: serviceData.service_type || null,
    faqs: Array.isArray(serviceData.faqs) 
      ? serviceData.faqs.map(faq => ({
          question: faq.question || "",
          answer: faq.answer || ""
        })) 
      : [],
    featured: serviceData.featured === true // Explicitly check for true to avoid null/undefined issues
  };

  const { data, error } = await supabase
    .from("services")
    .insert([dataToInsert])
    .select()
    .single();

  if (error) {
    console.error("Error creating service:", error);
    throw error;
  }

  console.log("Service created successfully:", data);
  
  // Use the helper to convert the data to Service type
  return convertSupabaseToService(data);
}
