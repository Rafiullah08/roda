
import { supabase } from "@/integrations/supabase/client";
import { Message } from "./types";
import { parseAttachments } from "./attachmentHelpers";

/**
 * Subscribe to new messages in a conversation
 */
export const subscribeToMessages = (conversationId: string, callback: (message: Message) => void) => {
  const channel = supabase
    .channel(`messages:${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      },
      (payload) => {
        if (payload.new) {
          const newMessage = {
            id: payload.new.id,
            conversationId: payload.new.conversation_id,
            senderId: payload.new.sender_id,
            content: payload.new.content,
            createdAt: payload.new.created_at,
            isRead: payload.new.is_read,
            attachments: parseAttachments(payload.new.attachments)
          };
          
          callback(newMessage);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

/**
 * Subscribe to conversation updates
 */
export const subscribeToConversations = (userId: string, callback: (conversationId: string) => void) => {
  const channel = supabase
    .channel(`user_conversations:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'conversations',
        filter: `participants=cs.{${userId}}`
      },
      (payload) => {
        // Check if payload.new exists and has an id property before accessing it
        if (payload.new && typeof payload.new === 'object' && 'id' in payload.new && typeof payload.new.id === 'string') {
          callback(payload.new.id);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
