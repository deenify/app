import ProfileSecurityPage from "@/components/pages/profile/pages/security/ProfileSecurityPage"
import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Profile Security` },
    description: `View your profile security and manage your security settings.`,
}

export default function ProfileSecurityRoutePage() {
    return <ProfileSecurityPage />
}
