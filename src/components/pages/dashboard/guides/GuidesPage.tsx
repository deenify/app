"use client"

import { useMemo, useState } from "react"
import { BookOpen, Bookmark, Filter, GraduationCap } from "lucide-react"
import { Input } from "@/components/ui/input"
import FilterDropdown from "@/components/shared/FilterDropdown"
import SectionHeader from "@/components/shared/SectionHeader"
import Tabs from "@/components/shared/Tabs"
import { cn } from "@/lib/utils/clsx"
import { GuideCategories, GuidesMock } from "./content"
import GuidesCollectionsTabSection from "./GuidesCollectionsTabSection"
import GuidesBookmarksTabSection from "./GuidesBookmarksTabSection"

export type GuideExploreTabId = "collections" | "bookmarks"

const guideTabs = [
    { id: "collections" as const, label: "All Guides", icon: BookOpen },
    { id: "bookmarks" as const, label: "Bookmarks", icon: Bookmark },
]

export default function GuidesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [category, setCategory] = useState<string>("all")
    const [activeTab, setActiveTab] = useState<GuideExploreTabId>("collections")
    const [bookmarkedGuideIds, setBookmarkedGuideIds] = useState<Set<string>>(
        () => new Set(["wudu", "salah", "ramadan"])
    )

    const getCategoryCount = (categoryId: string) =>
        categoryId === "all"
            ? GuidesMock.length + 20
            : GuidesMock.filter((g) => g.category === categoryId).length

    const filteredGuides = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        return GuidesMock.filter((g) => {
            const matchCategory = category === "all" || g.category === category
            const matchSearch = !q || g.title.toLowerCase().includes(q) || g.excerpt.toLowerCase().includes(q)
            return matchCategory && matchSearch
        })
    }, [category, searchQuery])

    const bookmarkGuides = useMemo(
        () => filteredGuides.filter((g) => bookmarkedGuideIds.has(g.id)),
        [bookmarkedGuideIds, filteredGuides]
    )

    const toggleBookmark = (id: string) => {
        setBookmarkedGuideIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const catalogCountLabel = `${GuidesMock.length - 1}+`

    const guideCategoryOptions = useMemo(
        () =>
            GuideCategories.map((c) => ({
                value: c.id,
                label: c.label,
                metaLabel: String(getCategoryCount(c.id)),
            })),
        [category]
    )

    const searchPlaceholder =
        activeTab === "bookmarks" ? "Search your saved guides..." : "Search guides..."

    return (
        <div className="bg-gray-50">
            <SectionHeader
                layoutScope="center"
                className="bg-white"
                variant="emerald"
                icon={GraduationCap}
                label="Guides & learning"
                heading="Study, practice, and grow"
                descriptions={[
                    "Curated learning paths for everyday worship, character, and foundational knowledge — structured for clarity and consistency.",
                ]}
            />

            <main className="bg-[linear-gradient(180deg,#f8faf8_0%,#f0f7f4_100%)]">
                <section className={cn("relative w-full border-t border-layout-separator bg-transparent")}>
                    <div className="container py-6 sm:py-8">
                        <div className="mx-auto min-w-0 max-w-6xl space-y-4 sm:space-y-5">
                            <section className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
                                <Input
                                    search
                                    type="input"
                                    placeholder={searchPlaceholder}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full min-w-0 sm:min-w-0 sm:flex-1"
                                    classNames={{
                                        inputWrapper: "w-full min-w-0",
                                        input: "h-10 w-full min-w-0 rounded-md border-gray-200 bg-white text-base placeholder:text-gray-400 focus:bg-white",
                                    }}
                                />
                                <div className="flex w-full min-w-0 items-center gap-2 sm:max-w-[260px] sm:shrink-0 md:max-w-[280px]">
                                    <div className="min-w-0 flex-1 sm:w-full">
                                        <FilterDropdown
                                            options={guideCategoryOptions}
                                            value={category}
                                            onChange={(v) => setCategory(String(v))}
                                            placeholder="All topics"
                                            triggerIcon={Filter}
                                            theme="purple"
                                            className="w-full"
                                            classNames={{
                                                triggerButton: "w-full max-w-full",
                                                content: "scrollbar-thin",
                                            }}
                                        />
                                    </div>
                                    <div className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50/80 px-2.5 text-xs font-medium text-emerald-800 shadow-sm sm:hidden">
                                        <span className="tabular-nums font-semibold">{filteredGuides.length}</span>
                                        <span className="ml-1 truncate">guides</span>
                                    </div>
                                </div>
                                <div className="hidden h-9 shrink-0 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50/80 px-3 text-xs font-medium text-emerald-800 shadow-sm sm:inline-flex">
                                    <span className="tabular-nums font-semibold">{filteredGuides.length}</span>
                                    <span className="ml-1">guides</span>
                                </div>
                            </section>

                            <section className="flex items-center justify-between pt-6">
                                <Tabs
                                    allTabs={guideTabs}
                                    activeTab={activeTab}
                                    onTabChange={(tabId) => setActiveTab(tabId as GuideExploreTabId)}
                                    variant="pills"
                                    showIndicator
                                    align="left"
                                    stretchTabs={false}
                                    className="pt-0"
                                    contentContainerClassName="hidden"
                                    tabsContainerClassName="flex h-max justify-center border-none"
                                    tabClassName="px-5 xs:px-7 sm:px-8 md:px-10 lg:px-12"
                                    classNames={{
                                        pillsIndicator: "border border-layout-separator bg-white",
                                        tabsWrapper: "border border-layout-separator",
                                        labelClassName: "text-xs xs:text-sm",
                                    }}
                                />

                                <div className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 
                            text-[11px] font-medium text-emerald-800 shadow-[0_1px_2px_rgba(16,185,129,0.18)] sm:inline-flex sm:text-xs">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    {activeTab === "collections" ? (
                                        <>
                                            <span className="tabular-nums">{catalogCountLabel}</span>
                                            <span>Guides</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="tabular-nums">{bookmarkedGuideIds.size}</span>
                                            <span>saved</span>
                                        </>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </section>

                {activeTab === "collections" && (
                    <GuidesCollectionsTabSection
                        guides={filteredGuides}
                        bookmarkedIds={bookmarkedGuideIds}
                        onToggleBookmark={toggleBookmark}
                    />
                )}
                {activeTab === "bookmarks" && (
                    <GuidesBookmarksTabSection
                        guides={bookmarkGuides}
                        bookmarkedIds={bookmarkedGuideIds}
                        onToggleBookmark={toggleBookmark}
                    />
                )}
            </main>
        </div>
    )
}

