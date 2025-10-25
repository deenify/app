// lib/notifications/permissions.ts

export function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!("Notification" in window)) return Promise.resolve("denied");

  return Notification.requestPermission();
}
