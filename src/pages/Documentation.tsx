
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Code, 
  Globe, 
  Shield, 
  Users, 
  Settings,
  BookOpen,
  Download,
  ExternalLink
} from "lucide-react";

const Documentation = () => {
  const documentationSections = [
    {
      title: "Getting Started",
      icon: BookOpen,
      items: [
        { name: "Platform Overview", type: "Guide", status: "Available" },
        { name: "Account Setup", type: "Tutorial", status: "Available" },
        { name: "First Project", type: "Quick Start", status: "Available" },
      ]
    },
    {
      title: "For Businesses",
      icon: Globe,
      items: [
        { name: "Service Categories", type: "Reference", status: "Available" },
        { name: "Project Management", type: "Guide", status: "Available" },
        { name: "Quality Assurance", type: "Process", status: "Available" },
        { name: "Billing & Payments", type: "Guide", status: "Available" },
      ]
    },
    {
      title: "For Partners",
      icon: Users,
      items: [
        { name: "Application Process", type: "Guide", status: "Available" },
        { name: "Certification Requirements", type: "Reference", status: "Available" },
        { name: "Project Delivery Standards", type: "Guidelines", status: "Available" },
        { name: "Performance Metrics", type: "Reference", status: "Available" },
      ]
    },
    {
      title: "API Documentation",
      icon: Code,
      items: [
        { name: "REST API Reference", type: "Technical", status: "Coming Soon" },
        { name: "Authentication", type: "Technical", status: "Coming Soon" },
        { name: "Webhooks", type: "Technical", status: "Coming Soon" },
        { name: "Rate Limits", type: "Technical", status: "Coming Soon" },
      ]
    },
    {
      title: "Security & Compliance",
      icon: Shield,
      items: [
        { name: "Data Protection Policy", type: "Policy", status: "Available" },
        { name: "Security Protocols", type: "Technical", status: "Available" },
        { name: "Compliance Standards", type: "Reference", status: "Available" },
        { name: "Audit Reports", type: "Report", status: "Available" },
      ]
    },
    {
      title: "Support Resources",
      icon: Settings,
      items: [
        { name: "Troubleshooting", type: "Guide", status: "Available" },
        { name: "Best Practices", type: "Guide", status: "Available" },
        { name: "Video Tutorials", type: "Media", status: "Available" },
        { name: "FAQ", type: "Reference", status: "Available" },
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Coming Soon":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Documentation Center
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Everything you need to know about using Roda Technologies platform effectively
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF Guide
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  API Reference
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Comprehensive Documentation
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Browse our complete documentation library organized by categories to find exactly what you need
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {documentationSections.map((section, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <section.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-500">{item.type}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Quick Access Resources
                </h2>
                <p className="text-lg text-gray-600">
                  Essential resources for immediate assistance
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Quick Start Guide</CardTitle>
                    <CardDescription>Get up and running in minutes</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">API Docs</CardTitle>
                    <CardDescription>Complete API reference</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Community</CardTitle>
                    <CardDescription>Connect with other users</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Settings className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Support</CardTitle>
                    <CardDescription>Get help when you need it</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Need More Help?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Contact Support
                </Button>
                <Button size="lg" variant="outline">
                  Submit Feedback
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Documentation;
