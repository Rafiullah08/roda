
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface ExecutePromptParams {
  service_id: string;
  variable_values: Record<string, string>;
}

export interface PromptExecutionResult {
  result: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  service_id: string;
  timestamp: string;
}

export function usePromptServiceExecution() {
  const executePrompt = useMutation({
    mutationFn: async (params: ExecutePromptParams): Promise<PromptExecutionResult> => {
      const { data: user } = await supabase.auth.getUser();
      
      const { data, error } = await supabase.functions.invoke("execute-prompt-service", {
        body: {
          ...params,
          user_id: user?.user?.id
        }
      });

      if (error) {
        console.error("Error executing prompt service:", error);
        throw new Error(error.message || "Failed to execute prompt service");
      }

      return data;
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to execute prompt service",
        variant: "destructive"
      });
    }
  });

  return {
    executePrompt,
    isExecuting: executePrompt.isPending
  };
}
