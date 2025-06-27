
import { supabase } from "@/integrations/supabase/client";
import { parseAttachments, prepareAttachmentsForDb } from "./attachmentHelpers";
import { Conversation, Message, MessageAttachment } from "./types";

/**
 * Fetch conversations for the current user
 */
export const fetchConversationsFromDb = async (userId: string): Promise<Conversation[]> => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        id,
        participants,
        last_message,
        last_message_at,
        name,
        is_group
      `)
      .contains('participants', [userId])
      .order('last_message_at', { ascending: false });

    if (error) throw error;

    // Get unread count for each conversation
    const conversationsWithCount = await Promise.all(data.map(async (conversation) => {
      const { count, error: countError } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('conversation_id', conversation.id)
        .eq('is_read', false)
        .not('sender_id', 'eq', userId);

      if (countError) {
        console.error("Error fetching unread count:", countError);
        return {
          id: conversation.id,
          participants: conversation.participants,
          lastMessage: conversation.last_message,
          lastMessageAt: conversation.last_message_at,
          unreadCount: 0,
          name: conversation.name,
          isGroup: conversation.is_group
        };
      }

      return {
        id: conversation.id,
        participants: conversation.participants,
        lastMessage: conversation.last_message,
        lastMessageAt: conversation.last_message_at,
        unreadCount: count || 0,
        name: conversation.name,
        isGroup: conversation.is_group
      };
    }));

    return conversationsWithCount;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
};

/**
 * Fetch messages for a specific conversation
 */
export const fetchMessagesFromDb = async (conversationId: string, limit = 30): Promise<Message[]> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data.map(message => ({
      id: message.id,
      conversationId: message.conversation_id,
      senderId: message.sender_id,
      content: message.content,
      createdAt: message.created_at,
      isRead: message.is_read,
      attachments: parseAttachments(message.attachments)
    })).reverse(); // Reverse to get chronological order
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

/**
 * Send a new message
 */
export const sendMessageToDb = async (
  conversationId: string, 
  senderId: string, 
  content: string, 
  attachments?: MessageAttachment[]
): Promise<Message | null> => {
  try {
    const newMessage = {
      conversation_id: conversationId,
      sender_id: senderId,
      content,
      is_read: false,
      attachments: prepareAttachmentsForDb(attachments)
    };

    const { data, error } = await supabase
      .from('messages')
      .insert(newMessage)
      .select()
      .single();

    if (error) throw error;

    // Update the last message in the conversation
    await supabase
      .from('conversations')
      .update({
        last_message: content,
        last_message_at: new Date().toISOString()
      })
      .eq('id', conversationId);

    return {
      id: data.id,
      conversationId: data.conversation_id,
      senderId: data.sender_id,
      content: data.content,
      createdAt: data.created_at,
      isRead: data.is_read,
      attachments: parseAttachments(data.attachments)
    };
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
};

/**
 * Mark messages as read
 */
export const markMessagesAsReadInDb = async (conversationId: string, userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('conversation_id', conversationId)
      .not('sender_id', 'eq', userId)
      .eq('is_read', false);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error marking messages as read:", error);
    return false;
  }
};

/**
 * Create a new conversation
 */
export const createConversationInDb = async (participants: string[], isGroup = false, name?: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        participants,
        is_group: isGroup,
        name: isGroup ? name : undefined,
        last_message: '',
        last_message_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    
    return data?.id || null;
  } catch (error) {
    console.error("Error creating conversation:", error);
    return null;
  }
};
