
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Code,
  Palette,
  Megaphone,
  Headphones,
  Award,
  PenTool,
  Phone,
  Calendar,
  Zap,
  Building2,
  Globe,
  TrendingUp,
  MessageSquare,
  Star,
  Clock,
  Settings,
  FileText,
  Briefcase,
  UserCheck,
  Lightbulb,
  Layers,
  Rocket,
  Shield,
  Eye,
  Play,
  CheckSquare,
  Search,
  UserPlus
} from "lucide-react";
import { Link } from "react-router-dom";

const TalentIntegration = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTalent, setActiveTalent] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTalent((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const talentTypes = [
    {
      icon: Code,
      title: "Tech & IT Experts",
      description: "Developers, IT Support, Web & App Specialists",
      color: "from-emerald-500 to-emerald-600",
      availability: "Ready",
      mode: "Remote"
    },
    {
      icon: Palette,
      title: "Design & Branding",
      description: "UI/UX Designers, Graphic Design Experts",
      color: "from-purple-500 to-purple-600",
      availability: "Ready",
      mode: "Remote"
    },
    {
      icon: Megaphone,
      title: "Marketing Specialists",
      description: "Digital Marketing, SEO, Social Media Experts",
      color: "from-orange-500 to-orange-600",
      availability: "Ready",
      mode: "Remote"
    },
    {
      icon: Headphones,
      title: "Operations Support",
      description: "Virtual Assistants, Process Managers",
      color: "from-blue-500 to-blue-600",
      availability: "Ready",
      mode: "Remote"
    },
    {
      icon: Award,
      title: "Compliance & Quality",
      description: "ISO Experts, QA Consultants",
      color: "from-teal-500 to-teal-600",
      availability: "Ready",
      mode: "On-site (PK)"
    },
    {
      icon: PenTool,
      title: "Writers & Planners",
      description: "Technical Writers, Business Planners",
      color: "from-indigo-500 to-indigo-600",
      availability: "Ready",
      mode: "Remote"
    }
  ];

  const whyChooseUs = [
    {
      icon: Target,
      title: "Talent + Project Management",
      description: "Not just outsourcing - complete integration with project oversight"
    },
    {
      icon: Globe,
      title: "Local & Global Expertise",
      description: "Priority to Pakistani talent with global backup options"
    },
    {
      icon: Settings,
      title: "End-to-End Integration",
      description: "Briefing, onboarding, and ongoing follow-up included"
    },
    {
      icon: Shield,
      title: "Transparent & Reliable",
      description: "Clear pricing, reliable timelines, and proven processes"
    },
    {
      icon: UserCheck,
      title: "Pre-Vetted Professionals",
      description: "Curated talent pool, not random connections"
    },
    {
      icon: Rocket,
      title: "Fast Deployment",
      description: "Quick matching and rapid onboarding process"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Tell Us What You Need",
      description: "Project-based, role-based, or short-term help requirements",
      icon: MessageSquare
    },
    {
      step: "02", 
      title: "Get Curated Talent Matches",
      description: "From our vetted professional pool based on your needs",
      icon: Search
    },
    {
      step: "03",
      title: "Start with Confidence", 
      description: "We brief, onboard, and set up milestone tracking",
      icon: Rocket
    },
    {
      step: "04",
      title: "Ongoing Oversight",
      description: "We help manage task/project flow for guaranteed success",
      icon: Eye
    }
  ];

  const packages = [
    {
      title: "Talent Only",
      description: "We match perfect talent, you manage the workflow",
      icon: UserPlus,
      features: ["Curated talent matching", "Basic onboarding", "Direct connection"]
    },
    {
      title: "Talent + PM",
      description: "We handle both talent and workflow management",
      icon: Settings,
      features: ["Talent matching", "Project management", "Progress tracking", "Tool integration"]
    },
    {
      title: "Full-Service Delivery",
      description: "Complete solution with talent, tools, and result tracking",
      icon: Layers,
      features: ["End-to-end management", "Result tracking", "Quality assurance", "Delivery guarantee"]
    }
  ];

  const tools = [
    { name: "Notion", desc: "Project documentation" },
    { name: "Slack", desc: "Team communication" },
    { name: "Trello", desc: "Task management" },
    { name: "Asana", desc: "Project tracking" }
  ];

  const faqs = [
    {
      question: "Do you provide freelancers or full-time staff?",
      answer: "We focus on project-ready experts and can provide part-time, full-time, or one-time help based on your specific needs."
    },
    {
      question: "Do you help onboard and manage the person?",
      answer: "Yes. We ensure smooth integration with proper briefing, tool setup, and ongoing follow-up throughout the engagement."
    },
    {
      question: "Are your resources local or international?",
      answer: "We offer both. Priority is given to Pakistani talent, but we also include global experts when specific skills are needed."
    },
    {
      question: "How quickly can you deploy talent?",
      answer: "Typically within 3-5 days for most roles. Emergency requests can be accommodated within 24-48 hours."
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-20 h-20 bg-blue-200 rounded-full opacity-30 animate-bounce"></div>
            <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-25 animate-float"></div>
            <div className="absolute top-60 right-1/3 w-16 h-16 bg-orange-200 rounded-full opacity-20 animate-spin-slow"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 bg-teal-200 rounded-full opacity-15 animate-pulse"></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 animate-pulse">
                🚀 Top Talent Integration Services
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Top Talent for Your Business{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 animate-pulse">
                  On-Demand, On-Target
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                We help Pakistani businesses find, integrate, and manage skilled professionals and project teams – 
                with full process support from start to finish.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200">
                  <Users className="mr-2 h-5 w-5" />
                  Get Talent Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-gray-50 transform hover:scale-105 transition-all duration-200">
                  <Phone className="mr-2 h-5 w-5" />
                  Book Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Talent, Integrated with Strategy</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Unlike freelance platforms, we don't just connect you with random people. We understand your project, 
                then match you with pre-vetted experts—and we manage the outcome with clear systems and tools.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {talentTypes.map((talent, index) => (
                <Card 
                  key={index} 
                  className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
                    activeTalent === index ? 'ring-2 ring-emerald-500 shadow-lg' : ''
                  }`}
                  onMouseEnter={() => setActiveTalent(index)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${talent.color} rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:scale-110`}>
                      <talent.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{talent.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{talent.description}</p>
                    <div className="flex justify-center gap-2">
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        ✅ {talent.availability}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {talent.mode}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4 bg-gradient-to-r from-emerald-50 to-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Work With Us</h2>
              <p className="text-xl text-gray-600">What sets our talent integration apart from the competition</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
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

        {/* How It Works */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How Talent Integration Works</h2>
              <p className="text-xl text-gray-600">Our proven 4-step process for seamless talent integration</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
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

        {/* Tools Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-emerald-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Tools We Use to Support Projects</h2>
              <p className="text-xl text-gray-600 mb-8">
                We don't just give you talent—we integrate them into your system using proven collaboration tools
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {tools.map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
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

        {/* Service Packages */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Talent + Management Packages</h2>
              <p className="text-xl text-gray-600">
                We offer more than just connections — we manage project execution too
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <pkg.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{pkg.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{pkg.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, fIndex) => (
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
        <section className="py-16 px-4 bg-gradient-to-r from-emerald-50 to-blue-50">
          <div className="container mx-auto">
            <Card className="max-w-4xl mx-auto border-2 border-emerald-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center">Real Success Story</CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-yellow-500 fill-current animate-pulse" />
                  ))}
                </div>
                <blockquote className="text-2xl font-semibold text-gray-800 mb-4">
                  "We needed a digital marketer fast. Within 3 days, they connected us with the right expert 
                  and set up a clear campaign tracker on Trello. Smooth and measurable."
                </blockquote>
                <p className="text-gray-600 mb-6">— Local Exporter, Karachi</p>
                <Button variant="outline" className="hover:bg-emerald-50">
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
              <p className="text-xl text-gray-600">Common questions about our talent integration services</p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
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
        <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Get Started – Book Your Match</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Need help but don't know where to start? Book a free 30-minute consultation and let us 
              find the perfect talent for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
                <Users className="mr-2 h-5 w-5" />
                Request Talent
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-emerald-600 transform hover:scale-105 transition-all duration-200">
                <Rocket className="mr-2 h-5 w-5" />
                Start a Project Now
              </Button>
            </div>
            <div className="mt-8">
              <Badge className="bg-yellow-500 text-black text-lg px-4 py-2 animate-pulse">
                🎯 Free 30-Min Consultation Included
              </Badge>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default TalentIntegration;
