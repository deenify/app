"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils/clsx"
import { Copy, Heart, MessageCircle, Share2, User } from "lucide-react"
import { motion, type TargetAndTransition, type Transition } from "framer-motion"
import useHadithReaderSettingsStore from "@/store/hadith"
import type { HadithAuthenticityGrade, MockHadithNarrationType } from "./content"
import BookmarkButton from "@/components/shared/buttons/BookmarkButton"

interface HadithCardProps {
    hadith: MockHadithNarrationType
    collectionNameEnglish: string
    className?: string
    initial?: TargetAndTransition
    animate?: TargetAndTransition
    transition?: Transition & { delay?: number }
}

const GRADE_LABEL: Record<HadithAuthenticityGrade, string> = {
    sahih: "Sahih",
    hasan: "Hasan",
    daif: "Da'if",
    munkar: "Munkar",
    unknown: "Ungraded",
}

const GRADE_BADGE_CLASS: Record<HadithAuthenticityGrade, string> = {
    sahih: "border-emerald-200 bg-emerald-50 text-emerald-900",
    hasan: "border-teal-200 bg-teal-50 text-teal-900",
    daif: "border-amber-200 bg-amber-50 text-amber-950",
    munkar: "border-red-200 bg-red-50 text-red-900",
    unknown: "border-gray-200 bg-gray-100 text-gray-700",
}



function AuthenticityBadge({ grade }: { grade: HadithAuthenticityGrade }) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium w-max",
                GRADE_BADGE_CLASS[grade]
            )}
        >
            {GRADE_LABEL[grade]}
        </span>
    )
}

function TopicChips({ topics }: { topics: string[] }) {
    const shown = topics.slice(0, 2)
    const rest = Math.max(0, topics.length - 2)

    return (
        <div className="flex flex-wrap items-center gap-2">
            {shown.map((t) => (
                <Badge
                    key={t}
                    variant="outline"
                    className="border-emerald-200 bg-emerald-50 text-[10px] font-medium text-emerald-900 sm:text-[11px]"
                >
                    {t}
                </Badge>
            ))}
            {rest > 0 ? (
                <Badge
                    variant="outline"
                    className="border-emerald-200 bg-emerald-50 font-medium text-emerald-900"
                    title={`${rest} more topic${rest === 1 ? "" : "s"}`}
                >
                    +{rest}
                </Badge>
            ) : null}
        </div>
    )
}

