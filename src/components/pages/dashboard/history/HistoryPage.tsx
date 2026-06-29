"use client"

import { useMemo, useState } from "react"
import { CheckCircle2, Database, Scroll, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import SectionHeader from "@/components/shared/SectionHeader"
import CatalogTopBar from "@/components/shared/catalog/CatalogTopBar"
import CatalogFilterChips from "@/components/shared/catalog/CatalogFilterChips"
import CatalogCategorySidebar from "@/components/shared/catalog/CatalogCategorySidebar"
import CatalogFiltersDrawer from "@/components/shared/catalog/CatalogFiltersDrawer"
import CatalogEmptyState from "@/components/shared/catalog/CatalogEmptyState"
import Stagger from "@/components/shared/motion/Stagger"
import { Pagination } from "@/components/ui/pagination"
import { usePagination } from "@/hooks/usePagination"
import { useCatalogPageSize } from "@/hooks/useCatalogPageSize"
import HistoryCard from "./HistoryCard"
import { HISTORY_CATEGORIES, HISTORY_EDITORIAL, HISTORY_TOPICS } from "./content"

type HistoryExploreTabId = "collections" | "bookmarks"
type HistorySortOption = "recommended" | "shortest" | "longest" | "alphabetical"

const scopeOptions = [
    { value: "collections", label: "All History" },
    { value: "bookmarks", label: "Bookmarks" },
]

const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "shortest", label: "Shortest Read" },
    { value: "longest", label: "Longest Read" },
    { value: "alphabetical", label: "Alphabetical (A-Z)" },
]

