
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { ChevronRight, MessageSquare, FileText, HelpCircle } from "lucide-react";

const Support = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("getting-started");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const supportCategories = [
    { id: "getting-started", title: "Getting Started", icon: HelpCircle },
    { id: "account-billing", title: "Account & Billing", icon: FileText },
    { id: "services", title: "Services", icon: FileText },
    { id: "partners", title: "Partner Program", icon: FileText },
    { id: "orders", title: "Orders & Delivery", icon: FileText },
    { id: "contact", title: "Contact Us", icon: MessageSquare },
  ];

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Register' button in the top right corner of our homepage. Fill in your details, including your name, email address, and password. Once completed, you'll receive a verification email to activate your account."
    },
    {
      question: "How do I purchase a service?",
      answer: "Browse our services page, select the service you're interested in, and click on it to view details. If you decide to purchase, click the 'Buy Now' or 'Request Quote' button, and follow the checkout process. You'll need to be logged in to complete your purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment gateway."
    },
    {
      question: "How do I become a partner?",
      answer: "To become a partner, visit our 'Become a Partner' page and fill out the application form. Our team will review your application and contact you within 5-7 business days to discuss the next steps. Partners are selected based on their expertise and ability to deliver our existing services."
    },
    {
      question: "What is your refund policy?",
      answer: "Our refund policy allows for refunds within 14 days of purchase for standard services if the service hasn't been delivered yet. For subscription services, refunds must be requested within 7 days of the billing date. Please refer to our Refund Policy page for complete details."
    }
  ];

  return (
    <MainLayout>
      {/* Solid Dark Blue Header */}
      <div className="bg-roda-700 py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Support Center</h1>
          <p className="text-white text-lg mb-6">
            Find answers to your questions and get the help you need
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-1/4 w-full md:sticky md:top-24 self-start">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Help Categories</h2>
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
                    {supportCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => scrollToSection(category.id)}
                        className={cn(
                          "py-2 px-3 text-left rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2",
                          activeSection === category.id 
                            ? "bg-roda-100 text-roda-700 font-medium" 
                            : "text-gray-700"
                        )}
                      >
                        <category.icon className="h-4 w-4" />
                        <span>{category.title}</span>
                      </button>
                    ))}
                  </nav>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="bg-white rounded-lg shadow p-4 mt-6">
              <h2 className="text-lg font-semibold mb-4">Need More Help?</h2>
              <div className="flex flex-col space-y-3">
                <Button variant="outline" className="justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Live Chat
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Submit a Ticket
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 w-full">
            {/* Featured Help Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>Learn the basics of using our platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Creating your account</li>
                    <li>Browsing services</li>
                    <li>Understanding service packages</li>
                    <li>Making your first purchase</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account & Billing</CardTitle>
                  <CardDescription>Manage your account and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Account settings</li>
                    <li>Payment methods</li>
                    <li>Billing history</li>
                    <li>Subscription management</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Partner Program</CardTitle>
                  <CardDescription>Information for service providers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Becoming a partner</li>
                    <li>Service delivery</li>
                    <li>Order management</li>
                    <li>Payments and withdrawals</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Help Sections */}
            <div className="bg-white rounded-lg shadow p-6">
              <section id="getting-started" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
                <p className="mb-4">
                  Welcome to Roda Technologies! This section will help you understand how to get started with our platform and make the most of our services.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Creating Your Account</h3>
                    <p>To access our full range of services, you'll need to create an account. Click on the "Register" button in the top right corner of our homepage and follow the steps to set up your profile.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Finding the Right Services</h3>
                    <p>Browse our service categories or use the search functionality to find services that match your needs. Each service listing includes detailed information about what's included and which partners are available to deliver it.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Understanding Service Packages</h3>
                    <p>Many of our services offer different packages (Basic, Standard, Premium) with varying features and delivery timeframes. Review these options to find the one that best suits your requirements.</p>
                  </div>
                </div>
              </section>

              <section id="account-billing" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Account & Billing</h2>
                <p className="mb-4">
                  Manage your account settings, payment methods, and review your billing history.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Managing Your Profile</h3>
                    <p>Access your profile settings from the dashboard to update your personal information, change your password, or adjust notification preferences.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Payment Methods</h3>
                    <p>We accept various payment methods including credit cards, PayPal, and bank transfers. You can add or remove payment methods from your account settings.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Invoices and Receipts</h3>
                    <p>All your invoices and receipts are available in the "Billing History" section of your dashboard. You can download or print them for your records.</p>
                  </div>
                </div>
              </section>
              
              <section id="services" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Services</h2>
                <p className="mb-4">
                  Learn more about the various services we offer and how to make the most of them.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Service Catalog</h3>
                    <p>Our platform offers a curated catalog of services designed to meet various business needs. Each service is carefully designed and standardized to ensure consistent quality.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Service Delivery</h3>
                    <p>Our services are delivered by vetted partners who have been trained to provide these specific services according to our standards. This ensures you receive consistent, high-quality results regardless of which partner delivers your service.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Custom Requests</h3>
                    <p>If you need modifications to an existing service, you can communicate your specific requirements during the ordering process. Our partners will work within our service framework to accommodate reasonable customizations.</p>
                  </div>
                </div>
              </section>

              <section id="partners" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Partner Program</h2>
                <p className="mb-4">
                  Information for current and prospective service providers on our platform.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Becoming a Partner</h3>
                    <p>Unlike traditional freelance platforms, our partners don't create their own services. Instead, they apply to deliver our existing, standardized services. This ensures consistency for our clients and reduces the setup burden for partners.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Partner Selection Process</h3>
                    <p>Partners are carefully vetted based on their expertise, experience, and ability to deliver our specific services. We provide comprehensive training to ensure all partners can maintain our quality standards.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Service Assignment</h3>
                    <p>Once approved, partners are assigned to specific services based on their skills and expertise. When a client places an order, it's routed to the most appropriate available partner.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Managing Orders</h3>
                    <p>Partners use our dashboard to manage assigned orders, communicate with clients, deliver work, and request reviews. All within our structured workflow to maintain service consistency.</p>
                  </div>
                </div>
              </section>

              <section id="orders" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Orders & Delivery</h2>
                <p className="mb-4">
                  Everything you need to know about placing orders and receiving deliveries.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Placing an Order</h3>
                    <p>Select the service you want, choose your preferred package, and proceed to checkout. You'll receive a confirmation email once your order is placed and assigned to a partner.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Order Status</h3>
                    <p>Track the status of your orders through your dashboard. You'll be notified when the partner starts working on your order and when it's ready for delivery.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Receiving Deliveries</h3>
                    <p>When your order is complete, you'll be notified to review and accept the delivery. You can request revisions if needed before finalizing the order.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2">Quality Assurance</h3>
                    <p>All deliveries are checked against our service standards. If you're not satisfied with the quality, our support team will work with you and the partner to resolve any issues.</p>
                  </div>
                </div>
              </section>

              <section id="contact" className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="mb-4">
                  Need further assistance? Get in touch with our support team.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-medium mb-4">Support Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-md shadow-sm">
                      <h4 className="font-medium text-lg mb-2">Live Chat</h4>
                      <p className="mb-3">Available Monday to Friday, 9:00 AM - 6:00 PM (Pakistan Standard Time)</p>
                      <Button>Start Chat</Button>
                    </div>
                    <div className="p-4 bg-white rounded-md shadow-sm">
                      <h4 className="font-medium text-lg mb-2">Email Support</h4>
                      <p className="mb-3">Send us an email at support@roda.com</p>
                      <Button variant="outline">Send Email</Button>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white rounded-md shadow-sm">
                    <h4 className="font-medium text-lg mb-2">Phone Support</h4>
                    <p>For urgent inquiries: +92 (XXX) XXX-XXXX</p>
                    <p>Available 24/7 for premium clients</p>
                  </div>
                </div>
              </section>

              {/* Frequently Asked Questions */}
              <section className="mt-12">
                <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p>{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Support;
