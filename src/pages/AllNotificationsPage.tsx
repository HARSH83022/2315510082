import { Box, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorState from '../components/ErrorState';
import LoadingSpinner from '../components/LoadingSpinner';
import NotificationFilter from '../components/NotificationFilter';
import NotificationList from '../components/NotificationList';
import PaginationControls from '../components/PaginationControls';
import { useNotifications } from '../hooks/useNotifications';

export default function AllNotificationsPage() {
  const {
    notifications,
    loading,
    error,
    page,
    limit,
    notificationType,
    total,
    viewedIds,
    unreadCount,
    setPage,
    setLimit,
    setNotificationType,
    markAsViewed,
    refresh
  } = useNotifications();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refresh} />;
  }

  return (
    <ErrorBoundary>
      <Typography variant="h4" gutterBottom>
        All Notifications
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                {unreadCount} unread notification{unreadCount === 1 ? '' : 's'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Notifications are filtered by type and sorted by newest first within each type.
              </Typography>
            </CardContent>
          </Card>
          <NotificationFilter selected={notificationType} onChange={setNotificationType} />
          <NotificationList notifications={notifications} viewedIds={viewedIds} onSelect={markAsViewed} />
          <PaginationControls
            page={page}
            limit={limit}
            total={total}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Quick details</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Use the filters to refine the notification type. All changes are saved in query parameters so the page is shareable.
                </Typography>
                <Chip label={`Page ${page}`} size="small" sx={{ mt: 2 }} />
                <Chip label={`Limit ${limit}`} size="small" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </ErrorBoundary>
  );
}
