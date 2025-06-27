
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const MessagesButton = () => {
  const navigate = useNavigate();
  
  return (
    <Button 
      size="icon" 
      variant="ghost" 
      className="relative"
      onClick={() => navigate('/dashboard/messages')}
    >
      <MessageSquare className="h-5 w-5" />
      <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
    </Button>
  );
};
