
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Users, 
  BarChart3, 
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Calendar,
  MessageSquare,
  Phone,
  Settings,
  Lightbulb,
  TrendingUp,
  Search,
  FileText,
  Monitor,
  Clock,
  Building2,
  GraduationCap,
  Factory,
  Heart,
  Briefcase,
  Layers,
  GitBranch,
  Eye,
  BookOpen,
  Rocket,
  Star,
  Play,
  CheckSquare,
  Globe,
  Palette,
  Code
} from "lucide-react";
import { Link } from "react-router-dom";

const DigitalProjectManagement = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 8);
    }, 3000);
    const serviceInterval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 6);
    }, 2500);
    return () => {
      clearInterval(stepInterval);
      clearInterval(serviceInterval);
    };
  }, []);

  const services = [
    {
      icon: Target,
      title: "Project Planning & Execution",
      description: "Strategic planning with clear roadmaps and milestone tracking",
      color: "from-purple-500 to-purple-600",
      status: "Core Service"
    },
    {
      icon: Users,
      title: "Team Collaboration Setup",
      description: "Seamless team coordination using modern collaboration tools",
      color: "from-blue-500 to-blue-600",
      status: "Essential"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking & Reporting",
      description: "Real-time dashboards and comprehensive progress reports",
      color: "from-emerald-500 to-emerald-600",
      status: "Analytics"
    },
    {
      icon: Shield,
      title: "Risk & Issue Management",
      description: "Proactive risk identification and mitigation strategies",
      color: "from-red-500 to-red-600",
      status: "Protection"
    },
    {
      icon: Zap,
      title: "Agile Sprint Execution",
      description: "Flexible sprint cycles with continuous improvement",
      color: "from-yellow-500 to-yellow-600",
      status: "Agile"
    },
    {
      icon: Settings,
      title: "Tool Integration & Process Design",
      description: "Custom workflow design with tool integration",
      color: "from-indigo-500 to-indigo-600",
      status: "Integration"
    }
  ];

  const frameworkSteps = [
    {
      step: "01",
      title: "Discovery & Needs Assessment",
      description: "Understanding your goals, processes, and challenges to create a tailored project plan",
      icon: Search,
      color: "from-purple-500 to-blue-500"
    },
    {
      step: "02",
      title: "Planning & Roadmapping",
      description: "Breaking down objectives into actionable tasks with clear timelines and deliverables",
      icon: Target,
      color: "from-blue-500 to-indigo-500"
    },
    {
      step: "03",
      title: "Agile Project Execution",
      description: "Running sprints with real-time collaboration and continuous feedback loops",
      icon: Zap,
      color: "from-indigo-500 to-purple-500"
    },
    {
      step: "04",
      title: "Monitoring & Optimization",
      description: "Tracking progress with dashboards and adjusting based on feedback and changes",
      icon: BarChart3,
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "05",
      title: "Resource & Time Management",
      description: "Balancing workloads and avoiding bottlenecks for maximum productivity",
      icon: Clock,
      color: "from-pink-500 to-red-500"
    },
    {
      step: "06",
      title: "Performance Reviews",
      description: "Running retrospectives and client reviews to measure project health",
      icon: TrendingUp,
      color: "from-red-500 to-orange-500"
    },
    {
      step: "07",
      title: "Documentation & Reporting",
      description: "Comprehensive logging and organization in Notion for future reference",
      icon: FileText,
      color: "from-orange-500 to-yellow-500"
    },
    {
      step: "08",
      title: "Project Closure & Training",
      description: "Final delivery with team training for long-term success",
      icon: GraduationCap,
      color: "from-yellow-500 to-green-500"
    }
  ];

  const clientTypes = [
    {
      icon: Rocket,
      title: "Startups & Small Teams",
      description: "Fast-moving teams that need agile project management",
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: Factory,
      title: "Exporters & Manufacturers",
      description: "Complex supply chain and production project coordination",
      color: "from-blue-500 to-emerald-500"
    },
    {
      icon: GraduationCap,
      title: "NGOs & Educational Projects",
      description: "Mission-driven projects with specific timelines and budgets",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Building2,
      title: "Local Businesses Adopting Tech",
      description: "Traditional businesses transitioning to digital workflows",
      color: "from-teal-500 to-purple-500"
    }
  ];

  const engagementModels = [
    {
      title: "Per Project",
      description: "For defined goals and deliverables with clear scope",
      icon: Target,
      features: ["Fixed scope", "Clear timeline", "Defined deliverables", "Milestone payments"]
    },
    {
      title: "Monthly Retainer",
      description: "For long-term projects requiring ongoing management",
      icon: Calendar,
      features: ["Ongoing support", "Monthly reporting", "Flexible scope", "Priority access"]
    },
    {
      title: "Per Sprint",
      description: "Agile cycles with fixed reviews and iterations",
      icon: Zap,
      features: ["2-4 week sprints", "Regular reviews", "Agile methodology", "Flexible adjustments"]
    },
    {
      title: "PM as a Service",
      description: "Hire a dedicated project manager for your team",
      icon: Users,
      features: ["Dedicated PM", "Full integration", "Long-term partnership", "Custom processes"]
    }
  ];

  const tools = [
    { name: "Notion", desc: "Documentation & planning", icon: BookOpen },
    { name: "Slack", desc: "Team communication", icon: MessageSquare },
    { name: "Trello", desc: "Task management", icon: CheckSquare },
    { name: "Asana", desc: "Project tracking", icon: Target }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-16 left-8 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute top-32 right-16 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-40 left-1/3 w-32 h-32 bg-emerald-200 rounded-full opacity-25 animate-float"></div>
            <div className="absolute top-48 right-1/4 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-spin-slow"></div>
            <div className="absolute bottom-16 right-12 w-36 h-36 bg-teal-200 rounded-full opacity-15 animate-pulse"></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Badge className="mb-6 bg-purple-100 text-purple-800 hover:bg-purple-200 animate-pulse text-lg px-4 py-2">
                Manage Your Projects Smarter
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Modern, Agile, and{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse">
                  Tool-Driven
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                Digitize your workflow using Notion, Slack, Trello, and Asana. Designed for businesses 
                in Pakistan looking for speed, clarity, and control.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-gray-50 transform hover:scale-105 transition-all duration-200">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What We Deliver Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Deliver</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive project management services designed for modern businesses
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card 
                  key={index} 
                  className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
                    activeService === index ? 'ring-2 ring-purple-500 shadow-lg' : ''
                  }`}
                  onMouseEnter={() => setActiveService(index)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:scale-110`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      ✅ {service.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 8-Step Framework - New Style */}
        <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our 8-Step Digital Project Management Framework</h2>
              <p className="text-xl text-gray-600 mb-8">
                A comprehensive, flexible approach that ensures success from day one
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8">
                {frameworkSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-8 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                      index % 2 === 1 ? 'flex-row-reverse' : ''
                    } ${
                      activeStep === index ? 'transform scale-105 ring-2 ring-purple-500' : ''
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

        {/* Who We Serve */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Who We Serve</h2>
              <p className="text-xl text-gray-600 mb-8">
                Specialized expertise for diverse business sectors
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {clientTypes.map((client, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${client.color} rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:scale-110`}>
                      <client.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{client.title}</h3>
                    <p className="text-gray-600 text-sm">{client.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement Models */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Engagement Models</h2>
              <p className="text-xl text-gray-600">
                Flexible pricing options to match your project needs and budget
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {engagementModels.map((model, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <model.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{model.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{model.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {model.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Digital Toolkit</h2>
              <p className="text-xl text-gray-600 mb-8">
                Industry-standard tools for effective project management and collaboration
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {tools.map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <tool.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                    <p className="text-gray-600 text-sm">{tool.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Story */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="container mx-auto">
            <Card className="max-w-4xl mx-auto border-2 border-purple-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center">Client Success Story</CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-yellow-500 fill-current animate-pulse" />
                  ))}
                </div>
                <blockquote className="text-2xl font-semibold text-gray-800 mb-4">
                  "Their digital project management approach transformed our workflow efficiency by 300%. 
                  We delivered projects 40% faster with complete visibility and control."
                </blockquote>
                <p className="text-gray-600 mb-6">— CEO, Karachi-based Export Company</p>
                <Button variant="outline" className="hover:bg-purple-50">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Read More Success Stories
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              We help you launch, manage, and scale projects with complete control and visibility. 
              Transform your project management approach today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
                <Phone className="mr-2 h-5 w-5" />
                Book a Free Call
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-200">
                <MessageSquare className="mr-2 h-5 w-5" />
                Live Chat (10 AM – 6 PM PKT)
              </Button>
            </div>
            <div className="mt-8">
              <Badge className="bg-yellow-500 text-black text-lg px-4 py-2 animate-pulse">
                Free Project Assessment & Strategy Session
              </Badge>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default DigitalProjectManagement;
