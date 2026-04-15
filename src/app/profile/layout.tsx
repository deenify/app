import type { Metadata } from "next"
import type { ReactNode } from "react"
import ProfileLayoutShell from "@/components/pages/profile/ProfileLayoutShell"

export const metadata: Metadata = {
    title: "Profile",
    description: "Manage your Deenify profile, privacy, and preferences.",
}

interface ProfileLayoutProps {
    readonly children: ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <ProfileLayoutShell>
            {children}
        </ProfileLayoutShell>
    )
}
