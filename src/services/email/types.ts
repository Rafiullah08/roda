
// Define type for email template variables
export type EmailTemplateVariable = {
  name: string;
  description: string;
  default_value?: string;
};

// Define the EmailTemplate type
export type EmailTemplate = {
  id: string;
  name: string;
  type: string;
  subject: string;
  html_content: string;
  text_content?: string;
  variables: EmailTemplateVariable[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  preview_image_url?: string;
};

// Define parameters for creating an email template
export type CreateEmailTemplateParams = {
  name: string;
  type: string;
  subject: string;
  html_content: string;
  text_content?: string;
  variables: EmailTemplateVariable[];
  is_active?: boolean;
};

// Define parameters for updating an email template
export type UpdateEmailTemplateParams = {
  id: string;
  name?: string;
  type?: string;
  subject?: string;
  html_content?: string;
  text_content?: string;
  variables?: EmailTemplateVariable[];
  is_active?: boolean;
};
