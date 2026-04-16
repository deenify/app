"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils/clsx"
import { profileSidebarContent } from "./content"
import { motion, useReducedMotion } from "framer-motion"

const easing = [0.22, 1, 0.36, 1] as const

const ProfileSidebar = () => {
    const pathname = usePathname()
    const shouldReduceMotion = useReducedMotion()

    const container = {
        hidden: { opacity: 0, x: -12 },
        show: {
            opacity: 1,
            x: 0,
            transition: shouldReduceMotion
                ? { duration: 0.01 }
                : {
                    duration: 0.9,
                    ease: easing,
                    staggerChildren: 0.06,
                },
        },
    }

    const item = {
        hidden: { opacity: 0, x: -10 },
        show: {
            opacity: 1,
            x: 0,
            transition: shouldReduceMotion
                ? { duration: 0.01 }
                : {
                    duration: 0.9,
                    ease: easing,
                },
        },
    }

    return (
        <motion.aside
            variants={container}
            initial="hidden"
            animate="show"
            className="hidden 2xl:sticky 2xl:top-6 2xl:block 2xl:w-[250px] 2xl:shrink-0"
        >
            <Card className="border-layout-separator shadow-sm rounded-lg">
                <CardHeader className="pb-3 pt-5">
                    <CardTitle className="text-base font-medium text-gray-900">
                        Profile
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-0 pb-2">
                    <nav className="flex flex-col" aria-label="Profile sections">
                        {profileSidebarContent.map(({ href, label, icon: Icon }) => {
                            const active =
                                href === "/profile"
                                    ? pathname === "/profile"
                                    : pathname === href || pathname.startsWith(`${href}/`)

                            return (
                                <motion.div key={href} variants={item}>
                                    <Link
                                        href={href}
                                        className={cn(
                                            "flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium transition-colors",
                                            active
                                                ? "bg-emerald-50 text-emerald-900"
                                                : "text-gray-700 hover:bg-gray-50"
                                        )}
                                    >
                                        <Icon
                                            size={18}
                                            strokeWidth={2}
                                            className={cn(
                                                active ? "text-emerald-700" : "text-gray-600"
                                            )}
                                        />
                                        <span>{label}</span>
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </nav>
                </CardContent>
            </Card>
        </motion.aside>
    )
}

export default ProfileSidebar