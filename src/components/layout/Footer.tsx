
import { Link } from "react-router-dom";
import { Mail, SendHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const isMobile = useIsMobile();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubscribing(true);
    console.log('=== Footer newsletter subscription started ===');
    console.log('Email:', email);
    
    try {
      console.log('Calling subscribe-newsletter function...');
      
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email: email.trim() }
      });
      
      console.log('Supabase function invoke response:');
      console.log('- data:', data);
      console.log('- error:', error);
      console.log('- data type:', typeof data);
      console.log('- error type:', typeof error);
      
      // Check for Supabase function invocation errors first
      if (error) {
        console.error('Supabase function invocation error:', error);
        toast({
          title: "Subscription failed",
          description: error.message || "Failed to connect to the subscription service. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Log the data structure for debugging
      console.log('Response data structure:', JSON.stringify(data, null, 2));

      // Check for application-level errors in the response
      if (data && (data.error || data.success === false)) {
        console.error('Application error in response:', data);
        toast({
          title: "Subscription failed",
          description: data.error || data.message || "An error occurred during subscription.",
          variant: "destructive",
        });
        return;
      }
      
      // Success case - check for success flag
      if (data && data.success === true) {
        console.log('=== Subscription successful ===');
        toast({
          title: "Successfully subscribed!",
          description: data.message || "Thank you for subscribing! Check your email for a welcome message.",
        });
        setEmail("");
      } else {
        // Unexpected response format
        console.error('Unexpected response format:', data);
        console.error('Expected success:true, got:', data?.success);
        toast({
          title: "Subscription status unclear",
          description: "The subscription request was processed, but we received an unexpected response format.",
          variant: "destructive",
        });
      }
      
    } catch (error) {
      console.error("=== Newsletter subscription exception ===");
      console.error('Exception type:', typeof error);
      console.error('Exception message:', error?.message);
      console.error('Exception name:', error?.name);
      console.error('Full exception:', error);
      
      toast({
        title: "Subscription failed",
        description: "A network error occurred. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
      console.log('=== Newsletter subscription process completed ===');
    }
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FooterSection = ({ title, children, sectionKey }: { title: string; children: React.ReactNode; sectionKey: string }) => {
    if (isMobile) {
      return (
        <Collapsible open={openSections[sectionKey]} onOpenChange={() => toggleSection(sectionKey)}>
          <CollapsibleTrigger className="flex justify-between items-center w-full py-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <ChevronDown 
              className={`h-4 w-4 transition-transform duration-200 text-gray-600 ${
                openSections[sectionKey] ? 'rotate-180' : ''
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="py-2">
              {children}
            </div>
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">{title}</h3>
        {children}
      </div>
    );
  };

  return (
    <footer className="bg-white">
      {/* Newsletter Section */}
      <div>
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Stay Updated with Our Latest Services</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter and be the first to know about new services, promotions, and business insights.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-grow border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubscribing}
              />
              <Button 
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={isSubscribing || !email.trim()}
              >
                {isSubscribing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <SendHorizontal size={16} />
                  </>
                )}
              </Button>
            </form>
            <p className="text-green-600 mt-3 text-sm">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-4 md:py-6">
        {/* Footer Navigation */}
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'} gap-4 md:gap-6`}>
          {/* Company */}
          <FooterSection title="Company" sectionKey="company">
            <ul className="space-y-1">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </FooterSection>

          {/* Quick Links */}
          <FooterSection title="Quick Links" sectionKey="quickLinks">
            <ul className="space-y-1">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/become-partner" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link to="/partner-dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Partner Login
                </Link>
              </li>
            </ul>
          </FooterSection>

          {/* Resources */}
          <FooterSection title="Resources" sectionKey="resources">
            <ul className="space-y-1">
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </FooterSection>

          {/* Legal */}
          <FooterSection title="Legal" sectionKey="legal">
            <ul className="space-y-1">
              <li>
                <Link to="/terms-conditions" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </FooterSection>
        </div>

        {/* Copyright Section */}
        <div className={`${isMobile ? 'mt-3 pt-3' : 'mt-4 pt-4'} text-center`}>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Roda Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
