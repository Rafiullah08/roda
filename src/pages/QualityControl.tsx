
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Shield, 
  Users, 
  Target, 
  Clock, 
  Star, 
  ArrowRight,
  Award,
  Eye,
  MessageCircle,
  TrendingUp,
  FileCheck,
  Zap,
  Phone,
  PlayCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const QualityControl = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const qualityFeatures = [
    {
      icon: CheckCircle,
      title: "Consistency in Results",
      description: "Standardized processes ensure reliable outcomes every time"
    },
    {
      icon: Clock,
      title: "Fewer Revisions and Delays",
      description: "Pre-vetted professionals reduce project friction"
    },
    {
      icon: Target,
      title: "Better Business Alignment",
      description: "Matched talent that understands your industry goals"
    }
  ];

  const vettingSteps = [
    {
      icon: Shield,
      title: "Identity & Background Verification",
      description: "Comprehensive background checks and identity validation"
    },
    {
      icon: FileCheck,
      title: "Portfolio Assessment",
      description: "Detailed review of work history and past performance"
    },
    {
      icon: Award,
      title: "Skill-Specific Testing",
      description: "Rigorous testing and structured interviews"
    },
    {
      icon: Eye,
      title: "Live Performance Evaluation",
      description: "Real-world testing for expert tier candidates"
    }
  ];

  const monitoringMetrics = [
    { label: "Client Feedback", icon: MessageCircle },
    { label: "Delivery Times", icon: Clock },
    { label: "Communication Standards", icon: Users },
    { label: "Output Quality", icon: Star }
  ];

  const industries = [
    "SaaS and Tech",
    "Manufacturing and Supply Chain", 
    "Branding and Creative",
    "Tech Support and Consulting"
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
            <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-25 animate-bounce"></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 animate-pulse">
                🧪 Quality Control Excellence
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Reliable Talent.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
                  Verified Results.
                </span>{" "}
                Guaranteed Quality.
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                At Roda Technologies, quality isn't a checkbox — it's the foundation of everything we do. 
                From sourcing professionals to delivering projects, our layered quality control process 
                ensures consistency, credibility, and peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200">
                  📩 Get a Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-gray-50 transform hover:scale-105 transition-all duration-200">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  🔍 Explore Our Process
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Quality Control Matters */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Quality Control Matters</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your business deserves more than random freelancers or unverified agencies. 
                Our quality control framework is designed to reduce risks, improve outcomes, and create long-term value.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {qualityFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-blue-200">
                  <CardContent className="p-6 text-center">
                    <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Two-Tier Quality Assurance System */}
        <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Two-Tier Quality Assurance System</h2>
              <p className="text-xl text-gray-600">We offer two levels of service based on your business needs:</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center">
                    <Zap className="mr-2 h-6 w-6" />
                    Standard Model
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">Pre-verified professionals for flexible, fast-paced projects.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Quick deployment</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Cost-effective</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Verified skills</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-purple-200">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center">
                    <Award className="mr-2 h-6 w-6" />
                    Expert Model
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">Elite, rigorously vetted experts for critical, high-value initiatives.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-purple-500 mr-2" />Rigorous vetting</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-purple-500 mr-2" />Top-tier talent</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-purple-500 mr-2" />Premium results</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-8">
              <Badge className="bg-yellow-100 text-yellow-800 text-lg px-4 py-2 animate-pulse">
                🎯 You choose. We guarantee quality either way.
              </Badge>
            </div>
          </div>
        </section>

        {/* Vetting Process */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Vetting Process</h2>
              <p className="text-xl text-gray-600">We don't let just anyone in. Our multi-step evaluation includes:</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vettingSteps.map((step, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-white">
                        {index + 1}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Monitoring */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Ongoing Performance Monitoring</h2>
              <p className="text-xl text-gray-600 mb-8">
                After onboarding, professionals are continuously evaluated based on:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {monitoringMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                    <metric.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="font-semibold text-gray-800">{metric.label}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 max-w-2xl mx-auto">
                Underperformers are coached or removed to maintain standards, ensuring you always get the best talent.
              </p>
            </div>
          </div>
        </section>

        {/* Industry-Specific Quality */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Tailored Quality Frameworks by Industry</h2>
              <p className="text-xl text-gray-600">We adapt our quality checks based on your sector:</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((industry, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 hover:border-blue-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800">{industry}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600">Each industry has different needs — we understand them.</p>
            </div>
          </div>
        </section>

        {/* Success Story */}
        <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="container mx-auto">
            <Card className="max-w-4xl mx-auto border-2 border-green-200 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-yellow-500 fill-current animate-pulse" />
                  ))}
                </div>
                <blockquote className="text-2xl font-semibold text-gray-800 mb-4">
                  "We saved 40% in project time thanks to Roda's quality control framework."
                </blockquote>
                <p className="text-gray-600 mb-6">— Head of Operations, Textile Manufacturer</p>
                <Button variant="outline" className="hover:bg-green-50">
                  📖 View More Case Studies
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Work with Confidence?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Partner with a team that treats quality as a process — not a promise. Whether you need a 
              short-term boost or a long-term partner, Roda Technologies ensures every step is accountable and results-driven.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
                <Phone className="mr-2 h-5 w-5" />
                Schedule a Discovery Call
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200">
                <Eye className="mr-2 h-5 w-5" />
                See Our Quality Workflow in Action
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default QualityControl;
