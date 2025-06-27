
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { PartnerFormValues } from "./types";

interface BusinessInfoFieldsProps {
  form: UseFormReturn<PartnerFormValues>;
}

const BusinessInfoFields = ({ form }: BusinessInfoFieldsProps) => {
  const partnerType = form.watch("partner_type");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="business_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name*</FormLabel>
            <FormControl>
              <Input placeholder="Your business name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contact_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Person*</FormLabel>
            <FormControl>
              <Input placeholder="Full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contact_email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address*</FormLabel>
            <FormControl>
              <Input placeholder="Your email" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contact_phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="Your phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {partnerType === 'agency' && (
        <FormField
          control={form.control}
          name="employee_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Employees</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Number of employees" 
                  type="number" 
                  {...field} 
                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                  value={field.value === null ? '' : field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Website</FormLabel>
            <FormControl>
              <Input placeholder="https://yourwebsite.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="portfolio_links.0"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Portfolio Link</FormLabel>
            <FormControl>
              <Input 
                placeholder="https://portfolio.example.com" 
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BusinessInfoFields;
