
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import PartnerApplicationForm from "@/components/partners/PartnerApplicationForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Award, TrendingUp } from "lucide-react";

const PartnerApplicationPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <Badge className="bg-blue-100 text-blue-800">Partner Application</Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Apply to Join Our Partner Network
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete your partner application below to join our growing network of service providers. 
              We'll review your application and get back to you within 2-3 business days.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Access to Clients</h3>
                <p className="text-gray-600 text-sm">Connect with businesses looking for your expertise</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Professional Growth</h3>
                <p className="text-gray-600 text-sm">Build your reputation and expand your portfolio</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Competitive Rates</h3>
                <p className="text-gray-600 text-sm">Earn competitive commissions on successful projects</p>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Partner Application Form</CardTitle>
            </CardHeader>
            <CardContent>
              <PartnerApplicationForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default PartnerApplicationPage;
