
import React from "react";
import { Check } from "lucide-react";

const PartnerBenefits = () => {
  const benefits = [
    "Access to a large pool of potential clients",
    "Simplified client acquisition without the marketing costs",
    "Streamlined payment processing and project management",
    "Opportunity to build your reputation through client reviews"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Partner With Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our growing network of talented professionals and unlock new opportunities for your business growth.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 bg-roda-500 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-lg text-gray-800 font-medium leading-relaxed">
                    {benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerBenefits;
