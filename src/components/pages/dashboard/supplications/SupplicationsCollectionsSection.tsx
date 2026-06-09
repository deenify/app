"use client"

import Stagger from "@/components/shared/motion/Stagger"
import CatalogEmptyState from "@/components/shared/catalog/CatalogEmptyState"
import SupplicationCard from "./SupplicationCard"
import type { SupplicationItem } from "./content"
import { Pagination } from "@/components/ui/pagination"
import { usePagination } from "@/hooks/usePagination"
import { useBreakpoint } from "@/hooks/useBreakpoint"

type Props = {
    items: SupplicationItem[]
    bookmarkedIds: Set<string>
    onToggleBookmark: (id: string) => void
    viewMode?: "grid" | "list"
    isBookmarksView?: boolean
}

export default function SupplicationsCollectionsSection({
    items,
    bookmarkedIds,
    onToggleBookmark,
    viewMode = "grid",
    isBookmarksView = false,
}: Props) {
    const is2XlUp = useBreakpoint("2xl", "up")
    const { page, setPage, totalPages, paginatedItems } = usePagination(items, is2XlUp ? 12 : 9)

    return (
        <section className="w-full">
            {items.length === 0 ? (
                <CatalogEmptyState
                    variant={isBookmarksView ? "bookmarks" : "search"}
                    savedTotal={bookmarkedIds.size}
                    title={isBookmarksView ? undefined : "No matches in our library"}
                    description={
                        isBookmarksView
                            ? "Save duas from All Supplications to find them here quickly."
                            : "Try refining your search terms or expanding your filters to discover more prophetic words."
                    }
                />
            ) : (
                <div className={viewMode === "grid"
                    ? "grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                    : "flex flex-col gap-3"
                }>
                    {paginatedItems.map((item, index) => (
                        <Stagger key={item.id} index={index} animate>
                            <SupplicationCard
                                item={item}
                                isBookmarked={bookmarkedIds.has(item.id)}
                                onToggleBookmark={() => onToggleBookmark(item.id)}
                                viewMode={viewMode}
                            />
                        </Stagger>
                    ))}
                </div>
            )}

            {items.length > 0 && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    scrollContainerId="supplications-collections-section"
                    className="py-6"
                />
            )}
        </section>
    )
}
