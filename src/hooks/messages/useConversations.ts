
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Conversation,
  useMessaging,
} from "@/services/messaging";

export const useConversations = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const userId = user?.id || '';
  const messaging = useMessaging(userId);
  
  useEffect(() => {
    if (!userId) {
      return;
    }
    
    const loadConversations = async () => {
      setIsLoading(true);
      const result = await messaging.fetchConversations();
      setConversations(result);
      setIsLoading(false);
    };
    
    loadConversations();
    
    // Subscribe to conversation updates
    // Fix: Pass the correct arguments to subscribeToConversations
    const unsubscribe = messaging.subscribeToConversations(userId, (conversationId) => {
      loadConversations();
    });
    
    return () => {
      unsubscribe();
    };
  }, [userId, messaging]);
  
  return { conversations, isLoading };
};
