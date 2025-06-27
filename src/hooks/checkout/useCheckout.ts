
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServiceDetails } from "./useServiceDetails";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { processOrder } from "@/services/checkout";

// Simplified schema since we're not collecting billing details
const checkoutSchema = z.object({
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
});

export function useCheckout() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [orderProcessing, setOrderProcessing] = useState(false);

  // Get the service ID from query params
  const searchParams = new URLSearchParams(location.search);
  const serviceId = searchParams.get("service");
  
  // Fetch service details
  const { service, loading, error } = useServiceDetails(serviceId);
  
  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      termsAccepted: false,
    },
  });
  
  const handleSubmit = async () => {
    if (!service) {
      toast({
        title: "Service not found",
        description: "Could not find the service to process the order.",
        variant: "destructive",
      });
      return;
    }

    // Validate the form first
    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        title: "Please accept the terms and conditions",
        description: "You must accept the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }

    setOrderProcessing(true);
    try {
      // Prepare simplified order data
      const orderData = {
        serviceId: service.id,
        userDetails: {
          firstName: user?.name || "Guest",
          lastName: "",
          email: user?.email || "guest@example.com",
          address: "",
          city: "",
          country: "",
          postcode: "",
        },
      };

      // Process the order
      await processOrder(orderData);

      // Show success message
      toast({
        title: "Order successful",
        description: "Your order has been placed successfully.",
      });

      // Redirect to order confirmation page
      navigate("/order-confirmation");
    } catch (error: any) {
      console.error("Order processing failed:", error);
      toast({
        title: "Order failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setOrderProcessing(false);
    }
  };
  
  return {
    form,
    service,
    loading,
    error,
    orderProcessing,
    handleSubmit,
    isAuthenticated
  };
}
