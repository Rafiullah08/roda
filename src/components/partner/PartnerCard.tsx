
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import PartnerRatingBadge from "./PartnerRatingBadge";
import PartnerCredentials, { Credential } from "./PartnerCredentials";

interface PartnerCardProps {
  id: string;
  name: string;
  businessName?: string;
  partnerType: 'personal' | 'agency';
  avatar?: string;
  bio?: string;
  rating: number;
  reviewsCount: number;
  yearsExperience?: number;
  credentials?: Credential[];
  isAvailable?: boolean;
  onMessageClick?: () => void;
  compact?: boolean;
}

const PartnerCard = ({
  id,
  name,
  businessName,
  partnerType,
  avatar,
  bio,
  rating,
  reviewsCount,
  yearsExperience,
  credentials = [],
  isAvailable = true,
  onMessageClick,
  compact = false,
}: PartnerCardProps) => {
  const displayName = businessName || name;
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Truncate bio if it's too long
  const truncateBio = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  
  const renderAvatar = () => (
    <Avatar className={compact ? "h-12 w-12" : "h-16 w-16"}>
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
  
  if (compact) {
    // Compact version for small spaces
    return (
      <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
        {renderAvatar()}
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{displayName}</div>
          <div className="flex items-center mt-1">
            <PartnerRatingBadge 
              rating={rating} 
              reviewsCount={reviewsCount} 
              size="sm"
              showTooltip={false}
            />
          </div>
          <Badge 
            variant="outline" 
            className={`text-xs mt-1.5 ${isAvailable ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}
          >
            {isAvailable ? 'Available' : 'Busy'}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" className="flex-shrink-0" onClick={onMessageClick}>
          <MessageSquare className="h-4 w-4" />
        </Button>
      </div>
    );
  }
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="flex-shrink-0">
            {renderAvatar()}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-medium">{displayName}</h3>
            <div className="text-sm text-muted-foreground">
              {partnerType === 'agency' ? 'Agency' : 'Independent Specialist'}
              {yearsExperience && ` · ${yearsExperience} years experience`}
            </div>
            
            <div className="mt-2 flex justify-center sm:justify-start">
              <PartnerRatingBadge rating={rating} reviewsCount={reviewsCount} />
            </div>
            
            {credentials && credentials.length > 0 && (
              <div className="mt-3">
                <PartnerCredentials credentials={credentials} limit={3} />
              </div>
            )}
            
            {bio && (
              <p className="mt-3 text-sm text-gray-600">
                {truncateBio(bio, 120)}
              </p>
            )}
            
            <div className="flex items-center justify-center sm:justify-start mt-3 space-x-2">
              <Badge 
                variant="outline"
                className={isAvailable ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}
              >
                {isAvailable ? 'Available Now' : 'Currently Busy'}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 pb-4 px-6">
        <Button variant="outline" asChild>
          <Link to={`/partners/${id}`}>View Full Profile</Link>
        </Button>
        {onMessageClick && (
          <Button variant="default" onClick={onMessageClick}>
            <MessageSquare className="h-4 w-4 mr-1" /> Message
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PartnerCard;
