
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, isLoading } = useAuth();

  const validateForm = () => {
    if (!name.trim()) {
      setError("Full name is required");
      return false;
    }
    
    if (!email.trim()) {
      setError("Email address is required");
      return false;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    if (!password) {
      setError("Password is required");
      return false;
    }
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    if (!agreeTerms) {
      setError("You must agree to the terms and conditions");
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      await register(name, email, password);
      // Navigation is handled in the register function
    } catch (error) {
      // Error handling is done in the register function
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Logo in top left */}
      <div className="absolute top-8 left-8 z-10">
        <Link to="/" className="inline-flex items-center justify-center">
          <img
            src="/lovable-uploads/28bb20b3-8934-4d70-b8f8-61d9caf19802.png"
            alt="Logo"
            className="h-12 w-auto"
          />
        </Link>
      </div>
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 overflow-hidden">
        {/* Animated shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[10%] right-[10%] w-[25%] h-[25%] rounded-full bg-white/5 blur-3xl animate-float" style={{ animationDelay: "0s" }}></div>
          <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] rounded-full bg-white/5 blur-3xl animate-float" style={{ animationDelay: "2.5s" }}></div>
          <div className="absolute top-[60%] right-[30%] w-[35%] h-[35%] rounded-full bg-white/5 blur-3xl animate-float" style={{ animationDelay: "1.2s" }}></div>
          
          {/* Abstract geometric elements */}
          <div className="absolute top-[15%] left-[5%] w-24 h-24 border border-white/10 rounded-full transform rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-[20%] right-[10%] w-32 h-32 border border-white/10 rounded-full animate-spin-slow" style={{ animationDuration: "15s" }}></div>
          <div className="absolute top-[50%] right-[15%] w-20 h-20 border-2 border-white/5 rounded-md transform rotate-12 animate-float" style={{ animationDuration: "8s" }}></div>
          
          {/* Floating particles */}
          <div className="absolute top-[25%] left-[40%] w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
          <div className="absolute top-[65%] left-[70%] w-3 h-3 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute top-[35%] left-[25%] w-4 h-4 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: "1.2s" }}></div>
          <div className="absolute top-[75%] left-[55%] w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: "1.8s" }}></div>
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptMiAyaDF2NGgtMXYtNHptLTQgNGgxdjFoLTF2LTF6bTIgMGgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        </div>
      </div>
      
      <div className="relative z-10 max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-white/70">
            Sign up to access all our services
          </p>
        </div>
        
        <Card className="backdrop-blur-sm bg-white/80 border border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter your details to create your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters long and include a number, letter, and special character.
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600"
                >
                  By creating an account, you agree to our{" "}
                  <Link to="/terms" className="text-indigo-600 hover:text-indigo-700">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-policy" className="text-indigo-600 hover:text-indigo-700">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <UserCheck className="mr-2 h-5 w-5" />
                    Create Account
                  </span>
                )}
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or sign up with</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" type="button">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign up with Google
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center text-sm text-white/80">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-medium text-white hover:text-white/90 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
