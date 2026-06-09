"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import BookmarkButton from "@/components/shared/buttons/BookmarkButton"
import type { MiracleTopic } from "./content"

type MiracleCardProps = {
    topic: MiracleTopic
    categoryLabel: string
    isBookmarked: boolean
    onToggleBookmark: () => void
    viewMode?: "grid" | "list"
}

export default function MiracleCard({
    topic,
    categoryLabel,
    isBookmarked,
    onToggleBookmark,
    viewMode = "grid",
}: MiracleCardProps) {
    const detailHref = `/miracles/${topic.id}`

    if (viewMode === "list") {
        return (
            <Card className="group overflow-hidden rounded-2xl border-gray-100 bg-white shadow-sm transition-all hover:border-emerald-200 hover:shadow-md">
                <CardContent className="flex items-start gap-3 p-2 sm:gap-5 sm:p-2.5">
                    <Link
                        href={detailHref}
                        className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-50 bg-gray-50 sm:h-20 sm:w-20"
                    >
                        <Image src={topic.thumbnail} alt={topic.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <div className="mb-0.5 flex items-center gap-2 sm:mb-1">
                            <Link href={detailHref} className="min-w-0 flex-1">
                                <h3 className="truncate text-xs font-black uppercase tracking-tight text-gray-900 transition-colors group-hover:text-emerald-600 sm:text-sm">
                                    {topic.title}
                                </h3>
                            </Link>
                            <Badge variant="outline" className="hidden shrink-0 border-emerald-100 bg-emerald-50/50 text-[8px] font-black uppercase text-emerald-600 xs:flex">
                                {categoryLabel}
                            </Badge>
                        </div>
                        {topic.quranRef && (
                            <p className="mb-1 truncate text-[10px] font-medium text-gray-400 sm:text-xs">{topic.quranRef}</p>
                        )}
                        <section className="flex items-start justify-between gap-2 sm:items-center">
                            <p className="min-w-0 flex-1 line-clamp-2 text-[10px] font-medium text-gray-400 sm:line-clamp-1 sm:text-xs">
                                {topic.excerpt}
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
        <Card className="group overflow-hidden rounded-md border-gray-100 bg-white shadow-sm transition-all duration-500 hover:border-emerald-100 hover:shadow-[0_12px_40px_rgba(16,185,129,0.06)]">
            <CardContent className="p-2">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md">
                    <Image src={topic.thumbnail} alt={topic.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
                            <span className="text-[8px] font-black uppercase tracking-widest">{topic.readMinutes}m</span>
                        </div>
                    </div>
                </div>

                <section className="px-1 pt-2">
                    <div className="mb-4 space-y-1">
                        <h3 className="truncate text-base font-bold tracking-tighter text-gray-900 transition-colors group-hover:text-emerald-600">
                            {topic.title}
                        </h3>
                        <p className="line-clamp-2 text-xs font-medium text-gray-500 opacity-80">{topic.excerpt}</p>
                    </div>

                    <div className="mb-4 flex items-center justify-between border-y border-gray-50 py-3">
                        <Badge variant="outline" className="border-emerald-100 bg-emerald-50/50 text-[10px] font-black uppercase text-emerald-600">
                            {categoryLabel}
                        </Badge>
                        {topic.quranRef && (
                            <span className="truncate text-[10px] text-gray-400">{topic.quranRef}</span>
                        )}
                    </div>

                    <Button variant="default" size="sm" href={detailHref} className="w-full rounded-md">
                        <span className="text-xs">Discover Sign</span>
                        <Sparkles size={14} strokeWidth={2.5} />
                    </Button>
                </section>
            </CardContent>
        </Card>
    )
}
