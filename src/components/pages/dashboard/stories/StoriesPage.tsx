"use client"

import { useMemo, useState } from "react"
import { Filter, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Pagination } from "@/components/ui/pagination"
import FilterDropdown from "@/components/shared/FilterDropdown"
import SectionHeader from "@/components/shared/SectionHeader"
import { usePagination } from "@/hooks/usePagination"
import { STORIES_CATEGORIES, STORIES_EDITORIAL, STORIES_TOPICS } from "./content"
import StoryCard from "./StoryCard"
import StoryDetailModal from "./StoryDetailModal"

export default function StoriesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [category, setCategory] = useState("all")
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const filtered = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        return STORIES_TOPICS.filter((s) => {
            const catOk = category === "all" || s.category === category
            const searchOk =
                !q ||
                s.title.toLowerCase().includes(q) ||
                s.excerpt.toLowerCase().includes(q) ||
                s.prophet.toLowerCase().includes(q) ||
                s.lesson.toLowerCase().includes(q)
            return catOk && searchOk
        })
    }, [category, searchQuery])

    const { page, setPage, totalPages, paginatedItems } = usePagination(
        filtered,
        6
    )

    const getCategoryCount = (categoryId: string) =>
        categoryId === "all"
            ? STORIES_TOPICS.length
            : STORIES_TOPICS.filter((s) => s.category === categoryId).length
    const selected = useMemo(
        () => STORIES_TOPICS.find((s) => s.id === selectedId) ?? null,
        [selectedId]
    )

    const categoryOptions = useMemo(
        () =>
            STORIES_CATEGORIES.map((c) => ({
                value: c.id,
                label: c.label,
                metaLabel: String(getCategoryCount(c.id)),
            })),
        [category]
    )

    return (
        <div className="bg-gray-50">
            <SectionHeader
                layoutScope="center"
                className="bg-white"
                variant="blue"
                icon={Heart}
                label={STORIES_EDITORIAL.badge}
                heading={STORIES_EDITORIAL.title}
                descriptions={[STORIES_EDITORIAL.lead]}
            />

            <main className="border-t border-layout-separator">
                <section className="container py-6 sm:py-8">
                    <div className="mx-auto min-w-0 max-w-6xl space-y-5">
                        <section className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
                            <Input
                                search
                                type="input"
                                placeholder="Search stories..."
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
                                        placeholder="All topics"
                                        triggerIcon={Filter}
                                        theme="blue"
                                        className="w-full"
                                        classNames={{
                                            triggerButton: "w-full max-w-full",
                                            content: "scrollbar-thin",
                                        }}
                                    />
                                </div>
                                <div className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-blue-200 bg-blue-50/80 px-2.5 text-xs font-medium text-blue-900 shadow-sm sm:hidden">
                                    <span className="tabular-nums font-semibold">{filtered.length}</span>
                                    <span className="ml-1 truncate">stories</span>
                                </div>
                            </div>
                            <div className="hidden h-9 shrink-0 items-center justify-center rounded-md border border-blue-200 bg-blue-50/80 px-3 text-xs font-medium text-blue-900 shadow-sm sm:inline-flex">
                                <span className="tabular-nums font-semibold">{filtered.length}</span>
                                <span className="ml-1">stories</span>
                            </div>
                        </section>

                        {filtered.length === 0 ? (
                            <p className="py-12 text-center text-sm text-gray-500">No stories found.</p>
                        ) : (
                            <>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {paginatedItems.map((story, index) => (
                                        <StoryCard
                                            key={story.id}
                                            story={story}
                                            index={index}
                                            onOpen={() => setSelectedId(story.id)}
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
                </section>
            </main>

            <StoryDetailModal
                story={selected}
                isOpen={Boolean(selectedId && selected)}
                onOpenChange={(open) => setSelectedId(open ? selectedId : null)}
            />
        </div>
    )
}
