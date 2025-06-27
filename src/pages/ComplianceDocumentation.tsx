
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Shield, 
  CheckCircle, 
  Target, 
  Clock, 
  Star, 
  ArrowRight,
  Award,
  FileCheck,
  ClipboardCheck,
  BookOpen,
  Users,
  Settings,
  Phone,
  Calendar,
  Zap,
  Building2,
  Search,
  TrendingUp,
  MessageSquare,
  Globe,
  Eye,
  Briefcase,
  FolderOpen,
  PenTool,
  ShieldCheck,
  FileSearch,
  Lightbulb
} from "lucide-react";
import { Link } from "react-router-dom";

const ComplianceDocumentation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 6);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const coreServices = [
    {
      icon: Award,
      title: "ISO Compliance (9001, 14001, etc.)",
      description: "Complete certification support and documentation",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: FileCheck,
      title: "QMS, EMS, and HSE Documentation",
      description: "Quality, Environmental & Safety management systems",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Search,
      title: "Internal Audit & Gap Analysis",
      description: "Identify compliance gaps and improvement areas",
      color: "from-green-500 to-green-600"
    },
    {
      icon: BookOpen,
      title: "SOPs, Policies, & Manuals Development",
      description: "Comprehensive operational documentation",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: ShieldCheck,
      title: "Buyer Audit Preparation (BSCI, SEDEX, etc.)",
      description: "International buyer compliance requirements",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: FileText,
      title: "Regulatory Documentation (SECP, FBR, etc.)",
      description: "Local regulatory compliance and filing",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Industry-Specific Standards",
      description: "Deep understanding of ISO, buyer audits, and local regulations"
    },
    {
      icon: Settings,
      title: "Customized Documentation Systems",
      description: "Tailored solutions for your specific business needs"
    },
    {
      icon: Globe,
      title: "On-site and Remote Support",
      description: "Flexible delivery methods to suit your preferences"
    },
    {
      icon: TrendingUp,
      title: "Affordable Solutions for SMEs",
      description: "Cost-effective compliance for small and medium enterprises"
    },
    {
      icon: Lightbulb,
      title: "Practical Documentation",
      description: "Easy-to-follow systems your team can actually use"
    },
    {
      icon: CheckCircle,
      title: "Proven Track Record",
      description: "Successful audit preparations and certifications"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Gap Analysis / Audit",
      description: "Understand your current compliance status and identify gaps",
      icon: FileSearch
    },
    {
      step: "02", 
      title: "Plan & Prioritize",
      description: "Create a custom compliance roadmap with timelines",
      icon: Target
    },
    {
      step: "03",
      title: "Document Development", 
      description: "We write and organize all needed documentation files",
      icon: PenTool
    },
    {
      step: "04",
      title: "Training & Handover",
      description: "Train your team to use and maintain the system",
      icon: Users
    },
    {
      step: "05",
      title: "Ongoing Support",
      description: "For audits, renewals, and continuous improvements",
      icon: Zap
    }
  ];

  const documentTypes = [
    { name: "Standard Operating Procedures (SOPs)", icon: ClipboardCheck },
    { name: "Quality Manuals", icon: BookOpen },
    { name: "Health & Safety Policies", icon: Shield },
    { name: "Environmental Control Plans", icon: Globe },
    { name: "Employee Handbooks", icon: Users },
    { name: "Internal Audit Checklists", icon: CheckCircle },
    { name: "Buyer Compliance Folders", icon: FolderOpen }
  ];

  const tools = [
    { name: "Notion", desc: "Digital documentation hub" },
    { name: "Trello", desc: "Project tracking" },
    { name: "Google Docs", desc: "Collaborative writing" },
    { name: "Excel", desc: "Data management" }
  ];

  const industries = [
    "Manufacturers & Exporters",
    "Leather & Textile Industries", 
    "Service-Based SMEs",
    "Warehousing & Logistics",
    "Startups needing formal systems",
    "Businesses preparing for audits"
  ];

  const engagementOptions = [
    {
      title: "One-Time Documentation Setup",
      description: "Complete documentation package for immediate compliance",
      icon: FileText
    },
    {
      title: "Audit Preparation Packages",
      description: "Targeted prep for specific audits and certifications",
      icon: Award
    },
    {
      title: "Monthly Compliance Support",
      description: "Ongoing guidance and system maintenance",
      icon: Calendar
    },
    {
      title: "Training & Onboarding Sessions",
      description: "Staff training on compliance systems and procedures",
      icon: Users
    }
  ];

  const faqs = [
    {
      question: "Can you prepare documentation for our specific buyer audit?",
      answer: "Yes, we customize documentation based on your buyer's exact requirements including BSCI, SEDEX, and other international standards."
    },
    {
      question: "Do you help with ISO certification?",
      answer: "Absolutely. We provide end-to-end support from gap analysis to implementation, including audit preparation and ongoing maintenance."
    },
    {
      question: "Will you train our staff?",
      answer: "Yes, training is an integral part of every documentation and compliance project to ensure your team can maintain the systems."
    },
    {
      question: "How long does the documentation process take?",
      answer: "Depending on complexity, most projects are completed within 4-8 weeks, with training and handover included."
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-float"></div>
            <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-green-200 rounded-full opacity-25 animate-bounce"></div>
            <div className="absolute top-60 right-1/3 w-14 h-14 bg-orange-200 rounded-full opacity-20 animate-ping"></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200 animate-pulse">
                🛡️ Compliance & Documentation Excellence
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Compliance & Documentation{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse">
                  Services for Businesses
                </span>{" "}
                in Pakistan
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Stay audit-ready, improve credibility, and meet client or regulatory requirements with our 
                expert compliance and documentation support. From ISO certifications to buyer audits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200">
                  <FileCheck className="mr-2 h-5 w-5" />
                  Book Free Compliance Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-gray-50 transform hover:scale-105 transition-all duration-200">
                  <Phone className="mr-2 h-5 w-5" />
                  Talk to a Consultant
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Do – At a Glance</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We help businesses in Pakistan develop strong documentation systems, achieve compliance with 
                local and international standards, and prepare for client, buyer, or ISO audits.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreServices.map((service, index) => (
                <Card 
                  key={index} 
                  className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
                    activeService === index ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onMouseEnter={() => setActiveService(index)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:scale-110`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-purple-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <p className="text-xl text-gray-600">What makes us the right partner for your compliance needs</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Proven Process</h2>
              <p className="text-xl text-gray-600">How we ensure your compliance success every step of the way</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-lg px-3 py-1">
                      {step.step}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Document Types */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Types of Documents We Prepare</h2>
              <p className="text-xl text-gray-600 mb-8">
                Comprehensive documentation solutions tailored to your compliance requirements
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentTypes.map((doc, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <doc.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{doc.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tools We Use */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Tools We Use</h2>
              <p className="text-xl text-gray-600 mb-8">
                We organize documentation digitally for easier access, sharing, and version control
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {tools.map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Settings className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                    <p className="text-gray-600 text-sm">{tool.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Who We Serve</h2>
              <p className="text-xl text-gray-600">We serve businesses across Pakistan in various industries:</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {industries.map((industry, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800">{industry}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <Card className="max-w-4xl mx-auto border-2 border-purple-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center">Success Story</CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-yellow-500 fill-current animate-pulse" />
                  ))}
                </div>
                <blockquote className="text-2xl font-semibold text-gray-800 mb-4">
                  "A Sialkot-based exporter passed their BSCI buyer audit with our documentation package 
                  and internal training. Now, they're working with EU buyers confidently."
                </blockquote>
                <p className="text-gray-600 mb-6">— Export Manager, Manufacturing Company</p>
                <Button variant="outline" className="hover:bg-purple-50">
                  <BookOpen className="mr-2 h-5 w-5" />
                  View More Case Studies
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Engagement Options */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Engagement Options</h2>
              <p className="text-xl text-gray-600">Choose the support level that fits your needs</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {engagementOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600">Custom packages available based on your business type and requirements.</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Common questions about our compliance and documentation services</p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">Q</span>
                      </div>
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 ml-9">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Stay Audit Ready</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Don't let missing documents cost you an order or delay your audit. Take the first step 
              towards comprehensive compliance and documentation excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
                <Calendar className="mr-2 h-5 w-5" />
                Book FREE Compliance Review
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-200">
                <MessageSquare className="mr-2 h-5 w-5" />
                Call Us for Details
              </Button>
            </div>
            <div className="mt-8">
              <Badge className="bg-yellow-500 text-black text-lg px-4 py-2 animate-pulse">
                🎯 Limited Time: Free Gap Analysis Included
              </Badge>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ComplianceDocumentation;
