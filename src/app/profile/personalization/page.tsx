import ProfilePersonalizationPage from "@/components/pages/profile/pages/personalization/ProfilePersonalizationPage"
import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Profile Personalization` },
    description: `View your profile personalization and manage your personalization settings.`,
}

export default function ProfilePersonalizationRoutePage() {
    return <ProfilePersonalizationPage />
}
