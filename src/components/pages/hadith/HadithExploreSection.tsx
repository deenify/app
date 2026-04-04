"use client"

import { useMemo, useState } from "react"
import {
    ArrowDownAZ,
    ArrowUpAZ,
    ArrowUpDown,
    CalendarClock,
    CalendarDays,
    CalendarRange,
    Clock,
    History,
    ListOrdered,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Tabs, { type TabItem } from "@/components/shared/Tabs"
import FilterDropdown, { type FilterOption } from "@/components/shared/FilterDropdown"
import {
    HadithCollections,
    HadithTopics,
    MockHadithSaved,
    TOTAL_HADITH_COUNT_DISPLAY,
    type HadithCollectionType,
    type HadithTopicType,
} from "./content"
import HadithCollectionsTabSection from "./HadithCollectionsTabSection"
import HadithTopicsTabSection from "./HadithTopicsTabSection"
import HadithSavedTabSection from "./HadithSavedTabSection"

type HadithTabId = "collections" | "topics" | "saved"
export type HadithDateFilter = "all" | "today" | "week" | "month" | "year"
type SortMode = "az" | "za" | "count"

const hadithTabs: TabItem[] = [
    { id: "collections" as HadithTabId, label: "Collections" },
    { id: "topics" as HadithTabId, label: "Topics" },
    { id: "saved" as HadithTabId, label: "bookmarks" },
]

function isSavedInRange(savedAt: string, filter: HadithDateFilter): boolean {
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

const collectionSortOptions: FilterOption[] = [
    { value: "az", label: "A–Z", icon: ArrowDownAZ },
    { value: "za", label: "Z–A", icon: ArrowUpAZ },
    { value: "count", label: "Most hadiths first", icon: ListOrdered },
]

const topicSortOptions: FilterOption[] = [
    { value: "az", label: "A–Z", icon: ArrowDownAZ },
    { value: "za", label: "Z–A", icon: ArrowUpAZ },
    { value: "count", label: "Most narrations first", icon: ListOrdered },
]

const savedDateOptions: FilterOption[] = [
    { value: "all", label: "All time", icon: CalendarDays },
    { value: "today", label: "Today", icon: Clock },
    { value: "week", label: "Last 7 days", icon: History },
    { value: "month", label: "Last 30 days", icon: CalendarRange },
    { value: "year", label: "Last year", icon: CalendarClock },
]

function sortCollections(list: HadithCollectionType[], mode: SortMode): HadithCollectionType[] {
    const copy = [...list]
    if (mode === "az") copy.sort((a, b) => a.nameEnglish.localeCompare(b.nameEnglish))
    else if (mode === "za") copy.sort((a, b) => b.nameEnglish.localeCompare(a.nameEnglish))
    else copy.sort((a, b) => b.hadithCount - a.hadithCount)
    return copy
}

function sortTopics(list: HadithTopicType[], mode: SortMode): HadithTopicType[] {
    const copy = [...list]
    if (mode === "az") copy.sort((a, b) => a.label.localeCompare(b.label))
    else if (mode === "za") copy.sort((a, b) => b.label.localeCompare(a.label))
    else copy.sort((a, b) => b.hadithCount - a.hadithCount)
    return copy
}

const HadithExploreSection = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [collectionSort, setCollectionSort] = useState<SortMode>("az")
    const [topicSort, setTopicSort] = useState<SortMode>("az")
    const [savedDateFilter, setSavedDateFilter] = useState<HadithDateFilter>("all")
    const [activeTab, setActiveTab] = useState<HadithTabId>("collections")

    const processedCollections = useMemo(() => {
        let list = sortCollections(HadithCollections, collectionSort)
        if (!searchQuery.trim()) return list
        const q = searchQuery.toLowerCase().trim()
        list = list.filter(
            (c) =>
                c.nameEnglish.toLowerCase().includes(q) ||
                c.nameArabic.includes(q) ||
                c.compiler.toLowerCase().includes(q)
        )
        return list
    }, [collectionSort, searchQuery])

    const processedTopics = useMemo(() => {
        let list = sortTopics(HadithTopics, topicSort)
        if (!searchQuery.trim()) return list
        const q = searchQuery.toLowerCase().trim()
        return list.filter((t) => t.label.toLowerCase().includes(q) || t.id.includes(q))
    }, [topicSort, searchQuery])

    const processedSaved = useMemo(() => {
        let list = MockHadithSaved.filter((h) => isSavedInRange(h.savedAt, savedDateFilter))
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim()
            list = list.filter(
                (h) =>
                    h.collectionName.toLowerCase().includes(q) ||
                    h.collectionNameArabic.includes(q) ||
                    h.snippet.toLowerCase().includes(q) ||
                    h.titleEnglish.toLowerCase().includes(q) ||
                    h.titleArabic.includes(q) ||
                    String(h.bookNumber).includes(q) ||
                    String(h.hadithInBook).includes(q)
            )
        }
        return list
    }, [savedDateFilter, searchQuery])

    const dropdownOptions =
        activeTab === "collections"
            ? collectionSortOptions
            : activeTab === "topics"
                ? topicSortOptions
                : savedDateOptions

    const dropdownValue =
        activeTab === "collections" ? collectionSort : activeTab === "topics" ? topicSort : savedDateFilter

    const setDropdownValue = (v: string | number) => {
        if (activeTab === "collections") setCollectionSort(v as SortMode)
        else if (activeTab === "topics") setTopicSort(v as SortMode)
        else setSavedDateFilter(v as HadithDateFilter)
    }

    const searchPlaceholder =
        activeTab === "collections"
            ? "Search collections, compiler, or Arabic name…"
            : activeTab === "topics"
                ? "Search topics…"
                : "Search saved hadith…"

    return (
        <div className="bg-gray-50">
            <section className="border-b border-gray-100 bg-white">
                <div className="container space-y-6 px-4 py-6 sm:space-y-6 sm:px-6 sm:py-8 md:px-6 md:py-10">
                    <header className="space-y-3 sm:space-y-3">
                        <Badge variant="emerald" className="text-xs font-medium">
                            Hadith & Prophetic tradition
                        </Badge>
                        <h1 className="text-4xl font-medium tracking-tight text-gray-900">
                            <span className="inline">
                                Explore hadiths <br className="sm:hidden" />—{" "}
                            </span>
                            <span className="inline-block font-arabic text-3xl font-medium text-emerald-700">(الحديث)</span>
                        </h1>
                        <p className="max-w-2xl text-sm leading-relaxed text-gray-600">
                            Authentic narrations from the Prophet ﷺ — organised by major collections and themes so you can
                            study, verify chains, and apply guidance with clarity.
                        </p>
                        <p className="hidden max-w-2xl text-sm leading-relaxed text-gray-500 md:block">
                            Use search and sort below to browse books. Switch to Topics for thematic access, or Saved for
                            your bookmarked narrations.
                        </p>

                        <main className="flex flex-wrap items-center gap-2 pt-0.5">
                            <Badge
                                variant="outline"
                                className="border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700"
                            >
                                6 collections
                            </Badge>
                            <span aria-hidden className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                            <Badge
                                variant="outline"
                                className="border-purple-200 bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700"
                            >
                                {TOTAL_HADITH_COUNT_DISPLAY} narrations
                            </Badge>
                        </main>
                    </header>

                    <main className="space-y-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                            <Input
                                search
                                type="input"
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                containerClassName="min-w-0 flex-1"
                                className="h-10 min-h-[42px] rounded-lg border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus:bg-white sm:h-11"
                            />
                            <div className="w-full sm:w-[260px] sm:shrink-0">
                                <FilterDropdown
                                    options={dropdownOptions}
                                    value={dropdownValue}
                                    onChange={setDropdownValue}
                                    theme="amber"
                                    triggerIcon={
                                        activeTab === "collections"
                                            ? ArrowUpDown
                                            : activeTab === "topics"
                                                ? ArrowUpDown
                                                : History
                                    }
                                />
                            </div>
                        </div>

                        <Tabs
                            allTabs={hadithTabs}
                            activeTab={activeTab}
                            onTabChange={(tabId) => setActiveTab(tabId as HadithTabId)}
                            variant="underline"
                            showIndicator
                            align="left"
                            stretchTabs={false}
                            className="pt-0"
                            tabsContainerClassName="max-w-full border-b border-gray-200"
                            contentContainerClassName="hidden"
                        />
                    </main>
                </div>
            </section>

            {activeTab === "collections" && <HadithCollectionsTabSection collections={processedCollections} />}
            {activeTab === "topics" && <HadithTopicsTabSection topics={processedTopics} />}
            {activeTab === "saved" && <HadithSavedTabSection items={processedSaved} />}
        </div>
    )
}

export default HadithExploreSection
