"use client"

import { motion } from "framer-motion"
import { Bookmark, Clock3, Layers3, Library, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/clsx"
import BackButton from "@/components/shared/buttons/BackButton"
import type { SupplicationItem } from "./content"
import { getCategoryLabel } from "./content"

type SupplicationDetailHeaderProps = {
    item: SupplicationItem
    sectionsCount: number
    href: string
    onShare: () => void
}

export default function SupplicationDetailHeader({
    item,
    sectionsCount,
    href,
    onShare,
}: SupplicationDetailHeaderProps) {
    const readMinutes = Math.max(1, Math.round(item.readSeconds / 60))

    return (
        <header className="space-y-4 border-b border-layout-separator pb-6 sm:pb-7">
            <BackButton
                renderMobileVariant={false}
                buttonProps={{
                    variant: "ghost-emerald",
                    shouldScale: false,
                    href,
                    size: "default",
                }}
                label="Back to Supplications"
                labelMbl="Back"
            />

            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="mb-1 flex items-center gap-2.5"
            >
                <div className="flex items-center justify-center rounded-lg bg-emerald-50 p-2.5 text-emerald-700">
                    <Library className="h-4.5 w-4.5" strokeWidth={2} />
                </div>
                <Badge variant="emerald" className="text-xs font-medium">
                    Supplication detail
                </Badge>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
                className="min-w-0"
            >
                <h1 className="max-w-[410px] text-4xl font-medium tracking-tight text-gray-900">
                    {item.title}
                </h1>

                <p className="mt-3 max-w-3xl text-sm text-gray-600 sm:text-base">
                    {item.excerpt} This page gives you the full Arabic text, translation, and practical points to
                    understand and recite this supplication with presence.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                    <Badge
                        variant="outline"
                        className={cn(
                            "border-emerald-200 bg-emerald-50 text-sm font-medium text-emerald-700"
                        )}
                    >
                        {getCategoryLabel(item.category)}
                    </Badge>
                    <Badge variant="outline" className="!border-0 bg-gray-100 text-sm text-gray-700">
                        <Layers3 size={16} className="mr-1" />
                        {sectionsCount} sections
                    </Badge>
                    <Badge variant="outline" className="!border-0 bg-gray-100 text-sm text-gray-700">
                        <Clock3 size={16} className="mr-1" />
                        {readMinutes} min read
                    </Badge>
                    {item.reference && (
                        <Badge variant="outline" className="!border-0 bg-gray-100 text-sm text-gray-700">
                            {item.reference}
                        </Badge>
                    )}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                    <Button variant="secondary" shouldScale className="gap-2 max-[360px]:w-full">
                        <Bookmark className="h-4 w-4" />
                        Bookmark
                    </Button>
                    <Button
                        variant="secondary"
                        shouldScale
                        className="gap-2 max-[360px]:w-full"
                        onClick={onShare}
                    >
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                </div>
            </motion.div>
        </header>
    )
}
