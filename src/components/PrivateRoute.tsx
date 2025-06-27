
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { validateAdminSession } from "@/utils/adminSession";
import { toast } from "@/hooks/use-toast";

interface PrivateRouteProps {
  children: ReactNode;
  requiresAdmin?: boolean;
}

const PrivateRoute = ({ children, requiresAdmin = false }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const location = useLocation();
  const [adminSessionValid, setAdminSessionValid] = useState<boolean | null>(null);
  
  useEffect(() => {
    if (requiresAdmin && isInitialized) {
      validateAdminSession().then(isValid => {
        setAdminSessionValid(isValid);
        if (!isValid) {
          toast({
            title: "Session Expired",
            description: "Your admin session has expired. Please log in again.",
            variant: "destructive"
          });
        }
      });
    }
  }, [requiresAdmin, isInitialized]);

  // Show loading screen while authentication is initializing
  if (!isInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // If this route requires admin privileges
  if (requiresAdmin) {
    // Still checking admin status
    if (adminSessionValid === null) {
      return <div className="flex items-center justify-center h-screen">Validating session...</div>;
    }
    
    // Admin check failed
    if (!adminSessionValid) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    
    // Admin check passed
    return <>{children}</>;
  }
  
  // Regular user authentication check - only redirect if we're sure user is not authenticated
  if (!isAuthenticated) {
    console.log("🔒 PrivateRoute: User not authenticated, redirecting to login");
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  console.log("✅ PrivateRoute: User authenticated, allowing access");
  return <>{children}</>;
};

export default PrivateRoute;
