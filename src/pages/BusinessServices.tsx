
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Users, 
  Shield,
  CheckCircle,
  ArrowRight,
  Calendar,
  MessageSquare,
  Phone,
  Settings,
  TrendingUp,
  FileText,
  Clock,
  Building2,
  Factory,
  Globe,
  Heart,
  Briefcase,
  Star,
  Play,
  Zap,
  Award,
  UserCheck,
  BarChart3,
  ChevronRight,
  CheckSquare
} from "lucide-react";
import { Link } from "react-router-dom";

const BusinessServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    const serviceInterval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 3);
    }, 2500);
    return () => {
      clearInterval(stepInterval);
      clearInterval(serviceInterval);
    };
  }, []);

  const problems = [
    "Slow hiring processes",
    "High consulting fees", 
    "Misaligned expectations",
    "Freelancers without accountability"
  ];

  const services = [
    {
      title: "Operations Support",
      description: "SOP creation, process optimization, performance monitoring",
      details: "Process mapping, workflow improvement, performance dashboards, SOP documentation",
      icon: Settings,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Quality & Regulatory",
      description: "ISO setup, audits, compliance systems, documentation", 
      details: "ISO 9001/14001 systems, audits, compliance reports, quality manual creation",
      icon: Shield,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Talent & Resource Management",
      description: "Remote team coordination, task delegation systems, onboarding workflows",
      details: "Task assignment systems, performance tracking, remote team integration",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const howItWorksSteps = [
    {
      step: "01",
      title: "You tell us what you need",
      description: "Share your business requirements and challenges with our team",
      icon: MessageSquare,
      color: "from-blue-500 to-indigo-500"
    },
    {
      step: "02", 
      title: "We match you with the right certified expert",
      description: "Our curated network of pre-vetted specialists gets assigned to your project",
      icon: UserCheck,
      color: "from-indigo-500 to-purple-500"
    },
    {
      step: "03",
      title: "We manage timelines, revisions, and quality",
      description: "Complete project management through our controlled delivery process",
      icon: BarChart3,
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "04",
      title: "You get results — without the hassle",
      description: "Receive high-quality deliverables with full accountability and support",
      icon: Award,
      color: "from-pink-500 to-red-500"
    }
  ];

  const whyChooseUs = [
    {
      title: "Accountability First",
      description: "Every project is managed by us, not freelancers.",
      icon: CheckCircle,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Expert-Curated Network", 
      description: "We vet and train every partner before assigning them.",
      icon: Star,
      color: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Controlled Delivery Process",
      description: "All communication, revisions, and timelines run through our system.",
      icon: Settings,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const industries = [
    { name: "Manufacturing", icon: Factory },
    { name: "Technology", icon: Globe },
    { name: "E-commerce", icon: Briefcase },
    { name: "Health & Safety", icon: Heart },
    { name: "Professional Services", icon: Building2 }
  ];

  const testimonials = [
    {
      quote: "Roda helped us set up our ISO system in half the time — fully managed and stress-free.",
      author: "CEO, Manufacturing Company"
    },
    {
      quote: "I don't chase freelancers anymore. One point of contact, and everything gets done.",
      author: "Operations Director, Tech Startup"
    }
  ];

  const qualityPoints = [
    "Internal quality review",
    "Client feedback integration", 
    "Specialist performance history",
    "Predictable results guarantee"
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4">
          <div className="absolute inset-0">
            <div className="absolute top-16 left-8 w-40 h-40 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute top-32 right-16 w-24 h-24 bg-purple-200 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-40 left-1/3 w-32 h-32 bg-emerald-200 rounded-full opacity-25 animate-float"></div>
            <div className="absolute top-48 right-1/4 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-spin-slow"></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200 animate-pulse text-lg px-4 py-2">
                Expert-Led Business Solutions
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Effortless Expertise for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
                  Complex Business Needs
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                From operations to quality systems and team management — get expert-led services, 
                fully managed by Roda Technologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200">
                  <Play className="mr-2 h-5 w-5" />
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-gray-50 transform hover:scale-105 transition-all duration-200">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Problem We Solve */}
        <section className="py-16 px-4 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Traditional Hiring & Consulting Is Broken</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {problems.map((problem, index) => (
                  <Card key={index} className="border-red-200 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-red-600 font-bold">✗</span>
                      </div>
                      <p className="text-gray-700 font-medium">{problem}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-xl text-gray-600 mt-8 font-semibold">
                Businesses need results — not complexity. Roda Technologies replaces chaos with clarity.
              </p>
            </div>
          </div>
        </section>

        {/* Our Solution */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">A Curated, Managed Network That Works Like Your Remote Ops Team</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              We provide access to pre-vetted experts and deliver fully managed services across key areas 
              of business operations — all under one brand, one system, one standard.
            </p>
            
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <Card 
                  key={index} 
                  className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${service.bgColor} ${
                    activeService === index ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''
                  }`}
                  onMouseEnter={() => setActiveService(index)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:scale-110`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="text-sm text-gray-500 bg-white p-3 rounded-lg border">
                      <strong>Details:</strong> {service.details}
                    </div>
                    <Badge className="mt-3 bg-green-100 text-green-800">
                      ✅ Fully Managed
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">We Handle Everything — So You Can Focus on Growth</h2>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid gap-8">
                {howItWorksSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-8 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                      index % 2 === 1 ? 'flex-row-reverse' : ''
                    } ${
                      activeStep === index ? 'transform scale-105 ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className={`flex-shrink-0 w-24 h-24 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center relative`}>
                      <step.icon className="h-12 w-12 text-white" />
                      <div className="absolute -top-2 -right-2 bg-white text-gray-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-2 border-gray-200">
                        {step.step}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Roda Technologies */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Us Different?</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Applications */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Who We Help</h2>
              <p className="text-xl text-gray-600 mb-8">
                We work with growth-focused companies across sectors like:
              </p>
            </div>
            
            <div className="grid md:grid-cols-5 gap-6 max-w-4xl mx-auto mb-8">
              {industries.map((industry, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6">
                    <industry.icon className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-700">{industry.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-lg text-gray-600 font-medium">
                If your business needs expert execution without full-time hiring — we're your partner.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-2 border-blue-200 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg font-medium text-gray-800 mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <p className="text-gray-600">— {testimonial.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Promise */}
        <section className="py-16 px-4 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Quality Guarantee</h2>
              <p className="text-xl text-gray-600 mb-8">Every project is monitored through:</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {qualityPoints.map((point, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckSquare className="h-6 w-6 text-emerald-600" />
                    </div>
                    <p className="text-gray-700 font-medium">{point}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-lg text-gray-600 font-semibold">
                We ensure predictable results, not surprises.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Simple, Scalable Pricing</h2>
            <div className="max-w-3xl mx-auto mb-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-3" />
                  <span className="text-gray-700">Pay per project or monthly support plan</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-3" />
                  <span className="text-gray-700">Transparent scope, no hidden charges</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-3" />
                  <span className="text-gray-700">Add-on support available for complex needs</span>
                </div>
              </div>
            </div>
            <Button size="lg" variant="outline" className="hover:bg-blue-50">
              <FileText className="mr-2 h-5 w-5" />
              View Pricing Plans
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Expert Support Without Hiring?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Transform your business operations with our managed expert network. 
              Get started today and focus on what matters most — growing your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200">
                <MessageSquare className="mr-2 h-5 w-5" />
                Submit a Service Request
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200">
                <Users className="mr-2 h-5 w-5" />
                Explore Our Network
              </Button>
            </div>
            <div className="mt-8">
              <Badge className="bg-yellow-500 text-black text-lg px-4 py-2 animate-pulse">
                Free Business Assessment & Strategy Session
              </Badge>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default BusinessServices;
