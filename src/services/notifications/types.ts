
export type NotificationType = 'order' | 'payment' | 'message' | 'review' | 'promotion' | 'security' | 'announcement';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: NotificationType;
  read: boolean;
  createdAt: string;
  linkTo?: string;
}
