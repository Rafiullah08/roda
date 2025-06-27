
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowConsent(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-600">
              We use cookies to enhance your experience. By continuing to visit this site
              you agree to our use of cookies.
              <button
                onClick={() => setShowDetails(true)}
                className="text-primary underline ml-1"
              >
                Learn more
              </button>
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleReject}>
              Reject All
            </Button>
            <Button onClick={handleAccept}>Accept All</Button>
          </div>
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Cookie Policy</DialogTitle>
            <DialogDescription>
              <div className="mt-4 space-y-4">
                <section>
                  <h3 className="font-medium mb-2">Essential Cookies</h3>
                  <p className="text-sm text-gray-500">
                    These cookies are necessary for the website to function and cannot be
                    switched off in our systems.
                  </p>
                </section>
                <section>
                  <h3 className="font-medium mb-2">Analytics Cookies</h3>
                  <p className="text-sm text-gray-500">
                    These cookies allow us to count visits and traffic sources so we can
                    measure and improve the performance of our site.
                  </p>
                </section>
                <section>
                  <h3 className="font-medium mb-2">Marketing Cookies</h3>
                  <p className="text-sm text-gray-500">
                    These cookies may be set through our site by our advertising
                    partners to build a profile of your interests.
                  </p>
                </section>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;
