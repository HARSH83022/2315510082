import { Grid, Typography } from '@mui/material';
import { Notification } from '../types/notification';
import NotificationCard from './NotificationCard';

interface NotificationListProps {
  notifications: Notification[];
  viewedIds: string[];
  onSelect: (id: string) => void;
}

export default function NotificationList({ notifications, viewedIds, onSelect }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
        No notifications found for this selection.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {notifications.map((notification) => (
        <Grid item xs={12} md={6} key={notification.id}>
          <NotificationCard
            notification={notification}
            unread={!viewedIds.includes(notification.id)}
            onSelect={onSelect}
          />
        </Grid>
      ))}
    </Grid>
  );
}
