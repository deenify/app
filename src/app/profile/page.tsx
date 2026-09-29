import ProfileOverviewPage from "@/components/pages/profile/pages/overview/ProfileOverviewPage"
import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Profile Overview` },
    description: `View your profile overview and manage your account settings.`,
}

export default function ProfilePage() {
    return <ProfileOverviewPage />
}
