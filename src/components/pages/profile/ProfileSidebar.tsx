"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils/clsx"
import { profileSidebarContent } from "./content"

const ProfileSidebar = () => {
    const pathname = usePathname()

    return (
        <aside className="hidden 2xl:sticky 2xl:top-6 2xl:block 2xl:w-[250px] 2xl:shrink-0">
            <Card className="border-layout-separator shadow-sm rounded-lg">
                <CardHeader className="pb-3 pt-5">
                    <CardTitle className="text-base font-medium text-gray-900">Profile</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pb-2">
                    <nav
                        className="flex flex-col overflow-x-auto gap-0 lg:overflow-visible px-0 pb-0"
                        aria-label="Profile sections"
                    >
                        {profileSidebarContent.map(({ href, label, icon: Icon }) => {
                            const active =
                                href === "/profile"
                                    ? pathname === "/profile"
                                    : pathname === href || pathname.startsWith(`${href}/`)

                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={cn(
                                        "flex min-w-[9.5rem] shrink-0 items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium",
                                        "group transition-colors lg:min-w-0 lg:rounded-none lg:px-4 lg:py-3",
                                        active
                                            ? "bg-emerald-50 text-emerald-900 lg:border-r-4 lg:border-emerald-600"
                                            : "text-gray-700 hover:bg-gray-50 lg:border-r-4 lg:border-transparent"
                                    )}
                                >
                                    <Icon
                                        size={18}
                                        strokeWidth={2}
                                        className={cn(
                                            "shrink-0",
                                            active ? "text-emerald-700" : "text-gray-600",
                                            "group-hover:text-emerald-700"
                                        )}
                                    />
                                    <span className="truncate">{label}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </CardContent>
            </Card>
        </aside>
    )
}

export default ProfileSidebar
