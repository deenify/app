import ProfilePrivacyPage from "@/components/pages/profile/pages/privasy/ProfilePrivacyPage"
import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Profile Privacy` },
    description: `View your profile privacy and manage your privacy settings.`,
}

export default function ProfilePrivacyRoutePage() {
    return <ProfilePrivacyPage />
}
