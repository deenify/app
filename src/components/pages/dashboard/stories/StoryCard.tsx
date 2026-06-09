"use client"

import Link from "next/link"
import { BookHeart, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import BookmarkButton from "@/components/shared/buttons/BookmarkButton"
import type { StoryTopic } from "./content"

type StoryCardProps = {
    story: StoryTopic
    categoryLabel: string
    isBookmarked: boolean
    onToggleBookmark: () => void
    viewMode?: "grid" | "list"
}

export default function StoryCard({
    story,
    categoryLabel,
    isBookmarked,
    onToggleBookmark,
    viewMode = "grid",
}: StoryCardProps) {
    const detailHref = `/stories/${story.id}`

    if (viewMode === "list") {
        return (
            <Card className="group overflow-hidden rounded-2xl border-gray-100 bg-white shadow-sm transition-all hover:border-purple-200 hover:shadow-md">
                <CardContent className="flex items-start gap-3 p-2 sm:gap-5 sm:p-2.5">
                    <Link
                        href={detailHref}
                        className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-purple-100 bg-purple-50 sm:h-20 sm:w-20"
                    >
                        <BookHeart className="h-6 w-6 text-purple-600 transition-transform duration-500 group-hover:scale-110 sm:h-8 sm:w-8" strokeWidth={1.6} />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <div className="mb-0.5 flex items-center gap-2 sm:mb-1">
                            <Link href={detailHref} className="min-w-0 flex-1">
                                <h3 className="truncate text-xs font-black uppercase tracking-tight text-gray-900 transition-colors group-hover:text-purple-600 sm:text-sm">
                                    {story.title}
                                </h3>
                            </Link>
                            <Badge variant="outline" className="hidden shrink-0 border-purple-100 bg-purple-50/50 text-[8px] font-black uppercase text-purple-600 xs:flex">
                                {categoryLabel}
                            </Badge>
                        </div>
                        <p className="mb-1 truncate text-[10px] font-medium text-purple-700/80 sm:text-xs">{story.prophet}</p>
                        <section className="flex items-start justify-between gap-2 sm:items-center">
                            <p className="min-w-0 flex-1 line-clamp-2 text-[10px] font-medium text-gray-400 sm:line-clamp-1 sm:text-xs">
                                {story.excerpt}
                            </p>
                            <div className="shrink-0">
                                <BookmarkButton
                                    isBookmarked={isBookmarked}
                                    buttonProps={{ onClick: onToggleBookmark }}
                                    iconSize={16}
                                />
                            </div>
                        </section>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="group flex h-full flex-col overflow-hidden rounded-md border-gray-100 bg-white shadow-sm transition-all duration-500 hover:border-purple-100 hover:shadow-[0_12px_40px_rgba(147,51,234,0.08)]">
            <CardContent className="flex h-full flex-col p-2">
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-purple-50 to-purple-100/80">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <BookHeart className="h-10 w-10 text-purple-600/80 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
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
                    <div className="absolute bottom-2.5 left-2.5 flex gap-1.5">
                        <div className="flex items-center gap-1 rounded-md border border-white/10 bg-gray-900/40 px-2 py-0.5 text-white backdrop-blur-md">
                            <Clock size={8} />
                            <span className="text-[8px] font-black uppercase tracking-widest">{story.readMinutes}m</span>
                        </div>
                    </div>
                </div>

                <section className="flex flex-1 flex-col px-1 pt-2">
                    <div className="mb-2 space-y-0.5">
                        <h3 className="truncate text-base font-bold tracking-tighter text-gray-900 transition-colors group-hover:text-purple-600">
                            {story.title}
                        </h3>
                        <p className="line-clamp-1 text-xs font-medium text-gray-500 opacity-80">{story.excerpt}</p>
                    </div>

                    <div className="mb-2 flex min-h-8 items-center gap-2 border-y border-gray-50 py-2">
                        <Badge
                            variant="outline"
                            className="shrink-0 border-purple-100 bg-purple-50/50 text-[10px] font-black uppercase text-purple-600"
                        >
                            {categoryLabel}
                        </Badge>
                        <span className="min-w-0 flex-1 truncate text-[10px] text-purple-700/80">{story.prophet}</span>
                    </div>

                    <Button variant="default-purple" size="sm" href={detailHref} className="mt-auto w-full rounded-md">
                        <span className="text-xs">Read Story</span>
                        <BookHeart size={14} strokeWidth={2.5} />
                    </Button>
                </section>
            </CardContent>
        </Card>
    )
}
