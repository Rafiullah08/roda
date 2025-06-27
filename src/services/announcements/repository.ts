
import { supabase } from "@/integrations/supabase/client";
import { Announcement } from "./types";

/**
 * Create a new announcement in the database
 */
export const createAnnouncementInDb = async (
  announcement: {
    title: string;
    content: string;
    category: string;
    importance: "low" | "medium" | "high";
    start_date: string;
    end_date: string | null;
    target_user_groups: string[];
    send_email: boolean;
    created_by: string;
  }
) => {
  const { data, error } = await supabase
    .from('announcements')
    .insert(announcement)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Fetch all announcements
 */
export const fetchAnnouncementsFromDb = async (): Promise<Announcement[]> => {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  
  return data.map(announcement => ({
    id: announcement.id,
    title: announcement.title,
    content: announcement.content,
    category: announcement.category,
    importance: announcement.importance as "low" | "medium" | "high",
    startDate: announcement.start_date,
    endDate: announcement.end_date,
    targetUserGroups: announcement.target_user_groups,
    sendEmail: announcement.send_email,
    createdAt: announcement.created_at,
    createdBy: announcement.created_by
  }));
};

/**
 * Delete an announcement
 */
export const deleteAnnouncementFromDb = async (announcementId: string): Promise<void> => {
  const { error } = await supabase
    .from('announcements')
    .delete()
    .eq('id', announcementId);
    
  if (error) throw error;
};

/**
 * Fetch active announcements for a specific user
 */
export const fetchActiveAnnouncementsFromDb = async (): Promise<Announcement[]> => {
  const now = new Date().toISOString();
  
  // Fetch all active announcements
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .lte('start_date', now)
    .or(`end_date.is.null,end_date.gte.${now}`)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  
  return data.map(announcement => ({
    id: announcement.id,
    title: announcement.title,
    content: announcement.content,
    category: announcement.category,
    importance: announcement.importance as "low" | "medium" | "high",
    startDate: announcement.start_date,
    endDate: announcement.end_date,
    targetUserGroups: announcement.target_user_groups,
    sendEmail: announcement.send_email,
    createdAt: announcement.created_at,
    createdBy: announcement.created_by
  }));
};
