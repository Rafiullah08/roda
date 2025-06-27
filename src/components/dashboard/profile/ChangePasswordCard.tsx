
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { validatePassword } from "@/utils/validation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Lock, Eye, EyeOff, AlertCircle, Check, Mail } from "lucide-react";

const ChangePasswordCard = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changeMethod, setChangeMethod] = useState<'current' | 'email'>('current');

  const passwordValidation = validatePassword(newPassword);
  const passwordsMatch = newPassword === confirmPassword;

  const handlePasswordChangeWithCurrent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

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
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // First verify current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword,
      });

      if (signInError) {
        toast({
          title: "Invalid Current Password",
          description: "The current password you entered is incorrect.",
          variant: "destructive",
        });
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      toast({
        title: "Password Changed Successfully",
        description: "Your password has been updated successfully.",
      });

      // Clear form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Password change error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to change password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChangeWithEmail = async () => {
    if (!user?.email) {
      toast({
        title: "Error",
        description: "User email not found.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("Sending password reset code to:", user.email);
      
      const { data, error } = await supabase.functions.invoke('generate-reset-code', {
        body: { email: user.email }
      });

      console.log("Edge function response:", { data, error });

      if (error) {
        console.error("Edge function error:", error);
        
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
            description: error.message || "Failed to send password reset code. Please try again.",
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
        toast({
          title: "Password Reset Code Sent",
          description: `We've sent a 6-digit password reset code to ${user.email}. Check your email and use the code to reset your password.`,
        });
        
        // Redirect to the verification page after a short delay
        setTimeout(() => {
          window.location.href = `/auth/verify-reset-code?email=${encodeURIComponent(user.email)}`;
        }, 2000);
      } else {
        throw new Error("Unexpected response from server");
      }

    } catch (error: any) {
      console.error("Password change code error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send password change code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Change Password
        </CardTitle>
        <CardDescription>
          Update your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Method Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Choose method to change password:</Label>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="changeMethod"
                value="current"
                checked={changeMethod === 'current'}
                onChange={(e) => setChangeMethod(e.target.value as 'current' | 'email')}
                className="text-purple-600"
              />
              <span className="text-sm">Use current password</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="changeMethod"
                value="email"
                checked={changeMethod === 'email'}
                onChange={(e) => setChangeMethod(e.target.value as 'current' | 'email')}
                className="text-purple-600"
              />
              <span className="text-sm">Send 6-digit code to email (Recommended)</span>
            </label>
          </div>
        </div>

        {changeMethod === 'current' ? (
          <form onSubmit={handlePasswordChangeWithCurrent} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {newPassword && (
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
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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

            <Button
              type="submit"
              disabled={isLoading || !passwordValidation.isValid || !passwordsMatch}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Changing Password...
                </div>
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-green-900">Secure Code Method (Recommended)</h4>
                  <p className="text-sm text-green-700 mt-1">
                    We'll send a 6-digit reset code to <strong>{user?.email}</strong>. 
                    This method is more secure with instant delivery and no spam issues.
                  </p>
                  <ul className="text-xs text-green-600 mt-2 list-disc list-inside space-y-1">
                    <li>Simple 6-digit numerical code</li>
                    <li>Expires in 10 minutes for security</li>
                    <li>No clickable links - just the code</li>
                    <li>Perfect inbox delivery</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <Button
              onClick={handlePasswordChangeWithEmail}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending Reset Code...
                </div>
              ) : (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Send 6-Digit Password Reset Code
                </div>
              )}
            </Button>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-amber-800">
            <strong>🔒 Security Tips:</strong>
          </p>
          <ul className="text-xs text-amber-700 mt-1 ml-4 list-disc">
            <li>Use a strong, unique password you haven't used elsewhere</li>
            <li>Consider using a password manager for better security</li>
            <li>Never share your password with anyone</li>
            <li>Log out from all devices after changing your password</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordCard;
