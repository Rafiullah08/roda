
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LiveChatWindow from "./LiveChatWindow";

const LiveChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <LiveChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
      
      <Button
        onClick={toggleChat}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300",
          isOpen ? "bg-gray-700 hover:bg-gray-800" : "bg-primary hover:bg-primary/90"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default LiveChatButton;
