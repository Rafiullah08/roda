
import { useQuery } from "@tanstack/react-query";
import { getServiceById } from "@/services/service-management";
import { toast } from "@/components/ui/use-toast";
import { Service } from "@/types/service";

export function useService(id: string) {
  return useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      try {
        if (!id) return null;
        const service = await getServiceById(id);
        return service;
      } catch (error: any) {
        toast({
          title: "Error",
          description: `Failed to load service: ${error.message}`,
          variant: "destructive",
        });
        throw error;
      }
    },
    enabled: !!id,
  });
}
