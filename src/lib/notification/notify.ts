// lib/notifications/notify.ts

/**
 * Requests permission for browser notifications.
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
    if (!("Notification" in window)) return "denied";
    const permission = await Notification.requestPermission();
    return permission;
}

/**
 * Sends a system-level Adhan notification.
 */
export async function sendAdhanNotification(prayer: string) {
    if (!("Notification" in window)) return;

    if (Notification.permission !== "granted") {
        await requestNotificationPermission();
    }

    if (Notification.permission === "granted") {
        const options: NotificationOptions = {
            body: `It's time for ${prayer} prayer. Click to open the app.`,
            icon: "/icons/adhan-icon.png",
            badge: "/icons/adhan-badge.png",
            lang: "en",
            dir: "auto",
            requireInteraction: true,
            silent: false,
            tag: `adhan-${prayer}`,
            data: {
                prayer,
                url: "/",
            },
        };

        if ("serviceWorker" in navigator) {
            const reg = await navigator.serviceWorker.ready;
            reg.showNotification(`${prayer} Adhan`, options);
        } else {
            new Notification(`${prayer} Adhan`, options);
        }
    }
}

/** 
 * Working 'notify' utility for UI feedback.
 * Since no toast library is installed, we use a custom implementation or fallback.
 */
export const notify = {
    success: (message: string) => {
        console.log("SUCCESS:", message);
        // We use a high-end system notification if possible, otherwise fallback to alert for visual confirmation
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification("Success", { body: message });
        } else if ("Notification" in window && Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification("Success", { body: message });
                }
            });
        }
        // Fallback for visual confirmation if console isn't enough for the user
        // alert(message); 
    },
    error: (message: string) => {
        console.error("ERROR:", message);
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification("Error", { body: message });
        }
    },
    info: (message: string) => {
        console.info("INFO:", message);
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification("Info", { body: message });
        }
    }
};
