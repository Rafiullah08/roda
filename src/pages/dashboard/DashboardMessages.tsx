
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import ConversationList from "@/components/messages/ConversationList";
import ChatArea from "@/components/messages/ChatArea";
import { useConversations } from "@/hooks/messages/useConversations";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { MessageSquare } from "lucide-react";

const DashboardMessages = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const { conversations, isLoading } = useConversations();
  const [chatPartner, setChatPartner] = useState<{id: string, name: string, avatar?: string, isOnline?: boolean} | undefined>();
  
  // Update chat partner when active chat changes
  useEffect(() => {
    if (activeChat && conversations) {
      const currentConversation = conversations.find(c => c.id === activeChat);
      if (currentConversation) {
        // In a real implementation, you would fetch the participant details
        // For now, we'll use placeholder data
        setChatPartner({
          id: "partner-id",
          name: currentConversation.name || "Chat Partner",
          isOnline: true
        });
      }
    } else {
      setChatPartner(undefined);
    }
  }, [activeChat, conversations]);
  
  if (!user) {
    return (
      <DashboardLayout>
        <Alert>
          <MessageSquare className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            You need to be logged in to access messages.
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <Card className="h-[calc(100vh-12rem)]">
        <CardContent className="p-0 h-full">
          <div className="flex h-full">
            <ConversationList 
              conversations={conversations}
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              isLoading={isLoading}
            />
            <ChatArea 
              activeChat={activeChat}
              chatPartner={chatPartner}
            />
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DashboardMessages;
