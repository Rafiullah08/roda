
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";
import { transformServiceData } from "../utils/serviceTransformers";

/**
 * Fetches all services from the database
 */
export const fetchServices = async (): Promise<Service[]> => {
  console.log("Fetching services...");
  
  try {
    // First, fetch the services
    const { data: servicesData, error: servicesError } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (servicesError) {
      console.error("Error fetching services:", servicesError);
      throw servicesError;
    }

    console.log("Fetched services:", servicesData?.length || 0);
    
    if (!servicesData || servicesData.length === 0) {
      return [];
    }

    // Then, fetch all categories to use for mapping
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("service_categories")
      .select("*");

    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError);
      // Still return services even if categories fail
    }

    // Create maps for faster lookup
    const categoryMap = new Map();
    if (categoriesData) {
      categoriesData.forEach((category) => {
        categoryMap.set(category.id, category.name);
      });
    }
    
    // Fetch all subcategories to use for mapping
    const { data: subcategoriesData, error: subcategoriesError } = await supabase
      .from("service_subcategories")
      .select("*");
      
    if (subcategoriesError) {
      console.error("Error fetching subcategories:", subcategoriesError);
    }
    
    // Create subcategory map for faster lookup
    const subcategoryMap = new Map();
    if (subcategoriesData) {
      subcategoriesData.forEach((subcategory) => {
        subcategoryMap.set(subcategory.id, subcategory.name);
      });
    }
    
    // Debug logs to see the category and subcategory maps
    console.log("Category map size:", categoryMap.size);
    console.log("Subcategory map size:", subcategoryMap.size);
    console.log("Sample category mappings:", Array.from(categoryMap.entries()).slice(0, 3));
    console.log("Sample subcategory mappings:", Array.from(subcategoryMap.entries()).slice(0, 3));

    // For services with free flag, check if they're assigned to any partner
    const { data: assignmentsData, error: assignmentsError } = await supabase
      .from("service_partner_assignments")
      .select("service_id, partner_id, status");
      
    if (assignmentsError) {
      console.error("Error fetching service assignments:", assignmentsError);
    }
    
    // Create a map to track service assignments
    const serviceAssignmentMap = new Map();
    if (assignmentsData) {
      assignmentsData.forEach((assignment) => {
        if (!serviceAssignmentMap.has(assignment.service_id)) {
          serviceAssignmentMap.set(assignment.service_id, []);
        }
        serviceAssignmentMap.get(assignment.service_id).push(assignment);
      });
    }
    
    // Transform the data to match our Service interface
    const transformedServices = servicesData.map(item => {
      // Debug logs to help identify issues with specific services
      console.log("Processing service:", item.id, item.title);
      console.log("Service category:", item.category, "Is UUID:", typeof item.category === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(item.category));
      console.log("Service subcategory:", item.subcategory, "Is UUID:", typeof item.subcategory === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(item.subcategory));
      
      const serviceResult = transformServiceData(item, categoryMap, subcategoryMap);
      
      // Add assignment information for each service
      if (serviceAssignmentMap.has(item.id)) {
        serviceResult.partner_assignments = serviceAssignmentMap.get(item.id);
        serviceResult.has_partner = true;
      } else {
        serviceResult.partner_assignments = [];
        serviceResult.has_partner = false;
      }
      
      // Debug log the transformed service
      console.log("Transformed service:", serviceResult.title, 
        "Category:", serviceResult.category || "None", 
        "Subcategory:", serviceResult.subcategory || "None");
      
      return serviceResult;
    });

    console.log("Transformed services:", transformedServices.length);
    if (transformedServices.length > 0) {
      console.log("Sample transformed service:", transformedServices[0]);
    }
    
    return transformedServices;
  } catch (error) {
    console.error("Error in fetchServices:", error);
    throw error;
  }
};
