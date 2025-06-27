
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const PartnerFaq = () => {
  const faqItems = [
    {
      question: "Do I need to be a registered company?",
      answer: "No, individuals and small teams are welcome to join as partners. You can start as a solo professional and grow your presence on the platform."
    },
    {
      question: "How do I receive tasks?",
      answer: "Tasks are matched to your skill profile. You'll receive notifications of available projects that match your expertise, and you can choose which ones to take on."
    },
    {
      question: "Is there a fee to join?",
      answer: "No, joining as a partner is completely free. We only take a small commission when you successfully complete projects."
    },
    {
      question: "How do I get paid?",
      answer: "Payment is processed after the client approves your work. We use secure payment methods, and funds are typically released within 5-7 business days."
    },
    {
      question: "What types of skills are in demand?",
      answer: "We have demand across many categories including web development, graphic design, content writing, marketing, SEO, and business consulting, among others."
    }
  ];

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="px-6 py-4">{item.question}</AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default PartnerFaq;
