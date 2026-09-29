import { ReactNode } from "react";
import { Metadata } from "next";
import { defaultMeta } from "@/assets/meta";
import ProfileLayoutShell from "@/components/pages/profile/layout/ProfileLayoutShell";

interface ProfileLayoutProps {
    readonly children: ReactNode
}

export const metadata: Metadata = defaultMeta


export default function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <ProfileLayoutShell>
            {children}
        </ProfileLayoutShell>
    );
}
