
import { Mail, MessageSquare, Phone, LifeBuoy, Ticket, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const ContactChannels = () => {
  return (
    <Card className="overflow-hidden border-0 shadow-lg animate-fade-in">
      <div className="h-2 bg-gradient-to-r from-primary to-primary/60"></div>
      <CardHeader>
        <CardTitle>Contact Channels</CardTitle>
        <CardDescription>Choose your preferred way to reach us</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="general">For Buyers</TabsTrigger>
            <TabsTrigger value="partner">For Partners</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="bg-primary/10 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Live Chat Support</h3>
                <p className="text-sm text-muted-foreground">Chat with our support team in real-time</p>
                <Button variant="link" size="sm" className="px-0 mt-1">
                  Start Live Chat
                </Button>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="bg-primary/10 p-2 rounded-full">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Email Support</h3>
                <p className="text-sm text-muted-foreground">Send us an email at support@roda.pk</p>
                <Button variant="link" size="sm" className="px-0 mt-1" asChild>
                  <a href="mailto:support@roda.pk">Send Email</a>
                </Button>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="bg-primary/10 p-2 rounded-full">
                <Ticket className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Submit a Ticket</h3>
                <p className="text-sm text-muted-foreground">Create a support ticket for complex issues</p>
                <Button variant="link" size="sm" className="px-0 mt-1">
                  Create Ticket
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="partner" className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="bg-primary/10 p-2 rounded-full">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Partner Hotline</h3>
                <p className="text-sm text-muted-foreground">Call our dedicated partner support line</p>
                <Button variant="link" size="sm" className="px-0 mt-1" asChild>
                  <a href="tel:+15551234567">+1 (555) 123-4567</a>
                </Button>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="bg-primary/10 p-2 rounded-full">
                <Headphones className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Partner Success Manager</h3>
                <p className="text-sm text-muted-foreground">Contact your dedicated account manager</p>
                <Button variant="link" size="sm" className="px-0 mt-1">
                  Schedule a Call
                </Button>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="bg-primary/10 p-2 rounded-full">
                <LifeBuoy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Partner Resources</h3>
                <p className="text-sm text-muted-foreground">Access specialized support for partners</p>
                <Button variant="link" size="sm" className="px-0 mt-1" asChild>
                  <Link to="/faq">View Resources</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-6">
          <h3 className="font-medium mb-2">Looking for help?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Visit our Support Center for comprehensive guides and FAQs
          </p>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/support">Visit Support Center</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactChannels;
