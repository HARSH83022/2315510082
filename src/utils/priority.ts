import { Notification } from '../types/notification';

const priorityScore: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1
};

export function getPriorityNotifications(notifications: Notification[], limit = 10) {
  return [...notifications]
    .sort((a, b) => {
      const aScore = priorityScore[a.type] ?? 0;
      const bScore = priorityScore[b.type] ?? 0;

      if (bScore !== aScore) {
        return bScore - aScore;
      }

      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return bTime - aTime;
    })
    .slice(0, limit);
}
