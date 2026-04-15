"use client"

import { usePathname } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/clsx"
import { getProfilePagesHeader, profileHeaderContent } from "./content"

const ProfilePageHeader = () => {
    const pathname = usePathname()
    const meta = getProfilePagesHeader(pathname)
    const shouldReduceMotion = useReducedMotion()

    const transition = shouldReduceMotion
        ? { duration: 0.01 }
        : {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1] as const,
        }

    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.08,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 14 },
        show: {
            opacity: 1,
            y: 0,
            transition,
        },
    }

    if (shouldReduceMotion) {
        return (
            <header className="space-y-2 border-b border-gray-100 pb-6 sm:pb-7">
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

                <h2 className="text-xl font-medium tracking-tight text-gray-900 sm:text-2xl">
                    {meta.title}
                </h2>

                <p className="max-w-2xl text-sm text-gray-600 sm:text-base line-clamp-2 min-h-12">
                    {meta.description}
                </p>
            </header>
        )
    }

    return (
        <motion.header
            key={meta.path}
            className="space-y-2 border-b border-gray-100 pb-6 sm:pb-7"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div className="flex flex-wrap items-center gap-2" variants={item}>
                <Badge variant={meta.badge.variant} className={cn("font-medium", meta.badge.className)}>
                    {meta.badge.label}
                </Badge>

                {meta.path === "/profile" && (
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Member Since {profileHeaderContent.memberSince}
                    </span>
                )}
            </motion.div>

            <motion.h2
                className="text-balance text-xl font-medium tracking-tight text-gray-900 sm:text-2xl"
                variants={item}
            >
                {meta.title}
            </motion.h2>

            <motion.p
                className="max-w-2xl text-sm text-gray-600 sm:text-base line-clamp-2 min-h-12"
                variants={item}
            >
                {meta.description}
            </motion.p>
        </motion.header>
    )
}

export default ProfilePageHeader