
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { validatePassword } from "@/utils/validation";
import { Eye, EyeOff, Lock, Check, AlertCircle, CheckCircle } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Checking reset session validity...");
        
        // Check if we have Supabase auth session (from email link)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (session) {
          console.log("Valid Supabase auth session found");
          setEmail(session.user.email || '');
          setIsValidSession(true);
        } else {
          // Fallback: Check URL parameters for reset token and email (from verify-reset-code)
          const token = searchParams.get('token');
          const emailParam = searchParams.get('email');
          
          console.log("URL params:", { token: !!token, email: !!emailParam });
          
          if (token && emailParam) {
            console.log("Valid reset token and email found");
            setEmail(decodeURIComponent(emailParam));
            setResetToken(token);
            setIsValidSession(true);
          } else {
            console.log("No valid session or parameters found");
            setIsValidSession(false);
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsValidSession(false);
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkSession();
  }, [searchParams]);

  useEffect(() => {
    if (!isCheckingSession && !isValidSession) {
      console.log("Invalid session detected, redirecting...");
      
      toast({
        title: "Invalid Reset Link",
        description: "This password reset link is invalid or has expired. Please request a new one.",
        variant: "destructive",
      });
      
      setTimeout(() => {
        navigate('/auth/forgot-password');
      }, 3000);
    }
  }, [isCheckingSession, isValidSession, navigate]);

  const passwordValidation = validatePassword(password);
  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordValidation.isValid) {
      toast({
        title: "Invalid Password",
        description: passwordValidation.message,
        variant: "destructive",
      });
      return;
    }

    if (!passwordsMatch) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("Updating password for user:", email);
      
      // Check if we have a Supabase auth session first
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Direct password update using Supabase auth
        const { error } = await supabase.auth.updateUser({
          password: password
        });

        if (error) {
          console.error("Password update error:", error);
          throw error;
        }
      } else if (resetToken) {
        // Use custom edge function for token-based reset
        const { data, error } = await supabase.functions.invoke('update-password-with-token', {
          body: { 
            email: email,
            reset_token: resetToken,
            new_password: password 
          }
        });

        if (error) {
          console.error("Password update error:", error);
          throw error;
        }

        if (!data.success) {
          throw new Error(data.error || "Failed to update password");
        }
      } else {
        throw new Error("No valid authentication method available");
      }

      console.log("Password updated successfully");
      
      toast({
        title: "Password Updated Successfully",
        description: "Your password has been changed. You can now log in with your new password.",
      });

      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);

    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to reset password. Please try again or request a new reset link.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Validating reset session...</p>
                <p className="text-sm text-gray-500 mt-2">Please wait while we verify your request</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-red-600">
                Invalid Reset Session
              </CardTitle>
              <CardDescription className="text-gray-600">
                This password reset session is invalid or has expired.
                You will be redirected to request a new reset code.
              </CardDescription>
            </CardHeader>
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Create New Password
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your new secure password below.
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500 pr-10"
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {password && (
                  <div className="text-sm">
                    <div className={`flex items-center gap-2 ${passwordValidation.isValid ? 'text-green-600' : 'text-red-600'}`}>
                      {passwordValidation.isValid ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      {passwordValidation.message}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500 pr-10"
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {confirmPassword && (
                  <div className="text-sm">
                    <div className={`flex items-center gap-2 ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                      {passwordsMatch ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800 font-semibold mb-1">Password Requirements:</p>
                <ul className="text-xs text-blue-700 ml-4 list-disc space-y-1">
                  <li>At least 8 characters long</li>
                  <li>Contains uppercase and lowercase letters</li>
                  <li>Contains at least one number</li>
                  <li>Contains at least one special character</li>
                </ul>
              </div>
            </CardContent>
            
            <CardContent className="pt-0">
              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg transition-all duration-200"
                disabled={isLoading || !passwordValidation.isValid || !passwordsMatch}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating Password...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Lock className="w-4 w-4 mr-2" />
                    Update Password
                  </div>
                )}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
