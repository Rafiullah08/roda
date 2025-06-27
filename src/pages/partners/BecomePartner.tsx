
import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import PartnerHero from "@/components/partners/PartnerHero";
import PartnerBenefits from "@/components/partners/PartnerBenefits";
import PartnerHowItWorks from "@/components/partners/PartnerHowItWorks";
import PartnerApplicationForm from "@/components/partners/PartnerApplicationForm";
import ApplicationProcess from "@/components/partners/ApplicationProcess";
import PartnerFaq from "@/components/partners/PartnerFaq";
import PartnerTestimonials from "@/components/partners/PartnerTestimonials";
import PartnerCta from "@/components/partners/PartnerCta";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

const BecomePartnerPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [isInvited, setIsInvited] = useState(false);
  const [invitationData, setInvitationData] = useState<any>(null);
  const [invitationError, setInvitationError] = useState<string | null>(null);

  useEffect(() => {
    console.log("=== Partner page loaded ===");
    console.log("Current URL:", window.location.href);
    console.log("Location pathname:", location.pathname);
    console.log("Search params string:", location.search);
    console.log("All search params:", Object.fromEntries(searchParams.entries()));

    try {
      // Extract parameters manually from URL if searchParams fails
      const urlParams = new URLSearchParams(window.location.search);
      const invited = urlParams.get('invited') || searchParams.get('invited');
      const name = urlParams.get('name') || searchParams.get('name');
      const email = urlParams.get('email') || searchParams.get('email');
      const skills = urlParams.get('skills') || searchParams.get('skills');
      const leadId = urlParams.get('leadId') || searchParams.get('leadId');

      console.log("Extracted parameters from URL:", { 
        invited, 
        name, 
        email, 
        skills, 
        leadId 
      });

      // Check if this is a valid invitation with all required parameters
      if (invited === 'true' && name && email && leadId) {
        console.log("✅ Valid invitation detected - showing invitation form");
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          console.error("Invalid email format in invitation:", email);
          setInvitationError("Invalid email format in invitation link. Please contact support.");
          return;
        }
        
        try {
          const decodedData = {
            full_name: decodeURIComponent(name).trim(),
            email: decodeURIComponent(email).toLowerCase().trim(),
            skills: skills ? decodeURIComponent(skills).trim() : '',
            id: leadId.trim(),
          };
          
          console.log("✅ Decoded invitation data:", decodedData);
          
          // Additional validation
          if (!decodedData.full_name || !decodedData.email || !decodedData.id) {
            throw new Error("Missing required invitation data");
          }
          
          setIsInvited(true);
          setInvitationData(decodedData);
          setInvitationError(null);
        } catch (error) {
          console.error("Error decoding invitation parameters:", error);
          setInvitationError("Invalid invitation link format. Please contact support for assistance.");
          
          // Fallback to non-decoded values if decoding fails
          if (name && email && leadId) {
            const fallbackData = {
              full_name: name.trim(),
              email: email.toLowerCase().trim(),
              skills: skills ? skills.trim() : '',
              id: leadId.trim(),
            };
            
            console.log("Using fallback invitation data:", fallbackData);
            setIsInvited(true);
            setInvitationData(fallbackData);
            setInvitationError(null);
          }
        }
      } else {
        console.log("❌ Not an invitation or missing required parameters");
        console.log("Required: invited=true, name, email, leadId");
        console.log("Received:", { invited, name, email, leadId });
        setIsInvited(false);
        setInvitationData(null);
        setInvitationError(null);
      }
    } catch (error) {
      console.error("Error processing invitation parameters:", error);
      setInvitationError("Error processing invitation link. Please try again or contact support.");
    }
  }, [searchParams, location]);

  // Show invitation form if this is an invited user
  if (isInvited && invitationData) {
    console.log("Rendering invitation form for:", invitationData);
    
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <Badge className="bg-green-100 text-green-800">Invited Partner</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Complete Your Partner Application
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Welcome, {invitationData.full_name}! You've been invited to join our partner program. 
                Please complete your application below to get started.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Your Invitation Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <p className="text-gray-900">{invitationData.full_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{invitationData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Skills</label>
                    <p className="text-gray-900">{invitationData.skills || 'Not specified'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Complete Your Partner Application</CardTitle>
                <p className="text-sm text-gray-600">
                  Please fill out all required fields marked with an asterisk (*) to complete your application.
                </p>
              </CardHeader>
              <CardContent>
                <PartnerApplicationForm leadData={invitationData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Show error message if invitation is invalid
  if (invitationError) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-red-600">Invalid Invitation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{invitationError}</p>
              <p className="text-sm text-gray-600">
                If you believe this is an error, please contact our support team for assistance.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  console.log("Rendering regular partner page (not invitation)");

  // Regular partner page
  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen">
        <PartnerHero />
        <PartnerBenefits />
        <PartnerHowItWorks />
        <ApplicationProcess />
        <PartnerTestimonials />
        <PartnerFaq />
        <PartnerCta />
      </div>
    </MainLayout>
  );
};

export default BecomePartnerPage;
