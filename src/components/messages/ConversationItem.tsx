
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Conversation } from "@/services/messagingService";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem = ({
  conversation,
  isActive,
  onClick,
}: ConversationItemProps) => {
  // Format timestamp
  const formattedTime = conversation.lastMessageAt 
    ? format(new Date(conversation.lastMessageAt), "h:mm a") 
    : "";

  // Get initial for avatar
  const nameInitial = (conversation.name || "C").charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors",
        isActive && "bg-blue-50 hover:bg-blue-50"
      )}
      onClick={onClick}
    >
      <Avatar className="h-10 w-10 mr-3">
        <AvatarFallback>{nameInitial}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-sm truncate">
            {conversation.name || "Conversation"}
          </h4>
          <span className="text-xs text-gray-500">{formattedTime}</span>
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-600 truncate">
            {conversation.lastMessage || "No messages yet"}
          </p>
          
          {conversation.unreadCount > 0 && (
            <span className="ml-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
