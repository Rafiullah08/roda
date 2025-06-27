
import { useState, useEffect, useRef, FormEvent } from "react";
import { SendHorizontal, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMessages } from "@/hooks/messages/useMessages";
import MessageItem from "./MessageItem";

interface ChatAreaProps {
  activeChat: string | null;
  chatPartner?: {
    id: string;
    name: string;
    avatar?: string;
    isOnline?: boolean;
  };
}

const ChatArea = ({ activeChat, chatPartner }: ChatAreaProps) => {
  const [newMessage, setNewMessage] = useState("");
  const { messages, isLoading, sendMessage, messagesEndRef } = useMessages(activeChat || undefined);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && activeChat) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  // Empty state when no chat is selected
  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 border-l">
        <div className="text-center p-6">
          <h3 className="text-lg font-medium text-gray-900">
            No conversation selected
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Choose a conversation from the list to start chatting.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 border-l">
      {/* Chat header */}
      <CardHeader className="border-b py-4 px-6">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg uppercase">
              {chatPartner?.avatar ? (
                <img
                  src={chatPartner.avatar}
                  alt={chatPartner.name}
                  className="w-full h-full rounded-full"
                />
              ) : (
                chatPartner?.name?.charAt(0) || "U"
              )}
            </div>
            {chatPartner?.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{chatPartner?.name || "Chat"}</h3>
            <p className="text-xs text-gray-500">
              {chatPartner?.isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </CardHeader>

      {/* Chat messages */}
      <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No messages yet</p>
            <p className="text-sm text-gray-400">
              Send a message to start the conversation
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Message input */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" disabled={!newMessage.trim()}>
            <SendHorizontal className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
