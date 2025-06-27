
import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/utils/service";
import { Service } from "@/types/service";
import { toast } from "@/components/ui/use-toast";

export function useServiceData() {
  const { 
    data: services = [], 
    isLoading, 
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        const data = await getServices();
        console.log("Fetched services:", data);
        return data;
      } catch (err) {
        console.error("Error fetching services:", err);
        toast({
          title: "Error fetching services",
          description: "Please try again later.",
          variant: "destructive",
        });
        throw err;
      }
    },
  });

  return { 
    services, 
    isLoading, 
    isError,
    error, 
    refetch
  };
}
