
import React from 'react';
import { Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ServiceContentTabsProps {
  description: string | null;
  serviceType: string | null;
  faqs: Array<{question: string; answer: string}> | [];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ServiceContentTabs: React.FC<ServiceContentTabsProps> = ({
  description,
  serviceType,
  faqs,
  activeTab,
  setActiveTab
}) => {
  // Format description for HTML rendering if needed
  const formattedDescription = description || "";
  
  // Process and validate FAQs
  const serviceFaqs = Array.isArray(faqs) ? faqs.filter(faq => 
    faq && typeof faq === 'object' && 'question' in faq && 'answer' in faq
  ) : [];

  return (
    <div className="mt-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        {/* Description Tab */}
        <TabsContent value="description" className="mt-2">
          <div className="prose max-w-none">
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">{formattedDescription}</p>
            
            {/* Service details */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              {serviceType && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{serviceType}</Badge>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* FAQs Tab */}
        <TabsContent value="faqs" className="mt-2">
          {serviceFaqs.length > 0 ? (
            <div className="space-y-6">
              {serviceFaqs.map((faq, index) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No FAQs available for this service.</p>
          )}
        </TabsContent>
        
        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-2">
          <p className="text-gray-500">No reviews to show yet.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
