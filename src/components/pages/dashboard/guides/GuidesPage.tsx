"use client"

import { useMemo, useState } from "react"
import { CheckCircle2, Database, GraduationCap, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import SectionHeader from "@/components/shared/SectionHeader"
import CatalogTopBar from "@/components/shared/catalog/CatalogTopBar"
import CatalogFilterChips from "@/components/shared/catalog/CatalogFilterChips"
import CatalogCategorySidebar from "@/components/shared/catalog/CatalogCategorySidebar"
import CatalogFiltersDrawer from "@/components/shared/catalog/CatalogFiltersDrawer"
import { GuideCategories, GuidesMock, type GuideCategoryId, type GuideDifficulty } from "./content"
import GuidesCollectionsTabSection from "./GuidesCollectionsTabSection"
import GuidesBookmarksTabSection from "./GuidesBookmarksTabSection"

export type GuideExploreTabId = "collections" | "bookmarks"
export type GuidesSortOption = "recommended" | "shortest" | "longest" | "alphabetical"

const scopeOptions = [
    { value: "collections", label: "All Guides" },
    { value: "bookmarks", label: "Bookmarks" },
]

const DIFFICULTIES: { id: GuideDifficulty; label: string }[] = [
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
]

const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "shortest", label: "Shortest Read" },
    { value: "longest", label: "Longest Read" },
    { value: "alphabetical", label: "Alphabetical (A-Z)" },
]

