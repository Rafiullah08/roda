import { supabase } from "@/integrations/supabase/client";
import { PartnerApplication } from "@/types/partner";
import { supabaseAdmin } from "@/services/admin/supabaseAdmin";
import { findUserByEmail } from "./partnerAccountLinkingService";

// Submit a new partner application with smart account linking
export const submitApplication = async (
  applicationData: {
    partner_id: string;
    business_details: any;
    experience?: string;
    qualifications?: string;
    portfolio_links?: string[];
    document_links?: string[];
  },
  sourceLeadId?: string
): Promise<PartnerApplication | null> => {
  try {
    console.log("=== Submitting partner application ===");
    console.log("Application data:", applicationData);
    console.log("Source lead ID:", sourceLeadId);

    // Validate required fields
    if (!applicationData.partner_id) {
      throw new Error("Partner ID is required to submit application");
    }

    if (!applicationData.business_details) {
      throw new Error("Business details are required for the application");
    }

    // Validate partner exists
    const { data: partnerExists, error: partnerCheckError } = await supabase
      .from("partners")
      .select("id, contact_email, user_id")
      .eq("id", applicationData.partner_id)
      .single();

    if (partnerCheckError || !partnerExists) {
      console.error("Partner validation error:", partnerCheckError);
      throw new Error("Invalid partner ID. Please try submitting your application again.");
    }

    console.log("✅ Partner validated:", partnerExists);

    // If this application comes from a lead, handle account linking
    if (sourceLeadId) {
      console.log("Processing application from lead conversion");
      
      // Get the lead details to check email
      const { data: lead, error: leadError } = await supabase
        .from("partner_leads")
        .select("email, full_name")
        .eq("id", sourceLeadId)
        .single();

      if (!leadError && lead) {
        console.log("Found lead details:", lead);
        
        // Only try to link accounts if the partner doesn't already have a user_id
        if (!partnerExists.user_id) {
          // Check if there's an existing user with this email
          const existingUserId = await findUserByEmail(lead.email);
          
          if (existingUserId) {
            console.log("Found existing user for lead email, linking accounts");
            
            // Update the partner record to link to existing user
            const { error: linkError } = await supabase
              .from("partners")
              .update({ user_id: existingUserId })
              .eq("id", applicationData.partner_id);

            if (linkError) {
              console.error("Error linking partner to existing user:", linkError);
            } else {
              console.log("✅ Successfully linked partner to existing user");
            }
          }
        }
      } else if (leadError) {
        console.warn("Could not find lead details:", leadError);
      }
    }

    // Prepare application data with proper validation
    const submissionData = {
      partner_id: applicationData.partner_id,
      business_details: applicationData.business_details || {},
      experience: applicationData.experience || "",
      qualifications: applicationData.qualifications || "",
      portfolio_links: Array.isArray(applicationData.portfolio_links) 
        ? applicationData.portfolio_links.filter(link => link && link.trim()) 
        : [],
      document_links: Array.isArray(applicationData.document_links) 
        ? applicationData.document_links.filter(link => link && link.trim()) 
        : [],
      source_lead_id: sourceLeadId || null,
      status: "submitted"
    };

    console.log("Final submission data:", submissionData);

    const { data, error } = await supabase
      .from("partner_applications")
      .insert(submissionData)
      .select()
      .single();

    if (error) {
      console.error("Database error submitting application:", error);
      
      // Handle specific database errors
      if (error.code === '23505') {
        throw new Error("You have already submitted an application. Please check your email for updates.");
      } else if (error.code === '23503') {
        throw new Error("Invalid partner information. Please try creating your profile again.");
      } else if (error.code === '23514') {
        throw new Error("Application data validation failed. Please check all required fields.");
      }
      
      throw new Error(`Failed to submit application: ${error.message}`);
    }

    console.log("✅ Application submitted successfully:", data);
    return data as PartnerApplication;
  } catch (error) {
    console.error("Error in submitApplication:", error);
    
    // Re-throw the error to maintain the original error message
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error("Failed to submit application. Please try again.");
  }
};

export const getPartnerApplication = async (applicationId: string): Promise<PartnerApplication | null> => {
  try {
    const { data, error } = await supabase
      .from("partner_applications")
      .select(`
        *,
        partners (
          id,
          business_name,
          contact_name,
          contact_email,
          contact_phone,
          website,
          status,
          partner_type,
          employee_count,
          bio,
          created_at,
          updated_at
        )
      `)
      .eq("id", applicationId)
      .single();

    if (error) {
      console.error("Error fetching partner application:", error);
      throw error;
    }

    return data as PartnerApplication;
  } catch (error) {
    console.error("Error in getPartnerApplication:", error);
    return null;
  }
};

export const getAllApplications = async (page = 1, limit = 10, status?: string): Promise<{ applications: PartnerApplication[], count: number }> => {
  try {
    console.log("=== Fetching applications with partner data ===");
    
    let query = supabase
      .from("partner_applications")
      .select(`
        *,
        partners (
          id,
          business_name,
          contact_name,
          contact_email,
          contact_phone,
          website,
          status,
          partner_type,
          employee_count,
          bio,
          created_at,
          updated_at
        )
      `, { count: "exact" });
    
    if (status && status !== 'all') {
      query = query.eq("status", status);
    }
    
    query = query.order("application_date", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);
    
    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching applications:", error);
      throw error;
    }

    console.log("Applications fetched with partner data:", {
      applicationsCount: data?.length || 0,
      totalCount: count || 0,
      firstApplication: data?.[0] || "None"
    });

    return { 
      applications: (data || []) as PartnerApplication[], 
      count: count || 0 
    };
  } catch (error) {
    console.error("Error in getAllApplications:", error);
    return { applications: [], count: 0 };
  }
};

export const updateApplicationDocuments = async (
  applicationId: string, 
  documentLinks: string[]
): Promise<PartnerApplication | null> => {
  try {
    const { data, error } = await supabase
      .from("partner_applications")
      .update({ document_links: documentLinks })
      .eq("id", applicationId)
      .select()
      .single();

    if (error) {
      console.error("Error updating application documents:", error);
      throw error;
    }

    return data as PartnerApplication;
  } catch (error) {
    console.error("Error in updateApplicationDocuments:", error);
    return null;
  }
};

export const reviewApplication = async (
  applicationId: string,
  reviewData: {
    status: "approved" | "rejected" | "under_review";
    adminNotes?: string;
    rejectionReason?: string;
  }
): Promise<PartnerApplication | null> => {
  try {
    const updateData: any = {
      status: reviewData.status,
      review_date: new Date().toISOString()
    };

    if (reviewData.adminNotes) updateData.admin_notes = reviewData.adminNotes;
    if (reviewData.rejectionReason) updateData.rejection_reason = reviewData.rejectionReason;

    const { data, error } = await supabaseAdmin
      .from("partner_applications")
      .update(updateData)
      .eq("id", applicationId)
      .select()
      .single();

    if (error) {
      console.error("Error reviewing application:", error);
      throw error;
    }

    return data as PartnerApplication;
  } catch (error) {
    console.error("Error in reviewApplication:", error);
    return null;
  }
};
