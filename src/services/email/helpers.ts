
import { EmailTemplateVariable } from "./types";

// Helper function to normalize variables between different formats
export const normalizeVariables = (variables: any): EmailTemplateVariable[] => {
  if (!variables) return [];
  
  if (Array.isArray(variables)) {
    // If it's already array of objects with name property
    if (typeof variables[0] === 'object' && 'name' in variables[0]) {
      return variables;
    }
    
    // If it's an array of strings, convert to objects
    if (typeof variables[0] === 'string') {
      return variables.map(name => ({ name, description: name }));
    }
  }
  
  // If it's a JSON string, parse it
  if (typeof variables === 'string') {
    try {
      const parsed = JSON.parse(variables);
      return normalizeVariables(parsed);
    } catch (e) {
      console.error('Error parsing variables string:', e);
      return [];
    }
  }
  
  console.warn('Unhandled variables format, returning empty array');
  return [];
};

// Helper function to replace variables in templates
export const replaceTemplateVariables = (content: string, variables: Record<string, string>): string => {
  let result = content;
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(regex, value || `[${key}]`);
  });
  
  return result;
};

// Helper function to extract variables from template content
export const extractTemplateVariables = (content: string): string[] => {
  const regex = /{{(.*?)}}/g;
  const matches = content.match(regex) || [];
  
  return matches.map(match => match.replace(/{{|}}/g, '').trim());
};

// Email category related functions
export const getEmailCategories = () => [
  { value: 'welcome', label: 'Welcome Emails' },
  { value: 'notification', label: 'Notifications' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'transactional', label: 'Transactional' },
  { value: 'verification', label: 'Verification' },
  { value: 'password_reset', label: 'Password Reset' },
  { value: 'alert', label: 'Alerts' },
  { value: 'other', label: 'Other' }
];

// Get category label from value
export const getCategoryLabel = (value: string): string => {
  const category = getEmailCategories().find(cat => cat.value === value);
  return category ? category.label : 'Unknown';
};
