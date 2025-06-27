
import React from "react";
import { Check } from "lucide-react";

const PartnerBenefitsList = () => {
  const benefits = [
    "Start with small, real-world tasks — no tests or interviews",
    "Earn client trust through your work quality",
    "Build your professional credibility with feedback",
    "Expand your portfolio with real experience",
    "Get paid for every task you complete successfully",
    "Access larger projects as you build your reputation"
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Why Join as a Partner?</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex">
              <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PartnerBenefitsList;
