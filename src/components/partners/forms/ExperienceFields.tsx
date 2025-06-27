
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { PartnerFormValues } from "./types";

interface ExperienceFieldsProps {
  form: UseFormReturn<PartnerFormValues>;
}

const ExperienceFields = ({ form }: ExperienceFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tell us about your business</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Brief description of your services, experience, and specialties..."
                className="h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Professional Experience</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your relevant professional experience, years in business, and key accomplishments..."
                className="h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="qualifications"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Qualifications & Certifications</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List any relevant qualifications, certifications, or specialized training..."
                className="h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ExperienceFields;
