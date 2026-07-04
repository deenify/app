import ProfileSettingsPage from "@/components/pages/profile/pages/setting/ProfileSettingsPage"
import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Profile Settings` },
    description: `View your profile settings and manage your settings.`,
}

export default function ProfileSettingsRoutePage() {
    return <ProfileSettingsPage />
}
