"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Bookmark, Filter, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import FilterDropdown from "@/components/shared/FilterDropdown"
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

const GuidesExplorePage = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [category, setCategory] = useState<string>("all")
    const [activeTab, setActiveTab] = useState<GuideExploreTabId>("collections")
    const [bookmarkedGuideIds, setBookmarkedGuideIds] = useState<Set<string>>(
        () => new Set(["wudu", "salah", "ramadan"])
    )

    const categoryOptions = useMemo(
        () =>
            GuideCategories.map((c) => ({
                value: c.id,
                label: c.label,
                metaLabel:
                    c.id === "all"
                        ? String(GuidesMock.length + 20)
                        : String(GuidesMock.filter((g) => g.category === c.id).length),
            })),
        []
    )

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

    return (
        <div className="bg-gray-50">
            <section className="border-b border-gray-100 bg-white">
                <div className="container px-4 sm:px-6 md:px-6">
                    <div className="mx-auto py-10 sm:py-12">
                        <header className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, ease: "easeOut" }}
                                className="mb-5 flex justify-center sm:mb-6"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 sm:h-[4.5rem] sm:w-[4.5rem]">
                                    <GraduationCap className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.5} />
                                </div>
                            </motion.div>

                            <Badge variant="emerald" className="mb-3 text-xs font-medium">
                                Guides & learning
                            </Badge>

                            <h1 className="text-balance text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl md:text-[1.75rem] md:leading-snug">
                                Study, practice, and grow
                            </h1>
                            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
                                Curated learning paths for everyday worship, character, and foundational knowledge —
                                structured for clarity and consistency.
                            </p>
                        </header>
                    </div>
                </div>
            </section>

            <section className={cn("relative w-full border-t border-layout-separator", "bg-gray-50")}>
                <div className="container py-6 sm:py-8">
                    <div className="mx-auto max-w-6xl space-y-4 sm:space-y-5">
                        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                            <Input
                                search
                                type="input"
                                placeholder={
                                    activeTab === "bookmarks"
                                        ? "Search your saved guides..."
                                        : "Search guides..."
                                }
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                containerClassName="min-w-0 flex-1"
                                className="h-10 rounded-lg border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:bg-white sm:h-11"
                            />
                            <div className="flex flex-1 items-center justify-between gap-2 xs:gap-4 sm:max-w-[260px] sm:shrink-0">
                                <FilterDropdown
                                    options={categoryOptions}
                                    value={category}
                                    onChange={(v) => setCategory(String(v))}
                                    placeholder="All topics"
                                    triggerIcon={Filter}
                                    theme="purple"
                                    contentClassName="scrollbar-thin"
                                />
                                <div
                                    className="inline-flex h-9 w-[100px] shrink-0 items-center justify-center rounded-md border border-emerald-200 
                                    bg-emerald-50 px-3 text-xs font-medium text-gray-700 shadow-sm xs:w-[120px] sm:hidden"
                                >
                                    <span className="tabular-nums font-semibold text-gray-900">100+</span>
                                    <span className="ml-1">guides</span>
                                </div>
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
        </div>
    )
}

export default GuidesExplorePage
