
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartnerFormData, partnerFormSchema } from "./types";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { createPartner, submitApplication } from "@/services/partners";
import { useAuth } from "@/contexts/AuthContext";

export const usePartnerForm = (leadData?: any) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm<PartnerFormData>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      partner_type: "personal",
      business_name: leadData?.full_name || "",
      contact_name: leadData?.full_name || "",
      contact_email: leadData?.email || "",
      contact_phone: "",
      website: "",
      employee_count: undefined,
      bio: "",
      experience: "",
      qualifications: "",
      portfolio_links: [""],
      business_details: {
        years_in_business: undefined,
        industry: "",
        team_size: undefined,
        address: {
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "United States"
        }
      }
    },
  });

  const onSubmit = form.handleSubmit(async (data: PartnerFormData) => {
    console.log("=== Starting partner application submission ===");
    console.log("Form data:", data);
    console.log("Lead data:", leadData);
    console.log("Current user:", user);

    try {
      // Validate required fields
      if (!data.contact_email || !data.contact_name || !data.business_name) {
        throw new Error("Please fill in all required fields: Name, Email, and Business Name");
      }

      // Create partner profile with enhanced error handling
      // For invited users without accounts, set user_id to null to avoid foreign key violations
      const partnerData = {
        partner_type: data.partner_type,
        business_name: data.business_name.trim(),
        contact_name: data.contact_name.trim(),
        contact_email: data.contact_email.trim().toLowerCase(),
        contact_phone: data.contact_phone?.trim() || "",
        website: data.website?.trim() || "",
        employee_count: data.employee_count,
        bio: data.bio?.trim() || "",
        user_id: user?.id || null, // Set to null if no authenticated user
        status: 'pending' as const
      };

      console.log("Creating partner with data:", partnerData);
      
      // Add timeout and better error handling for partner creation
      const partnerPromise = createPartner(partnerData);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Partner creation timed out. Please try again.")), 30000)
      );
      
      const partner = await Promise.race([partnerPromise, timeoutPromise]);

      if (!partner) {
        throw new Error("Failed to create partner profile. Please check your information and try again.");
      }

      console.log("✅ Partner created successfully:", partner);

      // Check if partner has an id property before using it
      if (!partner || typeof partner !== 'object' || !('id' in partner)) {
        throw new Error("Invalid partner data received. Please try again.");
      }

      // Prepare application data with validation
      const applicationData = {
        partner_id: (partner as { id: string }).id, // Proper type assertion with interface
        business_details: {
          ...data.business_details,
          // Ensure all required nested fields are present
          address: {
            street: data.business_details.address?.street || "",
            city: data.business_details.address?.city || "",
            state: data.business_details.address?.state || "",
            zip: data.business_details.address?.zip || "",
            country: data.business_details.address?.country || "United States"
          }
        },
        experience: data.experience?.trim() || "",
        qualifications: data.qualifications?.trim() || "",
        portfolio_links: data.portfolio_links.filter(link => link && link.trim() !== "")
      };

      // Determine source lead ID with proper type checking
      let sourceLeadId: string | undefined;
      if (leadData && 
          typeof leadData === 'object' && 
          leadData !== null && 
          'id' in leadData && 
          typeof leadData.id === 'string') {
        sourceLeadId = leadData.id;
        console.log("Application from lead conversion, lead ID:", sourceLeadId);
      } else {
        console.log("Direct application (not from lead conversion)");
      }

      console.log("Submitting application with data:", applicationData);
      
      // Add timeout for application submission
      const applicationPromise = submitApplication(applicationData, sourceLeadId);
      const appTimeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Application submission timed out. Please try again.")), 30000)
      );
      
      const application = await Promise.race([applicationPromise, appTimeoutPromise]);

      if (!application) {
        throw new Error("Failed to submit application. Please try again.");
      }

      console.log("✅ Application submitted successfully:", application);

      toast({
        title: "Application Submitted Successfully!",
        description: `Thank you ${data.contact_name}! We've received your partner application and will review it within 2-3 business days. You'll receive an email confirmation shortly.`,
      });

      // Navigate based on user status
      if (user) {
        navigate("/partner-dashboard");
      } else {
        // For invited users without accounts, show a success message
        navigate("/?message=Application submitted successfully! Please check your email for updates.");
      }

    } catch (error) {
      console.error("❌ Error submitting partner application:", error);
      
      let errorMessage = "An unexpected error occurred. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Handle specific error types
      if (errorMessage.includes("duplicate") || errorMessage.includes("already exists")) {
        errorMessage = "An account with this email already exists. Please use a different email or contact support.";
      } else if (errorMessage.includes("timeout")) {
        errorMessage = "The submission is taking longer than expected. Please check your internet connection and try again.";
      } else if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (errorMessage.includes("foreign key constraint") || errorMessage.includes("invalid reference")) {
        errorMessage = "There was an issue with your account linking. Please try again or contact support if the problem persists.";
      }

      toast({
        title: "Application Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  });

  const isSubmitting = form.formState.isSubmitting;

  return {
    form,
    onSubmit,
    isSubmitting,
  };
};
