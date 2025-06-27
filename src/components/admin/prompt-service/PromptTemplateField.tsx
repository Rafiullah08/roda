
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { PromptFormValues } from "./schema";

interface PromptTemplateFieldProps {
  form: UseFormReturn<PromptFormValues>;
}

const PromptTemplateField: React.FC<PromptTemplateFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="prompt_template"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Prompt Template</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Write your prompt template here. Use {{variable_name}} for dynamic content." 
              className="resize-none min-h-[150px]" 
              {...field} 
            />
          </FormControl>
          <FormDescription>
            Use {"{{"}variable_name{"}}"}  syntax for dynamic content that will be replaced when the service is used
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PromptTemplateField;
