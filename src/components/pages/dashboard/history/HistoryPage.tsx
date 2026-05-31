"use client"

import { useMemo, useState } from "react"
import { Filter } from "lucide-react"
import { Scroll } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Pagination } from "@/components/ui/pagination"
import FilterDropdown from "@/components/shared/FilterDropdown"
import SectionHeader from "@/components/shared/SectionHeader"
import { usePagination } from "@/hooks/usePagination"
import HistoryCard from "./HistoryCard"
import { HISTORY_CATEGORIES, HISTORY_EDITORIAL, HISTORY_TOPICS } from "./content"

export default function HistoryPage() {
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

    const categoryOptions = useMemo(
        () =>
            HISTORY_CATEGORIES.map((c) => ({
                value: c.id,
                label: c.label,
                metaLabel: String(getCategoryCount(c.id)),
            })),
        [category]
    )

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
                        <section className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
                            <Input
                                search
                                type="input"
                                placeholder="Search history..."
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
                                        options={categoryOptions}
                                        value={category}
                                        onChange={(v) => setCategory(String(v))}
                                        placeholder="Era"
                                        triggerIcon={Filter}
                                        theme="emerald"
                                        className="w-full"
                                        classNames={{
                                            triggerButton: "w-full max-w-full",
                                            content: "scrollbar-thin",
                                        }}
                                    />
                                </div>
                                <div className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50/80 px-2.5 text-xs font-medium text-emerald-800 shadow-sm sm:hidden">
                                    <span className="tabular-nums font-semibold">{filtered.length}</span>
                                    <span className="ml-1 truncate">entries</span>
                                </div>
                            </div>
                            <div className="hidden h-9 shrink-0 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50/80 px-3 text-xs font-medium text-emerald-800 shadow-sm sm:inline-flex">
                                <span className="tabular-nums font-semibold">{filtered.length}</span>
                                <span className="ml-1">entries</span>
                            </div>
                        </section>

                        {filtered.length === 0 ? (
                            <p className="py-12 text-center text-sm text-gray-500">No entries found.</p>
                        ) : (
                            <>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {paginatedItems.map((topic, index) => (
                                        <HistoryCard
                                            key={topic.id}
                                            topic={topic}
                                            // index={index}
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
