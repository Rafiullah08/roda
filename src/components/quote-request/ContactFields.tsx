
import React from "react";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormValues } from "./schemas";

interface ContactFieldsProps {
  control: Control<FormValues>;
}

export function ContactFields({ control }: ContactFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your full name" 
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your email address" 
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">Phone Number (Optional)</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your phone number" 
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
