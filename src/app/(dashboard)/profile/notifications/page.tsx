import ProfileNotificationsPage from "@/components/pages/profile/pages/notification/ProfileNotificationsPage"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Profile Notifications" },
    description: `View your profile notifications and manage your notification settings.`,
}

export default function ProfileNotificationsRoutePage() {
    return <ProfileNotificationsPage />
}
