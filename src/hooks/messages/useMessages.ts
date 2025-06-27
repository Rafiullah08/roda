import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Message,
  fetchMessages,
  sendMessage,
  markMessagesAsRead,
  subscribeToMessages,
  useMessaging
} from "@/services/messaging";

export const useMessages = (conversationId?: string) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  const userId = user?.id || '';
  const messaging = useMessaging(userId);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (!conversationId || !userId) {
      return;
    }
    
    const loadMessages = async () => {
      setIsLoading(true);
      const data = await messaging.fetchMessages(conversationId);
      setMessages(data);
      setIsLoading(false);
      
      setTimeout(scrollToBottom, 100);
      
      // Mark messages as read when loaded
      await messaging.markMessagesAsRead(conversationId);
    };
    
    loadMessages();
    
    // Subscribe to new messages
    const unsubscribe = messaging.subscribeToMessages(conversationId, (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
      setTimeout(scrollToBottom, 100);
      
      // If the message is not from the current user, mark it as read
      if (newMessage.senderId !== userId) {
        messaging.markMessagesAsRead(conversationId);
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [conversationId, userId, messaging]);
  
  const sendNewMessage = async (content: string, attachments?: {url: string, type: string, name: string}[]) => {
    if (!conversationId || !content.trim()) return;
    
    await messaging.sendMessage(conversationId, content, attachments);
  };
  
  return { 
    messages, 
    isLoading, 
    sendMessage: sendNewMessage,
    messagesEndRef
  };
};
