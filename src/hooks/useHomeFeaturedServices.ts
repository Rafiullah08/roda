
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";

export const fetchFeaturedServices = async (): Promise<Service[]> => {
  // Fetch featured services
  const { data: servicesData, error: servicesError } = await supabase
    .from("services")
    .select("*")
    .eq("status", "active")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(4);

  if (servicesError) {
    console.error("Error fetching featured services:", servicesError);
    throw servicesError;
  }

  console.log("Featured services raw data:", servicesData);

  // Fetch all categories to use for mapping
  const { data: categoriesData, error: categoriesError } = await supabase
    .from("service_categories")
    .select("*");

  if (categoriesError) {
    console.error("Error fetching categories:", categoriesError);
    // Continue even if categories fail
  }

  // Create a map for faster lookup
  const categoryMap = new Map();
  if (categoriesData) {
    categoriesData.forEach((category) => {
      categoryMap.set(category.id, category.name);
    });
  }

  return (servicesData || []).map(item => {
    // Check if category is a UUID and look it up in our map
    let categoryName = item.category;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    if (item.category && typeof item.category === 'string' && uuidRegex.test(item.category)) {
      categoryName = categoryMap.get(item.category) || "Uncategorized";
    }
    
    return {
      id: item.id,
      title: item.title,
      description: item.description || null,
      price: item.price || 0,
      category: categoryName || "Uncategorized", // Use resolved category name
      subcategory: item.subcategory || null,
      status: (item.status as 'active' | 'inactive' | 'draft' | 'archived') || 'active',
      image_url: item.image_url || null,
      features: Array.isArray(item.features) ? item.features : [],
      created_at: item.created_at,
      updated_at: item.updated_at,
      created_by: item.created_by || null,
      delivery_time: item.delivery_time || null,
      service_type: item.service_type || null,
      rating: item.rating || 0,
      reviews_count: item.reviews_count || 0,
      featured: Boolean(item.featured),
      faqs: Array.isArray(item.faqs) 
        ? item.faqs.map(faq => {
            if (typeof faq === 'object' && faq !== null && 'question' in faq && 'answer' in faq) {
              return {
                question: String(faq.question || ""),
                answer: String(faq.answer || "")
              };
            }
            return { question: "", answer: "" };
          })
        : null
    };
  }) as Service[];
};

export function useHomeFeaturedServices() {
  return useQuery({
    queryKey: ["featuredServices"],
    queryFn: fetchFeaturedServices,
  });
}