const HadithCard = ({
    hadith,
    collectionNameEnglish,
    className,
    initial,
    animate,
    transition,
}: HadithCardProps) => {
    const {
        arabicFontSize,
        englishFontSize,
        showArabic,
        showEnglish,
        showChainNotes,
        showTopicChips,
        showInBookReference,
        useArabicFontFamily,
    } = useHadithReaderSettingsStore()

    return (
        <motion.div initial={initial} animate={animate} transition={transition}>
            <Card
                className={cn(
                    "border border-gray-100 bg-white shadow-sm",
                    "transition-[border-color,box-shadow] duration-200 hover:border-emerald-200 hover:shadow-md",
                    className
                )}
            >
                <CardContent className="px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5 md:p-6">
                    <div className="flex flex-col gap-2.5 sm:gap-3 md:flex-row md:gap-5">
                        {/* Col 1 — catalog / hadith number (mobile: pill chip + looser inset; md+: catalog block) */}
                        <div className="flex shrink-0 flex-col items-start self-start md:items-stretch md:pt-0.5">
                            <div
                                className={cn(
                                    "inline-flex h-7 items-center justify-center tabular-nums text-white",
                                    "md:flex md:h-auto md:min-h-[2.875rem] md:min-w-[2.75rem] md:rounded-lg md:bg-emerald-600",
                                    "md:px-2 md:py-1.5 md:shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
                                    "lg:min-h-[3rem] lg:min-w-[3rem] lg:px-2.5",
                                    // Mobile only — pill chip, gradient, soft shadow (no gradient bleed on md)
                                    "max-md:rounded-md max-md:bg-gradient-to-b max-md:from-emerald-500 max-md:to-emerald-700",
                                    "max-md:px-2.5 max-md:shadow-[0_1px_3px_rgba(5,46,22,0.22)]"
                                )}
                            >
                                <span
                                    className={cn(
                                        "font-heading text-[11px] font-semibold leading-none tracking-wide",
                                        "md:text-base md:font-medium md:tracking-normal"
                                    )}
                                >
                                    #{hadith.catalogNumber}
                                </span>
                            </div>
                        </div>

                        {/* Col 2 — body */}
                        <div className="min-w-0 flex-1 flex flex-col gap-2.5 sm:gap-3 md:gap-3.5">
                            {/* 1. Collection title + optional in-book ref */}
                            <div
                                className={cn(
                                    "flex flex-wrap items-center gap-2",
                                    showInBookReference && "items-start sm:items-center"
                                )}
                            >
                                <p className="text-base font-medium leading-snug text-gray-900">{collectionNameEnglish}</p>
                                {showInBookReference ? (
                                    <Badge
                                        variant="outline"
                                        className="max-w-full border-amber-200 bg-amber-50 text-[10px] font-normal text-amber-950 sm:text-[11px]"
                                    >
                                        Book {hadith.reference.book} {" "}
                                        · Ch. {hadith.reference.chapter} {" "}
                                        · Hadith {hadith.reference.hadithNumber}
                                    </Badge>
                                ) : null}
                            </div>

                            {/* 2. Topic chips */}
                            {showTopicChips ? (
                                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
                                    <TopicChips topics={hadith.topics} />
                                </div>
                            ) : null}

                            {/* 3. Narrator */}
                            <div className="border-b border-gray-200 py-3">
                                <div className="flex items-start gap-2 text-sm text-gray-600">
                                    <User className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
                                    <div className="flex flex-col gap-2">
                                        <p>
                                            <span className="text-gray-500">Narrated by </span>
                                            <span className="font-medium text-gray-800">{hadith.narrator}</span>
                                        </p>
                                        {hadith.chainNote && showChainNotes ? (
                                            <p className="text-sm leading-relaxed text-gray-500">
                                                <span className="font-medium text-gray-600">Chain / critique: </span>
                                                {hadith.chainNote}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            {/* 4. Arabic */}
                            {showArabic ? (
                                <p
                                    className={cn(
                                        "pt-1 text-right text-gray-900 leading-relaxed",
                                        useArabicFontFamily ? "font-arabic" : "font-body"
                                    )}
                                    style={{
                                        fontSize: `${useArabicFontFamily ? arabicFontSize : arabicFontSize + 4}px`,
                                        lineHeight: useArabicFontFamily ? 2.1 : 1.5,
                                        direction: "rtl",
                                    }}
                                    dir="rtl"
                                >
                                    {hadith.arabic}
                                </p>
                            ) : null}

                            {/* 5. English */}
                            {showEnglish ? (
                                <p
                                    className="text-gray-800 leading-relaxed"
                                    style={{ fontSize: englishFontSize }}
                                >
                                    {hadith.english}
                                </p>
                            ) : null}

                            {/* 6–7. Actions + authenticity — bottom row */}
                            <div className="flex flex-wrap items-center justify-between gap-3 ">
                                <div className="flex flex-wrap items-center gap-0.5">
                                    <button
                                        type="button"
                                        aria-label="Copy hadith"
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 
                                        transition-colors hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100"
                                    >
                                        <Copy className="h-4 w-4" strokeWidth={1.7} />
                                    </button>

                                    <BookmarkButton
                                        isBookmarked={false}
                                        buttonProps={{
                                            onClick: () => { },
                                            "aria-label": "Bookmark hadith",
                                        }}
                                        classNames={{ icon: "text-gray-500 hover:text-emerald-700" }}
                                    />

                                    <button
                                        type="button"
                                        aria-label="Like hadith"
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 
                                        transition-colors hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100"
                                    >
                                        <Heart className="h-4 w-4" strokeWidth={1.7} />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Comment"
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 
                                        transition-colors hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100"
                                    >
                                        <MessageCircle className="h-4 w-4" strokeWidth={1.7} />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Share hadith"
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 
                                        transition-colors hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100"
                                    >
                                        <Share2 className="h-4 w-4" strokeWidth={1.7} />
                                    </button>
                                </div>

                                {/* Authenticity grade */}
                                <AuthenticityBadge grade={hadith.authenticityGrade} />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default HadithCard
