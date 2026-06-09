"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/clsx"
import BookmarkButton from "@/components/shared/buttons/BookmarkButton"
import type { SupplicationItem } from "./content"
import { Copy, Share2, Clock, Check, Sparkles, BookOpen, Library } from "lucide-react"
import { useState } from "react"
import { notify } from "@/lib/notification/notify"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type SupplicationCardProps = {
    item: SupplicationItem
    isBookmarked: boolean
    onToggleBookmark: () => void
    viewMode?: "grid" | "list"
}

export default function SupplicationCard({
    item,
    isBookmarked,
    onToggleBookmark,
    viewMode = "grid",
}: SupplicationCardProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation()
        navigator.clipboard.writeText(item.arabic)
        setCopied(true)
        notify.success("Arabic text copied to clipboard")
        setTimeout(() => setCopied(false), 2000)
    }

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (navigator.share) {
            navigator.share({
                title: item.title,
                text: `${item.title}: ${item.arabic}\n\nRead more on Deenify.`,
                url: window.location.href,
            })
        } else {
            notify.info("Sharing not supported on this browser")
        }
    }

    const detailHref = `/supplications/${item.id}`

    if (viewMode === "list") {
        return (
            <Card className="group relative border-gray-100 bg-white hover:border-emerald-200 transition-all overflow-hidden shadow-sm hover:shadow-md rounded-2xl">
                <CardContent className="p-2 sm:p-2.5 flex items-start gap-3 sm:gap-5">
                    {/* Visual Anchor */}
                    <Link
                        href={detailHref}
                        className="relative h-14 w-14 sm:h-20 sm:w-20 shrink-0 overflow-hidden 
                        rounded-xl border border-gray-50 bg-gray-50">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                    </Link>

                    {/* Content Area */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                            <h3 className="text-xs sm:text-sm font-black text-gray-900 group-hover:text-emerald-600 transition-colors tracking-tight uppercase truncate">
                                {item.title}
                            </h3>
                            <Badge variant="outline" className="text-[7px] sm:text-[8px] py-0 px-1.5 h-3.5 sm:h-4 border-emerald-100 text-emerald-600 bg-emerald-50/50 font-black uppercase tracking-widest hidden xs:flex">
                                {item.category.split("-")[0]}
                            </Badge>
                        </div>

                        <div className="mb-1">
                            <p className="font-arabic text-base sm:text-lg text-right leading-none text-gray-800 truncate" dir="rtl">
                                {item.arabic}
                            </p>
                        </div>

                        <section className="flex items-center justify-between">
                            <p className="text-[10px] sm:text-xs text-gray-400 line-clamp-1 font-medium italic opacity-80">
                                {item.excerpt}
                            </p>
                            {/* Side Actions Column */}
                            <div className="flex items-center gap-1 sm:gap-2 shrink-0 pr-1">
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                    <Button
                                        variant="ghost-emerald"
                                        size="icon"
                                        className="h-8 w-8 rounded-lg p-0 hover:bg-emerald-50"
                                        onClick={handleCopy}
                                        title="Copy Arabic"
                                    >
                                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                    </Button>
                                    <Button
                                        variant="ghost-emerald"
                                        size="icon"
                                        className="h-8 w-8 rounded-lg p-0 hover:bg-emerald-50"
                                        onClick={handleShare}
                                        title="Share"
                                    >
                                        <Share2 size={14} />
                                    </Button>
                                </div>
                                <BookmarkButton
                                    isBookmarked={isBookmarked}
                                    buttonProps={{
                                        onClick: (e) => { e.stopPropagation(); onToggleBookmark(); },
                                    }}
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
        <Card className="group relative border-gray-100 bg-white hover:border-emerald-100 transition-all 
        duration-500 overflow-hidden shadow-sm hover:shadow-[0_12px_40px_rgba(16,185,129,0.06)] 
        rounded-md">
            <CardContent className="p-2">
                {/* Visual Header - High Ratio (16:10) */}
                <div className="relative block aspect-[16/10] w-full overflow-hidden rounded-md">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Floating Bookmark Chip - On Image */}
                    <div className="absolute top-2.5 left-2.5">
                        <div className="rounded-full bg-white shadow-md p-px">
                            <BookmarkButton
                                isBookmarked={isBookmarked}
                                buttonProps={{
                                    shouldScale: false,
                                    onClick: (e) => { e.stopPropagation(); onToggleBookmark(); },
                                }}
                                iconSize={14}
                            />
                        </div>
                    </div>

                    {/* Reading Meta */}
                    <div className="absolute bottom-2.5 left-2.5 flex gap-1.5">
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-900/40 backdrop-blur-md rounded-md text-white border border-white/10">
                            <Clock size={8} />
                            <span className="text-[8px] font-black uppercase tracking-widest">{item.readSeconds}s</span>
                        </div>
                    </div>
                </div>

                <section className="px-1">
                    <div className="space-y-1 mb-4 pt-2">
                        <h3 className="text-base font-bold tracking-tighter text-gray-900
                            group-hover:text-emerald-600 transition-colors truncate">
                            {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 font-medium opacity-80">
                            {item.excerpt}
                        </p>
                    </div>

                    <div className="py-3 border-y border-gray-50 group-hover:border-emerald-50 transition-colors mb-4">
                        <p className="font-arabic text-base text-right leading-none text-gray-800 opacity-60 group-hover:opacity-100 transition-opacity truncate" dir="rtl">
                            {item.arabic}
                        </p>
                    </div>

                    <div className="w-full">
                        <Button
                            variant="default"
                            size="sm"
                            href={detailHref}
                            className="w-full rounded-md"
                        >
                            <span className="text-xs">Read More</span>
                            <Library size={14} strokeWidth={2.5} />
                        </Button>
                    </div>
                </section>

                {/* Secondary Quick Tools - Hidden on mobile, visible on hover */}
                <div className="absolute top-4 right-4 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                    <Button variant="ghost-emerald" size="icon" className="h-8 w-8 rounded-full bg-white shadow-xl border border-gray-100" onClick={handleCopy}>
                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </Button>
                    <Button variant="ghost-emerald" size="icon" className="h-8 w-8 rounded-full bg-white shadow-xl border border-gray-100" onClick={handleShare}>
                        <Share2 size={14} />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
