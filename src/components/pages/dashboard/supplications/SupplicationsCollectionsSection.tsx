"use client"

import Stagger from "@/components/shared/motion/Stagger"
import SupplicationCard from "./SupplicationCard"
import type { SupplicationItem } from "./content"
import { SearchX } from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import { usePagination } from "@/hooks/usePagination"
import { useBreakpoint } from "@/hooks/useBreakpoint"

type Props = {
    items: SupplicationItem[]
    bookmarkedIds: Set<string>
    onToggleBookmark: (id: string) => void
    viewMode?: "grid" | "list"
}

export default function SupplicationsCollectionsSection({
    items,
    bookmarkedIds,
    onToggleBookmark,
    viewMode = "grid",
}: Props) {

    const is2XlUp = useBreakpoint("2xl", "up")
    const { page, setPage, totalPages, paginatedItems } = usePagination(items, is2XlUp ? 12 : 9)

    return (
        <section className="w-full">
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-gray-100 bg-white p-20 text-center shadow-sm">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-50 mb-6 group transition-all hover:bg-rose-50">
                        <SearchX className="h-10 w-10 text-gray-300 group-hover:text-rose-400 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight text-gray-900">No matches in our library</h3>
                    <p className="mt-3 text-sm font-medium text-gray-400 max-w-sm mx-auto leading-relaxed">
                        Try refining your search terms or expanding your filters to discover more prophetic words.
                    </p>
                </div>
            ) : (
                <div className={viewMode === "grid"
                    ? "grid gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                    : "flex flex-col gap-3"
                }>
                    {paginatedItems.map((item, index) => (
                        <Stagger
                            key={item.id}
                            index={index}
                            animate={true}
                        >
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

            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                scrollContainerId="supplications-collections-section"
                className="py-6"
            />
        </section>
    )
}
