"use client"

import { useMemo, useState } from "react"
import { SurahOrderMap } from "@/constant/quranic-conatant"
import { QuranSurahs } from "./content"
import SurahListSection from "./SurahListSection"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Tabs, { TabItem } from "@/components/shared/Tabs"
import { Bookmark, Headphones } from "lucide-react"
import QuranOrderDropdown, { type OrderMode } from "./QuranOrderDropdown"

type QuranTabId = "all" | "bookmarks" | "listen"

const quranTabs: TabItem[] = [
    { id: "all" as QuranTabId, label: "Read" },
    { id: "listen" as QuranTabId, label: "Listen" },
    { id: "bookmarks" as QuranTabId, label: "Bookmarks" },
]

const QuranExploreSection = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [orderMode, setOrderMode] = useState<OrderMode>("quran")
    const [activeTab, setActiveTab] = useState<QuranTabId>("all")

    const processedSurahs = useMemo(() => {
        const ordered =
            orderMode === "quran"
                ? [...QuranSurahs].sort((a, b) => a.number - b.number)
                : [...QuranSurahs].sort((a, b) => {
                    const aOrder = SurahOrderMap[a.number as keyof typeof SurahOrderMap]?.revelationOrder ?? a.number
                    const bOrder = SurahOrderMap[b.number as keyof typeof SurahOrderMap]?.revelationOrder ?? b.number
                    return aOrder - bOrder
                })

        if (!searchQuery.trim()) {
            return ordered
        }

        const q = searchQuery.toLowerCase().trim()
        return ordered.filter((surah) => {
            return (
                surah.nameEnglish.toLowerCase().includes(q) ||
                surah.nameArabic.toLowerCase().includes(q) ||
                surah.number.toString() === q
            )
        })
    }, [orderMode, searchQuery])

    return (
        <div className="min-h-screen bg-gray-50/50">
            <section className="border-b border-gray-100 bg-white">
                <div className="container px-4 sm:px-6 md:px-6 py-6 sm:py-8 md:py-10 space-y-6 sm:space-y-6">
                    {/* Hero — modern section: intentional 2-line heading on mobile, single line on desktop */}
                    <header className="space-y-3 sm:space-y-3">
                        <Badge variant="emerald" className="text-xs font-medium">
                            The Holy Quran
                        </Badge>
                        <h1 className="font-medium  text-gray-900 text-4xl tracking-tight">
                            <span className="inline">Explore the <br className="sm:hidden" /> Quran — </span>
                            <span className="inline-block text-3xl text-emerald-700 font-arabic font-medium">
                                (القرآن)
                            </span>
                        </h1>
                        <p className="max-w-2xl text-sm leading-relaxed text-gray-600">
                            The full Quran in one place — each surah with its Arabic name, translation, verse count, and place of revelation so you can recite, reflect (tadabbur), and memorise with focus.
                        </p>
                        <p className="max-w-2xl text-sm leading-relaxed text-gray-500 hidden md:block">
                            Use the search and order options below to find any surah or browse by revelation order. Switch to the Listen tab to hear the Quran recited.
                        </p>

                        <main className="flex flex-wrap items-center gap-2 pt-0.5">
                            <Badge variant="outline" className="border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700">
                                114 surahs
                            </Badge>
                            <span
                                aria-hidden
                                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400"
                            />
                            <Badge variant="outline" className="border-purple-200 bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">
                                6,236 verses
                            </Badge>
                        </main>
                    </header>

                    <main className="space-y-4">
                        {/* Surah-search & order-dropdown */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                            <Input
                                search
                                type="input"
                                placeholder="Search by surah name, number, or translation..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                containerClassName="flex-1 min-w-0"
                                className="min-h-[42px] h-10 sm:h-11 rounded-lg border-gray-200 bg-gray-50/80 text-sm placeholder:text-gray-400 focus:bg-white"
                            />
                            <div className="w-full sm:w-[220px] sm:shrink-0">
                                <QuranOrderDropdown
                                    orderMode={orderMode}
                                    onChange={(mode) => setOrderMode(mode)}
                                />
                            </div>
                        </div>

                        {/* Read, Listen tabs */}
                        <Tabs
                            allTabs={quranTabs}
                            activeTab={activeTab}
                            onTabChange={(tabId) => setActiveTab(tabId as QuranTabId)}
                            variant="underline"
                            showIndicator
                            align="left"
                            stretchTabs={false}
                            className="pt-0"
                            tabsContainerClassName="border-b border-gray-200 max-w-full"
                            contentContainerClassName="hidden"
                        />
                    </main>
                </div>
            </section>


            {/* Surahs-contant  */}
            {activeTab as QuranTabId === "all"
                ? <SurahListSection SURAHS={processedSurahs} />
                : null
            }

            {/* Listen-content  */}
            {activeTab as QuranTabId === "listen"
                ? (<section className="py-8 sm:py-12">
                    <main className="container px-4 sm:px-6 flex justify-center">
                        <div className="flex max-w-md flex-col items-center gap-3 sm:gap-4 rounded-xl border border-dashed border-gray-200 
            bg-white px-4 py-6 sm:px-6 sm:py-10 text-center shadow-sm">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                <Headphones className="h-7 w-7" />
                            </div>
                            <h2 className="text-base sm:text-lg font-heading text-gray-900">
                                Listen to the Quran
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-600">
                                Audio by surah will be here. Use the Read tab to open any surah.
                            </p>
                        </div>
                    </main>
                </section>)
                : null
            }

            {/* Bookmarks-content  */}
            {activeTab as QuranTabId === "bookmarks"
                ? (<section className="py-8 sm:py-12">
                    <div className="container px-4 sm:px-6 flex justify-center">
                        <div className="flex max-w-md flex-col items-center gap-2 sm:gap-3 rounded-xl border border-dashed border-gray-200 
            bg-white px-4 py-6 sm:px-6 sm:py-8 text-center shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                <Bookmark className="h-5 w-5" />
                            </div>
                            <h2 className="text-base sm:text-lg font-heading text-gray-900">
                                No bookmarks yet
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-600">
                                Save ayat and surahs as you read; they&apos;ll appear here.
                            </p>
                        </div>
                    </div>
                </section>)
                : null
            }
        </div>
    )
}

export default QuranExploreSection

