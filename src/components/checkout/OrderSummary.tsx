
import React from 'react';
import { Package, User, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Service } from '@/types/service';
import { UseFormReturn } from 'react-hook-form';
import { 
  Form,
  FormField, 
  FormItem, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';

interface OrderSummaryProps {
  service: Service | null;
  loading: boolean;
  error: string | null;
  orderProcessing: boolean;
  form: UseFormReturn<any>;
  onSubmit: () => void;
  isAuthenticated?: boolean;
}

const OrderSummary = ({ 
  service, 
  loading, 
  error,
  orderProcessing,
  form,
  onSubmit,
  isAuthenticated = false
}: OrderSummaryProps) => {
  const { user } = useAuth();
  
  const calculateTotal = () => {
    if (!service) return { subtotal: 0, fees: 0, tax: 0, total: 0 };
    
    const subtotal = service.price || 0;
    const fees = service.is_free ? 0 : 4;
    const tax = service.is_free ? 0 : Math.round(subtotal * 0.15);
    const total = subtotal + fees + tax;
    
    return { subtotal, fees, tax, total };
  };
  
  const { subtotal, fees, tax, total } = calculateTotal();

  return (
    <div className="lg:col-span-5">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-6">
              {error}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                {service ? (
                  <>
                    <p className="text-sm text-gray-500">Order #{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                    <div className="flex gap-2 items-center mt-2">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-semibold">
                        {service.title}
                      </h3>
                    </div>
                    <div className="flex gap-2 items-center mt-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Direct from service provider
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Delivery: {service.delivery_time || "Standard delivery"}
                    </p>
                    {service.is_free && (
                      <div className="mt-2">
                        <Badge className="bg-blue-500">
                          Free Service
                        </Badge>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-muted-foreground">No service selected</p>
                )}
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Service Price</span>
                  <span>Rs {service?.is_free ? "0.00" : service?.price.toFixed(2) || "0.00"}</span>
                </div>
                {!service?.is_free && (
                  <>
                    <div className="flex justify-between">
                      <span>Processing Fee</span>
                      <span>Rs {fees.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (15%)</span>
                      <span>Rs {tax.toFixed(2)}</span>
                    </div>
                  </>
                )}
                <div className="pt-4 border-t mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold">Rs {service?.is_free ? "0.00" : total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* For free services or not logged in users, add basic form fields */}
              {service?.is_free && !isAuthenticated && (
                <Form {...form}>
                  <div className="space-y-4 border-t pt-4">
                    <h4 className="font-medium">Your Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="First Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="email" placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Form>
              )}

              <div className="space-y-4">
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
                    <Label htmlFor="terms">
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-roda-500 hover:underline"
                      >
                        terms and conditions
                      </Link>
                    </Label>
                    {form.formState.errors.termsAccepted && (
                      <p className="text-sm text-red-500">
                        {String(form.formState.errors.termsAccepted.message)}
                      </p>
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={onSubmit}
                  className="w-full py-6 text-lg bg-roda-500 hover:bg-roda-600"
                  disabled={orderProcessing || !form.watch("termsAccepted")}
                >
                  {orderProcessing ? (
                    <>{service?.is_free ? "Processing Order..." : "Processing Payment..."}</>
                  ) : (
                    <>{service?.is_free ? "Complete Order" : "Complete Purchase"}</>
                  )}
                </Button>
              </div>

              {user && (
                <p className="text-center text-sm text-gray-500">
                  Ordering as: {user.email}
                </p>
              )}

              <p className="text-center text-sm text-gray-500">
                {service?.is_free ? "Free service - no payment required" : "Secure payment processing"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
