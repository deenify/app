"use client"

import { BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/clsx"
import type { GuideDifficulty, GuideType } from "./content"
import Link from "next/link"
import BookmarkButton from "@/components/shared/buttons/BookmarkButton"

const difficultyBadge = (difficulty: GuideDifficulty) => {
    if (difficulty === "beginner") return "bg-emerald-50 border-emerald-200 text-emerald-700"
    if (difficulty === "intermediate") return "bg-amber-50 border-amber-200 text-amber-800"
    return "bg-purple-50 border-purple-200 text-purple-800"
}

type GuidesCardProps = {
    guide: GuideType
    isBookmarked: boolean
    onToggleBookmark: () => void
}

const GuidesCard = ({ guide, isBookmarked, onToggleBookmark }: GuidesCardProps) => {
    return (
        <Link href={`/guides/${guide.id}`}>
            <div
                className={cn(
                    "group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 text-left",
                    "cursor-pointer transition-[border-color,box-shadow] hover:border-emerald-300 hover:shadow-sm"
                )}
            >
                <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100">
                        <BookOpen className="h-5 w-5" strokeWidth={1.6} />
                    </div>

                    <BookmarkButton
                        isBookmarked={isBookmarked}
                        buttonProps={{
                            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault()
                                e.stopPropagation()
                                onToggleBookmark()
                            },
                            "aria-label": isBookmarked ? "Remove bookmark" : "Bookmark guide",
                        }}
                    />
                </div>

                <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-800">{guide.title}</p>
                <p className="mt-1 text-sm capitalize text-gray-500">{guide.category.replace("-", " ")}</p>

                <div className="mt-3 flex items-center justify-between gap-2 text-xs text-gray-500">
                    <span className="tabular-nums">{guide.readTimeMinutes} min read</span>
                    <Badge variant="outline" className={cn("capitalize", difficultyBadge(guide.difficulty))}>
                        {guide.difficulty}
                    </Badge>
                </div>
            </div>
        </Link>
    )
}

export default GuidesCard
