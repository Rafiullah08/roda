
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, signInWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
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
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 overflow-hidden">
        {/* Animated shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-3xl animate-float" style={{ animationDelay: "0s" }}></div>
          <div className="absolute top-[60%] left-[50%] w-[30%] h-[30%] rounded-full bg-white/5 blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-[20%] left-[60%] w-[25%] h-[25%] rounded-full bg-white/5 blur-3xl animate-float" style={{ animationDelay: "4s" }}></div>
          <div className="absolute top-[70%] left-[15%] w-[35%] h-[35%] rounded-full bg-white/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-[40%] left-[80%] w-[20%] h-[20%] rounded-full bg-white/5 blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
          
          {/* Abstract geometric elements */}
          <div className="absolute top-[5%] right-[10%] w-32 h-32 border border-white/10 rounded-full transform rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-[15%] left-[5%] w-24 h-24 border border-white/10 rounded-full animate-spin-slow" style={{ animationDuration: "12s" }}></div>
          <div className="absolute top-[30%] left-[25%] w-16 h-16 border-2 border-white/5 rounded-md transform rotate-12 animate-float" style={{ animationDuration: "10s" }}></div>
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptMiAyaDF2NGgtMXYtNHptLTQgNGgxdjFoLTF2LTF6bTIgMGgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        </div>
      </div>
      
      <div className="relative z-10 max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-white/70">
            Sign in to your account to access all features
          </p>
        </div>
        
        <Card className="backdrop-blur-sm bg-white/80 border border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials to sign in to your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link to="/auth/forgot-password" className="text-sm text-roda-500 hover:text-roda-600">
                    Forgot password?
                  </Link>
                </div>
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
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me for 30 days
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
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </span>
                )}
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" type="button" onClick={() => signInWithGoogle()} disabled={isLoading}>
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
                Sign in with Google
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center text-sm text-white/80">
          Don't have an account?{" "}
          <Link to="/auth/register" className="font-medium text-white hover:text-white/90 underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