export default function GuidesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<Set<GuideCategoryId>>(new Set())
    const [selectedDifficulties, setSelectedDifficulties] = useState<Set<GuideDifficulty>>(new Set())
    const [sortBy, setSortBy] = useState<GuidesSortOption>("recommended")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [activeTab, setActiveTab] = useState<GuideExploreTabId>("collections")
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [bookmarkedGuideIds, setBookmarkedGuideIds] = useState<Set<string>>(
        () => new Set(["wudu", "salah", "ramadan"])
    )

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {}
        GuideCategories.filter((c) => c.id !== "all").forEach((c) => {
            counts[c.id] = GuidesMock.filter((g) => g.category === c.id).length
        })
        return counts
    }, [])

    const sidebarCategories = useMemo(
        () => GuideCategories.filter((c) => c.id !== "all").map((c) => ({ id: c.id, label: c.label })),
        []
    )

    const toggleCategory = (id: string) => {
        setSelectedCategories((prev) => {
            const next = new Set(prev)
            const catId = id as GuideCategoryId
            if (next.has(catId)) next.delete(catId)
            else next.add(catId)
            return next
        })
    }

    const toggleDifficulty = (id: string) => {
        setSelectedDifficulties((prev) => {
            const next = new Set(prev)
            const diff = id as GuideDifficulty
            if (next.has(diff)) next.delete(diff)
            else next.add(diff)
            return next
        })
    }

    const clearAllFilters = () => {
        setSelectedCategories(new Set())
        setSelectedDifficulties(new Set())
        setSearchQuery("")
    }

    const filteredGuides = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        const result = GuidesMock.filter((g) => {
            const matchCategory = selectedCategories.size === 0 || selectedCategories.has(g.category)
            const matchDifficulty = selectedDifficulties.size === 0 || selectedDifficulties.has(g.difficulty)
            const matchSearch = !q || g.title.toLowerCase().includes(q) || g.excerpt.toLowerCase().includes(q)
            return matchCategory && matchDifficulty && matchSearch
        })

        result.sort((a, b) => {
            switch (sortBy) {
                case "shortest": return a.readTimeMinutes - b.readTimeMinutes
                case "longest": return b.readTimeMinutes - a.readTimeMinutes
                case "alphabetical": return a.title.localeCompare(b.title)
                default: return 0
            }
        })

        return result
    }, [searchQuery, selectedCategories, selectedDifficulties, sortBy])

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

    const filterChips = useMemo(() => {
        const categoryChips = Array.from(selectedCategories).map((id) => ({
            id: `cat-${id}`,
            label: GuideCategories.find((c) => c.id === id)?.label ?? id,
        }))
        const difficultyChips = Array.from(selectedDifficulties).map((id) => ({
            id: `diff-${id}`,
            label: id,
        }))
        return [...categoryChips, ...difficultyChips]
    }, [selectedCategories, selectedDifficulties])

    const removeChip = (chipId: string) => {
        if (chipId.startsWith("cat-")) toggleCategory(chipId.replace("cat-", ""))
        if (chipId.startsWith("diff-")) toggleDifficulty(chipId.replace("diff-", ""))
    }

    const displayedGuides = activeTab === "collections" ? filteredGuides : bookmarkGuides

    return (
        <div>
            <SectionHeader
                variant="emerald"
                icon={GraduationCap}
                label="Guides & learning"
                heading="Guides · Catalog"
                descriptions={[
                    "Curated learning paths for everyday worship, character, and foundational knowledge — structured for clarity and consistency.",
                ]}
            >
                <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Badge variant="outline" className="gap-1.5">
                        <Database className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-xs text-gray-900">{GuidesMock.length}+ Guides</span>
                    </Badge>
                    <Badge variant="emerald" className="gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-xs text-emerald-700">Scholar-reviewed</span>
                    </Badge>
                    <Badge variant="secondary" className="gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-xs text-gray-900">Structured paths</span>
                    </Badge>
                </div>
            </SectionHeader>

            <main className="container relative py-10 lg:py-16" id="guides-collections-section">
                <div className="flex flex-col items-start gap-7 lg:flex-row 2xl:gap-10">
                    <div className="sticky top-0 hidden w-56 shrink-0 lg:block 2xl:w-64">
                        <CatalogCategorySidebar
                            title="Topics"
                            categories={sidebarCategories}
                            selectedIds={selectedCategories as Set<string>}
                            onToggle={toggleCategory}
                            onClearAll={clearAllFilters}
                            categoryCounts={categoryCounts}
                            chips={{
                                title: "Difficulty",
                                items: DIFFICULTIES,
                                selectedIds: selectedDifficulties as Set<string>,
                                onToggle: toggleDifficulty,
                            }}
                            note={{
                                quote: "Whoever travels a path in search of knowledge, Allah will make easy for him a path to Paradise.",
                                reference: "Sahih Muslim",
                            }}
                        />
                    </div>

                    <div className="w-full min-w-0 flex-1">
                        <CatalogTopBar
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            searchPlaceholder={activeTab === "bookmarks" ? "Search your saved guides..." : "Search guides, topics, or keywords..."}
                            scopeFilter={{
                                value: activeTab,
                                onChange: (v) => setActiveTab(v as GuideExploreTabId),
                                options: scopeOptions,
                                placeholder: "View",
                            }}
                            sortBy={sortBy}
                            onSortChange={(v) => setSortBy(v as GuidesSortOption)}
                            sortOptions={sortOptions}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            resultCount={displayedGuides.length}
                            onMobileFilterToggle={() => setIsMobileFilterOpen(true)}
                        />

                        <CatalogFilterChips chips={filterChips} onRemove={removeChip} />

                        {activeTab === "collections" ? (
                            <GuidesCollectionsTabSection
                                guides={filteredGuides}
                                bookmarkedIds={bookmarkedGuideIds}
                                onToggleBookmark={toggleBookmark}
                                viewMode={viewMode}
                                scrollContainerId="guides-collections-section"
                            />
                        ) : (
                            <GuidesBookmarksTabSection
                                guides={bookmarkGuides}
                                bookmarkedIds={bookmarkedGuideIds}
                                onToggleBookmark={toggleBookmark}
                                viewMode={viewMode}
                                scrollContainerId="guides-collections-section"
                            />
                        )}
                    </div>
                </div>
            </main>

            <CatalogFiltersDrawer
                isOpen={isMobileFilterOpen}
                onOpenChange={setIsMobileFilterOpen}
                onClearAll={clearAllFilters}
                categories={sidebarCategories}
                selectedIds={selectedCategories as Set<string>}
                onToggle={toggleCategory}
                categoryCounts={categoryCounts}
                sidebarTitle="Topics"
                chips={{
                    title: "Difficulty",
                    items: DIFFICULTIES,
                    selectedIds: selectedDifficulties as Set<string>,
                    onToggle: toggleDifficulty,
                }}
                note={{
                    quote: "Whoever travels a path in search of knowledge, Allah will make easy for him a path to Paradise.",
                    reference: "Sahih Muslim",
                }}
            />
        </div>
    )
}
