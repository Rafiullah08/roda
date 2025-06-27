
import { Json } from "@/integrations/supabase/types";

export interface Partner {
  id: string;
  user_id: string | null;
  business_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  website: string | null;
  status: PartnerStatus;
  bio: string | null;
  created_at: string | null;
  updated_at: string | null;
  partner_type: PartnerType;
  employee_count: number | null;
}

export type PartnerType = 'personal' | 'agency';

export type PartnerStatus = 
  | 'pending' 
  | 'screening' 
  | 'service_selection' 
  | 'trial_period' 
  | 'approved' 
  | 'rejected' 
  | 'suspended';

export interface PartnerApplication {
  id: string;
  partner_id: string;
  business_details: BusinessDetails;
  experience: string | null;
  qualifications: string | null;
  portfolio_links: string[] | null;
  document_links: string[] | null;
  application_date: string | null;
  review_date: string | null;
  status: ApplicationStatus;
  admin_notes: string | null;
  rejection_reason: string | null;
  source_lead_id?: string | null;
  partners?: Partner; // Add this for joined partner data
}

export type ApplicationStatus = 'submitted' | 'under_review' | 'approved' | 'rejected';

export interface BusinessDetails {
  registration_number?: string;
  tax_id?: string;
  years_in_business?: number;
  legal_structure?: string;
  insurance?: boolean;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  industry?: string;
  team_size?: number;
  [key: string]: any; // Add index signature to make it compatible with Json type
}

export interface PartnerExpertise {
  id: string;
  partner_id: string;
  category_id: string | null;
  subcategory_id: string | null;
  years_experience: number | null;
  skill_level: SkillLevel | null;
  category_name?: string; // For UI display
  subcategory_name?: string; // For UI display
}

export type SkillLevel = 'beginner' | 'intermediate' | 'expert';

export interface ServicePartnerAssignment {
  id: string;
  service_id: string;
  partner_id: string;
  status: AssignmentStatus;
  assigned_date: string | null;
  completion_date: string | null;
  commission_rate: number;
  commission_type: PartnerType;
  created_at: string | null;
  updated_at: string | null;
  service_title?: string; // For UI display
}

export type AssignmentStatus = 'available' | 'assigned' | 'completed';

export interface TrialService {
  id: string;
  partner_id: string;
  service_id: string;
  status: TrialStatus;
  quality_rating: number | null;
  on_time_delivery: boolean | null;
  response_rating: number | null;
  customer_feedback: string | null;
  assigned_date: string | null;
  completion_date: string | null;
  created_at: string | null;
  services?: {
    title: string;
    description: string | null;
    price: number;
  };
}

export type TrialStatus = 'assigned' | 'in_progress' | 'completed' | 'failed';

// Props types for Partner Detail components
export interface PartnerOverviewTabProps {
  partner: Partner;
}

export interface PartnerApplicationTabProps {
  partner: Partner;
}

export interface PartnerExpertiseTabProps {
  partner: Partner;
}

export interface PartnerAssignmentsTabProps {
  partner: Partner;
}

export interface PartnerTrialServicesTabProps {
  partner: Partner;
  onStatusChange: () => void;
}
