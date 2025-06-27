
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronRight, HelpCircle, User, UserCheck } from "lucide-react";

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // FAQ Categories for sidebar navigation
  const faqCategories = [
    { id: "all", title: "All FAQs", icon: HelpCircle },
    { id: "getting-started", title: "Getting Started", icon: HelpCircle },
    { id: "account", title: "Account & Billing", icon: User },
    { id: "partners", title: "Partner Program", icon: UserCheck },
  ];

  // FAQ Data for Partners
  const partnerFaqs = [
    {
      question: "How do I apply to become a partner?",
      answer: "To become a partner on our platform, visit the 'Become a Partner' page and complete the application form. Our team reviews all applications to ensure partners meet our quality standards. The review process typically takes 5-7 business days, after which you'll be notified about your acceptance status."
    },
    {
      question: "How does the partner program differ from freelancer platforms?",
      answer: "Unlike traditional freelance platforms where individuals create and list their own services, our platform provides standardized, professionally designed services that partners are trained to deliver. This ensures consistency for clients and reduces the setup burden for partners. Partners apply to deliver specific existing services rather than creating their own."
    },
    {
      question: "How are services assigned to partners?",
      answer: "When a client places an order, our system matches them with the most appropriate available partner based on expertise, experience, and availability. Partners can also be directly selected by clients if they've worked together previously. You'll receive notifications when orders are assigned to you."
    },
    {
      question: "What are the requirements to qualify as a partner?",
      answer: "To qualify as a partner, you need demonstrated expertise in your field, a professional portfolio, and the ability to deliver our standardized services. Specific requirements vary by service category, but we generally look for relevant education or certifications, previous work experience, and a commitment to maintaining our quality standards."
    },
    {
      question: "How do I get paid for completed orders?",
      answer: "Partners are paid for successfully completed and accepted orders. Payment is processed automatically after the client accepts the delivery and the review period ends (typically 3 days). You can withdraw funds to your bank account once they clear in your wallet, usually within 7 days of order completion."
    },
    {
      question: "Can I choose which services I want to deliver?",
      answer: "Yes, during the application process, you can select the service categories you're interested in. Once accepted, you'll have access to a range of services based on your expertise. You can request to be approved for additional services as you gain experience on the platform."
    },
    {
      question: "What happens if a client requests revisions?",
      answer: "Clients may request revisions based on the revision policy of the specific service. You'll receive a notification when a revision is requested, along with details about what needs to be changed. Complete the revision within the specified timeframe to maintain good standing on the platform."
    },
    {
      question: "How do I communicate with clients?",
      answer: "All communications with clients take place through our platform's messaging system. This ensures that all discussions and agreements are documented for both parties' protection. You'll receive notifications for new messages, and we encourage prompt responses to maintain high service levels."
    },
    {
      question: "What if I need to take time off?",
      answer: "You can set your availability status in your partner dashboard. When you're marked as unavailable, you won't receive new order assignments. We recommend setting your status at least 48 hours in advance of any planned time off to ensure smooth order management."
    },
    {
      question: "How are disputes with clients resolved?",
      answer: "If a dispute arises, first try to resolve it directly with the client through our messaging system. If you can't reach a resolution, either party can escalate to our support team, who will review the case, including all communications and deliverables, and make a fair determination."
    }
  ];

  // FAQ Data for Buyers/Clients
  const buyerFaqs = [
    {
      question: "How do I find the right service for my needs?",
      answer: "Browse our service categories or use the search function on our homepage. Each service includes detailed descriptions, deliverables, and pricing options. You can also read reviews from other clients to help make your decision. If you need assistance, our support team can recommend services based on your specific requirements."
    },
    {
      question: "How does your platform differ from other freelance marketplaces?",
      answer: "Unlike traditional freelance platforms, we offer standardized, professionally designed services delivered by vetted partners. This ensures consistent quality regardless of which partner delivers your service. Our partners are trained specifically on our service offerings, so you know exactly what you'll receive."
    },
    {
      question: "How do I place an order?",
      answer: "Select your desired service, choose a package level (Basic, Standard, or Premium), add any extras you need, and proceed to checkout. You'll be asked to provide specific requirements for your order. Once payment is confirmed, your order will be assigned to an appropriate partner."
    },
    {
      question: "Can I choose a specific partner for my order?",
      answer: "Yes, if you've worked with a partner before and would like to work with them again, you can request them specifically when placing your order. Otherwise, our system will match you with a qualified partner based on expertise, availability, and service category."
    },
    {
      question: "What if I'm not satisfied with the delivered work?",
      answer: "Each service includes a specific number of revisions based on the package you select. If you're not satisfied with the delivery, you can request revisions within the review period (typically 3 days). If the issues persist after all revision attempts, contact our support team to explore resolution options."
    },
    {
      question: "What are the payment options?",
      answer: "We accept major credit cards, PayPal, and bank transfers for most regions. All payments are processed securely through our payment gateway. Your payment is held in escrow until you approve the final delivery, ensuring your funds are protected."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Our refund policy varies by service and circumstance. Generally, if a partner cannot complete your order to meet the service specifications after all revision attempts, you may be eligible for a partial or full refund. Please review our Refund Policy for complete details."
    },
    {
      question: "How long will it take to complete my order?",
      answer: "Delivery times vary by service and package level. The estimated delivery time is clearly indicated on each service page before you place an order. For custom requirements, delivery times may be adjusted after discussing with your assigned partner."
    },
    {
      question: "How do I communicate with my assigned partner?",
      answer: "After placing an order, you'll have access to a dedicated message board with your partner. All communications should remain on our platform for documentation and protection. You'll receive notifications for new messages, and can respond directly through your dashboard."
    },
    {
      question: "Can I modify my order after it's been placed?",
      answer: "Minor modifications can typically be accommodated through communication with your partner. Significant changes that affect the scope of work may require cancelling and reordering, or purchasing additional services. Discuss any needed changes with your partner as soon as possible."
    }
  ];

  return (
    <MainLayout>
      {/* Solid Dark Blue Header */}
      <div className="bg-roda-700 py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-white text-lg mb-6">
            Find answers to common questions about using our platform
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-1/4 w-full md:sticky md:top-24 self-start">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">FAQ Categories</h2>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="md:hidden flex items-center text-gray-500 hover:text-gray-800"
                >
                  <ChevronRight className={cn("h-5 w-5 transition-transform", isSidebarOpen ? "rotate-90" : "")} />
                </button>
              </div>
              
              <div className={cn("md:block", isSidebarOpen ? "block" : "hidden")}>
                <nav className="flex flex-col space-y-1">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.id)}
                      className={cn(
                        "py-2 px-3 text-left rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2",
                        activeTab === category.id 
                          ? "bg-roda-100 text-roda-700 font-medium" 
                          : "text-gray-700"
                      )}
                    >
                      <category.icon className="h-4 w-4" />
                      <span>{category.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 mt-6">
              <h2 className="text-lg font-semibold mb-4">Need More Help?</h2>
              <div className="flex flex-col space-y-3">
                <Button variant="outline" className="justify-start">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 w-full">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="all">All Questions</TabsTrigger>
                  <TabsTrigger value="partners">For Partners</TabsTrigger>
                  <TabsTrigger value="buyers">For Buyers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <UserCheck className="text-blue-500 mr-2 h-5 w-5" />
                      <h3 className="text-xl font-medium">Partner Questions</h3>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      {partnerFaqs.map((faq, index) => (
                        <AccordionItem key={`partner-${index}`} value={`partner-item-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p>{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <User className="text-green-500 mr-2 h-5 w-5" />
                      <h3 className="text-xl font-medium">Buyer Questions</h3>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      {buyerFaqs.map((faq, index) => (
                        <AccordionItem key={`buyer-${index}`} value={`buyer-item-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p>{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>
                
                <TabsContent value="partners" className="space-y-4">
                  <div className="mb-4">
                    <Badge variant="outline" className="mb-2">For Partners</Badge>
                    <h3 className="text-xl font-medium mb-4">Partner Program FAQs</h3>
                    <p className="text-gray-600 mb-6">
                      Common questions about our partner program, service delivery, payment processes, and more. If you're a service provider or interested in becoming one, these FAQs will help guide you.
                    </p>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {partnerFaqs.map((faq, index) => (
                      <AccordionItem key={`partner-tab-${index}`} value={`partner-tab-item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p>{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                
                <TabsContent value="buyers" className="space-y-4">
                  <div className="mb-4">
                    <Badge variant="outline" className="mb-2">For Buyers</Badge>
                    <h3 className="text-xl font-medium mb-4">Buyer/Client FAQs</h3>
                    <p className="text-gray-600 mb-6">
                      Everything you need to know about finding services, placing orders, communicating with partners, and resolving issues. These FAQs will help you navigate the platform as a buyer.
                    </p>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {buyerFaqs.map((faq, index) => (
                      <AccordionItem key={`buyer-tab-${index}`} value={`buyer-tab-item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p>{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Additional Help Section */}
            <div className="bg-white rounded-lg shadow p-6 mt-8">
              <h3 className="text-xl font-semibold mb-4">Still Have Questions?</h3>
              <p className="mb-6">
                If you couldn't find the answer to your question in our FAQ, please don't hesitate to reach out to our support team. We're here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button>Contact Support</Button>
                <Button variant="outline">Visit Support Center</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQ;
