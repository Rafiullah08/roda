
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
  GraduationCap,
  Star,
  Play,
  Zap,
  Award,
  UserCheck,
  BarChart3,
  ChevronRight,
  CheckSquare,
  Briefcase,
  Heart,
  Globe,
  Palette,
  Code,
  PenTool,
  Search,
  Monitor,
  Lightbulb,
  Eye,
  BookOpen,
  Rocket,
  UserPlus,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

const IndividualServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeBenefit, setActiveBenefit] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    const benefitInterval = setInterval(() => {
      setActiveBenefit((prev) => (prev + 1) % 3);
    }, 2500);
    return () => {
      clearInterval(stepInterval);
      clearInterval(benefitInterval);
    };
  }, []);

  const problems = [
    "Endless proposals & rejections",
    "Unclear project scope", 
    "Clients ghosting mid-project",
    "Inconsistent income and feedback"
  ];

  const benefits = [
    {
      title: "Project Matching",
      description: "We assign you to projects that fit your skills, availability, and past performance",
      icon: Target,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Skill Development",
      description: "Access optional micro-training, certification, and mentorship programs",
      icon: GraduationCap,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Reliable Support",
      description: "Project scope, client expectations, revisions, and timelines managed by our team",
      icon: Shield,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const howToJoinSteps = [
    {
      step: "01",
      title: "Apply Online",
      description: "Tell us about your skills, experience, and goals through our application process",
      icon: FileText,
      color: "from-blue-500 to-indigo-500"
    },
    {
      step: "02", 
      title: "Get Vetted",
      description: "We review your profile, portfolio, and communication fit for our network",
      icon: UserCheck,
      color: "from-indigo-500 to-purple-500"
    },
    {
      step: "03",
      title: "Start Projects",
      description: "Once approved, you'll be eligible for assignment and certification programs",
      icon: Rocket,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const requirements = [
    "Proven expertise in your field",
    "Strong communication skills",
    "Willingness to follow structured workflows",
    "Commitment to quality and deadlines"
  ];

  const rolesInDemand = [
    {
      category: "Creative & Digital",
      examples: "Web Design, Branding, Copywriting",
      icon: Palette,
      color: "from-pink-500 to-red-500"
    },
    {
      category: "Technical Services",
      examples: "Web Development, Automation, API Integrations",
      icon: Code,
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: "Business Services", 
      examples: "ISO Documentation, Operations SOPs, Market Research",
      icon: Briefcase,
      color: "from-emerald-500 to-teal-500"
    },
    {
      category: "Project & QA",
      examples: "Remote PMs, QA Reviewers, Compliance Specialists",
      icon: CheckSquare,
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const supportFeatures = [
    {
      title: "Scope & Planning Done for You",
      description: "No more guessing client requirements",
      icon: Target
    },
    {
      title: "Timeline & Delivery Coordination",
      description: "We handle all project management",
      icon: Clock
    },
    {
      title: "Communication Managed via Our Platform",
      description: "Professional communication channels",
      icon: MessageSquare
    },
    {
      title: "Commission-Based Payouts",
      description: "No chasing clients for payments",
      icon: CheckCircle
    }
  ];

  const testimonials = [
    {
      quote: "I've worked on more meaningful projects with Roda in 3 months than I did in a whole year freelancing alone.",
      author: "Senior Web Developer"
    },
    {
      quote: "They treat us like professionals. No client stress, no pitch decks — just quality work with real support.",
      author: "Graphic Designer & Brand Specialist"
    }
  ];

  const certificationBenefits = [
    "Brand-aligned training",
    "System walkthroughs", 
    "Quality expectations",
    "Exclusive project access"
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4">
          <div className="absolute inset-0">
            <div className="absolute top-16 left-8 w-40 h-40 bg-indigo-200 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute top-32 right-16 w-24 h-24 bg-cyan-200 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-40 left-1/3 w-32 h-32 bg-purple-200 rounded-full opacity-25 animate-float"></div>
            <div className="absolute top-48 right-1/4 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-spin-slow"></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Badge className="mb-6 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 animate-pulse text-lg px-4 py-2">
                Your Career, Curated
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Do Meaningful Work.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 animate-pulse">
                  From Anywhere.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                Join Roda Technologies' vetted talent network to get matched with premium projects, 
                skill training, and ongoing support — all without bidding, pitching, or guesswork.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Apply to Join
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-gray-50 transform hover:scale-105 transition-all duration-200">
                  <Eye className="mr-2 h-5 w-5" />
                  View Requirements
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Problem We Solve */}
        <section className="py-16 px-4 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Tired of Freelancing Chaos?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {problems.map((problem, index) => (
                  <Card key={index} className="border-red-200 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <X className="text-red-600 h-6 w-6" />
                      </div>
                      <p className="text-gray-700 font-medium">{problem}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-xl text-gray-600 mt-8 font-semibold">
                Roda Technologies gives skilled individuals a structured, respectful, and high-quality work experience.
              </p>
            </div>
          </div>
        </section>

        {/* Our Model */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">We're Not a Marketplace. We're a Partner.</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              We don't make you compete with 1,000 freelancers. Instead, we match you with curated projects 
              and manage everything so you can focus on what you do best: delivering results.
            </p>
            
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card 
                  key={index} 
                  className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${benefit.bgColor} ${
                    activeBenefit === index ? 'ring-2 ring-indigo-500 shadow-lg scale-105' : ''
                  }`}
                  onMouseEnter={() => setActiveBenefit(index)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:scale-110`}>
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                    <Badge className="mt-3 bg-green-100 text-green-800">
                      ✅ Included
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Remote Projects */}
        <section className="py-16 px-4 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Remote Projects You Can Trust</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    <Shield className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Pre-qualified Clients</h3>
                    <p className="text-gray-600">Companies and professionals we've vetted</p>
                  </CardContent>
                </Card>
                <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    <FileText className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Clear Scopes</h3>
                    <p className="text-gray-600">Delivery standards defined upfront</p>
                  </CardContent>
                </Card>
                <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Reliable Payments</h3>
                    <p className="text-gray-600">Structured workflows and timely payouts</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Who We're Looking For */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Do You Fit the Roda Network?</h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {requirements.map((requirement, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex items-center">
                      <CheckCircle className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{requirement}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Roles in Demand */}
        <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Currently Seeking Experts In:</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {rolesInDemand.map((role, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${role.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <role.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{role.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm text-center">{role.examples}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certification Program */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Become a Roda-Certified Specialist</h2>
              <p className="text-xl text-gray-600 mb-8">
                Gain exclusive access to premium projects by completing our free certification process
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Certification Includes:</h3>
                  <div className="space-y-4">
                    {certificationBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Card className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-center">
                  <CardContent className="p-8">
                    <Award className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Roda Certified</h3>
                    <p className="text-lg">Specialist</p>
                    <Badge className="mt-4 bg-white text-indigo-600">
                      Profile Badge
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How We Support You */}
        <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">We've Got Your Back — Every Step of the Way</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {supportFeatures.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Join */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Three Steps to Start</h2>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid gap-8">
                {howToJoinSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-8 p-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                      index % 2 === 1 ? 'flex-row-reverse' : ''
                    } ${
                      activeStep === index ? 'transform scale-105 ring-2 ring-indigo-500' : ''
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

        {/* Testimonials */}
        <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Partners Say</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-2 border-indigo-200 shadow-lg">
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

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Level Up Your Career?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join a network that values your expertise and supports your professional growth. 
              Start working on meaningful projects with reliable clients today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
                <UserPlus className="mr-2 h-5 w-5" />
                Apply to Join the Network
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-indigo-600 transform hover:scale-105 transition-all duration-200">
                <Award className="mr-2 h-5 w-5" />
                Start Your Certification
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-indigo-600 transform hover:scale-105 transition-all duration-200">
                <Eye className="mr-2 h-5 w-5" />
                Learn More About Project Types
              </Button>
            </div>
            <div className="mt-8">
              <Badge className="bg-yellow-500 text-black text-lg px-4 py-2 animate-pulse">
                Free Certification Program Available
              </Badge>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default IndividualServices;
