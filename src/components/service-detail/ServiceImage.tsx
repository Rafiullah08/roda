
import React from 'react';
import { Bookmark, BookmarkPlus, Share2, Heart } from 'lucide-react';
import { usePartnerDashboard } from '@/contexts/PartnerDashboardContext';
import { getAbstractBackground } from '@/utils/colorGradients';

interface ServiceImageProps {
  imageUrl: string | null;
  title: string;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  category?: string | null;
  subcategory?: string | null;
}

export const ServiceImage: React.FC<ServiceImageProps> = ({ 
  imageUrl, 
  title, 
  isBookmarked, 
  onToggleBookmark,
  category = null,
  subcategory = null
}) => {
  const { mode } = usePartnerDashboard();
  const isPartnerMode = mode === 'partner';
  const abstractBackground = getAbstractBackground(subcategory, category);
  
  return (
    <div className={`relative rounded-lg overflow-hidden h-[160px] bg-gray-100 flex justify-center items-center mb-8 ${abstractBackground}`}>
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover relative z-10"
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&h=500";
          }}
        />
      ) : (
        <div className="text-gray-400 relative z-10">No image available</div>
      )}
      
      {/* Action buttons overlay */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <button 
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          onClick={onToggleBookmark}
          aria-label={isBookmarked ? 
            (isPartnerMode ? "Remove from bookmarks" : "Remove from favorites") : 
            (isPartnerMode ? "Add to bookmarks" : "Add to favorites")}
        >
          {isPartnerMode ? (
            isBookmarked ? (
              <Bookmark className="h-5 w-5 text-blue-600 fill-blue-600" />
            ) : (
              <BookmarkPlus className="h-5 w-5 text-gray-700" />
            )
          ) : (
            // For buyers, show heart icon
            <Heart className={`h-5 w-5 ${isBookmarked ? "text-red-600 fill-red-600" : "text-gray-700"}`} />
          )}
        </button>
        <button 
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Share service"
        >
          <Share2 className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};
