
import { Link } from "react-router-dom";
import { useCheckout } from "@/hooks/checkout/useCheckout";
import MainLayout from "@/components/layout/MainLayout";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  CreditCard, 
  Smartphone, 
  Building2,
  ArrowLeft,
  Package
} from "lucide-react";

const CheckoutPage = () => {
  const { 
    form, 
    service, 
    loading, 
    error, 
    orderProcessing, 
    handleSubmit,
    isAuthenticated
  } = useCheckout();

  const calculateTotal = () => {
    if (!service) return { subtotal: 0, fees: 0, tax: 0, total: 0 };
    
    const subtotal = service.price || 0;
    const fees = service.is_free ? 0 : 4;
    const tax = service.is_free ? 0 : Math.round(subtotal * 0.15);
    const total = subtotal + fees + tax;
    
    return { subtotal, fees, tax, total };
  };
  
  const { subtotal, fees, tax, total } = calculateTotal();

  // Generate order number
  const orderNumber = `ORD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

  const paymentMethods = [
    {
      icon: CreditCard,
      title: "Credit & Debit Cards",
      description: "Visa, Mastercard, American Express"
    },
    {
      icon: Smartphone,
      title: "Magic Link Payment",
      description: "Secure one-click payment via email"
    },
    {
      icon: Building2,
      title: "Bank Transfer",
      description: "Direct bank transfer available"
    }
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !service) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
            <p className="text-gray-600 mb-6">{error || "The requested service could not be found."}</p>
            <Link to="/services" className="text-blue-600 hover:text-blue-800">
              Browse Services
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Payment Methods */}
              <div className="space-y-8">
                {/* Payment Methods */}
                <div>
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    Payment Methods
                  </h2>
                  <div className="space-y-4">
                    {paymentMethods.map((method, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <method.icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{method.title}</h4>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary & Complete Order */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    Complete Your Order
                  </h2>
                  <div className="space-y-6">
                    {/* Order Number */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800 font-medium">Order Number: {orderNumber}</p>
                    </div>

                    {/* Service Summary */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{service.title}</h3>
                          <p className="text-gray-600">Delivery: {service.delivery_time || "Standard delivery"}</p>
                          {service.is_free && (
                            <Badge className="bg-green-500 text-white mt-2">
                              Free Service - No Payment Required
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">
                            Rs {service.is_free ? "0.00" : service.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      {!service.is_free && (
                        <div className="border-t pt-4 space-y-2">
                          <div className="flex justify-between">
                            <span>Service Price</span>
                            <span>Rs {subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Processing Fee</span>
                            <span>Rs {fees.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax (15%)</span>
                            <span>Rs {tax.toFixed(2)}</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>Rs {total.toFixed(2)}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <Form {...form}>
                      <div className="space-y-6">
                        {/* Terms & Conditions */}
                        <div className="flex flex-row items-start space-x-3 space-y-0">
                          <Checkbox 
                            id="terms" 
                            checked={form.watch("termsAccepted")} 
                            onCheckedChange={(checked) => 
                              form.setValue("termsAccepted", checked === true, { 
                                shouldValidate: true 
                              })
                            }
                          />
                          <div className="space-y-1 leading-none">
                            <Label htmlFor="terms" className="text-sm">
                              I agree to the{" "}
                              <Link
                                to="/terms-conditions"
                                className="text-blue-600 hover:underline"
                                target="_blank"
                              >
                                Terms and Conditions
                              </Link>
                              {" "}and{" "}
                              <Link
                                to="/privacy-policy"
                                className="text-blue-600 hover:underline"
                                target="_blank"
                              >
                                Privacy Policy
                              </Link>
                            </Label>
                            {form.formState.errors.termsAccepted && (
                              <p className="text-sm text-red-500">
                                {String(form.formState.errors.termsAccepted.message)}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {/* Complete Order Button */}
                        <Button 
                          onClick={handleSubmit}
                          className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                          disabled={orderProcessing || !form.watch("termsAccepted")}
                        >
                          {orderProcessing ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              {service?.is_free ? "Processing Order..." : "Processing Payment..."}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Shield className="h-5 w-5" />
                              {service?.is_free ? "Complete Free Order" : `Pay Rs ${total.toFixed(2)} Securely`}
                            </div>
                          )}
                        </Button>

                        {/* Security Notice */}
                        <div className="text-center space-y-2">
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <Shield className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              {service?.is_free ? "No payment required" : "256-bit SSL encrypted payment"}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Your information is protected and will never be shared
                          </p>
                        </div>

                        {/* Back Button */}
                        <div className="text-center">
                          <Link 
                            to={`/service/${service.id}`}
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Service Details
                          </Link>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
