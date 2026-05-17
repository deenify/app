import ProfilePersonalizationPage from "@/components/pages/profile/pages/personalization/ProfilePersonalizationPage"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Profile Personalization" },
    description: `View your profile personalization and manage your personalization settings.`,
}

export default function ProfilePersonalizationRoutePage() {
    return <ProfilePersonalizationPage />
}
