import ProfileOverviewPage from "@/components/pages/profile/pages/overview/ProfileOverviewPage"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Profile Overview" },
    description: `View your profile overview and manage your account settings.`,
}

export default function ProfilePage() {
    return <ProfileOverviewPage />
}
