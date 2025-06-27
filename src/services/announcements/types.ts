
/**
 * Types for the announcement service
 */

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  importance: "low" | "medium" | "high";
  startDate: string;
  endDate: string | null;
  targetUserGroups: string[];
  sendEmail: boolean;
  createdAt: string;
  createdBy: string;
}

export interface CreateAnnouncementParams {
  title: string;
  content: string;
  category: string;
  importance: "low" | "medium" | "high";
  startDate: string;
  endDate: string | null;
  targetUserGroups: string[];
  sendEmail: boolean;
}
