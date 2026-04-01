"use client"

import { useMemo, useState } from "react"
import {
    ArrowDownWideNarrow,
    ArrowUpDown,
    ArrowUpWideNarrow,
    CalendarClock,
    CalendarDays,
    CalendarRange,
    Clock,
    History,
    Mic2,
    Users,
} from "lucide-react"
import { SurahOrderMap } from "@/constant/quranic-conatant"
import { QuranSurahs, MockBookmarks, MockReciters, SurahRecitersMap } from "./content"
import ReadTabSection from "./ReadTabSection"
import ListenTabSection from "./ListenTabSection"
import BookmarksTabSection from "./BookmarksTabSection"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Tabs, { TabItem } from "@/components/shared/Tabs"
import FilterDropdown, { type FilterOption } from "@/components/shared/FilterDropdown"
import type { OrderMode } from "./QuranOrderDropdown"

type QuranTabId = "all" | "bookmarks" | "listen"
export type BookmarkDateFilter = "all" | "today" | "week" | "month" | "year"

const quranTabs: TabItem[] = [
    { id: "all" as QuranTabId, label: "Read" },
    { id: "listen" as QuranTabId, label: "Listen" },
    { id: "bookmarks" as QuranTabId, label: "Bookmarks" },
]

function isSavedInRange(savedAt: string, filter: BookmarkDateFilter): boolean {
    if (filter === "all") return true
    const date = new Date(savedAt)
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    if (filter === "today") return date >= todayStart
    if (filter === "week") return date >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    if (filter === "month") return date >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    if (filter === "year") return date >= new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
    return true
}

const orderOptions: FilterOption[] = [
    { value: "quran", label: "Quranic order", icon: ArrowDownWideNarrow },
    { value: "revelation", label: "Revelation order", icon: ArrowUpWideNarrow },
]
const reciterOptions: FilterOption[] = [
    { value: "all", label: "All reciters", icon: Users },
    ...MockReciters.map((r) => ({ value: r.id, label: r.name, icon: Mic2 })),
]
const bookmarkDateOptions: FilterOption[] = [
    { value: "all", label: "All time", icon: CalendarDays },
    { value: "today", label: "Today", icon: Clock },
    { value: "week", label: "Last 7 days", icon: History },
    { value: "month", label: "Last 30 days", icon: CalendarRange },
    { value: "year", label: "Last year", icon: CalendarClock },
]

const QuranExploreSection = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [orderMode, setOrderMode] = useState<OrderMode>("quran")
    const [reciterId, setReciterId] = useState<string | number>("all")
    const [bookmarkDateFilter, setBookmarkDateFilter] = useState<BookmarkDateFilter>("all")
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

        if (!searchQuery.trim()) return ordered
        const q = searchQuery.toLowerCase().trim()
        return ordered.filter(
            (surah) =>
                surah.nameEnglish.toLowerCase().includes(q) ||
                surah.nameArabic.toLowerCase().includes(q) ||
                surah.number.toString() === q
        )
    }, [orderMode, searchQuery])

    const filteredListenSurahs = useMemo(() => {
        if (reciterId === "all") return processedSurahs
        return processedSurahs.filter((s) => (SurahRecitersMap[s.number] ?? []).includes(reciterId as number))
    }, [processedSurahs, reciterId])

    const processedBookmarks = useMemo(() => {
        let list = MockBookmarks.filter((b) => isSavedInRange(b.savedAt, bookmarkDateFilter))
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim()
            list = list.filter(
                (b) =>
                    b.surahNameEnglish.toLowerCase().includes(q) ||
                    b.translation.toLowerCase().includes(q) ||
                    b.surahNumber.toString() === q ||
                    b.verseNumber.toString() === q
            )
        }
        return list
    }, [bookmarkDateFilter, searchQuery])

    const dropdownOptions = activeTab === "all"
        ? orderOptions
        : activeTab === "listen"
            ? reciterOptions
            : bookmarkDateOptions

    const dropdownValue = activeTab === "all"
        ? orderMode
        : activeTab === "listen"
            ? reciterId
            : bookmarkDateFilter

    const setDropdownValue = (v: string | number) => {
        if (activeTab === "all") setOrderMode(v as OrderMode)
        else if (activeTab === "listen") setReciterId(v)
        else setBookmarkDateFilter(v as BookmarkDateFilter)
    }

    const searchPlaceholder =
        activeTab === "all"
            ? "Search by surah name, number, or translation..."
            : activeTab === "listen"
                ? "Search by surah name, number, or translation..."
                : "Search by surah, verse, or translation..."

    return (
        <div className="bg-gray-50/50">
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
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                containerClassName="flex-1 min-w-0"
                                className="min-h-[42px] h-10 sm:h-11 rounded-lg border-gray-200 bg-gray-50/80 text-sm placeholder:text-gray-400 focus:bg-white"
                            />
                            <div className="w-full sm:w-[260px] sm:shrink-0">
                                <FilterDropdown
                                    options={dropdownOptions}
                                    value={dropdownValue}
                                    onChange={setDropdownValue}
                                    theme="blue"
                                    triggerIcon={
                                        activeTab === "all"
                                            ? ArrowUpDown
                                            : activeTab === "listen"
                                                ? Mic2
                                                : History
                                    }
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

            {/* Read, Listen tabs - content */}
            {activeTab === "all" && <ReadTabSection SURAHS={processedSurahs} />}
            {activeTab === "listen" && <ListenTabSection surahs={filteredListenSurahs} />}
            {activeTab === "bookmarks" && <BookmarksTabSection bookmarks={processedBookmarks} />}
        </div>
    )
}

export default QuranExploreSection

