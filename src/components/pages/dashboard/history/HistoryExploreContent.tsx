"use client"

import { useMemo, useState } from "react"
import { Scroll } from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import SectionHeader from "@/components/shared/SectionHeader"
import { LearnExploreToolbar } from "@/components/shared/learn/LearnExploreToolbar"
import { usePagination } from "@/hooks/usePagination"
import HistoryCard from "./HistoryCard"
import { HISTORY_CATEGORIES, HISTORY_EDITORIAL, HISTORY_TOPICS } from "./content"

export default function HistoryExploreContent() {
    const [searchQuery, setSearchQuery] = useState("")
    const [category, setCategory] = useState("all")

    const filtered = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        return HISTORY_TOPICS.filter((t) => {
            const catOk = category === "all" || t.category === category
            const searchOk =
                !q ||
                t.title.toLowerCase().includes(q) ||
                t.excerpt.toLowerCase().includes(q) ||
                t.era.toLowerCase().includes(q)
            return catOk && searchOk
        })
    }, [category, searchQuery])

    const { page, setPage, totalPages, paginatedItems } = usePagination(filtered, 6)

    const getCategoryCount = (categoryId: string) =>
        categoryId === "all"
            ? HISTORY_TOPICS.length
            : HISTORY_TOPICS.filter((t) => t.category === categoryId).length

    const categoryLabel = (id: string) =>
        HISTORY_CATEGORIES.find((c) => c.id === id)?.label ?? id

    return (
        <div className="bg-[#f5f5f7]">
            <SectionHeader
                layoutScope="center"
                className="bg-white"
                variant="emerald"
                icon={Scroll}
                label={HISTORY_EDITORIAL.badge}
                heading={HISTORY_EDITORIAL.title}
                descriptions={[HISTORY_EDITORIAL.lead]}
            />

            <main className="border-t border-layout-separator bg-[#f5f5f7]">
                <div className="container py-6 sm:py-8">
                    <div className="mx-auto min-w-0 max-w-6xl space-y-5">
                        <LearnExploreToolbar
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            category={category}
                            onCategoryChange={setCategory}
                            categories={HISTORY_CATEGORIES}
                            itemCount={filtered.length}
                            countLabel="entries"
                            placeholder="Search history..."
                            filterTheme="emerald"
                            filterPlaceholder="Era"
                            countToneClass="border-emerald-200 bg-emerald-50/80 text-emerald-800"
                            getCategoryCount={getCategoryCount}
                        />

                        {filtered.length === 0 ? (
                            <p className="py-12 text-center text-sm text-gray-500">No entries found.</p>
                        ) : (
                            <>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {paginatedItems.map((topic, index) => (
                                        <HistoryCard
                                            key={topic.id}
                                            topic={topic}
                                            index={index}
                                            categoryLabel={categoryLabel(topic.category)}
                                        />
                                    ))}
                                </div>
                                <Pagination
                                    page={page}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                    align="right"
                                />
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
