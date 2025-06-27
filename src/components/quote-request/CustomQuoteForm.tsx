
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { customQuoteSchema, CustomQuoteFormValues } from "./CustomQuoteSchema";
import { toast } from "@/hooks/use-toast";

interface CustomQuoteFormProps {
  serviceTitle: string;
}

export function CustomQuoteForm({ serviceTitle }: CustomQuoteFormProps) {
  const form = useForm<CustomQuoteFormValues>({
    resolver: zodResolver(customQuoteSchema),
    defaultValues: {
      description: "",
      estimatedBudget: "",
      deliveryDate: undefined,
      acceptTerms: false,
    },
  });

  const onSubmit = async (values: CustomQuoteFormValues) => {
    try {
      // Here you would typically submit to your backend
      console.log("Quote request submitted:", values);
      
      toast({
        title: "Quote request submitted",
        description: "We've received your custom quote request and will get back to you soon.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-md w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Custom Quote Request
        </h2>
        <p className="text-gray-600 mt-2">
          Get a personalized quote for {serviceTitle}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Project Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your project requirements and goals..." 
                    className="min-h-32 border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estimatedBudget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Estimated Budget</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Rs. 5,000 - 15,000" 
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-gray-700 font-medium">Delivery Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal border-gray-300 hover:border-blue-500",
                          !field.value && "text-gray-500"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Select delivery date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm text-gray-600">
                    I agree to the{" "}
                    <Link to="/terms-conditions" className="text-blue-600 hover:text-blue-800 underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                      Privacy Policy
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Submit Quote Request
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
