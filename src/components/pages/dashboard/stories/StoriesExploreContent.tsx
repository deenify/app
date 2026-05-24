"use client"

import { useMemo, useState } from "react"
import { Heart } from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import { LearnExploreHero } from "@/components/shared/learn/LearnExploreHero"
import { LearnExploreToolbar } from "@/components/shared/learn/LearnExploreToolbar"
import { usePagination } from "@/hooks/usePagination"
import { STORIES_CATEGORIES, STORIES_EDITORIAL, STORIES_TOPICS } from "./content"
import StoryCard from "./StoryCard"
import StoryDetailModal from "./StoryDetailModal"

export default function StoriesExploreContent() {
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

    return (
        <div className="bg-gray-50">
            <section className="border-b border-gray-100 bg-white">
                <div className="container px-4 sm:px-6">
                    <div className="mx-auto py-10 sm:py-12">
                        <LearnExploreHero
                            editorial={STORIES_EDITORIAL}
                            icon={Heart}
                            iconClassName="bg-blue-50 text-blue-700 ring-blue-100"
                            badgeVariant="emerald"
                        />
                    </div>
                </div>
            </section>

            <main className="bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_50%,#f0f7f4_100%)]">
                <section className="border-t border-layout-separator">
                    <div className="container py-6 sm:py-8">
                        <div className="mx-auto min-w-0 max-w-6xl space-y-5">
                            <LearnExploreToolbar
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                category={category}
                                onCategoryChange={setCategory}
                                categories={STORIES_CATEGORIES}
                                itemCount={filtered.length}
                                countLabel="stories"
                                placeholder="Search stories..."
                                filterTheme="blue"
                                countToneClass="border-blue-200 bg-blue-50/80 text-blue-900"
                                getCategoryCount={getCategoryCount}
                            />

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
