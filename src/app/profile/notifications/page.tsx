import ProfileNotificationsPage from "@/components/pages/profile/pages/notification/ProfileNotificationsPage"
import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Profile Notifications` },
    description: `View your profile notifications and manage your notification settings.`,
}

export default function ProfileNotificationsRoutePage() {
    return <ProfileNotificationsPage />
}
