
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Collapsible,
  CollapsibleContent
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const RefundPolicy = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("eligibility");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sections = [
    { id: "eligibility", title: "Refund Eligibility" },
    { id: "timeframe", title: "Refund Timeframes" },
    { id: "process", title: "Refund Process" },
    { id: "exclusions", title: "Exclusions" },
    { id: "service-cancellations", title: "Service Cancellations" },
    { id: "payment-methods", title: "Payment Methods" },
    { id: "special-circumstances", title: "Special Circumstances" },
    { id: "disputes", title: "Disputes & Resolution" },
    { id: "contact", title: "Contact Us" }
  ];

  return (
    <MainLayout>
      {/* Solid Dark Blue Header */}
      <div className="bg-roda-700 py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Refund Policy</h1>
          <p className="text-white text-lg">
            Last Updated: May 14, 2025 - Roda Technologies
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-1/4 w-full md:sticky md:top-24 self-start">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Contents</h2>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="md:hidden flex items-center text-gray-500 hover:text-gray-800"
                >
                  <ChevronRight className={cn("h-5 w-5 transition-transform", isSidebarOpen ? "rotate-90" : "")} />
                </button>
              </div>
              
              <Collapsible open={isSidebarOpen} className="md:block">
                <CollapsibleContent className="md:!visible md:!opacity-100">
                  <nav className="flex flex-col space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={cn(
                          "py-2 px-3 text-left rounded-md hover:bg-gray-100 transition-colors",
                          activeSection === section.id 
                            ? "bg-roda-100 text-roda-700 font-medium" 
                            : "text-gray-700"
                        )}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 w-full">
            <div className="bg-white rounded-lg shadow p-6">
              <section id="eligibility" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Refund Eligibility</h2>
                <p className="mb-4">
                  At Roda Technologies, we strive to ensure complete customer satisfaction with all our services. 
                  Our refund policy has been designed with fairness and transparency as our guiding principles.
                </p>
                <p className="mb-4">
                  You may be eligible for a refund under the following circumstances:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    <strong>Service Not Delivered:</strong> If the purchased service was not provided within the specified timeframe.
                  </li>
                  <li>
                    <strong>Service Quality Issues:</strong> If the delivered service significantly differs from what was described or advertised.
                  </li>
                  <li>
                    <strong>Technical Failures:</strong> If technical issues on our platform prevented you from accessing or using the service you purchased.
                  </li>
                  <li>
                    <strong>Double Charging:</strong> If you were accidentally charged multiple times for the same service.
                  </li>
                </ul>
              </section>

              <section id="timeframe" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Refund Timeframes</h2>
                <p className="mb-4">
                  Refund requests must be submitted within specific timeframes to be considered:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    <strong>Standard Services:</strong> Refund requests must be submitted within 14 days from the date of purchase or service delivery, whichever is later.
                  </li>
                  <li>
                    <strong>Subscription Services:</strong> For recurring subscription services, refund requests must be submitted within 7 days of the billing date for that cycle.
                  </li>
                  <li>
                    <strong>Custom Services:</strong> For custom or bespoke services, refund eligibility and timeframes will be outlined in your service agreement.
                  </li>
                </ul>
                <p className="mb-4">
                  Once approved, refunds typically process within 5-10 business days, depending on your payment method and financial institution.
                </p>
              </section>

              <section id="process" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Refund Process</h2>
                <p className="mb-4">
                  To request a refund, please follow these steps:
                </p>
                <ol className="list-decimal pl-6 mb-4 space-y-3">
                  <li>
                    <strong>Submit Request:</strong> Log into your account and navigate to "Purchase History" or "Orders" section. Select the relevant order and click on "Request Refund" button.
                  </li>
                  <li>
                    <strong>Provide Details:</strong> Complete the refund request form with all relevant information, including the reason for your refund request and any supporting documentation or evidence.
                  </li>
                  <li>
                    <strong>Review Period:</strong> Our customer service team will review your request within 48 hours and may contact you for additional information if necessary.
                  </li>
                  <li>
                    <strong>Decision Notification:</strong> You will receive an email notification once a decision has been made regarding your refund request.
                  </li>
                  <li>
                    <strong>Refund Processing:</strong> If approved, your refund will be processed according to the original payment method used.
                  </li>
                </ol>
                <p className="mt-4 text-sm bg-gray-50 p-3 rounded-md border border-gray-200">
                  <strong>Note:</strong> For complex cases, our team may require additional time to investigate and resolve your refund request.
                </p>
              </section>

              <section id="exclusions" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Exclusions</h2>
                <p className="mb-4">
                  Certain situations are excluded from our refund policy:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    Services that have been fully utilized or completed successfully.
                  </li>
                  <li>
                    Digital products or services that have been downloaded, accessed, or used.
                  </li>
                  <li>
                    Services where work has already begun on custom deliverables as specified in our Terms and Conditions.
                  </li>
                  <li>
                    Requests made after the specified refund timeframes have expired.
                  </li>
                  <li>
                    Cases where the customer has violated our Terms of Service or committed fraud.
                  </li>
                </ul>
                <p className="mb-4">
                  Roda Technologies reserves the right to review each case individually and may make exceptions at our discretion.
                </p>
              </section>

              <section id="service-cancellations" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Service Cancellations</h2>
                <p className="mb-4">
                  For service cancellations:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    <strong>Before Service Commencement:</strong> Cancellations made 48 hours or more before the scheduled start of service may be eligible for a full refund.
                  </li>
                  <li>
                    <strong>After Service Commencement:</strong> Partial refunds may be granted based on the portion of the service that was not delivered, minus any applicable fees.
                  </li>
                  <li>
                    <strong>Subscription Services:</strong> Cancellation of subscription services will stop future billing cycles but generally will not result in refunds for the current billing period.
                  </li>
                </ul>
              </section>

              <section id="payment-methods" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Payment Methods</h2>
                <p className="mb-4">
                  Refunds will be issued through the original payment method whenever possible:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <strong>Credit/Debit Cards:</strong> Refunds typically appear within 5-10 business days, depending on your card issuer.
                  </li>
                  <li>
                    <strong>Bank Transfers:</strong> Refunds may take 7-10 business days to process.
                  </li>
                  <li>
                    <strong>Digital Wallets:</strong> Refunds to PayPal, Apple Pay, or similar services usually process within 3-5 business days.
                  </li>
                  <li>
                    <strong>Store Credit:</strong> In some cases, we may offer store credit as an alternative to a monetary refund, which will be instantly available in your account.
                  </li>
                </ul>
              </section>

              <section id="special-circumstances" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Special Circumstances</h2>
                <p className="mb-4">
                  We understand that special circumstances may arise that fall outside the scope of our standard refund policy:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    <strong>Force Majeure:</strong> In the event of circumstances beyond our control (natural disasters, widespread outages, etc.), special considerations may apply to refund requests.
                  </li>
                  <li>
                    <strong>Medical Emergencies:</strong> With proper documentation, we may extend refund timeframes for customers experiencing medical emergencies.
                  </li>
                  <li>
                    <strong>Technical Issues:</strong> If our platform experiences significant technical problems that affect service delivery, we may proactively offer refunds or credits to affected customers.
                  </li>
                </ul>
                <p>
                  Each case will be reviewed individually by our customer service team.
                </p>
              </section>

              <section id="disputes" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Disputes & Resolution</h2>
                <p className="mb-4">
                  If you disagree with the decision regarding your refund request:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    You may appeal the decision by contacting our dedicated resolution team at <strong>refunds@roda.com</strong> within 7 days of receiving the initial decision.
                  </li>
                  <li>
                    Please include your order number, the reason for your appeal, and any additional information or evidence that supports your case.
                  </li>
                  <li>
                    Appeals are typically reviewed within 5 business days, and the decision of the resolution team is final.
                  </li>
                </ul>
                <p className="mb-4">
                  We are committed to resolving all disputes fairly and in accordance with our policies and applicable consumer protection laws.
                </p>
              </section>

              <section id="contact" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about our refund policy or need assistance with a refund request, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p><strong>Roda Technologies - Refund Department</strong></p>
                  <p>Email: refunds@roda.com</p>
                  <p>Phone: +92 (XXX) XXX-XXXX</p>
                  <p>Hours: Monday to Friday, 9:00 AM - 5:00 PM (Pakistan Standard Time)</p>
                  <p>Address: Technology Plaza, Suite 101, Islamabad, Pakistan</p>
                </div>
                <p className="mt-4">
                  We aim to respond to all inquiries within 24-48 business hours.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RefundPolicy;
