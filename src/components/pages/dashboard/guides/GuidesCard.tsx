"use client"

import Link from "next/link"
import { BookOpen, Clock, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import BookmarkButton from "@/components/shared/buttons/BookmarkButton"
import { cn } from "@/lib/utils/clsx"
import type { GuideDifficulty, GuideType } from "./content"

const difficultyBadge = (difficulty: GuideDifficulty) => {
    if (difficulty === "beginner") return "border-emerald-100 bg-emerald-50/50 text-emerald-600"
    if (difficulty === "intermediate") return "border-amber-100 bg-amber-50/50 text-amber-700"
    return "border-purple-100 bg-purple-50/50 text-purple-700"
}

type GuidesCardProps = {
    guide: GuideType
    isBookmarked: boolean
    onToggleBookmark: () => void
    viewMode?: "grid" | "list"
}

const GuidesCard = ({ guide, isBookmarked, onToggleBookmark, viewMode = "grid" }: GuidesCardProps) => {
    const detailHref = `/guides/${guide.id}`

    if (viewMode === "list") {
        return (
            <Card className="group overflow-hidden rounded-2xl border-gray-100 bg-white shadow-sm transition-all hover:border-emerald-200 hover:shadow-md">
                <CardContent className="flex items-start gap-3 p-2 sm:gap-5 sm:p-2.5">
                    <Link
                        href={detailHref}
                        className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50 sm:h-20 sm:w-20"
                    >
                        <BookOpen className="h-6 w-6 text-emerald-600 transition-transform duration-500 group-hover:scale-110 sm:h-8 sm:w-8" strokeWidth={1.6} />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <div className="mb-1 flex items-center gap-2">
                            <Link href={detailHref} className="min-w-0">
                                <h3 className="truncate text-xs font-black uppercase tracking-tight text-gray-900 transition-colors group-hover:text-emerald-600 sm:text-sm">
                                    {guide.title}
                                </h3>
                            </Link>
                            <Badge variant="outline" className={cn("hidden h-4 px-1.5 text-[8px] font-black uppercase xs:flex", difficultyBadge(guide.difficulty))}>
                                {guide.difficulty}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <p className="line-clamp-1 text-[10px] font-medium italic text-gray-400 sm:text-xs">{guide.excerpt}</p>
                            <BookmarkButton
                                isBookmarked={isBookmarked}
                                buttonProps={{ onClick: onToggleBookmark }}
                                iconSize={16}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="group overflow-hidden rounded-md border-gray-100 bg-white shadow-sm transition-all duration-500 hover:border-emerald-100 hover:shadow-[0_12px_40px_rgba(16,185,129,0.06)]">
            <CardContent className="p-2">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-gradient-to-br from-emerald-50 to-emerald-100/80">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-10 w-10 text-emerald-600/80 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                    </div>
                    <div className="absolute top-2.5 left-2.5">
                        <div className="rounded-full bg-white p-px shadow-md">
                            <BookmarkButton
                                isBookmarked={isBookmarked}
                                buttonProps={{
                                    shouldScale: false,
                                    onClick: onToggleBookmark,
                                }}
                                iconSize={14}
                            />
                        </div>
                    </div>
                    <div className="absolute bottom-2.5 left-2.5">
                        <div className="flex items-center gap-1 rounded-md border border-white/10 bg-gray-900/40 px-2 py-0.5 text-white backdrop-blur-md">
                            <Clock size={8} />
                            <span className="text-[8px] font-black uppercase tracking-widest">{guide.readTimeMinutes}m</span>
                        </div>
                    </div>
                </div>

                <section className="px-1 pt-2">
                    <div className="mb-4 space-y-1">
                        <h3 className="truncate text-base font-bold tracking-tighter text-gray-900 transition-colors group-hover:text-emerald-600">
                            {guide.title}
                        </h3>
                        <p className="line-clamp-2 text-xs font-medium text-gray-500 opacity-80">{guide.excerpt}</p>
                    </div>

                    <div className="mb-4 flex items-center justify-between border-y border-gray-50 py-3">
                        <span className="text-xs capitalize text-gray-500">{guide.category.replace("-", " ")}</span>
                        <Badge variant="outline" className={cn("text-[10px] font-black uppercase", difficultyBadge(guide.difficulty))}>
                            {guide.difficulty}
                        </Badge>
                    </div>

                    <Button variant="default" size="sm" href={detailHref} className="w-full rounded-md">
                        <span className="text-xs">Read Guide</span>
                        <GraduationCap size={14} strokeWidth={2.5} />
                    </Button>
                </section>
            </CardContent>
        </Card>
    )
}

export default GuidesCard
