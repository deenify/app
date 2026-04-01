"use client"

import { motion } from "framer-motion"
import { BookOpen, Bookmark } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/clsx"
import type { GuideDifficulty, GuideType } from "./content"

const difficultyBadge = (difficulty: GuideDifficulty) => {
    if (difficulty === "beginner") return "bg-emerald-50 border-emerald-200 text-emerald-700"
    if (difficulty === "intermediate") return "bg-amber-50 border-amber-200 text-amber-800"
    return "bg-purple-50 border-purple-200 text-purple-800"
}

type GuidesCardProps = {
    guide: GuideType
    index: number
    isBookmarked: boolean
    onToggleBookmark: () => void
    onOpen: () => void
}

const GuidesCard = ({ guide, index, isBookmarked, onToggleBookmark, onOpen }: GuidesCardProps) => {
    return (
        <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.03, ease: "easeOut" }}
            onClick={onOpen}
            className={cn(
                "group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 text-left",
                "transition-[border-color,box-shadow] hover:border-emerald-300 hover:shadow-sm"
            )}
        >
            <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <BookOpen className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        onToggleBookmark()
                    }}
                    className={cn(
                        "rounded-md p-1.5 transition-colors",
                        isBookmarked ? "text-emerald-600" : "text-gray-400 hover:text-gray-600"
                    )}
                    aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                    <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
                </button>
            </div>

            <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-800">{guide.title}</p>
            <p className="mt-1 text-sm text-gray-500 capitalize">{guide.category.replace("-", " ")}</p>

            <div className="mt-3 flex items-center justify-between gap-2 text-xs text-gray-500">
                <span className="tabular-nums">{guide.readTimeMinutes} min read</span>
                <Badge variant="outline" className={cn("capitalize", difficultyBadge(guide.difficulty))}>
                    {guide.difficulty}
                </Badge>
            </div>
        </motion.button>
    )
}

export default GuidesCard
