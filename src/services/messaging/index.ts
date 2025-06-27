
import { 
  fetchConversationsFromDb, 
  fetchMessagesFromDb, 
  sendMessageToDb,
  markMessagesAsReadInDb, 
  createConversationInDb 
} from "./repository";
import { subscribeToMessages, subscribeToConversations } from "./subscriptions";
import { Message, Conversation, MessageAttachment } from "./types";

/**
 * Fetch conversations for the current user
 */
export const fetchConversations = fetchConversationsFromDb;

/**
 * Get messages for a specific conversation
 */
export const fetchMessages = fetchMessagesFromDb;

/**
 * Send a new message
 */
export const sendMessage = sendMessageToDb;

/**
 * Mark messages as read
 */
export const markMessagesAsRead = markMessagesAsReadInDb;

/**
 * Create a new conversation
 */
export const createConversation = createConversationInDb;

/**
 * Subscription functions for real-time updates
 */
export { subscribeToMessages, subscribeToConversations };

/**
 * Create a React hook to use the messaging service
 */
export const useMessaging = (userId: string) => {
  return {
    fetchConversations: () => fetchConversations(userId),
    fetchMessages,
    sendMessage: (conversationId: string, content: string, attachments?: MessageAttachment[]) => 
      sendMessage(conversationId, userId, content, attachments),
    markMessagesAsRead: (conversationId: string) => markMessagesAsRead(conversationId, userId),
    createConversation,
    subscribeToMessages,
    subscribeToConversations
  };
};

// Re-export types
export type { Message, Conversation, MessageAttachment };
