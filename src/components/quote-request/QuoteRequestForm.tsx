
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ContactFields } from "./ContactFields";
import { ProjectDetailsFields } from "./ProjectDetailsFields";
import { loggedInSchema, guestSchema, FormValues, GuestFormValues } from "./schemas";

type QuoteRequestFormProps = {
  serviceId: string;
  serviceTitle: string;
  isFreeService: boolean;
  onSubmitSuccess: () => void;
};

export function QuoteRequestForm({ serviceId, serviceTitle, isFreeService, onSubmitSuccess }: QuoteRequestFormProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use the appropriate schema and default values based on auth status
  const form = useForm<FormValues>({
    resolver: zodResolver(user ? loggedInSchema : guestSchema),
    defaultValues: user 
      ? {
          requirements: "",
          budget: "",
          deadline: undefined,
        }
      : {
          name: "",
          email: "",
          phone: "",
          requirements: "",
          budget: "",
          deadline: undefined,
        },
  });

  const onSubmit = async (values: FormValues) => {
    if (!serviceId) {
      toast({
        title: "Error",
        description: "No service was specified",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create inquiry object with conditional fields
      const inquiryData: any = {
        service_id: serviceId,
        buyer_id: user?.id,
        requirements: values.requirements,
        budget_range: values.budget || null,
        status: "pending",
        quote_status: "pending",
      };
      
      // Add deadline if provided
      if ('deadline' in values && values.deadline) {
        inquiryData.timeline = format(values.deadline, 'yyyy-MM-dd');
      }
      
      // Add contact info for non-authenticated users
      if (!user) {
        const guestValues = values as GuestFormValues;
        inquiryData.contact_info = {
          name: guestValues.name,
          email: guestValues.email,
          phone: guestValues.phone || null
        };
        inquiryData.message = `Contact: ${guestValues.name} (${guestValues.email})${guestValues.phone ? ', ' + guestValues.phone : ''}`;
      }

      const { error } = await supabase.from("service_inquiries").insert(inquiryData);

      if (error) throw error;

      toast({
        title: isFreeService ? "Service request submitted" : "Quote request submitted",
        description: "We've received your request and will get back to you soon.",
      });

      onSubmitSuccess();
    } catch (error) {
      console.error("Error submitting quote request:", error);
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg border p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isFreeService ? "Request Free Service" : "Get Quote"}
          </h2>
          <p className="text-gray-600 mt-2">
            Fill out the form below to get started
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Show contact fields only for guests */}
            {!user && <ContactFields control={form.control} />}

            {/* Always show project details fields */}
            <ProjectDetailsFields control={form.control} />

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? "Submitting..." 
                  : (isFreeService ? "Request Free Service" : "Submit Quote Request")
                }
              </Button>
            </div>

            {/* Terms and Privacy Policy Links */}
            <div className="text-xs text-gray-600 text-center pt-2">
              By submitting this form, you agree to our{" "}
              <Link to="/terms-conditions" className="text-blue-600 hover:text-blue-800 underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
