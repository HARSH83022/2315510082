export type NotificationType = 'Placement' | 'Result' | 'Event' | string;

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  metadata?: Record<string, unknown>;
}
