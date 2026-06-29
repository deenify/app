"use client"

import { useMemo, useState } from "react"
import { CheckCircle2, Database, Sparkles, Star } from "lucide-react"
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
import MiracleCard from "./MiracleCard"
import { MIRACLES_CATEGORIES, MIRACLES_EDITORIAL, MIRACLES_TOPICS } from "./content"

type MiraclesExploreTabId = "collections" | "bookmarks"
type MiraclesSortOption = "recommended" | "shortest" | "longest" | "alphabetical"

const scopeOptions = [
    { value: "collections", label: "All Signs" },
    { value: "bookmarks", label: "Bookmarks" },
]

const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "shortest", label: "Shortest Read" },
    { value: "longest", label: "Longest Read" },
    { value: "alphabetical", label: "Alphabetical (A-Z)" },
]

export default function MiraclesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
    const [sortBy, setSortBy] = useState<MiraclesSortOption>("recommended")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [activeTab, setActiveTab] = useState<MiraclesExploreTabId>("collections")
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
        () => new Set(["split-moon", "night-journey", "quran-preservation"])
    )

    const sidebarCategories = useMemo(
        () => MIRACLES_CATEGORIES.filter((c) => c.id !== "all").map((c) => ({ id: c.id, label: c.label })),
        []
    )

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {}
        MIRACLES_CATEGORIES.filter((c) => c.id !== "all").forEach((c) => {
            counts[c.id] = MIRACLES_TOPICS.filter((t) => t.category === c.id).length
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
        const result = MIRACLES_TOPICS.filter((t) => {
            const catOk = selectedCategories.size === 0 || selectedCategories.has(t.category)
            const searchOk =
                !q ||
                t.title.toLowerCase().includes(q) ||
                t.excerpt.toLowerCase().includes(q) ||
                (t.quranRef?.toLowerCase().includes(q) ?? false)
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
        MIRACLES_CATEGORIES.find((c) => c.id === id)?.label ?? id

    const filterChips = Array.from(selectedCategories).map((id) => ({
        id,
        label: categoryLabel(id),
    }))

    const pageSize = useCatalogPageSize()
    const { page, setPage, totalPages, paginatedItems } = usePagination(displayed, pageSize)

    return (
        <div>
            <SectionHeader
                variant="emerald"
                icon={Star}
                label={MIRACLES_EDITORIAL.badge}
                heading="Islamic Miracles · Catalog"
                descriptions={[MIRACLES_EDITORIAL.lead]}
            >
                <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Badge variant="outline" className="gap-1.5">
                        <Database className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-xs text-gray-900">{MIRACLES_TOPICS.length} Signs</span>
                    </Badge>
                    <Badge variant="emerald" className="gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-xs text-emerald-700">Quranic & prophetic</span>
                    </Badge>
                    <Badge variant="secondary" className="gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-xs text-gray-900">Faith-building</span>
                    </Badge>
                </div>
            </SectionHeader>

            <main className="container relative py-10 lg:py-16" id="miracles-collections-section">
                <div className="flex flex-col items-start gap-7 lg:flex-row 2xl:gap-10">
                    <div className="sticky top-0 hidden w-56 shrink-0 lg:block 2xl:w-64">
                        <CatalogCategorySidebar
                            title="Categories"
                            categories={sidebarCategories}
                            selectedIds={selectedCategories}
                            onToggle={toggleCategory}
                            onClearAll={clearAllFilters}
                            categoryCounts={categoryCounts}
                            note={{
                                quote: "We will show them Our signs in the horizons and within themselves.",
                                reference: "Fussilat 41:53",
                            }}
                        />
                    </div>

                    <div className="w-full min-w-0 flex-1">
                        <CatalogTopBar
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            searchPlaceholder={activeTab === "bookmarks" ? "Search your saved signs..." : "Search miracles, signs, or references..."}
                            scopeFilter={{
                                value: activeTab,
                                onChange: (v) => setActiveTab(v as MiraclesExploreTabId),
                                options: scopeOptions,
                                placeholder: "View",
                            }}
                            sortBy={sortBy}
                            onSortChange={(v) => setSortBy(v as MiraclesSortOption)}
                            sortOptions={sortOptions}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            resultCount={displayed.length}
                            matchedLabel="Signs"
                            onMobileFilterToggle={() => setIsMobileFilterOpen(true)}
                        />

                        <CatalogFilterChips chips={filterChips} onRemove={toggleCategory} />

                        {displayed.length === 0 ? (
                            <CatalogEmptyState
                                variant={activeTab === "bookmarks" ? "bookmarks" : "search"}
                                savedTotal={bookmarkedIds.size}
                                title={activeTab === "bookmarks" ? undefined : "No signs found"}
                                description={
                                    activeTab === "bookmarks"
                                        ? "Save signs from All Signs to find them here quickly."
                                        : "Try refining your search or expanding your category filters."
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
                                            <MiracleCard
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
                                    scrollContainerId="miracles-collections-section"
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
                sidebarTitle="Categories"
                note={{
                    quote: "We will show them Our signs in the horizons and within themselves.",
                    reference: "Fussilat 41:53",
                }}
            />
        </div>
    )
}
