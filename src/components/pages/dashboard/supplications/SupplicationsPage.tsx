"use client"

import { useMemo, useState } from "react"
import { X, Library, Sparkles, Database, CheckCircle2 } from "lucide-react"
import {
    SUPPLICATIONS_MOCK,
    type SupplicationCategoryId,
    type SupplicationTag,
} from "./content"
import SupplicationsCollectionsSection from "./SupplicationsCollectionsSection"
import SupplicationsSidebar from "./SupplicationsSidebar"
import SupplicationsTopBar from "./SupplicationsTopBar"
import { Badge } from "@/components/ui/badge"
import SectionHeader from "@/components/shared/SectionHeader"
import FiltersDrawer from "./FiltersDrawer"

export type SupplicationsViewMode = "grid" | "list"
export type SupplicationsSortOption = "recommended" | "shortest" | "longest" | "alphabetical"
export type SupplicationsExploreTabId = "collections" | "bookmarks"

const scopeOptions = [
    { value: "collections", label: "All Supplications" },
    { value: "bookmarks", label: "Bookmarks" },
]

export default function SupplicationsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<Set<SupplicationCategoryId>>(new Set())
    const [selectedTags, setSelectedTags] = useState<Set<SupplicationTag>>(new Set())
    const [sortBy, setSortBy] = useState<SupplicationsSortOption>("recommended")
    const [viewMode, setViewMode] = useState<SupplicationsViewMode>("grid")
    const [activeTab, setActiveTab] = useState<SupplicationsExploreTabId>("collections")
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(
        ["sayyid-istighfar", "distress-yunus"]
    ))

    const toggleCategory = (id: SupplicationCategoryId) => {
        setSelectedCategories((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const toggleTag = (tag: SupplicationTag) => {
        setSelectedTags((prev) => {
            const next = new Set(prev)
            if (next.has(tag)) next.delete(tag)
            else next.add(tag)
            return next
        })
    }

    const clearAllFilters = () => {
        setSelectedCategories(new Set())
        setSelectedTags(new Set())
        setSearchQuery("")
    }

    const toggleBookmark = (id: string) => {
        setBookmarkedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const filteredAndSorted = useMemo(() => {
        let result = [...SUPPLICATIONS_MOCK]

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase()
            result = result.filter(
                (s) =>
                    s.title.toLowerCase().includes(q) ||
                    s.arabic.includes(q) ||
                    s.excerpt.toLowerCase().includes(q) ||
                    s.tags.some((t) => t.toLowerCase().includes(q))
            )
        }

        if (selectedCategories.size > 0) {
            result = result.filter((s) => selectedCategories.has(s.category))
        }

        if (selectedTags.size > 0) {
            result = result.filter((s) => s.tags.some((tag) => selectedTags.has(tag)))
        }

        result.sort((a, b) => {
            switch (sortBy) {
                case "shortest":
                    return a.readSeconds - b.readSeconds
                case "longest":
                    return b.readSeconds - a.readSeconds
                case "alphabetical":
                    return a.title.localeCompare(b.title)
                default:
                    return 0
            }
        })

        return result
    }, [searchQuery, selectedCategories, selectedTags, sortBy])

    const bookmarkItems = useMemo(
        () => filteredAndSorted.filter((s) => bookmarkedIds.has(s.id)),
        [bookmarkedIds, filteredAndSorted]
    )

    const displayedItems = activeTab === "collections" ? filteredAndSorted : bookmarkItems

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {}
        SUPPLICATIONS_MOCK.forEach((s) => {
            counts[s.category] = (counts[s.category] || 0) + 1
        })
        return counts
    }, [])

    return (
        <div>
            <SectionHeader
                variant="emerald"
                icon={Library}
                label="Supplications"
                heading="Supplications · Catalog"
                descriptions={["A curated collection of prophetic cadences architected for retrieval whenever the heart calls for words finer than your own."]}
            >
                <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Badge variant="outline" className="gap-1.5">
                        <Database className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-xs text-gray-900">{SUPPLICATIONS_MOCK.length} Collections</span>
                    </Badge>
                    <Badge variant="emerald" className="gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-xs text-emerald-700">Verified Traditions</span>
                    </Badge>
                    <Badge variant="secondary" className="gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-xs text-gray-900">Premium Cadence</span>
                    </Badge>
                </div>
            </SectionHeader>

            <main
                className="container py-10 lg:py-16 relative"
                id="supplications-collections-section"
            >
                <div className="flex flex-col lg:flex-row 2xl:gap-10 gap-7 items-start">
                    {/* Professional Sidebar */}
                    <div className="hidden lg:block 2xl:w-64 w-56 shrink-0 sticky top-0">
                        <SupplicationsSidebar
                            selectedCategories={selectedCategories}
                            onCategoryToggle={toggleCategory}
                            selectedTags={selectedTags}
                            onTagToggle={toggleTag}
                            onClearAll={clearAllFilters}
                            categoryCounts={categoryCounts}
                        />
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 min-w-0 w-full">
                        <SupplicationsTopBar
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            searchPlaceholder={activeTab === "bookmarks" ? "Search your saved duas..." : "Search titles, themes, or keywords..."}
                            scopeFilter={{
                                value: activeTab,
                                onChange: (v) => setActiveTab(v as SupplicationsExploreTabId),
                                options: scopeOptions,
                                placeholder: "View",
                            }}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            resultCount={displayedItems.length}
                            onMobileFilterToggle={() => setIsMobileFilterOpen(true)}
                        />

                        {/* Robust Active Filter Approach - Elevated above cards, Professional SaaS UI */}
                        <div className="pt-4 pb-6 flex flex-wrap items-center gap-3 min-h-[68px]">
                            <span className="text-xs font-black uppercase text-gray-600 mr-2">
                                Filters:
                            </span>
                            {Array.from(selectedCategories).map((catId) => (
                                <div
                                    key={catId}
                                    className="flex items-center gap-1 px-2.5 py-[3px] rounded-full border
                                     border-gray-200 bg-white shadow-sm hover:border-emerald-300 
                                     transition-all group hover:bg-emerald-50/30"
                                >
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                    <span className="text-[11px] font-bold text-gray-900 uppercase 
                                    tracking-tighter">
                                        {catId}
                                    </span>
                                    <button
                                        onClick={() => toggleCategory(catId)}
                                        className="ml-1 p-1 rounded-lg hover:bg-emerald-100 text-gray-400
                                         hover:text-emerald-600 transition-colors"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            {Array.from(selectedTags).map((tag) => (
                                <div
                                    key={tag}
                                    className="flex items-center gap-2 px-2.5 py-[3px] rounded-full border border-gray-200 bg-white shadow-sm hover:border-emerald-200 transition-all group"
                                >
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                    <span className="text-[11px] font-bold text-gray-900 uppercase tracking-tighter">{tag}</span>
                                    <button
                                        onClick={() => toggleTag(tag)}
                                        className="ml-1 p-1 rounded-lg hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <SupplicationsCollectionsSection
                            items={displayedItems}
                            bookmarkedIds={bookmarkedIds}
                            onToggleBookmark={toggleBookmark}
                            viewMode={viewMode}
                            isBookmarksView={activeTab === "bookmarks"}
                        />
                    </div>
                </div>
            </main>

            {/* Premium Mobile Filter Drawer */}
            <FiltersDrawer
                isMobileFilterOpen={isMobileFilterOpen}
                setIsMobileFilterOpen={setIsMobileFilterOpen}
                clearAllFilters={clearAllFilters}
                selectedCategories={selectedCategories}
                selectedTags={selectedTags}
                toggleCategory={toggleCategory}
                toggleTag={toggleTag}
                categoryCounts={categoryCounts}
                filteredAndSorted={filteredAndSorted}
            />
        </div>
    )
}
