
import { 
  fetchNotificationsFromDb, 
  markNotificationAsReadInDb,
  markAllNotificationsAsReadInDb,
  deleteNotificationFromDb,
  clearAllNotificationsFromDb,
  createNotificationInDb
} from "./repository";
import { subscribeToNotificationsFromDb } from "./subscriptions";
import { formatNotificationTime } from "./formatters";
import { Notification, NotificationType } from "./types";

// Re-export all the functions with simpler names for external use
export const fetchNotifications = fetchNotificationsFromDb;
export const markNotificationAsRead = markNotificationAsReadInDb;
export const markAllNotificationsAsRead = markAllNotificationsAsReadInDb;
export const deleteNotification = deleteNotificationFromDb;
export const clearAllNotifications = clearAllNotificationsFromDb;
export const createNotification = createNotificationInDb;
export const subscribeToNotifications = subscribeToNotificationsFromDb;

// Re-export types and formatters
export { formatNotificationTime };
export type { Notification, NotificationType };
