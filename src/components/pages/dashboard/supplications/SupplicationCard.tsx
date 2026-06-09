"use client"

import { Badge } from "@/components/ui/badge"
import BookmarkButton from "@/components/shared/buttons/BookmarkButton"
import type { SupplicationItem } from "./content"
import { Copy, Share2, Clock, Check, Heart } from "lucide-react"
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
        e.preventDefault()
        e.stopPropagation()
        navigator.clipboard.writeText(item.arabic)
        setCopied(true)
        notify.success("Arabic text copied to clipboard")
        setTimeout(() => setCopied(false), 2000)
    }

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault()
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
            <Card className="group overflow-hidden rounded-2xl border-gray-100 bg-white shadow-sm transition-all hover:border-emerald-200 hover:shadow-md">
                <CardContent className="flex items-start gap-3 p-2 sm:gap-5 sm:p-2.5">
                    <Link
                        href={detailHref}
                        className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-50 bg-gray-50 sm:h-20 sm:w-20"
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/5 transition-colors group-hover:bg-transparent" />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <div className="mb-0.5 flex items-center gap-2 sm:mb-1">
                            <Link href={detailHref} className="min-w-0">
                                <h3 className="truncate text-xs font-black uppercase tracking-tight text-gray-900 transition-colors group-hover:text-emerald-600 sm:text-sm">
                                    {item.title}
                                </h3>
                            </Link>
                            <Badge variant="outline" className="hidden h-3.5 border-emerald-100 bg-emerald-50/50 px-1.5 py-0 text-[7px] font-black uppercase tracking-widest text-emerald-600 xs:flex sm:h-4 sm:text-[8px]">
                                {item.category.split("-")[0]}
                            </Badge>
                        </div>

                        <div className="mb-1">
                            <p className="truncate text-right font-arabic text-base leading-none text-gray-800 sm:text-lg" dir="rtl">
                                {item.arabic}
                            </p>
                        </div>

                        <section className="flex items-center justify-between gap-2">
                            <p className="line-clamp-1 text-[10px] font-medium italic text-gray-400 opacity-80 sm:text-xs">
                                {item.excerpt}
                            </p>
                            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                                <div className="flex items-center gap-1 opacity-0 transition-all group-hover:opacity-100">
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
        <Card className="group relative overflow-hidden rounded-md border-gray-100 bg-white shadow-sm transition-all duration-500 hover:border-emerald-100 hover:shadow-[0_12px_40px_rgba(16,185,129,0.06)]">
            <CardContent className="p-2">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
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
                            <span className="text-[8px] font-black uppercase tracking-widest">{item.readSeconds}s</span>
                        </div>
                    </div>
                </div>

                <section className="px-1">
                    <div className="mb-4 space-y-1 pt-2">
                        <h3 className="truncate text-base font-bold tracking-tighter text-gray-900 transition-colors group-hover:text-emerald-600">
                            {item.title}
                        </h3>
                        <p className="line-clamp-2 text-xs font-medium text-gray-500 opacity-80">
                            {item.excerpt}
                        </p>
                    </div>

                    <div className="mb-4 border-y border-gray-50 py-3">
                        <p className="truncate text-right font-arabic text-base leading-none text-gray-800 opacity-60" dir="rtl">
                            {item.arabic}
                        </p>
                    </div>

                    <Button variant="default" size="sm" href={detailHref} className="w-full rounded-md">
                        <span className="text-xs">Read Dua</span>
                        <Heart size={14} strokeWidth={2.5} />
                    </Button>
                </section>

                <div className="absolute top-4 right-4 flex flex-col gap-1.5 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <Button variant="ghost-emerald" size="icon" className="h-8 w-8 rounded-full border border-gray-100 bg-white shadow-xl" onClick={handleCopy}>
                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </Button>
                    <Button variant="ghost-emerald" size="icon" className="h-8 w-8 rounded-full border border-gray-100 bg-white shadow-xl" onClick={handleShare}>
                        <Share2 size={14} />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
