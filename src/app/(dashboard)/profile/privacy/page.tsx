import ProfilePrivacyPage from "@/components/pages/profile/pages/privasy/ProfilePrivacyPage"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Profile Privacy" },
    description: `View your profile privacy and manage your privacy settings.`,
}

export default function ProfilePrivacyRoutePage() {
    return <ProfilePrivacyPage />
}
