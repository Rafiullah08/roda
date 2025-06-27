
import { z } from "zod";

// Form schema
export const partnerFormSchema = z.object({
  partner_type: z.enum(['personal', 'agency'], {
    required_error: "Please select a partner type",
  }),
  business_name: z.string().min(2, "Business name is required"),
  contact_name: z.string().min(2, "Contact name is required"),
  contact_email: z.string().email("Please enter a valid email address"),
  contact_phone: z.string().optional(),
  employee_count: z.number().optional().nullable(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  bio: z.string().optional(),
  experience: z.string().optional(),
  qualifications: z.string().optional(),
  portfolio_links: z.array(z.string().url("Please enter a valid URL").optional().or(z.literal(""))).default([""]),
  business_details: z.object({
    years_in_business: z.number().optional().nullable(),
    industry: z.string().optional(),
    team_size: z.number().optional().nullable(),
    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zip: z.string().optional(),
      country: z.string().default("United States")
    }).optional()
  }).optional()
});

export type PartnerFormValues = z.infer<typeof partnerFormSchema>;
export type PartnerFormData = PartnerFormValues; // Add alias for consistency
