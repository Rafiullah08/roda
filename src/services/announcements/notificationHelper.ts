
import { supabase } from "@/integrations/supabase/client";
import { createNotification } from "../notificationService";
import { sendEmail, createAnnouncementEmailTemplate } from "../emailService";

/**
 * Notify specific users about an announcement
 */
export const notifySpecificUsers = async (
  announcementId: string,
  title: string,
  content: string,
  userIds: string[],
  sendEmailNotification: boolean
) => {
  try {
    // Create in-app notifications for each user
    const notifications = userIds.map(userId => ({
      user_id: userId,
      title,
      message: content,
      category: "announcement",
      read: false,
      link_to: `/announcements/${announcementId}`
    }));
    
    await supabase.from('notifications').insert(notifications);
    
    // Send email notifications if enabled
    if (sendEmailNotification) {
      // Send emails in batches to avoid overloading
      for (const userId of userIds) {
        await sendEmailToUser(userId, title, content);
      }
    }
  } catch (error) {
    console.error("Error notifying users about announcement:", error);
  }
};

/**
 * Notify user groups about an announcement
 */
export const notifyUserGroups = async (
  announcementId: string,
  title: string,
  content: string,
  userGroups: string[],
  sendEmailNotification: boolean
) => {
  try {
    // Since we don't have user_group column in profiles, we'll simulate with a more generic query
    // In a real app, you'd have a user_roles or user_groups table to query
    const { data: users, error } = await supabase
      .from('profiles')
      .select('id');
      
    if (error) throw error;
    
    if (!users || users.length === 0) return;
    
    // Create in-app notifications for each user
    const notifications = users.map(user => ({
      user_id: user.id,
      title,
      message: content,
      category: "announcement",
      read: false,
      link_to: `/announcements/${announcementId}`
    }));
    
    await supabase.from('notifications').insert(notifications);
    
    // For email notifications, we'd need to fetch emails from auth.users
    if (sendEmailNotification) {
      console.log("Email notifications would be sent to users in groups:", userGroups);
    }
  } catch (error) {
    console.error("Error notifying user groups about announcement:", error);
  }
};

/**
 * Helper to send email to a specific user
 */
const sendEmailToUser = async (
  userId: string, 
  title: string, 
  content: string
) => {
  try {
    // Get user email from auth.users using admin API
    const { data, error } = await supabase.auth.admin.getUserById(userId);
    
    if (error || !data?.user?.email) {
      console.error("Error getting user email:", error);
      return false;
    }
    
    const email = data.user.email;
    const emailTemplate = createAnnouncementEmailTemplate(title, content);
    
    return await sendEmail({
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
