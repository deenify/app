"use client"

import { Pagination } from "@/components/ui/pagination"
import { usePagination } from "@/hooks/usePagination"
import GuidesCard from "./GuidesCard"
import type { GuideType } from "./content"

export type GuidesCollectionsTabSectionProps = {
    guides: GuideType[]
    bookmarkedIds: Set<string>
    onToggleBookmark: (id: string) => void
}

const GuidesCollectionsTabSection = ({
    guides,
    bookmarkedIds,
    onToggleBookmark,
}: GuidesCollectionsTabSectionProps) => {
    const { paginatedItems, page, setPage, totalPages } = usePagination(
        guides,
        9
    )

    return (
        <section className="h-max min-h-[45dvh] pb-10">
            <div className="container space-y-6 px-4 sm:px-6 md:px-6">
                {guides.length === 0 ? (
                    <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                        <p className="text-sm font-medium text-gray-900">No guides found</p>
                        <p className="mt-1 text-sm text-gray-500">Try another keyword or topic.</p>
                    </div>
                ) : (
                    <main className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                        {paginatedItems.map((g, index) => (
                            <GuidesCard
                                key={g.id}
                                guide={g}
                                index={index}
                                isBookmarked={bookmarkedIds.has(g.id)}
                                onToggleBookmark={() => onToggleBookmark(g.id)}
                            />
                        ))}
                    </main>
                )}
                {guides.length > 0 && (
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        align="right"
                    />
                )}
            </div>
        </section>
    )
}

export default GuidesCollectionsTabSection
