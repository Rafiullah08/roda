
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Code,
  Palette,
  Lightbulb,
  Users,
  TrendingUp,
  Search,
  Phone,
  Calendar,
  Zap,
  Building2,
  Globe,
  MessageSquare,
  Star,
  Clock,
  Settings,
  FileText,
  Briefcase,
  Monitor,
  Layers,
  Shield,
  Eye,
  Play,
  CheckSquare,
  Smartphone,
  Database,
  BarChart3,
  Heart,
  ShoppingCart,
  GraduationCap,
  Cpu,
  PenTool,
  TestTube
} from "lucide-react";
import { Link } from "react-router-dom";

const ProductDevelopment = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const serviceInterval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 6);
    }, 2500);
    const industryInterval = setInterval(() => {
      setActiveIndustry((prev) => (prev + 1) % 5);
    }, 3500);
    return () => {
      clearInterval(serviceInterval);
      clearInterval(industryInterval);
    };
  }, []);

  const services = [
    {
      icon: Target,
      title: "Product Strategy & Roadmapping",
      description: "Strategic planning and roadmap development for your product vision",
      color: "from-blue-500 to-blue-600",
      status: "Available"
    },
    {
      icon: Palette,
      title: "Design & Prototyping",
      description: "UI/UX design and interactive prototypes for validation",
      color: "from-purple-500 to-purple-600",
      status: "Available"
    },
    {
      icon: Code,
      title: "MVP Development",
      description: "Minimum Viable Product development for market testing",
      color: "from-emerald-500 to-emerald-600",
      status: "Available"
    },
    {
      icon: Users,
      title: "User Testing & Feedback",
      description: "User experience testing and feedback integration",
      color: "from-orange-500 to-orange-600",
      status: "Available"
    },
    {
      icon: BarChart3,
      title: "Market Analysis & Positioning",
      description: "Market research and competitive positioning strategy",
      color: "from-teal-500 to-teal-600",
      status: "Available"
    },
    {
      icon: TrendingUp,
      title: "Post-Launch Support",
      description: "Ongoing support and product iteration after launch",
      color: "from-indigo-500 to-indigo-600",
      status: "Available"
    }
  ];

  const whyChooseUs = [
    {
      icon: Users,
      title: "Expert Talent Pool",
      description: "Access to vetted professionals across various industries and technologies"
    },
    {
      icon: Settings,
      title: "Customized Solutions",
      description: "Tailored strategies to meet unique product requirements and market needs"
    },
    {
      icon: Zap,
      title: "Agile Methodology",
      description: "Flexible and iterative approach for optimal results and faster delivery"
    },
    {
      icon: Layers,
      title: "End-to-End Support",
      description: "From ideation to launch and beyond, comprehensive product development"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Rigorous testing and quality control throughout development process"
    },
    {
      icon: Rocket,
      title: "Market-Ready Products",
      description: "Focus on creating products that succeed in the Pakistani market"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      description: "Understanding your vision, goals, and market requirements",
      icon: Search
    },
    {
      step: "02", 
      title: "Planning",
      description: "Developing strategic roadmap and technical specifications",
      icon: FileText
    },
    {
      step: "03",
      title: "Execution", 
      description: "Designing, developing, and testing your product iteratively",
      icon: Code
    },
    {
      step: "04",
      title: "Launch",
      description: "Deploying product to market with full support and monitoring",
      icon: Rocket
    },
    {
      step: "05",
      title: "Optimization",
      description: "Gathering feedback and refining for continuous improvement",
      icon: TrendingUp
    }
  ];

  const industries = [
    {
      icon: Monitor,
      title: "Technology & Software",
      description: "Web apps, mobile apps, SaaS platforms, and enterprise solutions",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Heart,
      title: "Healthcare & Biotech",
      description: "Health management systems, telemedicine, and medical devices",
      color: "from-red-500 to-red-600"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce & Retail",
      description: "Online stores, marketplace platforms, and retail management systems",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Cpu,
      title: "Manufacturing & Engineering",
      description: "Industrial automation, IoT solutions, and process optimization",
      color: "from-gray-500 to-gray-600"
    },
    {
      icon: GraduationCap,
      title: "Education & E-learning",
      description: "Learning management systems, online courses, and educational apps",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const tools = [
    { name: "Notion", desc: "Project documentation", icon: FileText },
    { name: "Slack", desc: "Team communication", icon: MessageSquare },
    { name: "Trello", desc: "Task management", icon: CheckSquare },
    { name: "Asana", desc: "Project tracking", icon: Target }
  ];

  const pricingModels = [
    {
      title: "Fixed-Price Projects",
      description: "For well-defined scopes with clear deliverables",
      icon: FileText,
      features: ["Defined scope", "Fixed timeline", "Predictable costs", "Quality guarantee"]
    },
    {
      title: "Time & Material",
      description: "Flexible billing based on actual work and iterations",
      icon: Clock,
      features: ["Flexible scope", "Hourly billing", "Regular updates", "Transparent tracking"]
    },
    {
      title: "Dedicated Teams",
      description: "Long-term collaboration with dedicated resources",
      icon: Users,
      features: ["Dedicated team", "Long-term partnership", "Scalable resources", "Full integration"]
    }
  ];

  const faqs = [
    {
      question: "Can you handle both design and development?",
      answer: "Yes, we offer comprehensive services covering UI/UX design, prototyping, development, testing, and deployment."
    },
    {
      question: "How do you ensure product-market fit?",
      answer: "Through rigorous market research, user testing phases, MVP development, and continuous feedback integration."
    },
    {
      question: "What if I only have an idea?",
      answer: "We can assist from the ideation phase, helping you shape, validate, and realize your concept into a market-ready product."
    },
    {
      question: "Do you provide post-launch support?",
      answer: "Yes, we offer ongoing support, maintenance, updates, and iterative improvements based on user feedback and market changes."
    }
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
            <div className="absolute top-48 right-1/4 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-spin-slow"></div>
            <div className="absolute bottom-16 right-12 w-36 h-36 bg-teal-200 rounded-full opacity-15 animate-pulse"></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Badge className="mb-6 bg-purple-100 text-purple-800 hover:bg-purple-200 animate-pulse text-lg px-4 py-2">
                🚀 Transform Ideas into Market-Ready Products
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Innovate, Develop,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse">
                  Deliver
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                Partner with us to bring your product visions to life, leveraging top-tier talent and 
                streamlined processes tailored for the Pakistani market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-gray-50 transform hover:scale-105 transition-all duration-200">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Empowering Product Innovation</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We aim to bridge the gap between concept and market by providing comprehensive product development services, 
                ensuring quality, efficiency, and scalability for businesses across Pakistan.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Services Offered</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive product development services from concept to market launch
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

        {/* Why Choose Us */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Product Development Services</h2>
              <p className="text-xl text-gray-600">What sets our product development approach apart</p>
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

        {/* Process Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Development Process</h2>
              <p className="text-xl text-gray-600">A proven 5-step methodology for successful product development</p>
            </div>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
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

        {/* Industries Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
              <p className="text-xl text-gray-600 mb-8">
                Specialized expertise across diverse industry verticals
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {industries.map((industry, index) => (
                <Card 
                  key={index} 
                  className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
                    activeIndustry === index ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  }`}
                  onMouseEnter={() => setActiveIndustry(index)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${industry.color} rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:scale-110`}>
                      <industry.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{industry.title}</h3>
                    <p className="text-gray-600 text-sm">{industry.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Tools & Platforms We Utilize</h2>
              <p className="text-xl text-gray-600 mb-8">
                Industry-standard tools for effective collaboration and project management
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

        {/* Pricing Models */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Pricing Models</h2>
              <p className="text-xl text-gray-600">
                Flexible pricing options to match your project needs and budget
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingModels.map((model, index) => (
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

        {/* Success Story */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
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
                  "Collaborating with this team accelerated our product development cycle, resulting in a 
                  successful launch and increased market share."
                </blockquote>
                <p className="text-gray-600 mb-6">— CEO, Lahore-based Tech Startup</p>
                <Button variant="outline" className="hover:bg-purple-50">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Read More Success Stories
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
              <p className="text-xl text-gray-600">Common questions about our product development services</p>
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
            <h2 className="text-4xl font-bold mb-6">Ready to Bring Your Product Idea to Life?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Transform your vision into a market-ready product with our comprehensive development services. 
              Let's innovate together and create something extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
                <Rocket className="mr-2 h-5 w-5" />
                Start Your Project
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-200">
                <Phone className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-200">
                <MessageSquare className="mr-2 h-5 w-5" />
                Live Chat
              </Button>
            </div>
            <div className="mt-8">
              <Badge className="bg-yellow-500 text-black text-lg px-4 py-2 animate-pulse">
                🎯 Free Consultation & Product Strategy Session
              </Badge>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ProductDevelopment;
