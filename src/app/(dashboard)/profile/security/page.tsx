import ProfileSecurityPage from "@/components/pages/profile/pages/security/ProfileSecurityPage"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Profile Security" },
    description: `View your profile security and manage your security settings.`,
}

export default function ProfileSecurityRoutePage() {
    return <ProfileSecurityPage />
}
