
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ContactCta = () => {
  return (
    <div className="bg-muted rounded-lg p-8 text-center animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4">Need Immediate Assistance?</h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Our customer service team is available Monday to Friday, 9am - 6pm EST.
        For urgent matters outside business hours, please submit a ticket and we'll respond as soon as possible.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button variant="outline" asChild>
          <Link to="/faq">Browse FAQs</Link>
        </Button>
        <Button>
          Start Live Chat
        </Button>
      </div>
    </div>
  );
};

export default ContactCta;
