"use client"

import { Bookmark } from "lucide-react"
import { useIncrementalReveal } from "@/hooks/useIncrementalReveal"
import Stagger from "@/components/shared/motion/Stagger"
import GuidesCard from "./GuidesCard"
import type { GuideType } from "./content"

type GuidesBookmarksTabSectionProps = {
    guides: GuideType[]
    bookmarkedIds: Set<string>
    onToggleBookmark: (id: string) => void
}

const GuidesBookmarksTabSection = ({
    guides,
    bookmarkedIds,
    onToggleBookmark,
}: GuidesBookmarksTabSectionProps) => {
    const savedTotal = bookmarkedIds.size
    const { items, sentinelRef, newFromIndex } = useIncrementalReveal({
        items: guides,
        batchLength: 18,
        offsetTop: 480,
    })

    if (guides.length === 0) {
        const filteredOut = savedTotal > 0

        return (
            <section className="min-h-[45dvh] pb-10">
                <div className="container px-4 sm:px-6 md:px-6">
                    <div className="mt-6 flex justify-center">
                        {filteredOut ? (
                            <div className="rounded-xl p-8 text-center shadow-sm">
                                <p className="text-sm font-medium text-gray-900">No matching bookmarks</p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Try another keyword, topic, or clear filters.
                                </p>
                            </div>
                        ) : (
                            <div className="max-w-lg rounded-2xl border border-dashed border-gray-200 px-6 py-8 text-center shadow-sm">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                    <Bookmark className="h-6 w-6" strokeWidth={1.5} />
                                </div>
                                <h3 className="mt-4 text-base font-medium text-gray-900">No bookmarks yet</h3>
                                <p className="mt-1.5 text-sm text-gray-500">
                                    Save guides from All guides to find them here quickly.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="h-max min-h-[45dvh] pb-10">
            <div className="container px-4 sm:px-6 md:px-6">
                <main className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                    {items.map((g, index) => (
                        <Stagger
                            key={g.id}
                            index={index - newFromIndex}
                            animate={index >= newFromIndex}
                        >
                            <GuidesCard
                                guide={g}
                                isBookmarked={bookmarkedIds.has(g.id)}
                                onToggleBookmark={() => onToggleBookmark(g.id)}
                            />
                        </Stagger>
                    ))}
                    <div ref={sentinelRef} className="col-span-full h-px w-full" aria-hidden />
                </main>
            </div>
        </section>
    )
}

export default GuidesBookmarksTabSection
