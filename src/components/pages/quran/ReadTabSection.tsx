"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { QuranSurahType, surahNameMeaning } from "./content"
import { motion } from "framer-motion"
import BookmarkButton from "@/components/shared/buttons/BookmarkButton"

interface ReadTabSectionProps {
    SURAHS: QuranSurahType[]
}

const ReadTabSection = ({ SURAHS }: ReadTabSectionProps) => {
    const router = useRouter()
    const [bookmarked, setBookmarked] = useState<Set<number>>(new Set())

    const toggleBookmark = (e: React.MouseEvent, number: number) => {
        e.preventDefault()
        e.stopPropagation()
        setBookmarked((prev) => {
            const next = new Set(prev)
            if (next.has(number)) next.delete(number)
            else next.add(number)
            return next
        })
    }

    return (
        <section className="py-8 sm:py-10 bg-[linear-gradient(180deg,#f8faf8_0%,#f0f7f4_100%)]">
            <div className="container px-4 sm:px-6 md:px-6">
                <header className="mb-4 sm:mb-5 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em]">
                            Reading
                        </p>
                        <h2 className="mt-1 text-lg font-medium tracking-tight text-gray-900 sm:text-xl">
                            Quranic surahs
                        </h2>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-[11px] font-medium text-emerald-800 shadow-[0_1px_2px_rgba(16,185,129,0.18)] sm:text-xs">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="tabular-nums">{SURAHS.length}</span>
                        <span>surahs</span>
                    </div>
                </header>

                {/* Desktop: card grid — animated cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                    {SURAHS.map((surah, index) => {
                        return (
                            <motion.div
                                key={surah.number}
                                initial={{ opacity: 0, y: 8, scale: 0.99 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.2, delay: index * 0.02, ease: "easeOut" }}
                            >
                                <Card
                                    className="group cursor-pointer border border-gray-100 bg-white shadow-sm transition-[border-color,box-shadow] 
                                hover:border-emerald-300 hover:shadow-sm overflow-hidden"
                                    onClick={() => router.push(`/quran/${surah.number}`)}
                                >
                                    <CardContent className="flex items-start justify-between gap-3 sm:gap-4 p-4">
                                        {/* Left: number pill */}
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 
                                         transition-colors group-hover:bg-emerald-100 sm:h-14 sm:w-14"
                                        >
                                            <span className="text-base font-bold tabular-nums sm:text-lg">{surah.number}</span>
                                        </div>

                                        {/* Right: info-content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-3">
                                                <h3 className="truncate font-semibold text-gray-900">
                                                    {surah.nameEnglish}
                                                </h3>
                                                <p
                                                    className="min-w-0 truncate text-base font-medium text-emerald-800 leading-tight font-arabic"
                                                    dir="rtl"
                                                >
                                                    {surah.nameArabic}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="truncate text-sm text-gray-600 leading-snug mb-1">
                                                    {surahNameMeaning[surah.number] ?? surah.nameEnglish}
                                                </p>
                                            </div>

                                            {/* Row 2: chips */}
                                            <div className="flex flex-1 flex-wrap items-center justify-between gap-1.5 pt-0.5 sm:gap-2 sm:pt-1">
                                                <div className="flex flex-wrap items-center gap-1.5 pt-0.5 sm:gap-2">
                                                    <Badge variant="outline"  >
                                                        {surah.verses} verses
                                                    </Badge>
                                                    <Badge variant={surah.revelation === "Meccan" ? "blue" : "purple"}>
                                                        {surah.revelation}
                                                    </Badge>
                                                </div>

                                                <BookmarkButton
                                                    isBookmarked={bookmarked.has(surah.number)}
                                                    buttonProps={{
                                                        onClick: (e: React.MouseEvent<HTMLButtonElement>) => toggleBookmark(e, surah.number),
                                                        "aria-label": bookmarked.has(surah.number) ? "Remove bookmark" : "Bookmark surah"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default ReadTabSection
