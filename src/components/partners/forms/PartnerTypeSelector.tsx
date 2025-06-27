
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { PartnerFormValues } from "./types";

interface PartnerTypeSelectorProps {
  form: UseFormReturn<PartnerFormValues>;
}

const PartnerTypeSelector = ({ form }: PartnerTypeSelectorProps) => {
  return (
    <FormField
      control={form.control}
      name="partner_type"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Partner Type*</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal" className="font-normal cursor-pointer">
                  Personal Partner (Individual/Freelancer) - 50% Commission Rate
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="agency" id="agency" />
                <Label htmlFor="agency" className="font-normal cursor-pointer">
                  Agency Partner (Business/Team) - 70% Commission Rate
                </Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PartnerTypeSelector;
