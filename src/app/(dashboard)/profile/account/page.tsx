import ProfileAccountPage from "@/components/pages/profile/pages/account/ProfileAccountPage";
import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Profile Account` },
    description: `View your profile account and manage your account settings.`,
}

export default function ProfileAccountRoutePage() {
    return <ProfileAccountPage />
}
