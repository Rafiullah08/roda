
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useCategories } from "@/hooks/service-management";

// Import our new components and schema
import { promptFormSchema, type PromptFormValues } from "./schema";
import BasicFields from "./BasicFields";
import SettingsFields from "./SettingsFields";
import PromptTemplateField from "./PromptTemplateField";
import PromptVariables from "./PromptVariables";

interface PromptFormProps {
  onSubmit: (values: PromptFormValues, promptVariables: string[]) => Promise<void>;
  isSubmitting: boolean;
}

const PromptForm = ({ onSubmit, isSubmitting }: PromptFormProps) => {
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const [promptVariables, setPromptVariables] = useState<string[]>([""]);
  
  const form = useForm<PromptFormValues>({
    resolver: zodResolver(promptFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      status: "draft",
      featured: false,
      prompt_template: "",
      model: "gpt-4o-mini"
    }
  });
  
  const handleAddVariable = () => {
    setPromptVariables([...promptVariables, ""]);
  };
  
  const handleRemoveVariable = (index: number) => {
    const newVariables = [...promptVariables];
    newVariables.splice(index, 1);
    setPromptVariables(newVariables);
  };
  
  const handleUpdateVariable = (index: number, value: string) => {
    const newVariables = [...promptVariables];
    newVariables[index] = value;
    setPromptVariables(newVariables);
  };
  
  const handleFormSubmit = async (values: PromptFormValues) => {
    // Filter out empty variables
    const filteredVariables = promptVariables.filter(v => v.trim() !== "");
    await onSubmit(values, filteredVariables);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Basic Fields Section */}
        <BasicFields form={form} />
        
        {/* Service Settings Section */}
        <SettingsFields 
          form={form} 
          categories={categories} 
          isCategoriesLoading={isCategoriesLoading} 
        />

        <div className="space-y-4">
          {/* Prompt Template Section */}
          <PromptTemplateField form={form} />
          
          {/* Prompt Variables Section */}
          <PromptVariables 
            promptVariables={promptVariables}
            onAddVariable={handleAddVariable}
            onRemoveVariable={handleRemoveVariable}
            onUpdateVariable={handleUpdateVariable}
          />
        </div>
        
        <div className="pt-6">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Prompt Service'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PromptForm;
