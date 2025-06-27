
export interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  features: string[];
  status: 'active' | 'inactive' | 'draft' | 'archived';
  image_url: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  delivery_time: string | null;
  category: string;
  subcategory: string | null;
  service_type: "Project" | "Task" | "Prompt";
  rating: number;
  reviews_count: number;
  faqs: Array<{
    question: string;
    answer: string;
  }> | null;
  featured?: boolean;
  service_location?: 'online' | 'onsite' | 'hybrid';
  is_free?: boolean;
  has_partner?: boolean; // Track if service is assigned to any partner
  partner_assignments?: Array<{
    partner_id: string;
    service_id: string;
    status: string;
  }>; // Store partner assignments for admin views
  metadata?: {
    prompt_template?: string;
    prompt_variables?: string[];
    model_config?: {
      model: string;
      temperature: number;
      max_tokens: number;
    }
  }; // For storing prompt-specific data
}
