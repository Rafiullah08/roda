
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";

export interface PromptServiceData {
  title: string;
  description: string;
  price: number;
  category: string;
  prompt_template: string;
  prompt_variables?: string[];
  model_config?: {
    model: string;
    temperature: number;
    max_tokens: number;
  };
  featured?: boolean;
  status?: 'active' | 'inactive' | 'draft' | 'archived';
}

export function usePromptService() {
  const createPromptService = useMutation({
    mutationFn: async (serviceData: PromptServiceData): Promise<Service> => {
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase.functions.invoke("create-prompt-service", {
        body: {
          ...serviceData,
          created_by: user.user.id,
          service_type: "Prompt" // Explicitly set the service type
        }
      });

      if (error) {
        console.error("Error creating prompt service:", error);
        throw new Error(error.message || "Failed to create prompt service");
      }

      return data.service;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Prompt service created successfully"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create prompt service",
        variant: "destructive"
      });
    }
  });

  return {
    createPromptService,
    isCreating: createPromptService.isPending
  };
}
