"use client"

import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/clsx"
import { getProfilePagesHeader, profileHeaderContent } from "./content"

const ProfilePageHeader = () => {
    const pathname = usePathname()
    const meta = getProfilePagesHeader(pathname)

    return (
        <header
            key={meta.path}
            className="space-y-2 border-b border-gray-100 pb-6 sm:pb-7"
        >
            <div className="flex flex-wrap items-center gap-2">
                <Badge variant={meta.badge.variant} className={cn("font-medium", meta.badge.className)}>
                    {meta.badge.label}
                </Badge>
                {meta.path === "/profile" && (
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Member Since {profileHeaderContent.memberSince}
                    </span>
                )}
            </div>
            <h2 className="text-balance text-xl font-medium tracking-tight text-gray-900 sm:text-2xl">
                {meta.title}
            </h2>
            <p className="max-w-2xl text-sm text-gray-600 sm:text-base">
                {meta.description}
            </p>
        </header>
    )
}

export default ProfilePageHeader
