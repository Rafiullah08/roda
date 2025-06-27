
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const partnerLeadSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  skills: z.string().min(2, "Please share your main skills")
});

type PartnerLeadFormValues = z.infer<typeof partnerLeadSchema>;

const PartnerLeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingApplicationError, setExistingApplicationError] = useState<string | null>(null);

  const form = useForm<PartnerLeadFormValues>({
    resolver: zodResolver(partnerLeadSchema),
    defaultValues: {
      fullName: "",
      email: "",
      skills: ""
    }
  });

  const onSubmit = async (values: PartnerLeadFormValues) => {
    console.log("Starting form submission with values:", values);
    setIsSubmitting(true);
    setExistingApplicationError(null);
    
    try {
      console.log("Calling submit-partner-lead edge function...");
      
      const response = await fetch(`https://xdfokaaapberzycmsacx.supabase.co/functions/v1/submit-partner-lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZm9rYWFhcGJlcnp5Y21zYWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTg4MjMsImV4cCI6MjA2MTA3NDgyM30.mCJ5Lmawer_kmFLx3JVzO1VIKKF3yoLapxFY2C-f870`,
        },
        body: JSON.stringify({
          full_name: values.fullName,
          email: values.email,
          skills: values.skills
        })
      });

      console.log("Function response status:", response.status);
      
      const data = await response.json();
      console.log("Function response data:", data);

      // Handle specific status codes
      if (response.status === 409) {
        // Conflict - email already exists
        console.log("Email already exists:", data.error);
        setExistingApplicationError(data.error);
        return;
      }

      if (response.status === 400) {
        // Bad request - validation error
        console.error("Validation error:", data.error);
        toast({
          title: "Submission failed",
          description: data.error || "Please check your information and try again.",
          variant: "destructive"
        });
        return;
      }

      if (response.status === 500) {
        // Server error
        console.error("Server error:", data.error);
        toast({
          title: "Submission failed",
          description: "Server error occurred. Please try again later.",
          variant: "destructive"
        });
        return;
      }

      if (!response.ok) {
        // Other non-2xx status codes
        console.error("Unexpected error status:", response.status, data);
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      if (!data.success) {
        console.error("Application submission failed:", data.error);
        throw new Error(data.error || "Failed to submit application");
      }

      console.log("Application submitted successfully:", data);
      
      toast({
        title: "Application submitted successfully!",
        description: "Thank you for your interest in becoming a partner. We'll review your application and be in touch soon.",
      });
      
      form.reset();
      setExistingApplicationError(null);
      
    } catch (error) {
      console.error("Form submission error:", error);
      
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Submission failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto partner-lead-form">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Become a Partner</h3>
      <p className="text-gray-600 mb-6">Fill out this form to start your journey with us</p>
      
      {existingApplicationError && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            {existingApplicationError}
          </AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Skills</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Web Development, Design, Marketing" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-roda-600 hover:bg-roda-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PartnerLeadForm;
