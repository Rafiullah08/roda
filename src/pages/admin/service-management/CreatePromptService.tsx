
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePromptService } from "@/hooks/usePromptService";
import PromptForm from "@/components/admin/prompt-service/PromptForm";
import { PromptFormValues } from "@/components/admin/prompt-service/schema";

const CreatePromptService = () => {
  const navigate = useNavigate();
  const { createPromptService, isCreating } = usePromptService();
  
  const handleSubmit = async (values: PromptFormValues, promptVariables: string[]) => {
    try {
      await createPromptService.mutateAsync({
        title: values.title,
        description: values.description,
        price: values.price,
        category: values.category,
        status: values.status,
        featured: values.featured,
        prompt_template: values.prompt_template,
        prompt_variables: promptVariables,
        model_config: {
          model: values.model,
          temperature: 0.7,
          max_tokens: 1000
        }
      });
      
      navigate("/admin/service-management");
    } catch (error) {
      console.error("Failed to create prompt service:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Create Prompt-Based Service</h1>
          <Button variant="outline" onClick={() => navigate("/admin/service-management")}>
            Back to Services
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
            <CardDescription>
              Create a new service based on AI prompt templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PromptForm 
              onSubmit={handleSubmit}
              isSubmitting={isCreating}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CreatePromptService;
