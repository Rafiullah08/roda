
import React, { useState, useEffect } from "react";
import { EmailTemplateVariable } from "@/services/email";

interface EmailTemplatePreviewProps {
  html: string;
  variables: EmailTemplateVariable[];
}

export const EmailTemplatePreview: React.FC<EmailTemplatePreviewProps> = ({ html, variables }) => {
  const [previewHtml, setPreviewHtml] = useState(html);

  useEffect(() => {
    let tempHtml = html;
    
    // Replace variables with their default values or placeholders
    variables.forEach(variable => {
      const variableName = typeof variable === 'string' ? variable : variable.name;
      const defaultValue = typeof variable === 'string' ? variableName : (variable.default_value || `[${variableName}]`);
      
      const regex = new RegExp(`{{\\s*${variableName}\\s*}}`, 'g');
      tempHtml = tempHtml.replace(regex, defaultValue);
    });
    
    setPreviewHtml(tempHtml);
  }, [html, variables]);

  return (
    <div 
      className="email-preview" 
      dangerouslySetInnerHTML={{ __html: previewHtml }} 
    />
  );
};
