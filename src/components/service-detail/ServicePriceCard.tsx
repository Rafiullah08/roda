import React, { useState } from 'react';
import { Check, MessageSquare, ShieldCheck, Lock, Star, Calendar, Plus, Clock, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExtendedBadge } from '@/components/ui/badge-extended';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ServicePriceCardProps {
  price: number;
  deliveryTime: string | null;
  features: string[];
  rating: number;
  reviewsCount: number;
  onBuyNow: () => void;
  onRequestQuote: () => void;
  onAddService?: () => void;
  isPartnerMode?: boolean;
  partnerAvailabilityStatus?: 'available' | 'none' | 'busy';
  isFree?: boolean;
  serviceLocation?: 'online' | 'onsite' | 'hybrid';
}

export const ServicePriceCard: React.FC<ServicePriceCardProps> = ({
  price,
  deliveryTime,
  features,
  rating,
  reviewsCount,
  onBuyNow,
  onRequestQuote,
  onAddService,
  isPartnerMode = false,
  partnerAvailabilityStatus = 'available',
  isFree = false,
  serviceLocation = 'online'
}) => {
  const [guaranteeOpen, setGuaranteeOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  return (
    <Card className="sticky top-8 overflow-visible shadow-md service-price-card">
      <CardContent className="p-6">
        {/* Price and delivery info */}
        <div className="flex flex-wrap items-center gap-4 bg-blue-50 p-3 rounded-lg mb-6">
          <div className="flex items-baseline">
            {isFree ? (
              <ExtendedBadge variant="free" className="text-base">Free Service</ExtendedBadge>
            ) : (
              <>
                <span className="text-3xl font-bold text-blue-700">Rs. {Math.round(price).toLocaleString()}</span>
                <span className="text-gray-500 ml-1">PKR</span>
              </>
            )}
          </div>
          
          {deliveryTime && (
            <div className="flex items-center gap-2 text-blue-700">
              <Calendar className="h-5 w-5" />
              <span><strong>{deliveryTime}</strong> delivery</span>
            </div>
          )}
        </div>
        
        {/* Service Location Badge */}
        <div className="mb-4">
          <ExtendedBadge variant={serviceLocation} className="mb-2">
            {serviceLocation === 'online' ? 'Online Service' : 
             serviceLocation === 'onsite' ? 'Onsite Service' : 'Hybrid Service'}
          </ExtendedBadge>
        </div>

        {/* Rating display */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(rating || 0) 
                    ? "text-yellow-400 fill-yellow-400" 
                    : "text-gray-300"}`} 
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {rating?.toFixed(1)} ({reviewsCount} reviews)
            </span>
          </div>
        </div>

        {/* What's Included Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">What's included</h3>
          {features.length > 0 ? (
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="truncate block" title={feature}>{feature}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No features specified for this service.</p>
          )}
        </div>

        {/* Contact and message section */}
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          <span className="text-sm">Have questions? Contact support</span>
        </div>
        
        {/* Action Buttons - conditional based on partner mode and availability */}
        <div className="space-y-4">
          {isPartnerMode ? (
            <Button 
              onClick={onAddService} 
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Service to Profile
            </Button>
          ) : (
            <>
              {partnerAvailabilityStatus === 'available' && (
                <Button 
                  onClick={onBuyNow} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {isFree ? "Get Free Service" : "Buy Now"}
                </Button>
              )}
              
              {partnerAvailabilityStatus === 'none' && (
                <Button 
                  onClick={onRequestQuote} 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  size="lg"
                >
                  {isFree ? "Get Free Service" : "Get Quote"}
                </Button>
              )}
              
              {partnerAvailabilityStatus === 'busy' && (
                <div className="space-y-2">
                  <Button 
                    disabled
                    className="w-full bg-gray-400"
                    size="lg"
                  >
                    <Clock className="mr-2 h-5 w-5" />
                    Join Queue
                  </Button>
                  <p className="text-sm text-center text-amber-700">
                    All partners are currently busy. You can join the wait queue.
                  </p>
                </div>
              )}
              
              {partnerAvailabilityStatus !== 'none' && (
                <Button 
                  onClick={onRequestQuote} 
                  variant="outline" 
                  className="w-full"
                >
                  {isFree ? "Request Information" : "Request Custom Quote"}
                </Button>
              )}
            </>
          )}
          
          {/* Satisfaction guarantee and secure payment - only for buyer mode */}
          {!isPartnerMode && (
            <div className="pt-4 border-t mt-4 space-y-3">
              {/* Fixed Collapsible component for Satisfaction Guarantee */}
              <Collapsible 
                open={guaranteeOpen}
                onOpenChange={setGuaranteeOpen}
                className="border border-green-100 rounded-md bg-green-50 p-2 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-700">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="font-medium">100% Satisfaction Guarantee</span>
                  </div>
                  {/* Fixed trigger with TooltipProvider properly wrapping Tooltip */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CollapsibleTrigger asChild>
                          <button className="rounded-full hover:bg-green-100 p-1 transition-colors">
                            <ChevronDown className={`h-4 w-4 text-green-700 transition-transform duration-200 ${guaranteeOpen ? 'transform rotate-180' : ''}`} />
                          </button>
                        </CollapsibleTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click for details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CollapsibleContent className="mt-2 space-y-2 text-sm text-green-800">
                  <p>If you're not satisfied with the service, we offer a full refund within 7 days of purchase.</p>
                  <p>Our partners are vetted for quality and reliability to ensure your complete satisfaction.</p>
                </CollapsibleContent>
              </Collapsible>

              {/* Fixed Collapsible component for Secure Payment */}
              <Collapsible
                open={paymentOpen}
                onOpenChange={setPaymentOpen}
                className="border border-gray-100 rounded-md bg-gray-50 p-2 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Lock className="h-5 w-5" />
                    <span>Secure Payment</span>
                  </div>
                  {/* Fixed trigger with TooltipProvider properly wrapping Tooltip */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CollapsibleTrigger asChild>
                          <button className="rounded-full hover:bg-gray-100 p-1 transition-colors">
                            <ChevronDown className={`h-4 w-4 text-gray-700 transition-transform duration-200 ${paymentOpen ? 'transform rotate-180' : ''}`} />
                          </button>
                        </CollapsibleTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click for details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CollapsibleContent className="mt-2 space-y-2 text-sm text-gray-700">
                  <p>All payments are processed through secure, encrypted channels to protect your financial information.</p>
                  <p>We support multiple payment methods and never store your complete card details on our servers.</p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
          
          {/* Partner-specific content */}
          {isPartnerMode && (
            <div className="pt-4 border-t mt-4">
              <div className="flex items-center gap-2 text-blue-700 mb-3">
                <ShieldCheck className="h-5 w-5" />
                <span className="font-medium">Partner Service Integration</span>
              </div>
              <p className="text-sm text-gray-600">
                Add this service to your profile to start receiving customer requests.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
