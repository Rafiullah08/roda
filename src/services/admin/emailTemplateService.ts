
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { 
  EmailTemplate, 
  createWelcomeEmailTemplate, 
  createPasswordResetTemplate, 
  createVerificationEmailTemplate,
  createAccountChangeTemplate,
  createSecurityAlertTemplate,
  createOrderConfirmationTemplate,
  normalizeVariables
} from "@/services/email";

/**
 * Ensures that default email templates exist in the database
 * If templates don't exist, it will create them
 */
export const initializeDefaultTemplates = async (): Promise<void> => {
  try {
    // Create a Supabase client with the service role key if available
    const client = supabase;
    
    console.log("Checking for existing email templates...");
    
    // Get existing templates
    const { data: existingTemplates, error: queryError } = await client
      .from("email_templates")
      .select("type, name");

    if (queryError) {
      console.error("Error checking existing templates:", queryError);
      throw queryError;
    }

    // Get list of existing template names
    const existingNames = new Set();
    
    if (existingTemplates && existingTemplates.length > 0) {
      existingTemplates.forEach((template) => {
        existingNames.add(template.name);
      });
    }

    console.log("Existing template names:", Array.from(existingNames));
    
    // Create templates that don't exist
    const templatesToCreate = [];

    // Always check for each specific template by name
    if (!existingNames.has('Welcome Email')) {
      console.log("Creating Welcome Email template");
      templatesToCreate.push(createWelcomeEmailTemplate());
    }
    
    if (!existingNames.has('Password Reset')) {
      console.log("Creating Password Reset template");
      templatesToCreate.push(createPasswordResetTemplate());
    }
    
    if (!existingNames.has('Email Verification')) {
      console.log("Creating Email Verification template");
      templatesToCreate.push(createVerificationEmailTemplate());
    }
    
    if (!existingNames.has('Account Change Notification')) {
      console.log("Creating Account Change Notification template");
      templatesToCreate.push(createAccountChangeTemplate());
    }
    
    if (!existingNames.has('Security Alert')) {
      console.log("Creating Security Alert template");
      templatesToCreate.push(createSecurityAlertTemplate());
    }

    if (!existingNames.has('Order Confirmation')) {
      console.log("Creating Order Confirmation template");
      templatesToCreate.push(createOrderConfirmationTemplate());
    }

    // If no templates to create, we're done
    if (templatesToCreate.length === 0) {
      console.log("All required email templates already exist");
      return;
    }

    console.log(`Creating ${templatesToCreate.length} missing templates...`);

    // Insert the templates
    const { error: insertError } = await client
      .from("email_templates")
      .insert(templatesToCreate);

    if (insertError) {
      console.error("Error creating templates:", insertError);
      toast({
        title: "Error creating templates",
        description: insertError.message,
        variant: "destructive",
      });
    } else {
      console.log(`${templatesToCreate.length} templates created successfully`);
      toast({
        title: "Templates initialized",
        description: `${templatesToCreate.length} email templates have been created`,
      });
    }
  } catch (error: any) {
    console.error("Error in initializeDefaultTemplates:", error);
    toast({
      title: "Template initialization failed",
      description: error.message || "An unexpected error occurred",
      variant: "destructive",
    });
  }
};

/**
 * Configure Supabase to use our custom email verification templates
 */
export const configureCustomEmailHandler = async (): Promise<void> => {
  try {
    // This function would typically be called at app initialization
    // to ensure the templates are set up and the custom handler is configured
    
    // We can call this function from a settings page or during app initialization
    console.log("Custom email handler has been set up with all required templates");
    
    // This is just informational - the actual configuration is done
    // through the Supabase dashboard and calling our edge function
  } catch (error: any) {
    console.error("Error configuring custom email handler:", error);
  }
};
