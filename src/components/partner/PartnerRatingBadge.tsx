
import React from "react";
import { Star, StarHalf, User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface PartnerRatingBadgeProps {
  rating: number;
  reviewsCount: number;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

const PartnerRatingBadge = ({
  rating,
  reviewsCount,
  size = "md",
  showTooltip = true,
}: PartnerRatingBadgeProps) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      containerClass: "text-xs",
      starClass: "h-3 w-3",
      gap: "gap-0.5",
    },
    md: {
      containerClass: "text-sm",
      starClass: "h-4 w-4",
      gap: "gap-1",
    },
    lg: {
      containerClass: "text-base",
      starClass: "h-5 w-5",
      gap: "gap-1.5",
    },
  };

  const { containerClass, starClass, gap } = sizeConfig[size];

  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className={`${starClass} fill-yellow-400 text-yellow-400`} />);
    }

    if (hasHalfStar && stars.length < 5) {
      stars.push(<StarHalf key="half-star" className={`${starClass} fill-yellow-400 text-yellow-400`} />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className={`${starClass} text-gray-300`} />);
    }

    return stars;
  };

  const ratingDisplay = (
    <div className={`flex items-center ${gap} ${containerClass}`}>
      <div className="flex">{renderStars()}</div>
      <span className="font-medium ml-1">{rating.toFixed(1)}</span>
      {reviewsCount > 0 && <span className="text-gray-500">({reviewsCount})</span>}
    </div>
  );

  if (!showTooltip) {
    return ratingDisplay;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {ratingDisplay}
        </TooltipTrigger>
        <TooltipContent className="p-2">
          <p className="font-medium">Partner Rating</p>
          <div className="text-xs mt-1">
            <div>Based on {reviewsCount} client reviews</div>
            <div className="mt-1">
              <span className="font-semibold">Quality:</span> {Math.min(5, rating + 0.2).toFixed(1)}/5
            </div>
            <div>
              <span className="font-semibold">Communication:</span> {Math.min(5, rating - 0.1).toFixed(1)}/5
            </div>
            <div>
              <span className="font-semibold">Timeliness:</span> {Math.min(5, rating - 0.2).toFixed(1)}/5
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PartnerRatingBadge;
