
import React from "react";
import { ClipboardCheck, Users, Award } from "lucide-react";

const PartnerHowItWorks = () => {
  const steps = [
    {
      icon: <ClipboardCheck className="h-10 w-10 text-roda-500" />,
      title: "Create Your Partner Profile",
      description: "Share your name, email, and skills to get started — no resume required."
    },
    {
      icon: <Users className="h-10 w-10 text-roda-500" />,
      title: "Access Real Tasks",
      description: "Get matched with client projects based on your skillset and expertise."
    },
    {
      icon: <Award className="h-10 w-10 text-roda-500" />,
      title: "Build Your Reputation",
      description: "Complete projects, collect reviews, and grow your professional network."
    }
  ];

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-roda-50 rounded-full mb-4">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerHowItWorks;
