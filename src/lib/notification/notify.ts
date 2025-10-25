// lib/notifications/notify.ts

// notification.ts
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!("Notification" in window)) return "denied";
  const permission = await Notification.requestPermission();
  return permission;
}

export async function sendAdhanNotification(prayer: string) {
  if (!("Notification" in window)) return;

  if (Notification.permission !== "granted") {
    await requestNotificationPermission();
  }

  if (Notification.permission === "granted") {
    const options: NotificationOptions = {
      // --- Basic info ---
      body: `It's time for ${prayer} prayer. Click to open the app.`,
      icon: "/icons/adhan-icon.png", // Small icon shown in notification
      badge: "/icons/adhan-badge.png", // Small monochrome icon (Android/Chrome)
      image: "/images/prayer-bg.jpg", // Large image shown in notification body
      lang: "en", // Language direction
      dir: "auto", // auto | ltr | rtl
      timestamp: Date.now(), // Timestamp displayed in the notification

      // --- Interaction ---
      requireInteraction: true, // Keeps it open until the user dismisses it
      silent: false, // Whether to play a sound
      renotify: true, // Re-show notification if same tag used
      tag: `adhan-${prayer}`, // Prevent duplicate notifications with same tag

      // --- Vibration pattern (mobile/Android only) ---
      vibrate: [200, 100, 200, 100, 200],

      // --- Extra info you can read later ---
      data: {
        prayer,
        url: "/",
      },

      // --- Buttons (actions) ---
      actions: [
        {
          action: "open",
          title: "Open App",
          icon: "/icons/open.png",
        },
        {
          action: "dismiss",
          title: "Dismiss",
          icon: "/icons/close.png",
        },
      ],
    };

    // Send it via Service Worker if registered
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.ready;
      reg.showNotification(`${prayer} Adhan`, options);
    } else {
      // Fallback — directly from window
      new Notification(`${prayer} Adhan`, options);
    }
  }
}

// service-worker.js

self.addEventListener("install", (event) => {
  console.log("Service Worker installed.");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { action } = event;
  const { prayer, url } = event.notification.data || {};

  if (action === "dismiss") {
    return;
  }

  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({
        includeUncontrolled: true,
      });

      // Try to focus an existing tab
      for (const client of allClients) {
        if ("focus" in client) return client.focus();
      }

      // Otherwise, open a new one
      if (clients.openWindow) {
        return clients.openWindow(url || "/");
      }
    })()
  );
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("/service-worker.js");
      console.log("Service Worker registered!");
    } catch (err) {
      console.error("Service Worker registration failed:", err);
    }
  });
}

