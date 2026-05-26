"use client"

import { useMemo, useState } from "react"
import {
    ArrowDownAZ,
    ArrowUpAZ,
    ArrowUpDown,
    BookOpen,
    CalendarClock,
    CalendarDays,
    CalendarRange,
    Clock,
    FileText,
    History,
    ListOrdered,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import SectionHeader from "@/components/shared/SectionHeader"
import Tabs, { type TabItem } from "@/components/shared/Tabs"
import FilterDropdown, { type FilterOption } from "@/components/shared/FilterDropdown"
import {
    HadithCollections,
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

const topicBookFilterOptions: FilterOption[] = HadithCollections.map((c) => ({
    value: c.id,
    label: c.nameEnglish,
    icon: BookOpen,
    metaLabel: c.hadithCount.toLocaleString(),
}))

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

export default function HadithPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [collectionSort, setCollectionSort] = useState<SortMode>("az")
    /** Topics tab: which collection’s thematic index is shown (default Sahih Muslim). */
    const [topicsCollectionId, setTopicsCollectionId] = useState<string>("sahih-bukhari")
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
        const book = HadithCollections.find((c) => c.id === topicsCollectionId)
        let list = sortTopics(book?.topics ?? [], "az")
        if (!searchQuery.trim()) return list
        const q = searchQuery.toLowerCase().trim()
        return list.filter(
            (t) =>
                t.label.toLowerCase().includes(q) ||
                t.id.includes(q) ||
                t.blurb.toLowerCase().includes(q)
        )
    }, [topicsCollectionId, searchQuery])

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
                ? topicBookFilterOptions
                : savedDateOptions

    const dropdownValue =
        activeTab === "collections"
            ? collectionSort
            : activeTab === "topics"
                ? topicsCollectionId
                : savedDateFilter

    const setDropdownValue = (v: string | number) => {
        if (activeTab === "collections") setCollectionSort(v as SortMode)
        else if (activeTab === "topics") setTopicsCollectionId(String(v))
        else setSavedDateFilter(v as HadithDateFilter)
    }

    const topicsCollectionMeta = useMemo(
        () => HadithCollections.find((c) => c.id === topicsCollectionId),
        [topicsCollectionId]
    )

    const searchPlaceholder =
        activeTab === "collections"
            ? "Search collections, compiler, or Arabic name…"
            : activeTab === "topics"
                ? topicsCollectionMeta
                    ? `Search topics in ${topicsCollectionMeta.nameEnglish}…`
                    : "Search topics…"
                : "Search saved hadith…"

    return (
        <div>
            <SectionHeader
                variant="emerald"
                icon={FileText}
                label="Hadith & Prophetic tradition"
                heading={
                    <>
                        <span className="inline">
                            Explore hadiths <br className="sm:hidden" />—{" "}
                        </span>
                        <span className="inline-block font-arabic text-3xl font-medium text-emerald-700">
                            (الحديث)
                        </span>
                    </>
                }
                descriptions={[
                    "Authentic narrations from the Prophet ﷺ — organised by major collections and themes so you can study, verify chains, and apply guidance with clarity.",
                ]}
                classNames={{ descriptionsWrapper: "space-y-3 sm:space-y-3" }}
            >
                <section>
                    <p className="hidden max-w-2xl text-sm leading-relaxed text-gray-500 md:block">
                        Use search and sort below to browse books. Switch to Topics for thematic access, or Saved for your
                        bookmarked narrations.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                        <Badge variant="outline">
                            6 collections
                        </Badge>
                        <span aria-hidden className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                        <Badge variant="purple">
                            {TOTAL_HADITH_COUNT_DISPLAY} narrations
                        </Badge>
                    </div>
                </section>

                <section className="bg-white">
                    <div className="space-y-4 pt-5 sm:pt-8">
                        <main className="space-y-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                                <Input
                                    search
                                    type="input"
                                    placeholder={searchPlaceholder}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    classNames={{
                                        input: "h-10 rounded-md border-gray-200 bg-gray-50 text-base placeholder:text-gray-400 focus:bg-white min-w-0 flex-1"
                                    }}
                                />
                                <div className="w-full sm:w-[260px] sm:shrink-0">
                                    <FilterDropdown
                                        options={dropdownOptions}
                                        value={dropdownValue}
                                        onChange={setDropdownValue}
                                        placeholder={activeTab === "topics" ? "Hadith book" : undefined}
                                        theme="amber"
                                        triggerIcon={
                                            activeTab === "collections"
                                                ? ArrowUpDown
                                                : activeTab === "topics"
                                                    ? BookOpen
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
            </SectionHeader>

            <div className="bg-[linear-gradient(180deg,#f8faf8_0%,#f0f7f4_100%)]">
                {activeTab === "collections" && <HadithCollectionsTabSection collections={processedCollections} />}
                {activeTab === "topics" && (
                    <HadithTopicsTabSection
                        key={topicsCollectionId}
                        collectionId={topicsCollectionId}
                        topics={processedTopics}
                        collectionNameEnglish={topicsCollectionMeta?.nameEnglish ?? "Hadith book"}
                        collectionNameArabic={topicsCollectionMeta?.nameArabic}
                    />
                )}
                {activeTab === "saved" && <HadithSavedTabSection items={processedSaved} />}
            </div>
        </div>
    )
}

