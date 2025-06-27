
import { Json } from "@/integrations/supabase/types";
import { MessageAttachment, AttachmentData } from "./types";

/**
 * Helper function to parse attachments from JSON to MessageAttachment[]
 */
export const parseAttachments = (attachments: AttachmentData): MessageAttachment[] | undefined => {
  if (!attachments) return undefined;
  
  try {
    if (Array.isArray(attachments)) {
      return attachments.map(attachment => {
        // Check if attachment is an object with the required properties
        if (typeof attachment === 'object' && attachment !== null) {
          const att = attachment as Record<string, unknown>;
          return {
            url: String(att.url || ''),
            type: String(att.type || ''),
            name: String(att.name || '')
          };
        }
        return {
          url: '',
          type: '',
          name: ''
        };
      });
    }
    return undefined;
  } catch (e) {
    console.error("Error parsing attachments:", e);
    return undefined;
  }
};

/**
 * Convert MessageAttachment array to JSON format suitable for Supabase
 */
export const prepareAttachmentsForDb = (attachments?: MessageAttachment[]): Json | null => {
  if (!attachments || attachments.length === 0) return null;
  return attachments as unknown as Json;
};
