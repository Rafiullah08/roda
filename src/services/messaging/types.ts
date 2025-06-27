
import { Json } from "@/integrations/supabase/types";

/**
 * Types for the messaging service
 */

export interface MessageAttachment {
  url: string;
  type: string;
  name: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  attachments?: MessageAttachment[];
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  name?: string; // For group chats
  isGroup: boolean;
}

// Helper type for attachment conversion
export type AttachmentData = Json | null;
