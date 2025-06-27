
import { supabase } from "@/integrations/supabase/client";

export const isUUID = (str: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return typeof str === 'string' && uuidRegex.test(str);
};

export const transformServiceData = (serviceData: any, categoryMap?: Map<string, string>, subcategoryMap?: Map<string, string>) => {
  // Process features to ensure it's an array
  const features = Array.isArray(serviceData.features) ? serviceData.features : [];

  // Process FAQs to ensure proper format
  let faqs: Array<{question: string; answer: string}> = [];
  if (Array.isArray(serviceData.faqs)) {
    faqs = serviceData.faqs.map((faq: any) => {
      let question = "";
      let answer = "";
      
      if (typeof faq === 'object' && faq !== null) {
        question = faq.question || "";
        answer = faq.answer || "";
      }
      
      return { question, answer };
    });
  }

  // Explicitly handle is_free property to ensure it's a boolean
  const is_free = Boolean(serviceData.is_free);

  // If we have a category map and the category is a UUID, replace it with the name
  let category = serviceData.category;
  if (category && isUUID(category) && categoryMap) {
    if (categoryMap.has(category)) {
      category = categoryMap.get(category);
      console.log(`Mapped category ID ${serviceData.category} to name: ${category}`);
    } else {
      console.log(`Failed to map category ID: ${serviceData.category} (not found in map)`);
    }
  }

  // If we have a subcategory map and the subcategory is a UUID, replace it with the name
  let subcategory = serviceData.subcategory;
  if (subcategory && isUUID(subcategory) && subcategoryMap) {
    if (subcategoryMap.has(subcategory)) {
      subcategory = subcategoryMap.get(subcategory);
      console.log(`Mapped subcategory ID ${serviceData.subcategory} to name: ${subcategory}`);
    } else {
      console.log(`Failed to map subcategory ID: ${serviceData.subcategory} (not found in map)`);
    }
  }

  // Handle edge cases where category or subcategory might be undefined after transformation
  if (!category) {
    console.log(`Category is undefined/null for service ${serviceData.id} (${serviceData.title})`);
    category = serviceData.category || null;
  }
  
  if (!subcategory) {
    console.log(`Subcategory is undefined/null for service ${serviceData.id} (${serviceData.title})`);
    subcategory = serviceData.subcategory || null;
  }

  return {
    ...serviceData,
    features,
    description: serviceData.description || null,
    faqs,
    is_free,
    service_location: serviceData.service_location || 'online',
    status: (serviceData.status as 'active' | 'inactive' | 'draft' | 'archived') || 'draft',
    category: category || null,
    subcategory: subcategory || null,
  };
};
