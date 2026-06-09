"use client"

import Stagger from "@/components/shared/motion/Stagger"
import CatalogEmptyState from "@/components/shared/catalog/CatalogEmptyState"
import { Pagination } from "@/components/ui/pagination"
import { usePagination } from "@/hooks/usePagination"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import GuidesCard from "./GuidesCard"
import type { GuideType } from "./content"

type GuidesBookmarksTabSectionProps = {
    guides: GuideType[]
    bookmarkedIds: Set<string>
    onToggleBookmark: (id: string) => void
    viewMode?: "grid" | "list"
    scrollContainerId?: string
}

const GuidesBookmarksTabSection = ({
    guides,
    bookmarkedIds,
    onToggleBookmark,
    viewMode = "grid",
    scrollContainerId,
}: GuidesBookmarksTabSectionProps) => {
    const is2XlUp = useBreakpoint("2xl", "up")
    const { page, setPage, totalPages, paginatedItems } = usePagination(guides, is2XlUp ? 12 : 9)

    if (guides.length === 0) {
        return (
            <CatalogEmptyState
                variant="bookmarks"
                savedTotal={bookmarkedIds.size}
                description="Save guides from All Guides to find them here quickly."
            />
        )
    }

    return (
        <section className="w-full">
            <div className={viewMode === "grid"
                ? "grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                : "flex flex-col gap-3"
            }>
                {paginatedItems.map((guide, index) => (
                    <Stagger key={guide.id} index={index} animate>
                        <GuidesCard
                            guide={guide}
                            isBookmarked={bookmarkedIds.has(guide.id)}
                            onToggleBookmark={() => onToggleBookmark(guide.id)}
                            viewMode={viewMode}
                        />
                    </Stagger>
                ))}
            </div>

            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                scrollContainerId={scrollContainerId}
                className="py-6"
            />
        </section>
    )
}

export default GuidesBookmarksTabSection
