
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const PartnerCta = () => {
  const scrollToForm = () => {
    document.querySelector('.partner-lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-roda-50 py-16 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to Show What You Can Do?</h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Take the first step. Deliver real value. Build real trust.
        </p>
        <Button 
          onClick={scrollToForm}
          size="lg" 
          className="bg-roda-600 hover:bg-roda-700 text-lg px-8"
        >
          Become a Partner Today
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default PartnerCta;
