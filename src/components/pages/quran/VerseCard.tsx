"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { QuranVerseType } from "./content"
import { cn } from "@/lib/utils/clsx"
import { Bookmark, Copy, Heart, MessageCircle, Share2 } from "lucide-react"

export type VerseCardVariant = "read" | "translation"

interface VerseCardProps {
    variant: VerseCardVariant
    verse: QuranVerseType
    fontSize: number
    className?: string
}

const VerseCard = ({ variant, verse, fontSize, className }: VerseCardProps) => {
    if (variant === "read") {
        return (
            <div
                className={cn(
                    "flex flex-row-reverse items-baseline gap-2 py-1 text-right",
                    className
                )}
                style={{ direction: "rtl" }}
            >
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 px-2 text-xs font-semibold text-emerald-700 tabular-nums">
                    {verse.number}
                </span>
                <p
                    className="flex-1 break-words text-gray-900 font-arabic"
                    style={{ fontSize: `${fontSize}px` }}
                >
                    {verse.arabic}
                </p>
            </div>
        )
    }

    // translation-variant 
    return (
        <Card className={cn("border border-gray-100 bg-white shadow-sm", className)}>
            <CardContent className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                    <Badge className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 p-0 text-[11px] 
                    font-semibold text-white tabular-nums">
                        {verse.number}
                    </Badge>
                    <div className="min-w-0 flex-1 flex flex-col gap-2">
                        <p
                            className="text-right text-gray-900 font-arabic"
                            style={{
                                fontSize: `${Math.max(18, fontSize - 4)}px`,
                                lineHeight: 2.1,
                                direction: "rtl",
                            }}
                        >
                            {verse.arabic}
                        </p>
                        <p className="text-sm text-gray-600 italic">{verse.transliteration}</p>
                        <p className="text-sm text-gray-800 leading-relaxed">{verse.translation}</p>
                        <div className="pt-1 flex items-center gap-1.5">
                            <button
                                type="button"
                                aria-label="Copy verse"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100"
                            >
                                <Copy className="h-4 w-4" strokeWidth={1.7} />
                            </button>
                            <button
                                type="button"
                                aria-label="Bookmark verse"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100"
                            >
                                <Bookmark className="h-4 w-4" strokeWidth={1.7} />
                            </button>
                            <button
                                type="button"
                                aria-label="Like verse"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100"
                            >
                                <Heart className="h-4 w-4" strokeWidth={1.7} />
                            </button>
                            <button
                                type="button"
                                aria-label="Comment"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100"
                            >
                                <MessageCircle className="h-4 w-4" strokeWidth={1.7} />
                            </button>
                            <button
                                type="button"
                                aria-label="Share verse"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100"
                            >
                                <Share2 className="h-4 w-4" strokeWidth={1.7} />
                            </button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default VerseCard

