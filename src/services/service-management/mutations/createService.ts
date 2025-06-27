
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";
import { transformServiceData } from "../utils/serviceTransformers";

/**
 * Creates a new service in the database
 */
export const createService = async (serviceData: Omit<Service, "id" | "created_at" | "updated_at">): Promise<Service> => {
  console.log("Creating service with data:", serviceData);

  // Set default status if not provided
  if (!serviceData.status) {
    serviceData.status = "active";
  }

  // Ensure faqs is in the correct format
  const formattedFaqs = Array.isArray(serviceData.faqs) 
    ? serviceData.faqs.map(faq => ({
        question: faq.question,
        answer: faq.answer
      }))
    : [];

  // Save the category name for later use
  const categoryName = serviceData.category;
  const subcategoryName = serviceData.subcategory;
  
  const { data, error } = await supabase
    .from("services")
    .insert([{
      title: serviceData.title,
      description: serviceData.description,
      price: serviceData.price,
      status: serviceData.status,
      category: serviceData.category,
      subcategory: serviceData.subcategory,
      features: serviceData.features || [],
      image_url: serviceData.image_url,
      service_type: serviceData.service_type,
      delivery_time: serviceData.delivery_time,
      faqs: formattedFaqs,
      created_by: serviceData.created_by || null,
      service_location: serviceData.service_location || 'online',
      is_free: serviceData.is_free || false,
      featured: serviceData.featured || false
    }])
    .select()
    .single();

  if (error) {
    console.error("Error creating service:", error);
    throw error;
  }

  console.log("Service created successfully:", data);

  // Return the created service with the category name
  return transformServiceData({
    ...data,
    category: categoryName,
    subcategory: subcategoryName,
  });
};
