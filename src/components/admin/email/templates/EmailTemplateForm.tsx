import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { EmailTemplate, EmailTemplateVariable, getEmailCategories } from "@/services/email";
import { EmailTemplatePreview } from "./EmailTemplatePreview";
import { EmailVariablesEditor } from "./EmailVariablesEditor";

interface EmailTemplateFormProps {
  template?: EmailTemplate;
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
  mode?: "create" | "edit";
}

const EmailTemplateForm: React.FC<EmailTemplateFormProps> = ({
  template,
  onSubmit,
  isSubmitting = false,
  mode = "create"
}) => {
  const [previewHtml, setPreviewHtml] = useState<string>("");
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [variables, setVariables] = useState<EmailTemplateVariable[]>([]);
  
  const form = useForm({
    defaultValues: {
      name: template?.name || "",
      subject: template?.subject || "",
      html_content: template?.html_content || getDefaultTemplate(""),
      text_content: template?.text_content || "",
      type: template?.type || "welcome",
      is_active: template?.is_active !== undefined ? template.is_active : true,
    }
  });

  useEffect(() => {
    if (template) {
      form.reset({
        name: template.name,
        subject: template.subject,
        html_content: template.html_content,
        text_content: template.text_content || "",
        type: template.type,
        is_active: template.is_active
      });
      
      if (template.variables) {
        setVariables(Array.isArray(template.variables) 
          ? template.variables 
          : typeof template.variables === 'string' 
            ? JSON.parse(template.variables) 
            : []);
      }
    }
  }, [template, form]);

  useEffect(() => {
    // Update preview HTML whenever the HTML content changes
    setPreviewHtml(form.watch("html_content"));
  }, [form.watch("html_content")]);

  const handleSubmit = (data: any) => {
    // Include variables in the submission
    onSubmit({
      ...data,
      variables
    });
  };

  const categories = getEmailCategories();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Basic Template Info */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Template Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter template name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 mt-6">
                    <div className="space-y-0.5">
                      <FormLabel>Active Status</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email subject line" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Template Variables */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Template Variables</h3>
                <EmailVariablesEditor 
                  variables={variables} 
                  onChange={setVariables}
                />
              </CardContent>
            </Card>
            
            {/* Text Content */}
            <FormField
              control={form.control}
              name="text_content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plain Text Version (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter plain text version of the email"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* HTML Content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <FormLabel>HTML Content</FormLabel>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? "Edit HTML" : "Preview"}
              </Button>
            </div>
            
            {showPreview ? (
              <div className="border rounded-md h-[600px] overflow-auto bg-white">
                <EmailTemplatePreview html={previewHtml} variables={variables} />
              </div>
            ) : (
              <FormField
                control={form.control}
                name="html_content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter HTML content"
                        className="min-h-[600px] font-mono text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : mode === "create" ? "Create Template" : "Update Template"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

// Helper function to generate a default template
const getDefaultTemplate = (title: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || 'Email Template'}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      background-color: #3b82f6;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      color: white;
      margin: 0;
    }
    .content {
      padding: 20px;
      background-color: #f9fafb;
    }
    .footer {
      background-color: #f3f4f6;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
    }
    .btn {
      display: inline-block;
      background-color: #3b82f6;
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 4px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>{{title}}</h1>
  </div>
  <div class="content">
    <p>Hello {{name}},</p>
    <p>This is a sample email template. Replace this content with your message.</p>
    <a href="{{link}}" class="btn">Call to Action</a>
  </div>
  <div class="footer">
    <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
    <p>If you no longer wish to receive these emails, you can <a href="{{unsubscribe_link}}">unsubscribe</a>.</p>
  </div>
</body>
</html>`;
};

export default EmailTemplateForm;
