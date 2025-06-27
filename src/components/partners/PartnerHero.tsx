
import React from "react";
import PartnerLeadForm from "./PartnerLeadForm";

const PartnerHero = () => {
  return (
    <div className="bg-gradient-to-r from-roda-700 to-roda-500 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Become a Partner — Start Small, Build Trust, Grow Big
            </h1>
            <p className="text-xl text-gray-100 mb-6">
              Showcase your talent. Complete real projects. Build long-term relationships.
            </p>
            <p className="text-gray-200 mb-8">
              We provide a space where skilled individuals and small teams can work on real client tasks,
              prove their abilities, and open doors to ongoing opportunities — without needing to apply
              for jobs or send endless proposals.
            </p>
          </div>
          <div className="lg:w-1/2">
            <PartnerLeadForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerHero;
