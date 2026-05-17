import ProfileAccountPage from "@/components/pages/profile/pages/account/ProfileAccountPage";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Profile Account" },
    description: `View your profile account and manage your account settings.`,
}

export default function ProfileAccountRoutePage() {
    return <ProfileAccountPage />
}
