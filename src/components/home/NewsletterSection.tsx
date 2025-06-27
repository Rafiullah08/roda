
import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    console.log('Starting subscription for:', email);
    
    try {
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email }
      });
      
      console.log('Subscription response:', { data, error });
      
      if (error) {
        console.error('Subscription error:', error);
        toast({
          title: "Subscription failed",
          description: error.message || "Please try again later.",
          variant: "destructive",
        });
        return;
      }

      if (data?.error) {
        console.error('Subscription data error:', data.error);
        toast({
          title: "Subscription failed",
          description: data.error,
          variant: "destructive",
        });
        return;
      }
      
      console.log('Subscription successful');
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing! Check your email for a welcome message.",
      });
      
      setEmail("");
    } catch (error) {
      console.error("Failed to subscribe:", error);
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl relative">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-12 relative z-10">
          {/* Abstract background elements */}
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10 transform transition-all duration-500 hover:scale-110 hover:bg-white/15 z-0"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white/10 transform transition-all duration-500 hover:scale-110 hover:bg-white/15 z-0"></div>
          
          <div className="relative z-10 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-4 text-3xl font-bold tracking-tight text-white">Stay Updated with Our Latest Services</h3>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              Subscribe to our newsletter and be the first to know about new services, promotions, and business insights. 
              Get exclusive content delivered directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Input 
                  type="email"
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/30"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="h-12 bg-white text-indigo-700 hover:bg-white/90 transition-colors flex items-center gap-2"
                disabled={isSubscribing}
              >
                {isSubscribing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-700"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
            <p className="mt-4 text-sm text-white/70">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
