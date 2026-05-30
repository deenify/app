"use client"

import { useMemo, useState } from "react"
import { Bookmark, BookHeart, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import FilterDropdown from "@/components/shared/FilterDropdown"
import SectionHeader from "@/components/shared/SectionHeader"
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

export default function SupplicationsPage() {
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

    const supplicationCategoryOptions = useMemo(
        () =>
            SUPPLICATION_CATEGORIES.map((c) => ({
                value: c.id,
                label: c.label,
                metaLabel: String(getCategoryCount(c.id)),
            })),
        [category]
    )

    const itemCount = activeTab === "saved" ? savedItems.length : filtered.length
    const searchPlaceholder =
        activeTab === "saved"
            ? "Search saved supplications..."
            : "Search Arabic, titles, themes..."

    return (
        <div className="bg-gray-50">
            <SectionHeader
                layoutScope="center"
                className="bg-white"
                variant="pink"
                icon={BookHeart}
                label="Duʿāʾ & heartfelt speech"
                heading="Supplications that shape interior weather"
                descriptions={[
                    "A curated corpus—not exhaustive—organized for retrieval when salah, travel, anxiety, or gratitude call for words finer than your own. Pair with dhikr lanes for rhythm.",
                ]}
            />

            <main className="bg-[linear-gradient(180deg,#fff7fb_0%,#f0fdf9_100%)]">
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
                                            options={supplicationCategoryOptions}
                                            value={category}
                                            onChange={(v) => setCategory(v as SupplicationCategoryId)}
                                            placeholder="Topic"
                                            triggerIcon={Filter}
                                            theme="purple"
                                            className="w-full"
                                            classNames={{
                                                triggerButton: "w-full max-w-full",
                                                content: "scrollbar-thin",
                                            }}
                                        />
                                    </div>
                                    <div className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-rose-200 bg-rose-50/80 px-2.5 text-xs font-medium text-rose-900 shadow-sm sm:hidden">
                                        <span className="tabular-nums font-semibold">{itemCount}</span>
                                        <span className="ml-1 truncate">entries</span>
                                    </div>
                                </div>
                                <div className="hidden h-9 shrink-0 items-center justify-center rounded-md border border-rose-200 bg-rose-50/80 px-3 text-xs font-medium text-rose-900 shadow-sm sm:inline-flex">
                                    <span className="tabular-nums font-semibold">{itemCount}</span>
                                    <span className="ml-1">entries</span>
                                </div>
                            </section>

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

                {activeTab === "library" && (
                    <SupplicationsCollectionsSection
                        key="library"
                        items={filtered}
                        bookmarkedIds={bookmarkedIds}
                        onToggleBookmark={toggleBookmark}
                    />
                )}
                {activeTab === "saved" && (
                    <SupplicationsCollectionsSection
                        key="saved"
                        items={savedItems}
                        bookmarkedIds={bookmarkedIds}
                        onToggleBookmark={toggleBookmark}
                    />
                )}
            </main>
        </div>
    )
}
