
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { Message } from "@/services/messagingService";

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const { user } = useAuth();
  const isSender = user?.id === message.senderId;
  
  // Format the timestamp
  const formattedTime = message.createdAt ? 
    formatDistanceToNow(new Date(message.createdAt), { addSuffix: true }) : 
    '';
  
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start max-w-[75%] ${isSender ? 'flex-row-reverse' : ''}`}>
        {!isSender && (
          <Avatar className="h-8 w-8 mr-2">
            <AvatarFallback>
              {message.senderId?.substring(0, 2).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        )}
        
        <div>
          <div 
            className={`rounded-lg p-3 ${
              isSender 
                ? 'bg-primary text-primary-foreground ml-2' 
                : 'bg-muted'
            }`}
          >
            <p className="text-sm">{message.content}</p>
            
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {message.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center text-xs">
                    <a 
                      href={attachment.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center hover:underline"
                    >
                      {attachment.name || 'Attachment'}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <p className={`text-xs text-gray-500 mt-1 ${isSender ? 'text-right' : ''}`}>
            {formattedTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