export default function HistoryPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
    const [sortBy, setSortBy] = useState<HistorySortOption>("recommended")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [activeTab, setActiveTab] = useState<HistoryExploreTabId>("collections")
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
        () => new Set(["hijrah", "badr", "andalus"])
    )

    const sidebarCategories = useMemo(
        () => HISTORY_CATEGORIES.filter((c) => c.id !== "all").map((c) => ({ id: c.id, label: c.label })),
        []
    )

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {}
        HISTORY_CATEGORIES.filter((c) => c.id !== "all").forEach((c) => {
            counts[c.id] = HISTORY_TOPICS.filter((t) => t.category === c.id).length
        })
        return counts
    }, [])

    const toggleCategory = (id: string) => {
        setSelectedCategories((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const toggleBookmark = (id: string) => {
        setBookmarkedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const clearAllFilters = () => {
        setSelectedCategories(new Set())
        setSearchQuery("")
    }

    const filtered = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        const result = HISTORY_TOPICS.filter((t) => {
            const catOk = selectedCategories.size === 0 || selectedCategories.has(t.category)
            const searchOk =
                !q ||
                t.title.toLowerCase().includes(q) ||
                t.excerpt.toLowerCase().includes(q) ||
                t.era.toLowerCase().includes(q)
            return catOk && searchOk
        })

        result.sort((a, b) => {
            switch (sortBy) {
                case "shortest": return a.readMinutes - b.readMinutes
                case "longest": return b.readMinutes - a.readMinutes
                case "alphabetical": return a.title.localeCompare(b.title)
                default: return 0
            }
        })

        return result
    }, [searchQuery, selectedCategories, sortBy])

    const bookmarkItems = useMemo(
        () => filtered.filter((t) => bookmarkedIds.has(t.id)),
        [bookmarkedIds, filtered]
    )

    const displayed = activeTab === "collections" ? filtered : bookmarkItems

    const categoryLabel = (id: string) =>
        HISTORY_CATEGORIES.find((c) => c.id === id)?.label ?? id

    const filterChips = Array.from(selectedCategories).map((id) => ({
        id,
        label: categoryLabel(id),
    }))

    const pageSize = useCatalogPageSize()
    const { page, setPage, totalPages, paginatedItems } = usePagination(displayed, pageSize)

    return (
        <div>
            <SectionHeader
                variant="amber"
                icon={Scroll}
                label={HISTORY_EDITORIAL.badge}
                heading="Islamic History · Catalog"
                descriptions={[HISTORY_EDITORIAL.lead]}
            >
                <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Badge variant="outline" className="gap-1.5">
                        <Database className="h-3.5 w-3.5 text-amber-700" />
                        <span className="text-xs text-gray-900">{HISTORY_TOPICS.length} Entries</span>
                    </Badge>
                    <Badge variant="amber" className="gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-700" />
                        <span className="text-xs text-amber-800">Verified narratives</span>
                    </Badge>
                    <Badge variant="secondary" className="gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                        <span className="text-xs text-gray-900">Plain language</span>
                    </Badge>
                </div>
            </SectionHeader>

            <main className="container relative py-10 lg:py-16" id="history-collections-section">
                <div className="flex flex-col items-start gap-7 lg:flex-row 2xl:gap-10">
                    <div className="sticky top-0 hidden w-56 shrink-0 lg:block 2xl:w-64">
                        <CatalogCategorySidebar
                            title="Eras"
                            categories={sidebarCategories}
                            selectedIds={selectedCategories}
                            onToggle={toggleCategory}
                            onClearAll={clearAllFilters}
                            categoryCounts={categoryCounts}
                            note={{
                                quote: "Indeed, in their stories is a lesson for those of understanding.",
                                reference: "Yusuf 12:111",
                            }}
                        />
                    </div>

                    <div className="w-full min-w-0 flex-1">
                        <CatalogTopBar
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            searchPlaceholder={activeTab === "bookmarks" ? "Search your saved history..." : "Search history, eras, or events..."}
                            scopeFilter={{
                                value: activeTab,
                                onChange: (v) => setActiveTab(v as HistoryExploreTabId),
                                options: scopeOptions,
                                placeholder: "View",
                            }}
                            sortBy={sortBy}
                            onSortChange={(v) => setSortBy(v as HistorySortOption)}
                            sortOptions={sortOptions}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            resultCount={displayed.length}
                            matchedLabel="Entries"
                            onMobileFilterToggle={() => setIsMobileFilterOpen(true)}
                        />

                        <CatalogFilterChips chips={filterChips} onRemove={toggleCategory} />

                        {displayed.length === 0 ? (
                            <CatalogEmptyState
                                variant={activeTab === "bookmarks" ? "bookmarks" : "search"}
                                savedTotal={bookmarkedIds.size}
                                title={activeTab === "bookmarks" ? undefined : "No history entries found"}
                                description={
                                    activeTab === "bookmarks"
                                        ? "Save entries from All History to find them here quickly."
                                        : "Try refining your search or expanding your era filters."
                                }
                            />
                        ) : (
                            <>
                                <div className={viewMode === "grid"
                                    ? "grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                                    : "flex flex-col gap-3"
                                }>
                                    {paginatedItems.map((topic, index) => (
                                        <Stagger key={topic.id} index={index} animate>
                                            <HistoryCard
                                                topic={topic}
                                                categoryLabel={categoryLabel(topic.category)}
                                                isBookmarked={bookmarkedIds.has(topic.id)}
                                                onToggleBookmark={() => toggleBookmark(topic.id)}
                                                viewMode={viewMode}
                                            />
                                        </Stagger>
                                    ))}
                                </div>
                                <Pagination
                                    page={page}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                    scrollContainerId="history-collections-section"
                                    className="py-6"
                                />
                            </>
                        )}
                    </div>
                </div>
            </main>

            <CatalogFiltersDrawer
                isOpen={isMobileFilterOpen}
                onOpenChange={setIsMobileFilterOpen}
                onClearAll={clearAllFilters}
                categories={sidebarCategories}
                selectedIds={selectedCategories}
                onToggle={toggleCategory}
                categoryCounts={categoryCounts}
                sidebarTitle="Eras"
                note={{
                    quote: "Indeed, in their stories is a lesson for those of understanding.",
                    reference: "Yusuf 12:111",
                }}
            />
        </div>
    )
}
