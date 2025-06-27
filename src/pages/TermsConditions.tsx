
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronRight, Shield, Lock, Eye, FileText } from "lucide-react";

const TermsConditions = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("acceptance");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sections = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "service-description", title: "Service Description" },
    { id: "user-accounts", title: "User Accounts" },
    { id: "service-usage", title: "Service Usage" },
    { id: "payment-terms", title: "Payment Terms" },
    { id: "partner-terms", title: "Partner Terms" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "limitation-liability", title: "Limitation of Liability" },
    { id: "termination", title: "Termination" },
    { id: "governing-law", title: "Governing Law" },
    { id: "contact", title: "Contact Us" }
  ];

  return (
    <MainLayout>
      <div className="relative overflow-hidden">
        {/* Solid Dark Blue Header */}
        <div className="bg-roda-700 py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">Terms & Conditions</h1>
            <p className="text-white text-lg">
              Last Updated: May 14, 2025 - Roda Technologies
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Side Navigation with Collapsible */}
            <div className="md:w-1/4 sticky top-24 self-start">
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
                    <nav className="space-y-1">
                      {sections.map((section) => (
                        <SideNavItem 
                          key={section.id}
                          active={activeSection === section.id} 
                          onClick={() => scrollToSection(section.id)}
                        >
                          {section.title}
                        </SideNavItem>
                      ))}
                    </nav>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            {/* Content Area */}
            <div className="md:w-3/4 bg-white rounded-lg shadow p-6">
              
              <section id="acceptance" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
                <p className="mb-4">
                  Welcome to Roda Technologies! By accessing or using our platform, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with these terms, please do not use our services.
                </p>
                <p className="mb-4">
                  These Terms & Conditions govern your access to and use of Roda Technologies' website, applications, and services (collectively, the "Services").
                </p>
              </section>

              <section id="service-description" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
                <p className="mb-4">
                  Roda Technologies provides a platform that connects businesses with professional service providers. Our platform offers a variety of services, including but not limited to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Web Design and Development</li>
                  <li>Digital Marketing</li>
                  <li>Content Creation</li>
                  <li>Business Consulting</li>
                  <li>and more...</li>
                </ul>
                <p className="mb-4">
                  We strive to ensure that all services are delivered with the highest standards of quality and professionalism.
                </p>
              </section>

              <section id="user-accounts" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
                <p className="mb-4">
                  To access certain features of our platform, you may be required to create a user account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                <p className="mb-4">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access to or use of your account.
                </p>
              </section>

              <section id="service-usage" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Service Usage</h2>
                <p className="mb-4">
                  You agree to use our Services only for lawful purposes and in accordance with these Terms & Conditions. You are solely responsible for your conduct and any content that you submit, post, or display on our platform.
                </p>
                <p className="mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Use our Services in any way that violates any applicable laws or regulations.</li>
                  <li>Infringe upon the rights of others.</li>
                  <li>Transmit any harmful or malicious code.</li>
                  <li>Interfere with or disrupt our Services.</li>
                </ul>
              </section>

              <section id="payment-terms" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
                <p className="mb-4">
                  By purchasing services on our platform, you agree to pay all applicable fees and charges. We accept various payment methods, as indicated on our website.
                </p>
                <p className="mb-4">
                  All fees are non-refundable unless otherwise stated in our Refund Policy. We reserve the right to change our fees at any time, but we will provide you with reasonable notice of any changes.
                </p>
              </section>

              <section id="partner-terms" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Partner Terms</h2>
                <p className="mb-4">
                  If you are a service provider on our platform, you agree to comply with our Partner Terms, which outline the specific terms and conditions applicable to your role.
                </p>
                <p className="mb-4">
                  Our Partner Terms cover topics such as service delivery, quality standards, payment terms, and dispute resolution.
                </p>
              </section>

              <section id="intellectual-property" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <p className="mb-4">
                  All content and materials on our platform, including but not limited to text, graphics, logos, and software, are the property of Roda Technologies or its licensors and are protected by copyright and other intellectual property laws.
                </p>
                <p className="mb-4">
                  You may not use, reproduce, or distribute any content from our platform without our prior written consent.
                </p>
              </section>

              <section id="limitation-liability" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p className="mb-4">
                  To the fullest extent permitted by law, Roda Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Your use of or inability to use our Services.</li>
                  <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
                  <li>Any interruption or cessation of transmission to or from our Services.</li>
                  <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Services.</li>
                </ul>
              </section>

              <section id="termination" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Termination</h2>
                <p className="mb-4">
                  We may terminate or suspend your account and access to our Services at any time, with or without cause, and without prior notice.
                </p>
                <p className="mb-4">
                  You may terminate your account at any time by contacting us. Upon termination, your right to use our Services will immediately cease.
                </p>
              </section>

              <section id="governing-law" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
                <p className="mb-4">
                  These Terms & Conditions shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law principles.
                </p>
                <p className="mb-4">
                  Any disputes arising out of or relating to these Terms & Conditions shall be resolved in the courts of Islamabad, Pakistan.
                </p>
              </section>

              <section id="contact" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about these Terms & Conditions, please contact us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg border">
                  <div className="space-y-2">
                    <p><strong>Roda Technologies</strong></p>
                    <p>Email: terms@roda.com</p>
                    <p>Phone: +92 (XXX) XXX-XXXX</p>
                    <p>Address: Technology Plaza, Suite 101, Islamabad, Pakistan</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Side navigation item component
const SideNavItem = ({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode; 
  active: boolean; 
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2 rounded text-sm transition-colors",
        active ? "bg-roda-100 text-roda-700 font-medium" : "text-gray-700 hover:bg-gray-100"
      )}
    >
      {children}
    </button>
  );
};

export default TermsConditions;
