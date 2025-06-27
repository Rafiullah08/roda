
export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceSubcategory {
  id: string;
  name: string;
  category_id: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Properly re-export the Service type with 'export type'
export type { Service } from './service';
