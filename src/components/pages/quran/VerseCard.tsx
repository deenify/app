"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils/clsx"
import { Bookmark, Copy, Heart, MessageCircle, Share2 } from "lucide-react"
import { motion, Transition, TargetAndTransition } from "framer-motion"
import type { QuranVerseType } from "./content"

export type VerseCardVariant = "read" | "translation"

interface VerseCardProps {
    variant: VerseCardVariant
    verse: QuranVerseType
    arabicFontSize: number
    transliterationFontSize?: number
    translationFontSize?: number
    showArabic?: boolean
    showTransliteration?: boolean
    showTranslation?: boolean
    className?: string
    initial?: TargetAndTransition
    animate?: TargetAndTransition
    transition?: Transition & { delay?: number }
    useArabicFontFamily?: boolean
}

const VerseCard = ({
    variant,
    verse,
    arabicFontSize,
    transliterationFontSize,
    translationFontSize,
    showArabic = true,
    showTransliteration = true,
    showTranslation = true,
    className,
    initial,
    animate,
    transition,
    useArabicFontFamily = true
}: VerseCardProps) => {

    if (variant === "read") {
        return (
            <motion.p
                className={cn(
                    "inline break-words text-center",
                    useArabicFontFamily ? "font-arabic" : "font-body",
                    className
                )}
                transition={transition}
                initial={initial}
                animate={animate}

                style={{
                    fontSize: `${useArabicFontFamily ? arabicFontSize : arabicFontSize + 6}px`,
                    lineHeight: 2.1,
                    direction: "rtl",
                }}
            >
                {verse.arabic}{" "}
                <span className="ml-2 inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-emerald-200 
                  bg-emerald-50 px-2 text-xs font-semibold text-emerald-700 tabular-nums align-middle"
                >
                    {verse.number}
                </span>
            </motion.p>
        )
    }

    // translation-variant 
    return (
        <Card className={cn("border border-gray-100 bg-white shadow-sm", className)}>
            <CardContent className="p-5 sm:p-6">
                <Badge className="flex sm:hidden h-7 w-7 items-center justify-center rounded-md bg-emerald-600 
                p-0 text-xs font-semibold text-white tabular-nums mb-2 leading-none pt-0.5">
                    {verse.number}
                </Badge>
                <div className="flex items-start gap-4">
                    <Badge className="hidden sm:flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 
                    p-0 text-[11px] font-semibold text-white tabular-nums leading-none pt-0.5">
                        {verse.number}
                    </Badge>
                    <div className="min-w-0 flex-1 flex flex-col gap-2">
                        {showArabic && (
                            <p
                                className={cn(
                                    "text-right text-gray-900 leading-relaxed",
                                    useArabicFontFamily ? "font-arabic" : "font-body"
                                )}
                                style={{
                                    fontSize: `${useArabicFontFamily ? arabicFontSize : arabicFontSize + 6}px`,
                                    direction: "rtl",
                                }}
                            >
                                {verse.arabic}
                            </p>
                        )}

                        {showTransliteration && (
                            <p
                                className="text-gray-600 italic"
                                style={{ fontSize: `${transliterationFontSize ?? 14}px` }}
                            >
                                {verse.transliteration}
                            </p>
                        )}

                        {showTranslation && (
                            <p
                                className="text-gray-800 leading-relaxed"
                                style={{ fontSize: `${translationFontSize ?? 16}px` }}
                            >
                                {verse.translation}
                            </p>
                        )}

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

