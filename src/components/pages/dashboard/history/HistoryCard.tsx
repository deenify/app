"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, Scroll } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import BookmarkButton from "@/components/shared/buttons/BookmarkButton"
import type { HistoryTopic } from "./content"

type HistoryCardProps = {
    topic: HistoryTopic
    categoryLabel: string
    isBookmarked: boolean
    onToggleBookmark: () => void
    viewMode?: "grid" | "list"
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80"

export default function HistoryCard({
    topic,
    categoryLabel,
    isBookmarked,
    onToggleBookmark,
    viewMode = "grid",
}: HistoryCardProps) {
    const detailHref = `/history/${topic.id}`
    const image = topic.thumbnail ?? FALLBACK_IMAGE

    if (viewMode === "list") {
        return (
            <Card className="group overflow-hidden rounded-2xl border-gray-100 bg-white shadow-sm transition-all hover:border-amber-200 hover:shadow-md">
                <CardContent className="flex items-start gap-3 p-2 sm:gap-5 sm:p-2.5">
                    <Link
                        href={detailHref}
                        className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-50 bg-gray-50 sm:h-20 sm:w-20"
                    >
                        <Image src={image} alt={topic.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <div className="mb-1 flex items-center gap-2">
                            <Link href={detailHref} className="min-w-0">
                                <h3 className="truncate text-xs font-black uppercase tracking-tight text-gray-900 transition-colors group-hover:text-amber-700 sm:text-sm">
                                    {topic.title}
                                </h3>
                            </Link>
                            <Badge variant="outline" className="hidden border-amber-100 bg-amber-50/50 text-[8px] font-black uppercase text-amber-700 xs:flex">
                                {categoryLabel}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <p className="line-clamp-2 text-[10px] font-medium text-gray-400 sm:text-xs">{topic.excerpt}</p>
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
        <Card className="group overflow-hidden rounded-md border-gray-100 bg-white shadow-sm transition-all duration-500 hover:border-amber-100 hover:shadow-[0_12px_40px_rgba(217,119,6,0.08)]">
            <CardContent className="p-2">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md">
                    <Image src={image} alt={topic.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
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
                        <h3 className="truncate text-base font-bold tracking-tighter text-gray-900 transition-colors group-hover:text-amber-700">
                            {topic.title}
                        </h3>
                        <p className="line-clamp-2 text-xs font-medium text-gray-500 opacity-80">{topic.excerpt}</p>
                    </div>

                    <div className="mb-4 flex items-center justify-between border-y border-gray-50 py-3">
                        <Badge variant="outline" className="border-amber-100 bg-amber-50/50 text-[10px] font-black uppercase text-amber-700">
                            {categoryLabel}
                        </Badge>
                        <span className="text-[10px] tabular-nums text-gray-400">{topic.era}</span>
                    </div>

                    <Button variant="default-amber" size="sm" href={detailHref} className="w-full rounded-md">
                        <span className="text-xs">Explore History</span>
                        <Scroll size={14} strokeWidth={2.5} />
                    </Button>
                </section>
            </CardContent>
        </Card>
    )
}
