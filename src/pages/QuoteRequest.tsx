
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Users, Clock } from "lucide-react";
import { useServiceDetail } from "@/hooks/service/serviceDetail";
import { CustomQuoteForm } from "@/components/quote-request/CustomQuoteForm";

const QuoteRequest = () => {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("service");
  const navigate = useNavigate();
  const { service, loading } = useServiceDetail(serviceId || undefined);

  useEffect(() => {
    // Redirect if no service ID is provided
    if (!serviceId && !loading) {
      navigate("/services");
    }
  }, [serviceId, loading, navigate]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <p>Loading service details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!service) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col justify-center items-center h-64">
            <h1 className="text-xl font-bold mb-4">Service Not Found</h1>
            <Button onClick={() => navigate("/services")}>Browse Services</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold">
                Get a Personalized Quote
              </h1>
              <p className="text-lg opacity-90">
                Tell us about your project needs and get matched with the perfect freelancer:
              </p>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg inline-block">
                <h2 className="text-xl font-semibold">{service.title}</h2>
              </div>
              
              <div className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Why Choose Our Freelancers?</h3>
                <p className="mb-4">
                  We connect you with pre-vetted, skilled professionals for your specific project needs.
                  Our freelancers are selected for their expertise and reliability.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Expert Freelancers</h4>
                      <p className="text-sm opacity-90">Skilled professionals in their field</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Users className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Perfect Match</h4>
                      <p className="text-sm opacity-90">We match skills to your exact requirements</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Quick Response</h4>
                      <p className="text-sm opacity-90">Get quotes within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FileText className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Simple Process</h4>
                      <p className="text-sm opacity-90">Easy project submission and management</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <CustomQuoteForm serviceTitle={service.title} />
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Submit your project details</h3>
              <p className="text-gray-600">Tell us what you need and your budget</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Get matched with freelancers</h3>
              <p className="text-gray-600">We find the perfect freelancer for your project</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Review proposals</h3>
              <p className="text-gray-600">Compare quotes and choose the best fit</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Project begins</h3>
              <p className="text-gray-600">Start working with your chosen freelancer</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuoteRequest;
