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
      lang: "en", // Language direction
      dir: "auto", // auto | ltr | rtl 

      // --- Interaction ---
      requireInteraction: true, // Keeps it open until the user dismisses it
      silent: false, // Whether to play a sound 
      tag: `adhan-${prayer}`, // Prevent duplicate notifications with same tag

      // --- Extra info you can read later ---
      data: {
        prayer,
        url: "/",
      },
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
 