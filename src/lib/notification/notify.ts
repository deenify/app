// lib/notifications/notify.ts

export function sendAdhanNotification(prayer: string) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(`${prayer} Adhan`, {
      body: "Click to open the app",
      icon: "/icons/adhan.png",
      lang: "en",
    });
  }
}
