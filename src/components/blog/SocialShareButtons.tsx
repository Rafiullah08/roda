
import React from "react";
import { Button } from "@/components/ui/button";
import { Share2, Bookmark, Copy, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
}

const SocialShareButtons = ({ title, url, className }: SocialShareButtonsProps) => {
  const { toast } = useToast();
  const currentUrl = url || window.location.href;

  const handleShare = async (platform: string) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(currentUrl);

    let shareUrl = "";
    
    switch (platform) {
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=roda_service`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(currentUrl);
          toast({
            description: "Link copied to clipboard!",
          });
        } catch (error) {
          toast({
            description: "Failed to copy link",
            variant: "destructive",
          });
        }
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => handleShare("linkedin")}
        className="hover:bg-roda-50 hover:border-roda-200"
      >
        <Share2 className="mr-2 h-4 w-4" />
        LinkedIn
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => handleShare("twitter")}
        className="hover:bg-roda-50 hover:border-roda-200"
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        Twitter
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => handleShare("facebook")}
        className="hover:bg-roda-50 hover:border-roda-200"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Facebook
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => handleShare("copy")}
        className="hover:bg-roda-50 hover:border-roda-200"
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy Link
      </Button>
    </div>
  );
};

export default SocialShareButtons;
