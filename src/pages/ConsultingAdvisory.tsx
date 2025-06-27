
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Target, 
  Clock, 
  Star, 
  ArrowRight,
  CheckCircle,
  Building2,
  BarChart3,
  FileText,
  Settings,
  MessageSquare,
  Phone,
  Calendar,
  Lightbulb,
  Zap,
  Globe,
  Award,
  PlayCircle,
  BookOpen,
  ShieldCheck,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";

const ConsultingAdvisory = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: Settings,
      title: "Business Process Improvement",
      description: "Streamline operations and eliminate bottlenecks",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: BarChart3,
      title: "Project & Task Management",
      description: "Better planning, tracking, and execution",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Target,
      title: "Market Research & Business Planning",
      description: "Data-driven strategies for growth",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: ShieldCheck,
      title: "Quality Systems & ISO Preparation",
      description: "Compliance and certification support",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Users,
      title: "Internal Team Structuring",
      description: "Optimize team organization and workflows",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Globe,
      title: "System & Software Advisory",
      description: "Technology solutions for business growth",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const whyChooseUs = [
    {
      icon: Target,
      title: "Pakistani Business Focus",
      description: "Deep understanding of local market challenges and opportunities"
    },
    {
      icon: Lightbulb,
      title: "Practical Solutions",
      description: "Simple, actionable strategies—not just theory"
    },
    {
      icon: Clock,
      title: "End-to-End Support",
      description: "From planning to execution and beyond"
    },
    {
      icon: Building2,
      title: "Long-Term Partnership",
      description: "Continuous growth, not just quick fixes"
    },
    {
      icon: CheckCircle,
      title: "Transparent Process",
      description: "Clear methodologies and regular progress updates"
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Track record of helping businesses achieve growth"
    }
  ];

  const tools = [
    { name: "Notion", desc: "All-in-one workspace" },
    { name: "Slack", desc: "Team communication" },
    { name: "Trello", desc: "Visual project management" },
    { name: "Asana", desc: "Task & workflow management" }
  ];

  const industries = [
    "Leather & Textile Manufacturing",
    "Service-Based Businesses", 
    "Growing Startups",
    "Freelance & Digital Teams",
    "Local Exporters & B2B Traders"
  ];

  const approach = [
    {
      step: "01",
      title: "Listen & Understand",
      description: "We start by deeply understanding your pain points and business goals",
      icon: MessageSquare
    },
    {
      step: "02", 
      title: "Custom Strategy",
      description: "No templates—we create tailored solutions for your unique situation",
      icon: Briefcase
    },
    {
      step: "03",
      title: "Action & Execution", 
      description: "Step-by-step implementation with hands-on support",
      icon: Zap
    },
    {
      step: "04",
      title: "Support & Review",
      description: "Continuous check-ins and improvements for long-term success",
      icon: Award
    }
  ];

  const faqs = [
    {
      question: "Do you work with startups?",
      answer: "Yes, we help startups create systems from scratch and build strong foundations for growth."
    },
    {
      question: "Can you help us implement ISO standards?",
      answer: "Absolutely. We guide you through the full documentation and internal audit process for ISO certification."
    },
    {
      question: "Do you offer ongoing support?",
      answer: "Yes, monthly check-ins and continuous improvement support are part of our advisory plans."
    },
    {
      question: "What makes you different from other consultants?",
      answer: "We focus specifically on Pakistani businesses, offer practical (not theoretical) solutions, and provide ongoing partnership support."
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-20 h-20 bg-green-200 rounded-full opacity-30 animate-bounce"></div>
            <div className="absolute bottom-32 left-1/4 w-14 h-14 bg-purple-200 rounded-full opacity-25 animate-ping"></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 animate-pulse">
                🚀 Business Growth Made Simple
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Helping Pakistani Businesses{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 animate-pulse">
                  Grow with Smart Systems
                </span>{" "}
                & Practical Strategies
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Your trusted consultancy partner for process improvement, project management, and business growth. 
                We provide hands-on support tailored to Pakistani business challenges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-gray-50 transform hover:scale-105 transition-all duration-200">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
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
                We provide hands-on support to small and medium-sized businesses in Pakistan, helping them 
                improve systems, manage projects better, and make smarter decisions for growth.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card 
                  key={index} 
                  className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
                    activeService === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onMouseEnter={() => setActiveService(index)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:scale-110`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <p className="text-xl text-gray-600">What makes us the right partner for your business growth</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
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

        {/* Our Approach */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Proven Approach</h2>
              <p className="text-xl text-gray-600">How we ensure your success every step of the way</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {approach.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-lg px-3 py-1">
                      {step.step}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools We Work With */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Tools We Work With</h2>
              <p className="text-xl text-gray-600 mb-8">
                We help you set up and train your team on simple, effective tools that improve 
                task tracking, team collaboration, and overall productivity.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
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

        {/* Who We Work With */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Who We Work With</h2>
              <p className="text-xl text-gray-600">We serve business owners and teams across Pakistan in:</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {industries.map((industry, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
        <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="container mx-auto">
            <Card className="max-w-4xl mx-auto border-2 border-green-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center">Success Story</CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-yellow-500 fill-current animate-pulse" />
                  ))}
                </div>
                <blockquote className="text-2xl font-semibold text-gray-800 mb-4">
                  "Before working with us, a local manufacturer had no clear workflow for quality checks. 
                  We built a custom Notion dashboard and SOPs. Within a month, their rework rate dropped by 40%."
                </blockquote>
                <p className="text-gray-600 mb-6">— Manufacturing Client, Karachi</p>
                <Button variant="outline" className="hover:bg-green-50">
                  <BookOpen className="mr-2 h-5 w-5" />
                  View More Case Studies
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Common questions about our consulting services</p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
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
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Take the first step towards improved systems, better processes, and sustainable growth. 
              Let's work together to build the business you've always envisioned.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
                <Calendar className="mr-2 h-5 w-5" />
                Book FREE 30-Minute Consultation
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200">
                <MessageSquare className="mr-2 h-5 w-5" />
                WhatsApp Us
              </Button>
            </div>
            <div className="mt-8">
              <Badge className="bg-yellow-500 text-black text-lg px-4 py-2 animate-pulse">
                🎯 Limited Time: Free Business Assessment Included
              </Badge>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ConsultingAdvisory;
