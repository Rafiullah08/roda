
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Mail, Shield, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("Requesting password reset code for:", email);
      
      const { data, error } = await supabase.functions.invoke('generate-reset-code', {
        body: { email }
      });

      console.log("Password reset response:", { data, error });

      if (error) {
        console.error("Password reset code error:", error);
        
        // Handle specific error cases
        if (error.message?.includes('429') || error.message?.includes('Rate limit')) {
          toast({
            title: "Too Many Requests",
            description: "Please wait 2 minutes before requesting another reset code.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: error.message || "Failed to send reset code. Please try again.",
            variant: "destructive",
          });
        }
        return;
      }

      // Check if the response indicates an error
      if (data?.error) {
        console.error("Function returned error:", data.error);
        
        if (data.error.includes('Rate limit') || data.error.includes('wait 2 minutes')) {
          toast({
            title: "Rate Limit Exceeded",
            description: "Please wait 2 minutes before requesting another reset code.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: data.error,
            variant: "destructive",
          });
        }
        return;
      }

      // Success case
      if (data?.success) {
        console.log("Password reset code request successful:", data);
        setIsCodeSent(true);
        
        toast({
          title: "Reset Code Sent",
          description: "Check your email for a 6-digit password reset code from RODA Team.",
        });
      } else {
        throw new Error("Unexpected response from server");
      }

    } catch (error: any) {
      console.error("Password reset code failed:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send reset code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToVerification = () => {
    navigate(`/auth/verify-reset-code?email=${encodeURIComponent(email)}`);
  };

  if (isCodeSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Code Sent Successfully
              </CardTitle>
              <CardDescription className="text-gray-600">
                We've sent a 6-digit reset code to
                <br />
                <strong className="text-purple-600">{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 text-center">
                  <strong>Check your inbox for the 6-digit code.</strong><br />
                  If you don't see it, please check your spam folder.
                </p>
              </div>
              <div className="flex flex-col space-y-3">
                <Button 
                  onClick={handleProceedToVerification}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Enter Reset Code
                </Button>
                <Button 
                  onClick={() => setIsCodeSent(false)}
                  variant="outline"
                  className="w-full border-purple-200 hover:bg-purple-50"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Another Code
                </Button>
                <Button 
                  onClick={() => navigate('/auth/login')}
                  variant="ghost"
                  className="w-full text-purple-600 hover:text-purple-500"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Reset Your Password
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your email to receive a 6-digit reset code
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800 text-center">
                  We'll send you a 6-digit code to reset your password.
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Reset Code...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Send 6-Digit Reset Code
                  </div>
                )}
              </Button>
              
              <Link 
                to="/auth/login" 
                className="flex items-center justify-center text-sm text-purple-600 hover:text-purple-500 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Login
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
