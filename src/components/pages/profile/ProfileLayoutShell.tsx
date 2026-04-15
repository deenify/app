"use client"

import { useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Card } from "@/components/ui/card"
import ProfileHeader from "./ProfileHeader"
import ProfileSidebar from "./ProfileSidebar"
import ProfilePageHeader from "./ProfilePageHeader"
import { profileSidebarContent } from "./content"
import ProfileDrawer from "./ProfileDrawer"
import { cn } from "@/lib/utils/clsx"

interface ProfileLayoutShellProps {
    readonly children: ReactNode
}

const ProfileLayoutShell = ({ children }: ProfileLayoutShellProps) => {
    const pathname = usePathname()
    const [mobileNavOpen, setMobileNavOpen] = useState(false)

    const CurrentProfilepageHref =
        profileSidebarContent.find(({ href }) =>
            href === "/profile" ? pathname === "/profile" : pathname === href || pathname.startsWith(`${href}/`)
        )?.href ?? "/profile"

    const CurrentProfilepageContent = profileSidebarContent.find((item) =>
        item.href === CurrentProfilepageHref)
        ?? profileSidebarContent[0]
    const CurrentProfilepageIcon = CurrentProfilepageContent.icon

    return (
        <div className="min-h-full bg-gray-50">
            <section className="border-b border-gray-100 bg-white">
                <div className="container px-4 sm:px-6 md:px-6">
                    <div className="mx-auto max-w-6xl py-6 sm:py-8 md:py-10">
                        <ProfileHeader />
                    </div>
                </div>
            </section>

            <section>
                <div className="container px-4 sm:px-6 md:px-6">
                    <div className="mx-auto max-w-6xl py-6 sm:py-8">
                        <ProfilePageHeader />
                        <Card className={cn(
                            "mt-5 border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-transparent to-teal-50/60 p-3 shadow-sm 2xl:hidden",
                        )}>
                            <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">Current Browsing</p>
                                    <div className="mt-1 flex items-center gap-2">
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-emerald-200 bg-white text-emerald-700">
                                            <CurrentProfilepageIcon className="h-4 w-4" strokeWidth={2} />
                                        </span>
                                        <p className="truncate text-sm font-medium text-gray-900">{CurrentProfilepageContent.label}</p>
                                    </div>
                                </div>

                                <ProfileDrawer
                                    mobileNavOpen={mobileNavOpen}
                                    setMobileNavOpen={setMobileNavOpen}
                                    CurrentPageHref={CurrentProfilepageHref}
                                />
                            </div>
                        </Card>

                        <div className="mt-6 flex items-start gap-6">
                            <ProfileSidebar />
                            <div className="min-w-0 flex-1">{children}</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProfileLayoutShell
