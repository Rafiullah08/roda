import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";

export async function getServices() {
  console.log("Fetching services from Supabase...");
  
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStart = yesterday.toISOString().split('T')[0] + 'T00:00:00Z';
    
    console.log("Including services created since:", yesterdayStart);
    
    // First fetch services - without filtering by status to include all services
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching services:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log("No services found in database");
      return [];
    }

    console.log("Services fetched successfully:", data.length);
    
    // Log created_at dates to debug
    data.forEach(service => {
      console.log(`Service ${service.id}: ${service.title}, created at ${service.created_at}`);
    });

    // Then, fetch all categories to resolve names
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("service_categories")
      .select("id, name");

    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError);
    }

    // Create category map for lookup
    const categoryMap = new Map();
    if (categoriesData && categoriesData.length > 0) {
      console.log("Categories found:", categoriesData.length);
      categoriesData.forEach((category) => {
        categoryMap.set(category.id, category.name);
      });
      console.log("Sample category mapping:", categoriesData[0].id, "->", categoriesData[0].name);
    } else {
      console.log("No categories found or categories fetch failed");
    }

    // Fetch subcategories for more specific info
    const { data: subcategoriesData, error: subcategoriesError } = await supabase
      .from("service_subcategories")
      .select("id, name");

    if (subcategoriesError) {
      console.error("Error fetching subcategories:", subcategoriesError);
    }

    // Create subcategory map for lookup
    const subcategoryMap = new Map();
    if (subcategoriesData && subcategoriesData.length > 0) {
      console.log("Subcategories found:", subcategoriesData.length);
      subcategoriesData.forEach((subcategory) => {
        subcategoryMap.set(subcategory.id, subcategory.name);
      });
      console.log("Sample subcategory mapping:", subcategoriesData[0].id, "->", subcategoriesData[0].name);
    } else {
      console.log("No subcategories found or subcategories fetch failed");
    }

    // For services with is_free flag, determine if they should be visible to buyers
    const { data: assignmentsData, error: assignmentsError } = await supabase
      .from("service_partner_assignments")
      .select("service_id");

    if (assignmentsError) {
      console.error("Error fetching service assignments:", assignmentsError);
    }

    // Create a set of service IDs that have been assigned to partners
    const assignedServiceIds = new Set();
    if (assignmentsData) {
      assignmentsData.forEach(assignment => {
        assignedServiceIds.add(assignment.service_id);
      });
    }

    // Transform the data to match our Service interface
    const services = data.map(item => {
      // Safely process features
      const features = Array.isArray(item.features) ? item.features : [];
      
      // Safely process FAQs
      let faqs: Array<{question: string; answer: string}> = [];
      if (Array.isArray(item.faqs)) {
        faqs = item.faqs.map(faq => {
          let question = "";
          let answer = "";
          
          if (typeof faq === 'object' && faq !== null) {
            question = (faq as any).question || "";
            answer = (faq as any).answer || "";
          }
          
          return { question, answer };
        });
      }
      
      // Explicitly handle is_free property to ensure it's a boolean
      const is_free = Boolean(item.is_free);
      
      // Check if category is a UUID and replace with name if available
      let categoryName = item.category;
      const isUUID = (str: string) => {
        return typeof str === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
      };

      if (categoryName && isUUID(categoryName)) {
        console.log(`Service ${item.id} has UUID category: ${categoryName}`);
        if (categoryMap.has(categoryName)) {
          categoryName = categoryMap.get(categoryName);
          console.log(`Mapped to: ${categoryName}`);
        } else {
          console.log(`Could not map category UUID: ${categoryName} (not in map)`);
        }
      }
      
      // Check if subcategory is a UUID and replace with name if available
      let subcategoryName = item.subcategory;
      if (subcategoryName && isUUID(subcategoryName)) {
        console.log(`Service ${item.id} has UUID subcategory: ${subcategoryName}`);
        if (subcategoryMap.has(subcategoryName)) {
          subcategoryName = subcategoryMap.get(subcategoryName);
          console.log(`Mapped to: ${subcategoryName}`);
        } else {
          console.log(`Could not map subcategory UUID: ${subcategoryName} (not in map)`);
        }
      }
      
      return {
        ...item,
        features,
        description: item.description || null,
        faqs,
        is_free,
        service_location: item.service_location || 'online',
        status: (item.status as 'active' | 'inactive' | 'draft' | 'archived') || 'draft',
        category: categoryName,
        subcategory: subcategoryName,
        has_partner: assignedServiceIds.has(item.id)
      } as Service;
    });
    
    console.log("Processed services:", services.length);
    if (services.length > 0) {
      console.log("Sample processed service:", 
        services[0].id,
        services[0].title,
        "Category:", services[0].category || "None",
        "Created at:", services[0].created_at
      );
    }
    
    // Only filter active status after processing for visibility on website
    const activeServices = services.filter(service => service.status === 'active');
    console.log(`Returning ${activeServices.length} active services out of ${services.length} total`);
    
    return activeServices;
  } catch (error) {
    console.error("Error in getServices:", error);
    throw error;
  }
}

export async function getServiceById(id: string) {
  // Input validation
  if (!id || typeof id !== 'string') {
    throw new Error("Invalid service ID");
  }

  // Sanitize the input
  id = id.trim();

  console.log(`Fetching service with ID: ${id}`);
  
  try {
    // First, fetch the service
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching service:", error);
      throw error;
    }

    if (!data) {
      console.error("No service found with ID:", id);
      return null;
    }

    console.log("Service fetched successfully:", data);

    // Then, check if the category is a UUID and fetch its name if needed
    let categoryName = data.category;
    if (categoryName && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(categoryName)) {
      const { data: categoryData } = await supabase
        .from("service_categories")
        .select("name")
        .eq("id", categoryName)
        .single();
        
      if (categoryData) {
        categoryName = categoryData.name;
      }
    }

    // Check if subcategory is a UUID and fetch its name if needed
    let subcategoryName = data.subcategory;
    if (subcategoryName && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(subcategoryName)) {
      const { data: subcategoryData } = await supabase
        .from("service_subcategories")
        .select("name")
        .eq("id", subcategoryName)
        .single();
        
      if (subcategoryData) {
        subcategoryName = subcategoryData.name;
      }
    }

    // Process features to ensure it's an array
    const features = Array.isArray(data.features) ? data.features : [];

    // Process FAQs to ensure proper format
    let faqs: Array<{question: string; answer: string}> = [];
    if (Array.isArray(data.faqs)) {
      faqs = data.faqs.map(faq => {
        let question = "";
        let answer = "";
        
        if (typeof faq === 'object' && faq !== null) {
          question = (faq as any).question || "";
          answer = (faq as any).answer || "";
        }
        
        return { question, answer };
      });
    }

    // Explicitly handle is_free property to ensure it's a boolean
    const is_free = Boolean(data.is_free);

    return {
      ...data,
      features,
      description: data.description || null,
      faqs,
      is_free,
      service_location: data.service_location || 'online',
      status: (data.status as 'active' | 'inactive' | 'draft' | 'archived') || 'draft',
      category: categoryName,
      subcategory: subcategoryName
    } as Service;
  } catch (error) {
    console.error("Error in getServiceById:", error);
    throw error;
  }
}
