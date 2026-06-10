import { log } from '../services/logger';
import { useLocalStorage } from './useLocalStorage';

export function useViewedNotifications() {
  const [viewedIds, setViewedIds] = useLocalStorage<string[]>('affordmed_viewed_notifications', []);

  const isViewed = (id: string) => viewedIds.includes(id);

  const markAsViewed = (id: string) => {
    if (viewedIds.includes(id)) {
      return;
    }
    const updated = [...viewedIds, id];
    setViewedIds(updated);
    log('frontend', 'debug', 'state', `Notification ${id} marked as viewed`);
  };

  const markAllAsViewed = (ids: string[]) => {
    const uniqueIds = Array.from(new Set([...viewedIds, ...ids]));
    setViewedIds(uniqueIds);
    log('frontend', 'info', 'state', `Marked ${ids.length} notifications as viewed`);
  };

  return { viewedIds, isViewed, markAsViewed, markAllAsViewed };
}
