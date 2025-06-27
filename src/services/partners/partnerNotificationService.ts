
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { createPartnerApprovalEmail, createPartnerRejectionEmail, PartnerEmailData } from "@/services/email/partnerEmailTemplates";

interface PartnerStatusEmailData {
  partnerEmail: string;
  partnerName: string;
  businessName: string;
  status: 'approved' | 'rejected';
  rejectionReason?: string;
}

export const sendPartnerStatusEmail = async (data: PartnerStatusEmailData): Promise<void> => {
  try {
    console.log("=== PARTNER NOTIFICATION SERVICE START ===");
    console.log("Sending partner status email with data:", JSON.stringify(data, null, 2));
    
    // Validate required fields
    if (!data.partnerEmail || !data.partnerName || !data.businessName || !data.status) {
      const missingFields = [];
      if (!data.partnerEmail) missingFields.push("partnerEmail");
      if (!data.partnerName) missingFields.push("partnerName");
      if (!data.businessName) missingFields.push("businessName");
      if (!data.status) missingFields.push("status");
      
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.partnerEmail)) {
      throw new Error(`Invalid email format: ${data.partnerEmail}`);
    }
    
    // For rejection emails, ensure rejection reason is provided
    if (data.status === 'rejected' && (!data.rejectionReason || !data.rejectionReason.trim())) {
      throw new Error("Rejection reason is required for rejection emails");
    }

    // Prepare email data for templates
    const emailData: PartnerEmailData = {
      partnerName: data.partnerName,
      businessName: data.businessName,
      partnerEmail: data.partnerEmail,
      rejectionReason: data.rejectionReason
    };

    // Generate email content based on status
    let emailContent;
    try {
      console.log("Generating email template for status:", data.status);
      emailContent = data.status === 'approved' 
        ? createPartnerApprovalEmail(emailData)
        : createPartnerRejectionEmail(emailData);
      
      console.log("Email template generated successfully:", {
        subject: emailContent.subject,
        htmlLength: emailContent.html.length,
        status: data.status
      });
    } catch (templateError) {
      console.error("Error generating email template:", templateError);
      throw new Error(`Failed to generate ${data.status} email template: ${templateError.message}`);
    }
    
    // Prepare the payload for the edge function
    const emailPayload = {
      partnerEmail: data.partnerEmail,
      partnerName: data.partnerName,
      businessName: data.businessName,
      status: data.status,
      rejectionReason: data.rejectionReason,
      subject: emailContent.subject,
      html: emailContent.html
    };
    
    console.log("Calling edge function with payload:", {
      ...emailPayload,
      html: `${emailPayload.html.substring(0, 200)}...` // Truncate for logging
    });
    
    // Call the edge function with enhanced retry logic
    let lastError;
    const maxRetries = 3;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Email sending attempt ${attempt}/${maxRetries}`);
        
        const { data: response, error } = await supabase.functions.invoke('send-partner-status-email', {
          body: emailPayload
        });
        
        if (error) {
          console.error(`Attempt ${attempt} - Edge function error:`, error);
          lastError = error;
          
          if (attempt === maxRetries) {
            throw new Error(error.message || 'Unknown error from email service');
          }
          
          // Wait before retry (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
          continue;
        }
        
        console.log(`Attempt ${attempt} - Edge function response:`, response);
        
        if (response && !response.success) {
          console.error(`Attempt ${attempt} - Email service returned error:`, response.error);
          lastError = new Error(response.error || 'Email service failed');
          
          if (attempt === maxRetries) {
            throw lastError;
          }
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
          continue;
        }
        
        // Success!
        console.log("✅ Partner status email sent successfully on attempt", attempt);
        
        toast({
          title: "Email sent successfully",
          description: `${data.status === 'approved' ? 'Approval' : 'Rejection'} email sent to ${data.partnerEmail}`,
        });
        
        return; // Exit function on success
        
      } catch (attemptError) {
        console.error(`Attempt ${attempt} failed:`, attemptError);
        lastError = attemptError;
        
        if (attempt === maxRetries) {
          break; // Exit retry loop on final attempt
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
    
    // If we get here, all retries failed
    throw lastError || new Error('All email sending attempts failed');
    
  } catch (error: any) {
    console.error('=== PARTNER NOTIFICATION SERVICE ERROR ===');
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
      data: data
    });
    
    toast({
      title: "Failed to send email",
      description: error.message || "An error occurred while sending the status email",
      variant: "destructive",
    });
    
    throw error;
  }
};
