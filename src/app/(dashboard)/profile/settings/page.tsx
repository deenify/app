import ProfileSettingsPage from "@/components/pages/profile/pages/setting/ProfileSettingsPage"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Profile Settings" },
    description: `View your profile settings and manage your settings.`,
}

export default function ProfileSettingsRoutePage() {
    return <ProfileSettingsPage />
}
