"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, BookOpen, Languages, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Tabs, { type TabItem } from "@/components/shared/Tabs"
import {
    QuranSurahs,
    surahNameMeaning,
    SurahAlFatihahMockVerses,
} from "./content"
import VerseCard from "./VerseCard"
import SettingSidebar from "./SettingSidebar"
type DetailTabId = "read" | "translation"
interface QuranDetailPageProps {
    surahNumber: number
    verseNumber?: number | undefined
}

const tabs: TabItem[] = [
    { id: "read" as DetailTabId, label: "Read", icon: BookOpen },
    { id: "translation" as DetailTabId, label: "Translation", icon: Languages },
]


export default function QuranDetailPage({ surahNumber, verseNumber }: QuranDetailPageProps) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<DetailTabId>("read")
    const [fontSize, setFontSize] = useState(24)
    const [showSettings, setShowSettings] = useState(false)

    const surah = useMemo(() => {
        const n = Number.isFinite(surahNumber) && surahNumber >= 1 && surahNumber <= 114 ? surahNumber : 1
        return QuranSurahs.find((s) => s.number === n) ?? QuranSurahs[0]
    }, [surahNumber])

    const verses = useMemo(() => {
        // Until we plug real Quran text, use a clean minimal mock that matches the deenify-latest UI.
        if (surah.number === 1) return SurahAlFatihahMockVerses
        return SurahAlFatihahMockVerses.slice(0, Math.min(7, surah.verses))
    }, [surah.number, surah.verses])
    return (
        <div>
            {/* Header section */}
            <section className="bg-white">
                <div className="container">
                    <header className="py-8 sm:py-10">
                        <Button
                            variant="ghost-emerald"
                            shouldScale={false}
                            onClick={() => router.push("/quran")}
                            className="mb-5 sm:mb-6"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Surahs
                        </Button>

                        {/* Bismillah + surah meta */}
                        <div className="text-center">
                            <motion.div
                                className="mb-6"
                                initial={{ opacity: 0, y: -16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, ease: "easeOut" }}
                            >
                                <p className="text-5xl sm:text-6xl text-emerald-700 mb-2 font-body py-3">
                                    بسم الله
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600 italic">In the name of Allah</p>
                            </motion.div>

                            <h1 className="text-gray-900 mb-1 text-sm sm:text-base font-medium flex items-center gap-2 justify-center">
                                <span>Surah {surah.nameEnglish}</span>
                                <span className="text-emerald-700">—</span>
                                <p className="flex items-center text-emerald-700">
                                    (<span className="text-emerald-700 font-arabic font-medium text-base 
                                    sm:text-xl leading-none"
                                        dir="rtl"
                                    >
                                        {surah.nameArabic}
                                    </span>)
                                </p>
                            </h1>
                            <p className="text-gray-600 mb-3 text-xs sm:text-sm">
                                {surahNameMeaning[surah.number] ?? "—"}
                            </p>

                            <div className="flex items-center justify-center gap-2 flex-wrap">
                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                                    {surah.verses} Verses
                                </Badge>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                                    {surah.revelation}
                                </Badge>
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                                    Surah {surah.number}
                                </Badge>
                            </div>
                        </div>
                    </header>
                </div>
            </section>

            {/* Body section */}
            <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50
            border-t border-layout-separator w-full">
                <motion.div
                    className="pointer-events-none absolute -top-10 left-[-40px] h-40 w-40 rounded-full bg-emerald-100 blur-3xl opacity-30"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.35, 0.25] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative">
                    <div className="flex items-start gap-6">
                        <main className="flex-1 min-w-0">
                            <div className="container py-4 sm:py-6">
                                <div className="max-w-3xl mx-auto">
                                    <Tabs
                                        allTabs={tabs}
                                        activeTab={activeTab}
                                        onTabChange={(t) => setActiveTab(t as DetailTabId)}
                                        variant="pills"
                                        animateContent={false}
                                        align="center"
                                        stretchTabs={false}
                                        className=""
                                        tabsContainerClassName="flex justify-center border-none"
                                        contentContainerClassName="pt-10 pb-7"
                                    >
                                        <div
                                            className="max-h-[600px] overflow-y-auto pr-1 sm:pr-2 scrollbar-thin"
                                        >
                                            {activeTab === "read" ? (
                                                <div
                                                    key={activeTab}
                                                    className="mx-auto w-full max-w-2xl text-center font-arabic text-[24px] sm:text-[28px] 
                                                    leading-[2] justify-center"
                                                    style={{ direction: "rtl" }}
                                                >
                                                    {verses.map((verse) => {

                                                        return (
                                                            <VerseCard
                                                                key={verse.number}
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ delay: verse.number * 0.07 }}
                                                                variant="read"
                                                                verse={verse}
                                                                fontSize={fontSize}
                                                                className="inline break-words text-center"
                                                            />
                                                        )

                                                        // required-comment as backup for single-line verses display-behaviour 
                                                        // return (
                                                        //     <motion.p
                                                        //         key={verse.number}
                                                        //         initial={{ opacity: 0, y: 18 }}
                                                        //         animate={{ opacity: 1, y: 0 }}
                                                        //         transition={{ delay: verse.number * 0.06 }}
                                                        //         className="inline break-words text-center">
                                                        //         {verse.arabic}{" "}
                                                        //         <span className="ml-2 inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-emerald-200 
                                                        //     bg-emerald-50 px-2 text-xs font-semibold text-emerald-700 tabular-nums align-middle">
                                                        //             {verse.number}
                                                        //         </span>
                                                        //     </motion.p>
                                                        // )
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-4 sm:gap-5 py-2" key={activeTab}>
                                                    {verses.map((verse) => (
                                                        <motion.div
                                                            key={verse.number}
                                                            initial={{ opacity: 0, y: 18 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: verse.number * 0.08 }}
                                                        >
                                                            <VerseCard
                                                                variant="translation"
                                                                verse={verse}
                                                                fontSize={fontSize}
                                                            />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </Tabs>
                                </div>
                            </div>
                        </main>

                        <SettingSidebar
                            open={showSettings}
                            onClose={() => setShowSettings(false)}
                            surahNumber={surah.number}
                        />
                    </div>
                </div>

                {/* Settings Floating Button */}
                {!showSettings && (
                    <div className="fixed right-4 sm:right-6 top-28 sm:top-32 z-10">
                        <Button
                            shouldScale={true}
                            onClick={() => setShowSettings(true)}
                            className="rounded-full w-11 h-11 sm:w-12 sm:h-12 bg-emerald-600 hover:bg-emerald-700 shadow-lg px-0"
                        >
                            <Settings className="h-5 w-5" />
                        </Button>
                    </div>
                )}
            </section >
        </div >
    )
}

