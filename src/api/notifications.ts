import axios, { type AxiosError } from 'axios';
import { apiClient } from '../services/apiClient';
import { Notification } from '../types/notification';
import { log } from '../services/logger';

export interface NotificationQuery {
  page?: number;
  limit?: number;
  notification_type?: string;
}

export interface NotificationResponse {
  data: Notification[];
  total: number;
  page: number;
  limit: number;
}

function normalizeNotificationResponse(responseData: unknown, params: NotificationQuery): NotificationResponse {
  let notifications: Notification[] = [];
  let total = 0;
  let page = params.page ?? 1;
  let limit = params.limit ?? 10;

  if (Array.isArray(responseData)) {
    notifications = responseData;
  } else if (responseData && typeof responseData === 'object') {
    const dataAny = responseData as Record<string, unknown>;

    if (Array.isArray(dataAny.data)) {
      notifications = dataAny.data as Notification[];
    } else if (Array.isArray(dataAny.notifications)) {
      notifications = dataAny.notifications as Notification[];
    } else if (
      dataAny.data &&
      typeof dataAny.data === 'object' &&
      Array.isArray((dataAny.data as Record<string, unknown>).notifications)
    ) {
      notifications = (dataAny.data as Record<string, unknown>).notifications as Notification[];
    }

    if (typeof dataAny.total === 'number') {
      total = dataAny.total;
    }

    if (typeof dataAny.page === 'number') {
      page = dataAny.page;
    }

    if (typeof dataAny.limit === 'number') {
      limit = dataAny.limit;
    }
  }

  if (total === 0) {
    total = notifications.length;
  }

  return {
    data: notifications,
    total,
    page,
    limit
  };
}

export async function fetchNotifications(params: NotificationQuery) {
  try {
    const response = await apiClient.get('/evaluation-service/notifications', { params });

    // Map backend response fields to our frontend Notification model when necessary.
    const mapItem = (item: any) => ({
      id: item.ID ?? item.id ?? '',
      title: item.Type ?? item.title ?? '',
      message: item.Message ?? item.message ?? '',
      type: item.Type ?? item.type ?? '',
      // Convert timestamps like "2026-04-22 17:51:30" -> "2026-04-22T17:51:30" for reliable parsing
      createdAt: item.Timestamp
        ? String(item.Timestamp).replace(' ', 'T')
        : item.createdAt ?? ''
    });

    const raw = response.data as any;

    let mapped: unknown = raw;

    if (Array.isArray(raw)) {
      mapped = raw.map(mapItem);
    } else if (raw && typeof raw === 'object') {
      const copy: Record<string, any> = { ...raw };

      if (Array.isArray(raw.data)) {
        copy.data = raw.data.map(mapItem);
      }

      if (Array.isArray(raw.notifications)) {
        copy.notifications = raw.notifications.map(mapItem);
      }

      // If the API returned an object shaped like a single item
      if (!Array.isArray(raw.data) && !Array.isArray(raw.notifications) && (raw.ID || raw.Timestamp)) {
        copy.data = [mapItem(raw)];
      }

      mapped = copy;
    }

    const normalized = normalizeNotificationResponse(mapped, params);

    log('frontend', 'debug', 'api', `Fetched ${normalized.data.length} notifications from /evaluation-service/notifications`);

    return normalized;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const statusText = error.response?.statusText;
      const serverMessage = error.response?.data ?? error.message;
      const serverText =
        typeof serverMessage === 'string'
          ? serverMessage
          : JSON.stringify(serverMessage, null, 2);
      const message = `Failed to fetch notifications: ${status ?? 'unknown'} ${statusText ?? ''}`.trim();

      log('frontend', 'error', 'api', `${message} - ${serverText}`);
      throw new Error(
        status === 401
          ? `Unauthorized access. Check VITE_ACCESS_TOKEN and API permissions. ${serverText}`
          : `Unable to load notifications (${status}). Please try again. ${serverText}`
      );
    }

    log('frontend', 'error', 'api', `Failed to fetch notifications: ${String(error)}`);
    throw new Error('Unable to load notifications. Please try again.');
  }
}
