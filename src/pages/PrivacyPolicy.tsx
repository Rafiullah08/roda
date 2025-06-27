import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Collapsible,
  CollapsibleContent
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const PrivacyPolicy = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("information-collection");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sections = [
    { id: "information-collection", title: "Information Collection" },
    { id: "information-use", title: "How We Use Information" },
    { id: "information-sharing", title: "Information Sharing" },
    { id: "data-security", title: "Data Security" },
    { id: "cookies", title: "Cookies & Tracking" },
    { id: "user-rights", title: "Your Rights" },
    { id: "data-retention", title: "Data Retention" },
    { id: "third-party", title: "Third-Party Services" },
    { id: "policy-updates", title: "Policy Updates" },
    { id: "contact", title: "Contact Us" }
  ];

  return (
    <MainLayout>
      {/* Solid Dark Blue Header */}
      <div className="bg-roda-700 py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
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
              <section id="information-collection" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Information Collection</h2>
                <p className="mb-4">
                  We collect information in several ways, including:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Information you provide directly to us (e.g., when you create an account).</li>
                  <li>Information collected automatically through your use of our services (e.g., IP address, browser type).</li>
                  <li>Information from third-party sources (e.g., social media platforms).</li>
                </ul>
                <p className="mb-4">
                  The types of information we collect include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Personal Information: Name, email address, contact details.</li>
                  <li>Account Information: Username, password.</li>
                  <li>Usage Data: IP address, browser type, pages visited.</li>
                </ul>
              </section>

              <section id="information-use" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">How We Use Information</h2>
                <p className="mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Providing and improving our services.</li>
                  <li>Personalizing your experience.</li>
                  <li>Communicating with you (e.g., sending updates and notifications).</li>
                  <li>Analyzing usage patterns.</li>
                </ul>
                <p className="mb-4">
                  We may also use your information for marketing purposes, but only with your consent.
                </p>
              </section>

              <section id="information-sharing" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
                <p className="mb-4">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Service providers who assist us in providing our services.</li>
                  <li>Business partners who offer services in conjunction with us.</li>
                  <li>Legal authorities when required by law.</li>
                </ul>
                <p className="mb-4">
                  We will not sell your personal information to third parties.
                </p>
              </section>

              <section id="data-security" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <p className="mb-4">
                  We take data security seriously and implement appropriate measures to protect your information.
                </p>
                <p className="mb-4">
                  These measures include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Encryption of sensitive data.</li>
                  <li>Regular security audits.</li>
                  <li>Access controls to limit who can access your information.</li>
                </ul>
                <p className="mb-4">
                  However, no method of transmission over the internet is completely secure, so we cannot guarantee absolute security.
                </p>
              </section>

              <section id="cookies" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Cookies & Tracking</h2>
                <p className="mb-4">
                  We use cookies and similar tracking technologies to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Analyze usage patterns.</li>
                  <li>Personalize your experience.</li>
                  <li>Provide targeted advertising.</li>
                </ul>
                <p className="mb-4">
                  You can control cookies through your browser settings.
                </p>
              </section>

              <section id="user-rights" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <p className="mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Access: You can request access to the personal information we hold about you.</li>
                  <li>Correction: You can request that we correct any inaccurate or incomplete information.</li>
                  <li>Deletion: You can request that we delete your personal information.</li>
                  <li>Objection: You can object to the processing of your personal information.</li>
                </ul>
                <p className="mb-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section id="data-retention" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
                <p className="mb-4">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.
                </p>
                <p className="mb-4">
                  When we no longer need your personal information, we will securely delete or anonymize it.
                </p>
              </section>

              <section id="third-party" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
                <p className="mb-4">
                  Our services may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.
                </p>
                <p className="mb-4">
                  We encourage you to review the privacy policies of any third-party websites or services you visit.
                </p>
              </section>

              <section id="policy-updates" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Policy Updates</h2>
                <p className="mb-4">
                  We may update this privacy policy from time to time. We will post any changes on our website and notify you of any material changes.
                </p>
                <p className="mb-4">
                  Your continued use of our services after the effective date of the updated policy constitutes your acceptance of the changes.
                </p>
              </section>

              <section id="contact" className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this privacy policy, please contact us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg border">
                  <div className="space-y-2">
                    <p><strong>Roda Technologies</strong></p>
                    <p>Email: privacy@roda.com</p>
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

export default PrivacyPolicy;
