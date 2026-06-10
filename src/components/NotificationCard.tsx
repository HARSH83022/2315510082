import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';
import { Notification } from '../types/notification';

interface NotificationCardProps {
  notification: Notification;
  unread: boolean;
  onSelect: (id: string) => void;
}

export default function NotificationCard({ notification, unread, onSelect }: NotificationCardProps) {
  const formattedDate = new Date(notification.createdAt).toLocaleString();

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: unread ? 'primary.main' : 'divider',
        backgroundColor: unread ? 'rgba(25, 118, 210, 0.08)' : 'background.paper'
      }}
    >
      <CardActionArea onClick={() => onSelect(notification.id)}>
        <CardContent sx={{ px: 2, py: 1.5 }}>
          <Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap={1}>
            <Typography variant="subtitle1" fontWeight={unread ? 700 : 600}>
              {notification.title}
            </Typography>
            <Chip label={notification.type} size="small" color={unread ? 'primary' : 'default'} />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1.5 }}>
            {notification.message}
          </Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">
              {formattedDate}
            </Typography>
            {unread && (
              <Chip label="Unread" size="small" color="secondary" sx={{ fontWeight: 700 }} />
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
