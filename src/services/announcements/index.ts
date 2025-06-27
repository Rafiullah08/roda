
import { CreateAnnouncementParams, Announcement } from "./types";
import { notifySpecificUsers, notifyUserGroups } from "./notificationHelper";
import { createAnnouncementInDb, fetchAnnouncementsFromDb, fetchActiveAnnouncementsFromDb, deleteAnnouncementFromDb } from "./repository";

/**
 * Create a new announcement
 */
export const createAnnouncement = async (
  announcement: CreateAnnouncementParams,
  creatorId: string,
  targetUserIds?: string[]
): Promise<boolean> => {
  try {
    const data = await createAnnouncementInDb({
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      importance: announcement.importance,
      start_date: announcement.startDate,
      end_date: announcement.endDate,
      target_user_groups: announcement.targetUserGroups,
      send_email: announcement.sendEmail,
      created_by: creatorId
    });
    
    // If specific user IDs are provided, we'll notify them directly
    // Otherwise, we'll use the user groups to determine who gets notified
    if (targetUserIds && targetUserIds.length > 0) {
      await notifySpecificUsers(data.id, data.title, data.content, targetUserIds, announcement.sendEmail);
    } else {
      await notifyUserGroups(data.id, data.title, data.content, announcement.targetUserGroups, announcement.sendEmail);
    }
    
    return true;
  } catch (error) {
    console.error("Error creating announcement:", error);
    return false;
  }
};

/**
 * Fetch announcements (for admin use)
 */
export const fetchAnnouncements = async (): Promise<Announcement[]> => {
  try {
    return await fetchAnnouncementsFromDb();
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
};

/**
 * Delete an announcement
 */
export const deleteAnnouncement = async (announcementId: string): Promise<boolean> => {
  try {
    await deleteAnnouncementFromDb(announcementId);
    return true;
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return false;
  }
};

/**
 * Fetch active announcements for a specific user
 */
export const fetchActiveAnnouncementsForUser = async (userId: string): Promise<Announcement[]> => {
  try {
    return await fetchActiveAnnouncementsFromDb();
  } catch (error) {
    console.error("Error fetching active announcements for user:", error);
    return [];
  }
};

// Re-export types
export type { Announcement, CreateAnnouncementParams };
