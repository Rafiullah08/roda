
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from '@supabase/supabase-js';

// Define types for our auth context
type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean; // New flag to track if auth is fully initialized
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  signInWithGoogle: () => Promise<void>;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const navigate = useNavigate();

  // Helper function to create user object from Supabase user
  const createUserObject = (supabaseUser: User): AuthUser => ({
    id: supabaseUser.id,
    name: supabaseUser.user_metadata?.name || supabaseUser.email || '',
    email: supabaseUser.email || '',
    avatar_url: supabaseUser.user_metadata?.avatar_url || null
  });

  useEffect(() => {
    console.log("🔄 Setting up auth state listeners...");
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("🔄 Auth state changed:", event, session?.user?.email);
        
        setSession(session);
        
        if (session?.user) {
          const authUser = createUserObject(session.user);
          setUser(authUser);
          console.log("✅ User authenticated:", authUser.email);
        } else {
          setUser(null);
          console.log("❌ User logged out");
        }
        
        // Mark as initialized and stop loading after processing auth state change
        if (!isInitialized) {
          console.log("🏁 Auth initialization complete");
          setIsInitialized(true);
        }
        setIsLoading(false);
      }
    );

    // Check for existing session after setting up the listener
    const initializeAuth = async () => {
      try {
        console.log("🔍 Checking for existing session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("❌ Error getting session:", error);
          setIsInitialized(true);
          setIsLoading(false);
          return;
        }
        
        if (session?.user) {
          console.log("✅ Found existing session for:", session.user.email);
          const authUser = createUserObject(session.user);
          setSession(session);
          setUser(authUser);
        } else {
          console.log("ℹ️ No existing session found");
        }
        
        // Only set initialized if the auth state listener hasn't already done it
        if (!isInitialized) {
          console.log("🏁 Auth initialization complete (from getSession)");
          setIsInitialized(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("❌ Error initializing auth:", error);
        setIsInitialized(true);
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      console.log("🧹 Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, [isInitialized]);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("🔐 Attempting login for:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("❌ Login error:", error);
        throw error;
      }
      
      console.log("✅ Login successful for:", data.user?.email);
      
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      });
      
      // Always redirect to buyer dashboard after login
      navigate('/dashboard');
    } catch (error: any) {
      console.error("❌ Login failed:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign In
  const signInWithGoogle = async () => {
    try {
      console.log("🔐 Attempting Google sign in...");
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        console.error("❌ Google sign in error:", error);
        throw error;
      }
    } catch (error: any) {
      console.error("❌ Google sign in failed:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("📝 Attempting registration for:", email);
      
      // Create a URL that will redirect back to buyer dashboard after email verification
      const redirectURL = `${window.location.origin}/dashboard`;
      
      console.log("📝 Registering user with redirect to:", redirectURL);
      
      // Configure email confirmation settings
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          },
          emailRedirectTo: redirectURL,
        }
      });

      if (error) {
        console.error("❌ Registration error:", error);
        throw error;
      }
      
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        toast({
          title: "Account already exists",
          description: "An account with this email already exists. Please login instead.",
          variant: "destructive",
        });
        navigate('/auth/login');
        return;
      }
      
      // Check if email confirmation is required
      if (data.session === null) {
        console.log("📧 Verification email should be sent to:", email);
        toast({
          title: "Verification Required",
          description: "Please check your email for a verification link to complete your registration.",
        });
      } else {
        console.log("✅ Registration successful, user logged in automatically");
        toast({
          title: "Success",
          description: "Your account has been created successfully!",
        });
      }
      
      // Always redirect to buyer dashboard after registration
      navigate('/dashboard');
    } catch (error: any) {
      console.error("❌ Registration error:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      console.log("🚪 Attempting logout...");
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("❌ Logout error:", error);
        throw error;
      }
      
      // Clear local state
      setUser(null);
      setSession(null);
      
      // Clear any stored dashboard mode preference on logout
      localStorage.removeItem('dashboardMode');
      
      console.log("✅ Logout successful");
      
      toast({
        title: "Success",
        description: "You have been logged out successfully",
      });
      
      navigate('/');
    } catch (error: any) {
      console.error("❌ Logout failed:", error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!user && !!session,
        isLoading,
        isInitialized,
        login,
        register,
        logout,
        signInWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
