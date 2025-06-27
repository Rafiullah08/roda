
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Shield, CheckCircle } from "lucide-react";

const VerifyResetCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    } else {
      // Redirect to forgot password if no email provided
      navigate('/auth/forgot-password');
    }
  }, [searchParams, navigate]);

  const handleCodeChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setCode(newCode);
    
    // Focus the next empty input or last input
    const nextEmptyIndex = newCode.findIndex(digit => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : Math.max(0, nextEmptyIndex);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const codeString = code.join('');
    if (codeString.length !== 6) {
      toast({
        title: "Incomplete Code",
        description: "Please enter all 6 digits of your reset code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("Verifying reset code for:", email);
      
      const { data, error } = await supabase.functions.invoke('verify-reset-code', {
        body: { email, code: codeString }
      });

      if (error) {
        console.error("Code verification error:", error);
        throw error;
      }

      if (data.success) {
        console.log("Code verified successfully");
        
        toast({
          title: "Code Verified",
          description: "Redirecting to password reset...",
        });

        // Navigate to reset password with verification token
        navigate(`/auth/reset-password?token=${data.reset_token}&email=${encodeURIComponent(email)}`);
      }

    } catch (error: any) {
      console.error("Code verification failed:", error);
      toast({
        title: "Invalid Code",
        description: error.message || "The code you entered is invalid or expired. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-reset-code', {
        body: { email }
      });

      if (error) throw error;

      toast({
        title: "New Code Sent",
        description: "A fresh 6-digit code has been sent to your email.",
      });
      
      // Clear current code
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send new code. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Enter Reset Code
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter the 6-digit code sent to
              <br />
              <strong className="text-purple-600">{email}</strong>
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium text-center block">
                  6-Digit Reset Code
                </Label>
                <div className="flex justify-center space-x-2">
                  {code.map((digit, index) => (
                    <Input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      input-mode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800 text-center">
                  <strong>Code expires in 10 minutes</strong><br />
                  Didn't receive it? Check your spam folder or request a new code.
                </p>
              </div>
            </CardContent>
            
            <CardContent className="pt-0 space-y-4">
              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg transition-all duration-200"
                disabled={isLoading || code.join('').length !== 6}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying Code...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify Code
                  </div>
                )}
              </Button>
              
              <div className="flex flex-col space-y-2">
                <Button 
                  type="button"
                  onClick={handleResendCode}
                  variant="outline"
                  className="w-full border-purple-200 hover:bg-purple-50"
                >
                  Send New Code
                </Button>
                
                <Link 
                  to="/auth/forgot-password" 
                  className="flex items-center justify-center text-sm text-purple-600 hover:text-purple-500 font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Email Entry
                </Link>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default VerifyResetCode;
