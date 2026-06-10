import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Notification } from '../types/notification';
import { fetchNotifications } from '../api/notifications';
import { log } from '../services/logger';
import { getPriorityNotifications } from '../utils/priority';
import { usePagination } from './usePagination';
import { useViewedNotifications } from './useViewedNotifications';

export function useNotifications() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, limit, setPage, setLimit } = usePagination();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const notificationType = searchParams.get('notification_type') ?? '';
  const { viewedIds, markAsViewed } = useViewedNotifications();

  useEffect(() => {
    const abortController = new AbortController();

    const loadNotifications = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchNotifications({
          page,
          limit,
          notification_type: notificationType || undefined
        });

        const items = Array.isArray(response.data)
          ? response.data
          : Array.isArray((response as any).data)
          ? (response as any).data
          : [];

        setNotifications(items);
        setTotal(
          typeof response.total === 'number'
            ? response.total
            : items.length
        );
        log(
          'frontend',
          'info',
          'hook',
          `Loaded ${items.length} notifications page=${page} limit=${limit} filter=${notificationType || 'all'}`
        );
      } catch (exception) {
        const message =
          exception instanceof Error
            ? exception.message
            : 'Unable to load notifications. Please try again.';
        setError(message);
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadNotifications();

    return () => {
      abortController.abort();
    };
  }, [page, limit, notificationType, refreshKey]);

  const priorityNotifications = useMemo(() => getPriorityNotifications(notifications, 10), [notifications]);
  const unreadCount = notifications.filter((item) => !viewedIds.includes(item.id)).length;

  const setNotificationType = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('notification_type', value);
    } else {
      params.delete('notification_type');
    }

    params.set('page', '1');
    setSearchParams(params);
    log('frontend', 'info', 'hook', `Filter changed to type=${value || 'all'}`);
  };

  const refresh = () => {
    setRefreshKey((current) => current + 1);
    log('frontend', 'info', 'hook', 'Refresh notifications requested');
  };

  return {
    notifications,
    priorityNotifications,
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
  };
}
