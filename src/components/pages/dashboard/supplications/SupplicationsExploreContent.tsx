"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Bookmark, BookHeart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { LearnExploreToolbar } from "@/components/shared/learn/LearnExploreToolbar"
import Tabs from "@/components/shared/Tabs"
import { cn } from "@/lib/utils/clsx"
import {
    SUPPLICATION_CATEGORIES,
    SUPPLICATIONS_MOCK,
    type SupplicationCategoryId,
} from "./content"
import SupplicationsCollectionsSection from "./SupplicationsCollectionsSection"

export type SupplicationsTabId = "library" | "saved"

const tabs = [
    { id: "library" as const, label: "Library", icon: BookHeart },
    { id: "saved" as const, label: "Saved", icon: Bookmark },
]

export default function SupplicationsExploreContent() {
    const [searchQuery, setSearchQuery] = useState("")
    const [category, setCategory] = useState<SupplicationCategoryId>("all")
    const [activeTab, setActiveTab] = useState<SupplicationsTabId>("library")
    const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
        () => new Set(["sayyid-istighfar", "distress-yunus"])
    )

    const getCategoryCount = (categoryId: string) =>
        categoryId === "all"
            ? SUPPLICATIONS_MOCK.length
            : SUPPLICATIONS_MOCK.filter((s) => s.category === categoryId).length

    const filtered = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        return SUPPLICATIONS_MOCK.filter((s) => {
            const catOk = category === "all" || s.category === category
            const searchOk =
                !q ||
                s.title.toLowerCase().includes(q) ||
                s.excerpt.toLowerCase().includes(q) ||
                s.translation.toLowerCase().includes(q) ||
                s.arabic.includes(q)
            return catOk && searchOk
        })
    }, [category, searchQuery])

    const savedItems = useMemo(
        () => filtered.filter((s) => bookmarkedIds.has(s.id)),
        [bookmarkedIds, filtered]
    )

    const toggleBookmark = (id: string) => {
        setBookmarkedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    return (
        <div className="bg-gray-50">
            <section className="border-b border-gray-100 bg-white">
                <div className="container px-4 sm:px-6 md:px-6">
                    <div className="mx-auto py-10 sm:py-12">
                        <header className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-5 flex justify-center sm:mb-6"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-700 ring-1 ring-rose-100 sm:h-[4.5rem] sm:w-[4.5rem]">
                                    <BookHeart className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.5} />
                                </div>
                            </motion.div>

                            <Badge variant="pink" className="mb-3 text-xs font-medium">
                                Duʿāʾ & heartfelt speech
                            </Badge>

                            <h1 className="text-balance text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl md:text-[1.85rem] md:leading-snug">
                                Supplications that shape interior weather
                            </h1>
                            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
                                A curated corpus—not exhaustive—organized for retrieval when salah, travel, anxiety, or
                                gratitude call for words finer than your own. Pair with dhikr lanes for rhythm.
                            </p>
                        </header>
                    </div>
                </div>
            </section>

            <main className="bg-[linear-gradient(180deg,#fff7fb_0%,#f0fdf9_100%)]">
                <section className={cn("relative w-full border-t border-layout-separator bg-transparent")}>
                    <div className="container py-6 sm:py-8">
                        <div className="mx-auto min-w-0 max-w-6xl space-y-4 sm:space-y-5">
                            <LearnExploreToolbar
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                category={category}
                                onCategoryChange={(v) => setCategory(v as SupplicationCategoryId)}
                                categories={SUPPLICATION_CATEGORIES.map((c) => ({
                                    id: c.id,
                                    label: c.label,
                                }))}
                                itemCount={activeTab === "saved" ? savedItems.length : filtered.length}
                                countLabel="entries"
                                placeholder={
                                    activeTab === "saved"
                                        ? "Search saved supplications..."
                                        : "Search Arabic, titles, themes..."
                                }
                                filterPlaceholder="Topic"
                                filterTheme="purple"
                                getCategoryCount={getCategoryCount}
                                countToneClass="border-rose-200 bg-rose-50/80 text-rose-900"
                            />

                            <section className="flex items-center justify-between pt-6">
                                <Tabs
                                    allTabs={tabs}
                                    activeTab={activeTab}
                                    onTabChange={(tabId) => setActiveTab(tabId as SupplicationsTabId)}
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

                                <div className="hidden items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50/90 px-3 py-1 text-[11px] font-medium text-rose-900 shadow-sm sm:inline-flex sm:text-xs">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-600" />
                                    {activeTab === "library" ? (
                                        <>
                                            <span className="tabular-nums">{filtered.length}</span>
                                            <span>shown</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="tabular-nums">{bookmarkedIds.size}</span>
                                            <span>saved</span>
                                        </>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </section>

                {activeTab === "library" &&
                    <SupplicationsCollectionsSection
                        items={filtered}
                        bookmarkedIds={bookmarkedIds}
                        onToggleBookmark={toggleBookmark}
                    />}
                {activeTab === "saved" && (
                    <SupplicationsCollectionsSection
                        items={savedItems}
                        bookmarkedIds={bookmarkedIds}
                        onToggleBookmark={toggleBookmark}
                    />
                )}
            </main>
        </div>
    )
}
