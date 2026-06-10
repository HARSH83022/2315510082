import { Box, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorState from '../components/ErrorState';
import LoadingSpinner from '../components/LoadingSpinner';
import NotificationFilter from '../components/NotificationFilter';
import NotificationList from '../components/NotificationList';
import PaginationControls from '../components/PaginationControls';
import { useNotifications } from '../hooks/useNotifications';

export default function PriorityNotificationsPage() {
  const {
    notifications,
    priorityNotifications,
    loading,
    error,
    page,
    limit,
    notificationType,
    total,
    viewedIds,
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
        Priority Notifications
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Top priority notifications are ordered by placement, result, and event.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Showing the highest priority notifications from the current result set.
              </Typography>
            </CardContent>
          </Card>
          <NotificationFilter selected={notificationType} onChange={setNotificationType} />
          <NotificationList notifications={priorityNotifications} viewedIds={viewedIds} onSelect={markAsViewed} />
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
                <Typography variant="h6">Priority logic</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Placement notifications are ranked highest, then Result, then Event. Newer notifications win when types match.
                </Typography>
                <Chip label="Placement > Result > Event" size="small" sx={{ mt: 2 }} />
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </ErrorBoundary>
  );
}
