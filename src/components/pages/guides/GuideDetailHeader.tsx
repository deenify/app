"use client"

import { motion } from "framer-motion"
import { BookOpen, Bookmark, Clock3, Layers3, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/clsx"
import type { GuideType } from "./content"
import BackButton from "@/components/shared/BackButton"

const difficultyTone = {
    beginner: "border-emerald-200 bg-emerald-50 text-emerald-700",
    intermediate: "border-amber-200 bg-amber-50 text-amber-700",
    advanced: "border-purple-200 bg-purple-50 text-purple-700",
} as const

type GuideDetailHeaderProps = {
    guide: GuideType
    sectionsCount: number
    onBack: () => void
}

const GuideDetailHeader = ({ guide, sectionsCount, onBack }: GuideDetailHeaderProps) => {
    return (
        <header className="space-y-4 border-b border-layout-separator pb-6 sm:pb-7">
            <BackButton
                renderMobileVariant={false}
                buttonProps={{
                    variant: "ghost-emerald",
                    shouldScale: false,
                    onClick: onBack,
                    size: "default",
                }}
                label="Back to Guides"
                labelMbl="Back"
            />

            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="mb-1 flex items-center gap-2.5"
            >
                <div className="flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 p-2.5">
                    <BookOpen className="h-4.5 w-4.5" strokeWidth={2} />
                </div>
                <Badge variant="emerald" className="text-xs font-medium">
                    Guide detail
                </Badge>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
                className="min-w-0"
            >
                <h1 className="font-medium  text-gray-900 text-4xl tracking-tight max-w-[410px]">
                    {guide.title}
                </h1>

                <p className="mt-3 max-w-3xl text-sm text-gray-600 sm:text-base">
                    {guide.excerpt} This page gives you a focused video walkthrough and practical points to understand
                    and apply the guide with confidence.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                    <Badge
                        variant="outline"
                        className={cn(
                            "text-sm font-medium capitalize",
                            difficultyTone[guide.difficulty]
                        )}
                    >
                        {guide.difficulty}
                    </Badge>
                    <Badge variant="outline" className="!border-0 bg-gray-100 text-gray-700 text-sm">
                        <Layers3 size={16} className="mr-1" />
                        {sectionsCount} sections
                    </Badge>
                    <Badge variant="outline" className="!border-0 bg-gray-100 text-sm text-gray-700">
                        <Clock3 size={16} className="mr-1" />
                        {guide.readTimeMinutes} min read
                    </Badge>
                    <Badge variant="outline" className="!border-0 bg-gray-100 text-sm text-gray-700">
                        {guide.category.replace("-", " ")}
                    </Badge>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                    <Button variant="secondary" shouldScale className="gap-2 max-[360px]:w-full">
                        <Bookmark className="h-4 w-4" />
                        Bookmark
                    </Button>
                    <Button variant="secondary" shouldScale className="gap-2 max-[360px]:w-full">
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                </div>
            </motion.div>
        </header>
    )
}

export default GuideDetailHeader
