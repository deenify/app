"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Bookmark, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { LearnExploreToolbar } from "@/components/shared/learn/LearnExploreToolbar"
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

            <main className="bg-[linear-gradient(180deg,#f8faf8_0%,#f0f7f4_100%)]">
                <section className={cn("relative w-full border-t border-layout-separator bg-transparent")}>
                    <div className="container py-6 sm:py-8">
                        <div className="mx-auto min-w-0 max-w-6xl space-y-4 sm:space-y-5">
                            <LearnExploreToolbar
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                category={category}
                                onCategoryChange={setCategory}
                                categories={GuideCategories.map((c) => ({ id: c.id, label: c.label }))}
                                itemCount={filteredGuides.length}
                                countLabel="guides"
                                placeholder={
                                    activeTab === "bookmarks"
                                        ? "Search your saved guides..."
                                        : "Search guides..."
                                }
                                filterPlaceholder="All topics"
                                filterTheme="purple"
                                getCategoryCount={getCategoryCount}
                                countToneClass="border-emerald-200 bg-emerald-50/80 text-emerald-800"
                            />

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

export default GuidesExplorePage
