
import { Service } from "@/types/service";
import { Json } from "@/integrations/supabase/types";

// Helper to convert Supabase JSON to typed FAQs
export const convertJsonToFaqs = (faqsJson: Json | null): Array<{question: string; answer: string}> => {
  if (!faqsJson) return [];
  
  try {
    if (Array.isArray(faqsJson)) {
      return faqsJson.map(faq => {
        if (typeof faq === 'object' && faq !== null) {
          const question = (faq as any).question || "";
          const answer = (faq as any).answer || "";
          return { question, answer };
        }
        return { question: "", answer: "" };
      });
    }
  } catch (error) {
    console.error("Error converting FAQs JSON:", error);
  }
  
  return [];
};

// Helper to safely process service data from Supabase
export const convertSupabaseToService = (data: any): Service => {
  return {
    ...data,
    category: data.category || 'Uncategorized', // Ensure category is always defined
    features: Array.isArray(data.features) ? data.features : [],
    description: data.description || null,
    faqs: convertJsonToFaqs(data.faqs),
    status: (data.status as 'active' | 'inactive' | 'draft' | 'archived') || 'draft',
    featured: Boolean(data.featured),
    created_by: data.created_by || null // Ensure created_by is properly handled
  } as Service;
};
