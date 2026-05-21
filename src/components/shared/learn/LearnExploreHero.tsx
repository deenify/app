"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/clsx"
import type { LearnEditorial } from "./types"

type LearnExploreHeroProps = {
    editorial: LearnEditorial
    icon: LucideIcon
    iconClassName?: string
    badgeVariant?: "emerald" | "amber" | "purple"
}

export function LearnExploreHero({
    editorial,
    icon: Icon,
    iconClassName = "bg-emerald-50 text-emerald-700 ring-emerald-100",
    badgeVariant = "emerald",
}: LearnExploreHeroProps) {
    return (
        <header className="text-center">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 flex justify-center sm:mb-6"
            >
                <div
                    className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-2xl ring-1 sm:h-[4.5rem] sm:w-[4.5rem]",
                        iconClassName
                    )}
                >
                    <Icon className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.5} />
                </div>
            </motion.div>
            <Badge variant={badgeVariant} className="mb-3 text-xs font-medium">
                {editorial.badge}
            </Badge>
            <h1 className="text-balance text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl">
                {editorial.title}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">{editorial.lead}</p>
        </header>
    )
}
