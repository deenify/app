"use client"

import { useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import ProfileHeader from "./ProfileHeader"
import ProfileSidebar from "./ProfileSidebar"
import ProfilePageHeader from "./ProfilePageHeader"
import { profileSidebarContent } from "../content"
import ProfileDrawer from "./ProfileDrawer"

interface ProfileLayoutShellProps {
    readonly children: ReactNode
}

const ProfileLayoutShell = ({ children }: ProfileLayoutShellProps) => {

    const pathname = usePathname()
    const [mobileNavOpen, setMobileNavOpen] = useState(false)

    const ActivePagePath =
        profileSidebarContent.find(({ href }) =>
            href === "/profile"
                ? pathname === "/profile"
                : pathname === href || pathname.startsWith(`${href}/`)
        )?.href ?? "/profile"

    const ActivePageContent = profileSidebarContent.find((item) =>
        item.href === ActivePagePath)
        ?? profileSidebarContent[0]


    return (
        <div className="bg-gray-50">
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
                        <ProfileDrawer
                            mobileNavOpen={mobileNavOpen}
                            setMobileNavOpen={setMobileNavOpen}
                            ActivePageContent={ActivePageContent}
                        />

                        <div className="mt-6 flex items-start gap-6">
                            <ProfileSidebar />
                            <div className="min-w-0 flex-1 h-max">{children}</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProfileLayoutShell
