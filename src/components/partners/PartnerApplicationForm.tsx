
import React from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PartnerTypeSelector from "./forms/PartnerTypeSelector";
import BusinessInfoFields from "./forms/BusinessInfoFields";
import ExperienceFields from "./forms/ExperienceFields";
import { usePartnerForm } from "./forms/usePartnerForm";

interface PartnerApplicationFormProps {
  leadData?: any;
  // invitationToken?: string; // Removed invitationToken prop
}

// Removed invitationToken from props destructuring
const PartnerApplicationForm = ({ leadData }: PartnerApplicationFormProps) => {
  // Removed invitationToken from usePartnerForm call
  const { form, isSubmitting, onSubmit } = usePartnerForm(leadData);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <PartnerTypeSelector form={form} />
        <BusinessInfoFields form={form} />
        <ExperienceFields form={form} />

        <div className="border-t pt-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            * Required fields
          </p>
          <Button type="submit" disabled={isSubmitting} className="bg-roda-600 hover:bg-roda-700">
            Submit Application
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PartnerApplicationForm;

