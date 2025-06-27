
import { supabase } from "@/integrations/supabase/client";
import { ServiceCategory, ServiceSubcategory } from "@/types/service-management";

/**
 * Fetches all service categories from the database
 */
export const fetchCategories = async (): Promise<ServiceCategory[]> => {
  const { data, error } = await supabase
    .from("service_categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
  
  return data as ServiceCategory[];
};

/**
 * Creates a new service category in the database
 */
export const createCategory = async (name: string, description?: string): Promise<ServiceCategory> => {
  const { data, error } = await supabase
    .from("service_categories")
    .insert([{
      name,
      description
    }])
    .select()
    .single();

  if (error) {
    console.error("Error creating category:", error);
    throw error;
  }

  return data as ServiceCategory;
};

/**
 * Deletes a category from the database
 */
export const deleteCategory = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("service_categories")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

/**
 * Fetches all service subcategories from the database
 */
export const fetchSubcategories = async (categoryId?: string): Promise<ServiceSubcategory[]> => {
  let query = supabase
    .from("service_subcategories")
    .select("*")
    .order("name", { ascending: true });

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
  
  return data as ServiceSubcategory[];
};

/**
 * Creates a new service subcategory in the database
 */
export const createSubcategory = async (
  name: string, 
  categoryId: string, 
  description?: string
): Promise<ServiceSubcategory> => {
  const { data, error } = await supabase
    .from("service_subcategories")
    .insert([{
      name,
      category_id: categoryId,
      description
    }])
    .select()
    .single();

  if (error) {
    console.error("Error creating subcategory:", error);
    throw error;
  }

  return data as ServiceSubcategory;
};

/**
 * Deletes a subcategory from the database
 */
export const deleteSubcategory = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("service_subcategories")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting subcategory:", error);
    throw error;
  }
};
