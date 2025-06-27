
import { Link } from "react-router-dom";
import { Service } from "@/types/service";
import { Star } from "lucide-react";
import { getGradient } from "@/utils/colorGradients";
import { Badge } from "@/components/ui/badge";

// Format price display
const formatPrice = (price: number | undefined, isFree?: boolean): string => {
  if (isFree) return "Free";
  if (!price && price !== 0) return "Price on request";
  return `Rs. ${Math.round(price).toLocaleString()}`;
};

export const ServiceCard = ({ service }: { service: Service }) => {
  console.log("Rendering service card:", service.id, service.title, "Category:", service.category, "Free:", service.is_free);
  
  if (!service) {
    console.error("Received null or undefined service");
    return null;
  }
  
  const gradient = getGradient(service.category, service.subcategory);

  return (
    <Link to={`/services/${service.id}`} className="group block">
      <div 
        className={`h-48 aspect-[4/3] w-full rounded-lg bg-gradient-to-br ${gradient} relative flex flex-col justify-between p-4 shadow transition-all duration-300 hover:shadow-lg hover:scale-105`}
      >
        {/* Category at top left */}
        <div className="flex justify-between w-full relative z-10">
          <div className="flex gap-1">
            <div className="text-xs text-white bg-white/20 px-2 py-1 rounded-full">
              {service.category || "Uncategorized"}
            </div>
            {service.is_free && (
              <Badge className="bg-blue-500 text-white text-xs">Free</Badge>
            )}
          </div>
          
          {/* Rating at top right */}
          {typeof service.rating === 'number' && (
            <div className="flex items-center bg-white/20 px-2 py-1 rounded-full">
              <Star className="w-3 h-3 fill-yellow-300 text-white mr-1" />
              <span className="text-xs text-white">{service.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        {/* Centered title with hover animation */}
        <div className="text-white text-center my-auto relative z-10">
          <h3 className="text-lg font-medium line-clamp-2 transition-transform duration-300 group-hover:scale-105">
            {service.title}
          </h3>
        </div>
        
        {/* Footer with price and delivery time */}
        <div className="flex justify-between items-end text-white w-full mt-auto relative z-10">
          <div className="font-medium bg-white/20 px-2 py-1 rounded-full text-sm">
            {formatPrice(service.price, service.is_free)}
          </div>
          <div className="text-sm bg-white/20 px-2 py-1 rounded-full">
            {service.delivery_time || "3 days"}
          </div>
        </div>
      </div>
    </Link>
  );
};
