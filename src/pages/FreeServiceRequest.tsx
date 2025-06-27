
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useServiceDetail } from "@/hooks/service/serviceDetail";
import { Gift, Check, Star, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const FreeServiceRequest = () => {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("service");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { service, loading, error } = useServiceDetail(serviceId || undefined);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    // Redirect if no service ID is provided
    if (!serviceId && !loading) {
      navigate("/services");
      toast({
        title: "Error",
        description: "No service was specified",
        variant: "destructive"
      });
    }
    
    // Redirect if service is not free
    if (service && !service.is_free) {
      navigate(`/quote-request?service=${serviceId}`);
      toast({
        title: "Information",
        description: "This is not a free service. Redirecting to quote request.",
      });
    }
  }, [serviceId, service, loading, navigate, toast]);

  const handleRequestFreeService = async () => {
    if (!serviceId) {
      toast({
        title: "Error",
        description: "No service was specified",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to request this free service",
        variant: "destructive"
      });
      // Store request details in session and redirect to login
      sessionStorage.setItem("pendingFreeRequest", JSON.stringify({
        serviceId
      }));
      navigate("/auth/login?redirect=free-service");
      return;
    }

    setIsRequesting(true);

    try {
      // Create service inquiry in the database with special message for free service
      const { error } = await supabase.from("service_inquiries").insert({
        service_id: serviceId,
        buyer_id: user.id,
        requirements: "Free service request",
        message: "I would like to request this free service",
        status: "pending",
        quote_status: "free_service"
      });

      if (error) throw error;

      toast({
        title: "Request submitted",
        description: "We've received your request for this free service!"
      });

      // Navigate to dashboard after successful submission
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting free service request:", error);
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRequesting(false);
    }
  };

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
      {/* Hero Section with Gift-like presentation */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Engaging copy */}
            <div className="space-y-6">
              <div className="inline-block p-2 bg-purple-100 text-purple-600 rounded-lg mb-4">
                <Gift className="h-6 w-6" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Claim Your <span className="text-blue-600">Free Gift</span> of Expert Service
              </h1>
              
              <p className="text-lg text-gray-600">
                We're offering this service completely free because we believe in building relationships before business. This is our way of showcasing our expertise and quality while giving you real value.
              </p>
              
              <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                <h3 className="font-medium text-blue-800">Why we're offering this for free:</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <span className="ml-2 text-gray-700">We want to build trust with our community</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <span className="ml-2 text-gray-700">It's our way of saying thank you for considering us</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <span className="ml-2 text-gray-700">Experience our quality before making bigger commitments</span>
                  </li>
                </ul>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleRequestFreeService} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg" 
                  disabled={isRequesting}
                >
                  {isRequesting ? "Processing..." : "Claim Your Free Service"}
                </Button>
              </div>
            </div>
            
            {/* Right side - Service details card */}
            <Card className="overflow-visible shadow-md">
              <CardContent className="p-6">
                {/* Service title and image */}
                <div className="mb-6">
                  {service.image_url && (
                    <div className="overflow-hidden rounded-md border mb-4">
                      <img 
                        src={service.image_url} 
                        alt={service.title} 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <h2 className="text-xl font-bold">{service.title}</h2>
                </div>
                
                {/* Free badge and delivery info */}
                <div className="flex flex-wrap items-center gap-4 bg-blue-50 p-3 rounded-lg mb-6">
                  <div className="flex items-baseline">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-md font-bold">Free Service</span>
                  </div>
                  
                  {service.delivery_time && (
                    <div className="flex items-center gap-2 text-blue-700">
                      <Calendar className="h-5 w-5" />
                      <span><strong>{service.delivery_time}</strong> delivery</span>
                    </div>
                  )}
                </div>

                {/* Rating display */}
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(service.rating || 0) 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {service.rating?.toFixed(1)} ({service.reviews_count} reviews)
                    </span>
                  </div>
                </div>

                {/* What's Included Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">What's included</h3>
                  {service.features && service.features.length > 0 ? (
                    <ul className="space-y-3">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="truncate block" title={feature}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No features specified for this service.</p>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 italic">
                    This free service includes the same quality and professionalism as our premium services.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FreeServiceRequest;
