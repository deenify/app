"use client"

import { useMemo, useState } from "react"
import { CheckCircle2, Database, Heart, Sparkles } from "lucide-react"
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
import StoryCard from "./StoryCard"
import { STORIES_CATEGORIES, STORIES_EDITORIAL, STORIES_TOPICS } from "./content"

type StoriesExploreTabId = "collections" | "bookmarks"
type StoriesSortOption = "recommended" | "shortest" | "longest" | "alphabetical"

const scopeOptions = [
    { value: "collections", label: "All Stories" },
    { value: "bookmarks", label: "Bookmarks" },
]

const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "shortest", label: "Shortest Read" },
    { value: "longest", label: "Longest Read" },
    { value: "alphabetical", label: "Alphabetical (A-Z)" },
]

export default function StoriesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
    const [sortBy, setSortBy] = useState<StoriesSortOption>("recommended")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [activeTab, setActiveTab] = useState<StoriesExploreTabId>("collections")
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
        () => new Set(["yusuf", "musa-sea", "ibrahim"])
    )

    const sidebarCategories = useMemo(
        () => STORIES_CATEGORIES.filter((c) => c.id !== "all").map((c) => ({ id: c.id, label: c.label })),
        []
    )

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {}
        STORIES_CATEGORIES.filter((c) => c.id !== "all").forEach((c) => {
            counts[c.id] = STORIES_TOPICS.filter((s) => s.category === c.id).length
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
        let result = STORIES_TOPICS.filter((s) => {
            const catOk = selectedCategories.size === 0 || selectedCategories.has(s.category)
            const searchOk =
                !q ||
                s.title.toLowerCase().includes(q) ||
                s.excerpt.toLowerCase().includes(q) ||
                s.prophet.toLowerCase().includes(q) ||
                s.lesson.toLowerCase().includes(q)
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
        () => filtered.filter((s) => bookmarkedIds.has(s.id)),
        [bookmarkedIds, filtered]
    )

    const displayed = activeTab === "collections" ? filtered : bookmarkItems

    const categoryLabel = (id: string) =>
        STORIES_CATEGORIES.find((c) => c.id === id)?.label ?? id

    const filterChips = Array.from(selectedCategories).map((id) => ({
        id,
        label: categoryLabel(id),
    }))

    const pageSize = useCatalogPageSize()
    const { page, setPage, totalPages, paginatedItems } = usePagination(displayed, pageSize)

    return (
        <div>
            <SectionHeader
                variant="purple"
                icon={Heart}
                label={STORIES_EDITORIAL.badge}
                heading="Prophetic Stories · Catalog"
                descriptions={[STORIES_EDITORIAL.lead]}
            >
                <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Badge variant="outline" className="gap-1.5">
                        <Database className="h-3.5 w-3.5 text-purple-600" />
                        <span className="text-xs text-gray-900">{STORIES_TOPICS.length} Stories</span>
                    </Badge>
                    <Badge variant="purple" className="gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
                        <span className="text-xs text-purple-700">Quran & Sunnah</span>
                    </Badge>
                    <Badge variant="secondary" className="gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                        <span className="text-xs text-gray-900">Life lessons</span>
                    </Badge>
                </div>
            </SectionHeader>

            <main className="container relative py-10 lg:py-16" id="stories-collections-section">
                <div className="flex flex-col items-start gap-7 lg:flex-row 2xl:gap-10">
                    <div className="sticky top-0 hidden w-56 shrink-0 lg:block 2xl:w-64">
                        <CatalogCategorySidebar
                            title="Themes"
                            categories={sidebarCategories}
                            selectedIds={selectedCategories}
                            onToggle={toggleCategory}
                            onClearAll={clearAllFilters}
                            categoryCounts={categoryCounts}
                            note={{
                                quote: "We relate to you the best of stories through what We have revealed to you of this Quran.",
                                reference: "Yusuf 12:3",
                            }}
                        />
                    </div>

                    <div className="w-full min-w-0 flex-1">
                        <CatalogTopBar
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            searchPlaceholder={activeTab === "bookmarks" ? "Search your saved stories..." : "Search stories, prophets, or lessons..."}
                            scopeFilter={{
                                value: activeTab,
                                onChange: (v) => setActiveTab(v as StoriesExploreTabId),
                                options: scopeOptions,
                                placeholder: "View",
                            }}
                            sortBy={sortBy}
                            onSortChange={(v) => setSortBy(v as StoriesSortOption)}
                            sortOptions={sortOptions}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            resultCount={displayed.length}
                            matchedLabel="Stories"
                            onMobileFilterToggle={() => setIsMobileFilterOpen(true)}
                        />

                        <CatalogFilterChips chips={filterChips} onRemove={toggleCategory} />

                        {displayed.length === 0 ? (
                            <CatalogEmptyState
                                variant={activeTab === "bookmarks" ? "bookmarks" : "search"}
                                savedTotal={bookmarkedIds.size}
                                title={activeTab === "bookmarks" ? undefined : "No stories found"}
                                description={
                                    activeTab === "bookmarks"
                                        ? "Save stories from All Stories to find them here quickly."
                                        : "Try refining your search or expanding your theme filters."
                                }
                            />
                        ) : (
                            <>
                                <div className={viewMode === "grid"
                                    ? "grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                                    : "flex flex-col gap-3"
                                }>
                                    {paginatedItems.map((story, index) => (
                                        <Stagger key={story.id} index={index} animate className={viewMode === "grid" ? "h-full" : undefined}>
                                            <StoryCard
                                                story={story}
                                                categoryLabel={categoryLabel(story.category)}
                                                isBookmarked={bookmarkedIds.has(story.id)}
                                                onToggleBookmark={() => toggleBookmark(story.id)}
                                                viewMode={viewMode}
                                            />
                                        </Stagger>
                                    ))}
                                </div>
                                <Pagination
                                    page={page}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                    scrollContainerId="stories-collections-section"
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
                sidebarTitle="Themes"
                note={{
                    quote: "We relate to you the best of stories through what We have revealed to you of this Quran.",
                    reference: "Yusuf 12:3",
                }}
            />
        </div>
    )
}
