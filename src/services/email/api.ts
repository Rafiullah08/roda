
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { 
  EmailTemplate, 
  CreateEmailTemplateParams, 
  UpdateEmailTemplateParams 
} from "./types";
import { normalizeVariables } from "./helpers";

// Fetch all email templates
export const fetchEmailTemplates = async (): Promise<EmailTemplate[]> => {
  try {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching email templates:', error);
      throw new Error(error.message);
    }
    
    return (data || []).map(template => ({
      ...template,
      variables: normalizeVariables(template.variables)
    })) as EmailTemplate[];
  } catch (error: any) {
    console.error('Error in fetchEmailTemplates:', error);
    throw error;
  }
};

// Fetch a specific email template by ID
export const fetchEmailTemplateById = async (id: string): Promise<EmailTemplate> => {
  try {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching email template:', error);
      throw new Error(error.message);
    }
    
    return {
      ...data,
      variables: normalizeVariables(data.variables)
    } as EmailTemplate;
  } catch (error: any) {
    console.error('Error in fetchEmailTemplateById:', error);
    throw error;
  }
};

// Create a new email template
export const createEmailTemplate = async (params: CreateEmailTemplateParams): Promise<EmailTemplate> => {
  try {
    // Ensure variables are in the correct format
    const normalizedVariables = normalizeVariables(params.variables);
    
    const { data, error } = await supabase
      .from('email_templates')
      .insert({
        name: params.name,
        type: params.type,
        subject: params.subject,
        html_content: params.html_content,
        text_content: params.text_content || '',
        variables: normalizedVariables,
        is_active: params.is_active !== undefined ? params.is_active : true,
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating email template:', error);
      throw new Error(error.message);
    }
    
    toast({
      title: "Template created",
      description: "Email template has been created successfully",
    });
    
    return {
      ...data,
      variables: normalizeVariables(data.variables)
    } as EmailTemplate;
  } catch (error: any) {
    console.error('Error in createEmailTemplate:', error);
    throw error;
  }
};

// Update an existing email template
export const updateEmailTemplate = async (params: UpdateEmailTemplateParams): Promise<EmailTemplate> => {
  try {
    const updateData: Partial<EmailTemplate> = {};
    
    if (params.name !== undefined) updateData.name = params.name;
    if (params.type !== undefined) updateData.type = params.type;
    if (params.subject !== undefined) updateData.subject = params.subject;
    if (params.html_content !== undefined) updateData.html_content = params.html_content;
    if (params.text_content !== undefined) updateData.text_content = params.text_content;
    if (params.variables !== undefined) updateData.variables = normalizeVariables(params.variables);
    if (params.is_active !== undefined) updateData.is_active = params.is_active;
    
    const { data, error } = await supabase
      .from('email_templates')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating email template:', error);
      throw new Error(error.message);
    }
    
    toast({
      title: "Template updated",
      description: "Email template has been updated successfully",
    });
    
    return {
      ...data,
      variables: normalizeVariables(data.variables)
    } as EmailTemplate;
  } catch (error: any) {
    console.error('Error in updateEmailTemplate:', error);
    throw error;
  }
};

// Toggle the active status of an email template
export const toggleTemplateStatus = async (id: string, isActive: boolean): Promise<void> => {
  try {
    const { error } = await supabase
      .from('email_templates')
      .update({ is_active: isActive })
      .eq('id', id);
      
    if (error) {
      console.error('Error toggling template status:', error);
      throw new Error(error.message);
    }
    
    toast({
      title: isActive ? "Template activated" : "Template deactivated",
      description: `Email template has been ${isActive ? 'activated' : 'deactivated'} successfully`,
    });
  } catch (error: any) {
    console.error('Error in toggleTemplateStatus:', error);
    throw error;
  }
};

// Delete an email template
export const deleteEmailTemplate = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('email_templates')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting email template:', error);
      throw new Error(error.message);
    }
    
    toast({
      title: "Template deleted",
      description: "Email template has been deleted successfully",
    });
  } catch (error: any) {
    console.error('Error in deleteEmailTemplate:', error);
    throw error;
  }
};

// Send a test email using a specific template
export const sendTestEmail = async (templateId: string, testEmail: string): Promise<void> => {
  try {
    const { error } = await supabase.functions.invoke('send-test-email', {
      body: {
        templateId,
        testEmail
      }
    });
    
    if (error) {
      console.error('Error sending test email:', error);
      throw new Error(error.message);
    }
    
    toast({
      title: "Test email sent",
      description: `A test email has been sent to ${testEmail}`,
    });
  } catch (error: any) {
    console.error('Error in sendTestEmail:', error);
    throw error;
  }
};
